import React from 'react';
import PropTypes from 'prop-types';

import GetAvatarWebcam from '../GetAvatarWebcam/GetAvatarWebcam';
import GetAvatarCanvas from '../GetAvatarCanvas/GetAvatarCanvas';
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
      canvasSource: webcamElement,
    });
  }

  onChangeImageUpload(event) {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const image = new Image();
      image.onload = () => {
        this.setState({
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
    const { handleGet, imageType, imageQuality } = this.props;

    const dataURI = this.state.canvasElement.toDataURL(imageType, imageQuality);

    if (handleGet) handleGet(dataURI);
  }

  onClickCancel() {
    this.setState({
      canvasActive: false,
      canvasSource: null,
    });
  }

  wrapperStyles() {
    const { width, height } = this.props;
    return {
      ...styles.wrapper,
      width: `${width}px`,
      height: `${height}px`,
    };
  }

  canvasStyles() {
    const { canvasActive } = this.state;

    return canvasActive ? { ...styles.canvas, ...styles.canvasActive } : styles.canvas;
  }

  rootStyles() {
    const { className } = this.props;
    return className ? { className } : null;
  }

  navStyles() {
    const className = this.props.navClassName;
    return className ? { className } : null;
  }

  toggleStyles() {
    const className = this.props.buttonClassName.toggle;
    if (className) return { className };

    const style = { ...styles.button, ...styles.buttonFirst };
    return { style };
  }

  uploadStyles() {
    const className = this.props.buttonClassName.upload;
    if (className) return { className };

    const { webcamReady, canvasReady } = this.state;
    if (webcamReady && canvasReady) {
      const style = { ...styles.button, ...styles.buttonUpload };
      return { style };
    }
    const style = { ...styles.button, ...styles.buttonOnly, ...styles.buttonUpload };
    return { style };
  }

  saveStyles() {
    const className = this.props.buttonClassName.save;
    if (className) return { className };

    const style = { ...styles.button, ...styles.buttonFirst };
    return { style };
  }

  cancelStyles() {
    const className = this.props.buttonClassName.cancel;
    if (className) return { className };

    const style = styles.button;
    return { style };
  }

  render() {
    const { width, height } = this.props;
    const {
      webcamReady, webcamStarted,
      canvasReady, canvasSource, canvasActive,
    } = this.state;

    return (
      <div { ...this.rootStyles() }>
        <div style={ this.wrapperStyles() }>
          <GetAvatarWebcam
            handleReady={ (elem) => { this.onWebcamReady(elem); } }
            isActive={ webcamStarted && !canvasActive }
          />
          { webcamReady && webcamStarted && canvasReady && <div
            style={ styles.capture }
            onClick={ this.listeners.onClickWebcamCapture }
          /> }
          <div style={ this.canvasStyles() }>
            <GetAvatarCanvas
              source={ canvasSource }
              width={ width }
              height={ height }
              handleReady={ (elem) => { this.onCanvasReady(elem); } }
              handleDraw={ this.listeners.onChangeCanvasImage }
            />
          </div>
        </div>
        { !canvasActive && <div { ...this.navStyles() }>
          { webcamReady && canvasReady && <div
            { ...this.toggleStyles() }
            onClick={ this.listeners.onClickWebcamToggle }
          >
            { webcamStarted ? 'Stop Webcam' : 'Start Webcam' }
          </div> }
          <label { ...this.uploadStyles() }>
            { 'Upload File' }
            <input
              style={ styles.inputUpload }
              type='file'
              onChange={ this.listeners.onChangeImageUpload }
            />
          </label>
        </div> }
        { canvasActive && <div { ...this.navStyles() }>
          <div
            { ...this.saveStyles() }
            onClick={ this.listeners.onClickSave }
          >
            { 'Save' }
          </div>
          <div
            { ...this.cancelStyles() }
            onClick={ this.listeners.onClickCancel }
          >
            { 'Cancel' }
          </div>
        </div> }
      </div>
    );
  }
}

const { func, oneOf, number, shape, string } = PropTypes;

GetAvatar.propTypes = {
  width: number.isRequired,
  height: number.isRequired,
  imageType: oneOf(['image/jpeg', 'image/png', 'image/gif', 'image/webp']),
  imageQuality: number,
  className: string,
  navClassName: string,
  buttonClassName: shape({
    toggle: string,
    upload: string,
    save: string,
    cancel: string,
  }),
  handleGet: func.isRequired,
};

GetAvatar.defaultProps = {
  width: 0,
  height: 0,
  imageType: 'image/jpeg',
  imageQuality: 0.5,
  buttonClassName: {},
  handleGet: () => {},
};
