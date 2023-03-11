const saveButton = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserButton = document.getElementById("eraser-button");
const destroyButton = document.getElementById("destroy-button");
const modeButton = document.getElementById("mode-button");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
context.lineWidth = lineWidth.value;
context.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMouseMove(event) {
  if (isPainting) {
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    return;
  }
  context.moveTo(event.offsetX, event.offsetY);
}

function startDrawing() {
  isPainting = true;
}

function cancelDrawing() {
  isPainting = false;
  context.beginPath();
}

function onCanvasClick() {
  if (isFilling) {
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onLineWidthChange(event) {
  context.lineWidth = event.target.value;
}

function onColorChange(event) {
  context.strokeStyle = event.target.value;
  context.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  context.strokeStyle = colorValue;
  context.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeButton.innerText = "🩸 Fill";
  } else {
    isFilling = true;
    modeButton.innerText = "✏️ Draw";
  }
}

function onDestoryClick() {
  const basicBackground = "#FFFFFF";
  context.fillStyle = basicBackground;
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  color.value = basicBackground;
}

function onEraserClick() {
  context.strokeStyle = "white";
  if (isFilling) {
    isFilling = false;
    modeButton.innerText = "🩸 Fill";
  }
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    context.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    context.save();
    context.lineWidth = 1;
    context.font = "48px serif";
    context.fillText(text, event.offsetX, event.offsetY);
    context.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", cancelDrawing);
canvas.addEventListener("mouseleave", cancelDrawing);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeButton.addEventListener("click", onModeClick);
destroyButton.addEventListener("click", onDestoryClick);
eraserButton.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveButton.addEventListener("click", onSaveClick);
