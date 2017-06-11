export default {
  wrapper: {
    position: 'relative',
  },

  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    overflow: 'hidden',
  },

  canvasActive: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },

  button: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '50%',
    height: '50px',
    backgroundColor: 'steelblue',
    fontSize: '16px',
    lineHeight: '50px',
    color: 'white',
    textAlign: 'center',
    cursor: 'pointer',
  },

  buttonOnly: {
    width: '100%',
  },

  buttonFirst: {
    width: 'calc(50% - 1px)',
    marginRight: '1px',
  },

  buttonUpload: {
    position: 'relative',
    overflow: 'hidden',
  },

  inputUpload: {
    position: 'absolute',
    width: '0.1px',
    height: '0.1px',
    opacity: '0',
    overflow: 'hidden',
    zIndex: '-1',
  },

  capture: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: '0.5',
    backgroundImage: " url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200px' height='200px'%3E%3Cpolygon points='5,5 195,5 195,195 5,195' fill='none' stroke-width='10' stroke='%23FFF' stroke-linejoin='round' stroke-dasharray='100 90' stroke-dashoffset='50' /%3E%3C/svg%3E\")",
    backgroundPosition: '50% 50%',
    backgroundSize: '200px 200px',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
  },


};
