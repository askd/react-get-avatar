import React from 'react';
import PropTypes from 'prop-types';

import { drawImage, clearCanvas, redrawCanvas, zoomCanvas, resetCanvas, transformCanvas,
         trackTransforms } from './utils';
// import styles from './styles';

export default class GetAvatarCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
    };
  }

  componentWillMount() {
    this.listeners = {
      onMouseDown: this.onMouseDown.bind(this),
      onMouseMove: this.onMouseMove.bind(this),
      onMouseUp: this.onMouseUp.bind(this),
      onScroll: this.onScroll.bind(this),
    };
  }

  componentDidMount() {
    const { handleReady } = this.props;

    this.init();

    if (handleReady) handleReady(this.canvas);

    this.bind();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.source !== nextProps.source) {
      this.applySource(nextProps.source);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.unbind();
  }

  onMouseDown(evt) {
    const x = (evt.offsetX || (evt.pageX - this.canvas.offsetLeft)) + this.offset.x;
    const y = (evt.offsetY || (evt.pageY - this.canvas.offsetTop)) + this.offset.y;

    this.offset = { x: 0, y: 0 };

    this.point = { x, y };
    this.started = true;
    this.dragged = false;
  }

  onMouseMove(evt) {
    const x = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
    const y = evt.offsetY || (evt.pageY - this.canvas.offsetTop);

    const point = { x, y };

    if (this.started) {
      transformCanvas(this.canvas, this.point, point);
      redrawCanvas(this.canvas, this.sourceCanvas);
    }

    this.point = point;
    this.dragged = true;
  }

  onMouseUp(evt) {
    this.started = false;
    if (!this.dragged) {
      this.zoom(evt.shiftKey ? -1 : 1);
    }
  }

  onScroll(evt) {
    const detail = evt.detail ? -evt.detail : 0;
    const delta = evt.wheelDelta ? evt.wheelDelta / 40 : detail;
    if (delta) this.zoom(delta);
    return evt.preventDefault() && false;
  }

  init() {
    const { width, height } = this.props;

    this.canvas.width = width;
    this.canvas.height = height;

    this.sourceCanvas = document.createElement('canvas');

    const ctx = this.canvas.getContext('2d');
    trackTransforms(ctx);

    this.point = { x: width / 2, y: height / 2 };

    this.started = false;
    this.dragged = false;
  }

  reset() {
    const { width, height } = this.props;
    this.point = { x: width / 2, y: height / 2 };
    resetCanvas(this.canvas);
  }

  bind() {
    document.body.style.mozUserSelect = document.body.style.webkitUserSelect =
    document.body.style.userSelect = 'none';

    this.canvas.addEventListener('mousedown', this.listeners.onMouseDown, false);
    this.canvas.addEventListener('mousemove', this.listeners.onMouseMove, false);
    this.canvas.addEventListener('mouseup', this.listeners.onMouseUp, false);
    this.canvas.addEventListener('mousewheel', this.listeners.onScroll, false);
    this.canvas.addEventListener('DOMMouseScroll', this.listeners.onScroll, false);
  }

  unbind() {
    this.canvas.removeEventListener('mousedown', this.listeners.onMouseDown, false);
    this.canvas.removeEventListener('mousemove', this.listeners.onMouseMove, false);
    this.canvas.removeEventListener('mouseup', this.listeners.onMouseUp, false);
    this.canvas.removeEventListener('mousewheel', this.listeners.onScroll, false);
    this.canvas.removeEventListener('DOMMouseScroll', this.listeners.onScroll, false);
  }

  zoom(clicks) {
    zoomCanvas(this.canvas, this.point, clicks);
    redrawCanvas(this.canvas, this.sourceCanvas);
  }

  applySource(source) {
    const { width, height, handleDraw } = this.props;

    if (source === null) {
      clearCanvas(this.canvas);
      clearCanvas(this.sourceCanvas);
    } else {
      this.reset();

      drawImage(this.canvas, source);
      drawImage(this.sourceCanvas, source, false);

      const sourceWidth = this.sourceCanvas.width;
      const sourceHeight = this.sourceCanvas.height;
      const x = Math.round((sourceWidth - width) / 2);
      const y = Math.round((sourceHeight - height) / 2);
      this.offset = { x, y };

      if (handleDraw) handleDraw();
    }
  }

  render() {
    return (
      <canvas
        ref={ (c) => { this.canvas = c; }}
      />
    );
  }
}

GetAvatarCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  source: PropTypes.any,
  handleReady: PropTypes.func,
  handleDraw: PropTypes.func,
};

GetAvatarCanvas.defaultProps = {
  width: 0,
  height: 0,
  source: null,
  handleReady: () => {},
  handleDraw: () => {},
};
