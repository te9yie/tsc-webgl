(function main() {
  const canvas = document.createElement("canvas");
  canvas.width = 16 * 20;
  canvas.height = 9 * 20;

  const gl = canvas.getContext("webgl");
  if (gl == null) return;

  document.body.appendChild(canvas);

  gl.clearColor(0.17, 0.17, 0.17, 1);
  (function frame() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.finish();
    requestAnimationFrame(frame);
  })();
})();
