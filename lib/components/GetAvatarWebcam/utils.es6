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
