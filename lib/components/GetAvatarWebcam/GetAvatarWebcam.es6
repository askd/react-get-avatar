import React from 'react';
import PropTypes from 'prop-types';

import { getUserMedia, getMediaSources } from './utils';
import styles from './styles';

export default class GetAvatarWebcam extends React.Component {
  constructor(props) {
    super(props);

    navigator.getUserMedia = getUserMedia();

    this.state = {
      stream: null,
      sources: null,
      sourceIndex: 0,
    };
  }

  componentWillMount() {
    this.listeners = {
      handleVideo: this.handleVideo.bind(this),
      handleError: this.handleError.bind(this),
      onClickFlip: this.onClickFlip.bind(this),
    };
  }

  componentWillUnmount() {
    this.stop();
  }

  componentDidMount() {
    const { handleReady } = this.props;

    getMediaSources().then((sources) => {
      this.setState({ sources });
      if (handleReady) handleReady(this.video);
    }).catch(() => {

    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isActive && nextProps.isActive) {
      this.start();
    }
    if (this.props.isActive && !nextProps.isActive) {
      this.stop();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateChanged = ['stream', 'sources'].some(
      name => nextState[name] !== this.state[name]
    );

    const propsChanged = [].some(
      name => nextProps[name] !== this.props[name]
    );

    return stateChanged || propsChanged;
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

  handleVideo(stream) {
    this.setState({ stream });
  }

  handleError(err) {
    console.error(`getUserMedia error (${err.name}: ${err.message})`);
  }

  start() {
    const { sources, sourceIndex } = this.state;

    if (sources === null) return;

    const constraints = { video: true };

    if (sources.length > 1) {
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
        <div style={ styles.root } />
      );
    }

    const { stream, sources } = this.state;

    const videoSrc = stream ? window.URL.createObjectURL(stream) : null;

    const hasVideo = videoSrc !== null;
    const hasSources = sources !== null && sources.length > 1;

    return (
      <div style={ styles.root }>
        <video
          ref={ (c) => { this.video = c; }}
          src={ videoSrc }
          style={ styles.video }
          autoPlay={ hasVideo }
        />
        { hasSources && <div
          style={ styles.flip }
          onClick={ this.listeners.onClickFlip }
        /> }
      </div>
    );
  }
}

const { bool, func } = PropTypes;

GetAvatarWebcam.propTypes = {
  handleReady: func,
  isActive: bool,
};

GetAvatarWebcam.defaultProps = {
  handleReady: () => {},
  isActive: false,
};
