export function getUserMedia() {
  return navigator.getUserMedia ||
         navigator.webkitGetUserMedia ||
         navigator.mozGetUserMedia;
}

export function getMediaSources() {
  return new Promise((resolve, reject) => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.error('No mediaDevices');
      reject();
      return;
    }

    const sources = [];

    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        devices.forEach((device, i) => {
          if (device.kind === 'videoinput') {
            sources.push({
              deviceId: device.deviceId,
              label: device.label || `camera${i + 1}`,
            });
          }
        });

        resolve(sources);
      })
      .catch((err) => {
        console.error(`enumerateDevices error (${err.name}: ${err.message})`);
        reject();
      });
  });
}

export function createScreenshot(elem) {
  const canvas = document.createElement('canvas');
  const width = elem.offsetWidth;
  const height = elem.offsetHeight;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(elem, 0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.5);
}
