(function main() {
  const canvas = document.createElement("canvas");
  canvas.width = 16 * 20;
  canvas.height = 9 * 20;

  const gl = canvas.getContext("webgl");
  if (gl == null) return;

  document.body.appendChild(canvas);

  const vertShader = gl.createShader(gl.VERTEX_SHADER);
  if (vertShader == null) return;
  gl.shaderSource(
    vertShader,
    `precision lowp float;
    attribute vec2 a_position;
    attribute vec4 a_color;

    varying vec4 v_color;

    void main() {
      gl_Position = vec4(a_position, 0, 1);
      v_color = a_color;
    }
    `
  );
  gl.compileShader(vertShader);
  if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(vertShader));
  }

  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (fragShader == null) return;
  gl.shaderSource(
    fragShader,
    `precision lowp float;
    varying vec4 v_color;

    void main() {
      gl_FragColor = v_color;
    }
    `
  );
  gl.compileShader(fragShader);
  if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(fragShader));
  }

  const shader = gl.createProgram();
  if (shader == null) return;
  gl.attachShader(shader, vertShader);
  gl.attachShader(shader, fragShader);
  gl.linkProgram(shader);
  gl.useProgram(shader);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());

  {
    const loc = gl.getAttribLocation(shader, "a_position");
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 6 * 4, 0);
    gl.enableVertexAttribArray(loc);
  }
  {
    const loc = gl.getAttribLocation(shader, "a_color");
    gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 6 * 4, 2 * 4);
    gl.enableVertexAttribArray(loc);
  }

  const vertices = new Float32Array(6 * 4);
  const indices = new Uint16Array(6);

  let i = 0;
  vertices[i++] = -0.5;
  vertices[i++] = 0.5;
  vertices[i++] = 1;
  vertices[i++] = 0;
  vertices[i++] = 0;
  vertices[i++] = 1;
  vertices[i++] = 0.4;
  vertices[i++] = 0.6;
  vertices[i++] = 0;
  vertices[i++] = 1;
  vertices[i++] = 0;
  vertices[i++] = 1;
  vertices[i++] = -0.4;
  vertices[i++] = -0.5;
  vertices[i++] = 0;
  vertices[i++] = 0;
  vertices[i++] = 1;
  vertices[i++] = 1;
  vertices[i++] = 0.5;
  vertices[i++] = -0.6;
  vertices[i++] = 1;
  vertices[i++] = 1;
  vertices[i++] = 1;
  vertices[i++] = 1;

  i = 0;
  indices[i++] = 0;
  indices[i++] = 2;
  indices[i++] = 1;
  indices[i++] = 1;
  indices[i++] = 2;
  indices[i++] = 3;

  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  gl.clearColor(0.17, 0.17, 0.17, 1);
  (function frame() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    gl.finish();
    requestAnimationFrame(frame);
  })();
})();
