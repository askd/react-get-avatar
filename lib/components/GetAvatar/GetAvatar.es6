import React from 'react';
import PropTypes from 'prop-types';

import GetAvatarWebcam from '../GetAvatarWebcam/GetAvatarWebcam';
import GetAvatarCanvas from '../GetAvatarCanvas/GetAvatarCanvas';
// import getDataURL from './utils';
import styles from './styles';

export default class GetAvatar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      webcamReady: false,
      webcamStarted: false,
      webcamElement: null,
      canvasReady: false,
      canvasActive: false,
      canvasElement: null,
      canvasSource: null,
    };
  }

  componentWillMount() {
    this.listeners = {
      onClickWebcamToggle: this.onClickWebcamToggle.bind(this),
      onClickWebcamCapture: this.onClickWebcamCapture.bind(this),
      onChangeImageUpload: this.onChangeImageUpload.bind(this),
      onChangeCanvasImage: this.onChangeCanvasImage.bind(this),
      onClickSave: this.onClickSave.bind(this),
      onClickCancel: this.onClickCancel.bind(this),
    };
  }

  componentWillUnmount() {

  }

  componentDidMount() {

  }

  onWebcamReady(elem) {
    this.setState({
      webcamReady: true,
      webcamElement: elem,
    });
  }

  onCanvasReady(elem) {
    this.setState({
      canvasReady: true,
      canvasElement: elem,
    });
  }

  onClickWebcamToggle() {
    const { webcamReady, webcamStarted } = this.state;

    if (!webcamReady) return;
    this.setState({
      webcamStarted: !webcamStarted,
    });
  }

  onClickWebcamCapture() {
    const { webcamElement } = this.state;

    this.setState({
      // canvasActive: true,
      canvasSource: webcamElement,
    });
  }

  onChangeImageUpload(event) {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const image = new Image();
      image.onload = () => {
        this.setState({
          // canvasActive: true,
          canvasSource: image,
        });
      };
      image.src = readerEvent.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  onChangeCanvasImage() {
    this.setState({
      canvasActive: true,
    });
  }

  onClickSave() {
    const { handleGet } = this.props;
    // const { width, height, handleGet } = this.props;

    // const data = null; // canvas data
    // const dataURI = getDataURL({ data, width, height });
    const dataURI = this.state.canvasElement.toDataURL('image/jpeg', 0.5);

    if (handleGet) handleGet(dataURI);
  }

  onClickCancel() {
    this.setState({
      canvasActive: false,
      canvasSource: null,
    });
  }

  render() {
    const { width, height } = this.props;
    const {
      webcamReady, webcamStarted,
      canvasReady, canvasSource, canvasActive,
    } = this.state;

    return (
      <div style={ styles.root }>
        <div style={{
          ...styles.wrapper,
          width: `${width}px`,
          height: `${height}px`,
        }}>
          <GetAvatarWebcam
            handleReady={ (elem) => { this.onWebcamReady(elem); } }
            isActive={ webcamStarted && !canvasActive }
          />
          { webcamReady && webcamStarted && canvasReady && <div
            style={ styles.capture }
            onClick={ this.listeners.onClickWebcamCapture }
          /> }
          <div style={
            canvasActive ? { ...styles.canvas, ...styles.canvasActive } : styles.canvas
          }>
            <GetAvatarCanvas
              source={ canvasSource }
              width={ width }
              height={ height }
              handleReady={ (elem) => { this.onCanvasReady(elem); } }
              handleDraw={ this.listeners.onChangeCanvasImage }
            />
          </div>
        </div>
        { !canvasActive && <div
          style={ styles.nav }
        >
          { webcamReady && canvasReady && <div
            style={{ ...styles.button, ...styles.buttonToggle }}
            onClick={ this.listeners.onClickWebcamToggle }
          >
            { webcamStarted ? 'Stop Webcam' : 'Start Webcam' }
          </div> }
          <label
            style={{ ...styles.button, ...styles.buttonUpload }}
          >
            { 'Upload File' }
            <input
              style={ styles.inputUpload }
              type='file'
              onChange={ this.listeners.onChangeImageUpload }
            />
          </label>
        </div> }
        { canvasActive && <div
          style={ styles.nav }
        >
          <div
            style={{ ...styles.button, ...styles.buttonSave }}
            onClick={ this.listeners.onClickSave }
          >
            { 'Save' }
          </div>
          <div
            style={{ ...styles.button }}
            onClick={ this.listeners.onClickCancel }
          >
            { 'Cancel' }
          </div>
        </div> }
      </div>
    );
  }
}

GetAvatar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  handleGet: PropTypes.func.isRequired,
};

GetAvatar.defaultProps = {
  width: 0,
  height: 0,
  handleGet: () => {},
};
