const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

context.lineWidth = 2;

const colors = [
  "#fc5c65",
  "#fd9644",
  "#fed330",
  "#26de81",
  "#2bcbba",
  "#45aaf2",
  "#4b7bec",
];

function onClick(event) {
  context.beginPath();
  context.moveTo(0, 0);
  const color = colors[Math.floor(Math.random() * colors.length)];
  context.strokeStyle = color;
  context.lineTo(event.offsetX, event.offsetY);
  context.stroke();
}

canvas.addEventListener("click", onClick);
