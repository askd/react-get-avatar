import React from 'react';
import PropTypes from 'prop-types';

import { getUserMedia, getMediaSources, createScreenshot } from './utils';
import styles from './styles';

export default class GetAvatar extends React.Component {
  constructor(props) {
    super(props);

    navigator.getUserMedia = getUserMedia();

    this.state = {
      started: false,
      stream: null,
      sources: null,
      sourceIndex: 0,
      dataURI: null,
    };
  }

  componentWillMount() {
    this.listeners = {
      handleVideo: this.handleVideo.bind(this),
      handleError: this.handleError.bind(this),
      onClickVideo: this.onClickVideo.bind(this),
      onClickFlip: this.onClickFlip.bind(this),
    };
  }

  componentWillUnmount() {
    this.stop();
  }

  componentDidMount() {
    getMediaSources().then((sources) => {
      this.setState({ sources });
      this.start();
    }).catch(() => {

    });
  }

  onClickVideo() {
    const { started } = this.state;

    if (!started) return;

    const { handleGet } = this.props;

    const dataURI = createScreenshot(this.video);
    const processed = true;

    this.setState({ dataURI, processed });

    setTimeout(() => {
      this.setState({
        dataURI: null,
        processed: false,
      });
    }, 250);

    if (handleGet) handleGet(dataURI);
  }

  onClickFlip() {
    const { sources } = this.state;
    const sourcesCount = sources.length;

    if (sourcesCount < 2) return;

    let { sourceIndex } = this.state;

    sourceIndex += 1;

    if (sourceIndex > sourcesCount - 1) {
      sourceIndex = 0;
    }

    this.setState({ sourceIndex });

    this.stop();
    this.start();
  }

  getRootStyles() {
    const { width, height } = this.props;

    const rootStyles = styles.root;

    if (!width && !height) {
      rootStyles.paddingTop = '75%';

      return rootStyles;
    }

    if (width) {
      rootStyles.width = `${width}px`;
    }

    if (height) {
      rootStyles.height = `${height}px`;
    } else {
      rootStyles.height = '100%';
    }

    return rootStyles;
  }

  getScreenStyles() {
    const { processed } = this.state;

    if (!processed) {
      return styles.screen;
    }

    return {
      ...styles.screen,
      ...styles.processed,
    };
  }

  handleVideo(stream) {
    this.setState({ stream });
  }

  handleError(err) {
    console.error(`getUserMedia error (${err.name}: ${err.message})`);
  }

  start() {
    const { sources, sourceIndex } = this.state;
    const constraints = { video: true };

    if (sources && sources.length > 1) {
      constraints.video = {
        optional: [{ sourceId: sources[sourceIndex].deviceId }],
      };
    }

    navigator.getUserMedia(constraints, this.listeners.handleVideo, this.listeners.handleError);

    this.setState({ started: true });
  }

  stop() {
    const { stream } = this.state;

    if (!stream) return;

    const track = stream.getTracks()[0];

    if (track) track.stop();

    this.setState({ started: false });
  }

  render() {
    if (!navigator.getUserMedia) {
      return (
        <div style={ this.getRootStyles() }>
          <span style={{ color: 'white' }}>Webcam not supported</span>
        </div>
      );
    }

    const { stream, sources, dataURI } = this.state;
    const hasScreenshot = dataURI !== null;

    const videoSrc = stream ? window.URL.createObjectURL(stream) : null;
    const hasVideo = videoSrc !== null;

    const hasSources = hasVideo && (sources && sources.length > 1);

    return (
      <div style={ this.getRootStyles() }>
        { hasVideo && <video
          ref={ (c) => { this.video = c; }}
          src={ videoSrc }
          style={ styles.video }
          autoPlay
        /> }
        { hasScreenshot && <img
          style={ styles.screenshot }
          src={ dataURI }
          alt=''
        /> }
        { hasVideo && <div
          style={ this.getScreenStyles() }
          onClick={ this.listeners.onClickVideo }
        /> }
        { hasSources && <div
          style={ styles.flip }
          onClick={ this.listeners.onClickFlip }
        /> }
      </div>
    );
  }
}

GetAvatar.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  handleGet: PropTypes.func,
};

GetAvatar.defaultProps = {
  width: 0,
  height: 0,
  handleGet: () => {},
};
