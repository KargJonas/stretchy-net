const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");
let width, height;

ctx.fillStyle = "#000000";
ctx.strokeStyle = "#000000";
ctx.lineWidth = "1.5px";

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  cnv.width = width;
  cnv.height = height;
}

addEventListener("resize", resize);
resize();

function line(p1, p2) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function point(p, r) {
  // 2 * PI =~ 6.28
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.arc(p.x, p.y, r, 0, 6.29);
  ctx.fill();
}