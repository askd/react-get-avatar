export default {
  root: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: 'black',
  },

  video: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: '100%',
  },

  flip: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '70px',
    height: '70px',
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 32.2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8c0-4.5-3.6-8-8-8z'/%3E%3Cpath d='M65.8 23.5h-4.4l-3.5-5.7H42.1l-3.5 5.6h-4.4c-3.8 0-6.9 3.1-6.9 6.9v19.1c0 3.8 3.1 6.9 6.9 6.9h31.7c3.8 0 6.9-3.1 6.9-6.9v-19c-.1-3.9-3.1-6.9-7-6.9zM50 51.6c-6.3 0-11.5-5.2-11.5-11.5S43.7 28.6 50 28.6s11.5 5.2 11.5 11.5c0 6.4-5.2 11.5-11.5 11.5z'/%3E%3Cpath d='M27.3 63.1C16.8 60.3 9.9 55.7 9.9 50.5c0-4.7 5.6-8.9 14.3-11.7v-1.3C10.3 41.3 1 48.2 1 56c0 8.4 10.6 15.7 26.2 19.4v6.8l12-12-12-12v4.9zM84 40.3v-7.1l-7 7 7 7v-4.8c3.9 2.4 6.2 5.1 6.2 8.1 0 6.7-11.1 12.3-26.6 14.4v12.2C84 74.4 99 66 99 56c0-6.2-5.8-11.7-15-15.7z'/%3E%3C/svg%3E\")",
    backgroundPosition: '50% 50%',
    backgroundSize: '50px 50px',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
  },
};
