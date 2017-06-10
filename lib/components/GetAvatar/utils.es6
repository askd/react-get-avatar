export default function getDataURL({ data, width, height }) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.putImageData(data, 0, 0);

  return canvas.toDataURL('image/jpeg', 0.5);
}
