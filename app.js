const colorOptions = Array.from(document.getElementsByClassName('color'));
const eraseBtn = document.getElementById('erase');
const paintMode = document.getElementById('paintMode');
const resetBtn = document.getElementById('reset');
const colorInput = document.getElementById('color');
const lineWidth = document.getElementById('line-width');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

let isPainting = false;
let isFilling = false;
let isErasing = false;
let currentColor = '';
let prevColor = '';
let resetColor = 'white';

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineCap = 'round';
ctx.lineWidth = lineWidth.value;

function onMove(event) {
  // fill 모드일 때 drawing이 되는 걸 막기 위함
  if (!isFilling) {
    if (isPainting) {
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
    }
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
  const currentWidth = event.target.value;
  ctx.lineWidth = currentWidth;
}

function onChangeColor(event) {
  currentColor = event.target.value;
  ctx.strokeStyle = prevColor = currentColor;
  ctx.fillStyle = prevColor = currentColor;
}

function onClickReset() {
  // reset 버튼 클릭 이후 style이 white로 변동되는 걸 막기 위함
  ctx.save();
  ctx.fillStyle = resetColor;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.restore();
}

function onClickPaintMode() {
  if (isFilling) {
    console.log('fill');
    paintMode.innerText = 'Fill';
    isFilling = false;
  } else {
    console.log('draw');
    paintMode.innerText = 'Draw';
    isFilling = true;
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onClickErase() {
  ctx.strokeStyle = 'white';
  paintMode.innerText = 'Fill';
  isFilling = false;
}

function onClickColorChange(event) {
  currentColor = event.target.dataset.color;
  colorInput.value = currentColor;
  ctx.fillStyle = currentColor;
  ctx.strokeStyle = currentColor;
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
lineWidth.addEventListener('change', onChangeLineWidth);
colorInput.addEventListener('change', onChangeColor);

resetBtn.addEventListener('click', onClickReset);
// Toggle Filling or Painting
canvas.addEventListener('click', onCanvasClick);
paintMode.addEventListener('click', onClickPaintMode);
eraseBtn.addEventListener('click', onClickErase);

colorOptions.forEach((color) =>
  color.addEventListener('click', onClickColorChange)
);
