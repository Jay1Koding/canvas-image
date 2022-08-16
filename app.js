const colorInput = document.getElementById('color');
const lineWidth = document.getElementById('line-width');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

let isPainting = false;
let isFilling = false;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineCap = 'round';
ctx.lineWidth = lineWidth.value;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
}

function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onChangeLineWidth(event) {
  //   console.log(event.target.value);
  const currentWidth = event.target.value;
  ctx.lineWidth = currentWidth;
}

function onChangeColor(event) {
  console.log(event.target.value);
  const currentColor = event.target.value;
  ctx.strokeStyle = currentColor;
  ctx.fillStyle = currentColor;
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
// Toggle Filling or Painting
// canvas.addEventListener('click', onCanvasClick);
lineWidth.addEventListener('change', onChangeLineWidth);
colorInput.addEventListener('change', onChangeColor);
