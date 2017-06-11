export function clearCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawImage(canvas, source, crop = true) {
  const width = source.width || source.offsetWidth;
  const height = source.height || source.offsetHeight;

  if (!crop) {
    canvas.width = width;
    canvas.height = height;
  }

  let x = 0;
  let y = 0;

  if (crop) {
    x = Math.round((canvas.width - width) / 2);
    y = Math.round((canvas.height - height) / 2);
    clearCanvas(canvas);
  }

  const ctx = canvas.getContext('2d');
  ctx.drawImage(source, x, y, width, height);
}

export function redrawCanvas(canvas, source) {
  const ctx = canvas.getContext('2d');
  const p1 = ctx.getTransformedPoint(0, 0);
  const p2 = ctx.getTransformedPoint(canvas.width, canvas.height);
  ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  clearCanvas(canvas);
  ctx.restore();

  ctx.drawImage(source, 0, 0);
}

export function zoomCanvas(canvas, point, clicks) {
  const ctx = canvas.getContext('2d');
  const pointNew = ctx.getTransformedPoint(point.x, point.y);
  ctx.translate(pointNew.x, pointNew.y);

  const factor = Math.pow(1.1, clicks);
  ctx.scale(factor, factor);
  ctx.translate(-pointNew.x, -pointNew.y);
}

export function transformCanvas(canvas, from, to) {
  const ctx = canvas.getContext('2d');
  const fromNew = ctx.getTransformedPoint(from.x, from.y);
  const toNew = ctx.getTransformedPoint(to.x, to.y);
  ctx.translate(toNew.x - fromNew.x, toNew.y - fromNew.y);
}

export function resetCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(1, 1);
}

export function trackTransforms(ctx) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  let xform = svg.createSVGMatrix();
  ctx.getTransform = () => xform;

  const savedTransforms = [];
  const save = ctx.save;
  ctx.save = () => {
    savedTransforms.push(xform.translate(0, 0));
    return save.call(ctx);
  };

  const restore = ctx.restore;
  ctx.restore = () => {
    xform = savedTransforms.pop();
    return restore.call(ctx);
  };

  const scale = ctx.scale;
  ctx.scale = (sx, sy) => {
    xform = xform.scaleNonUniform(sx, sy);
    return scale.call(ctx, sx, sy);
  };

  const rotate = ctx.rotate;
  ctx.rotate = (radians) => {
    xform = xform.rotate(radians * (180 / Math.PI));
    return rotate.call(ctx, radians);
  };

  const translate = ctx.translate;
  ctx.translate = (dx, dy) => {
    xform = xform.translate(dx, dy);
    return translate.call(ctx, dx, dy);
  };

  const transform = ctx.transform;
  ctx.transform = (a, b, c, d, e, f) => {
    const m2 = svg.createSVGMatrix();
    m2.a = a;
    m2.b = b;
    m2.c = c;
    m2.d = d;
    m2.e = e;
    m2.f = f;
    xform = xform.multiply(m2);
    return transform.call(ctx, a, b, c, d, e, f);
  };

  const setTransform = ctx.setTransform;
  ctx.setTransform = (a, b, c, d, e, f) => {
    xform.a = a;
    xform.b = b;
    xform.c = c;
    xform.d = d;
    xform.e = e;
    xform.f = f;
    return setTransform.call(ctx, a, b, c, d, e, f);
  };

  const pt = svg.createSVGPoint();
  ctx.getTransformedPoint = (x, y) => {
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(xform.inverse());
  };
}
