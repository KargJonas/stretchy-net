const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");
let width, height;

const k = 10;
const space = 10;

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

const n = new Net(20, 20);
// n.nodes[9][9].pos.x += 10;
// n.nodes[19][19].pos.x += 10;

n.update();

function update() {
  requestAnimationFrame(update);
  ctx.clearRect(0, 0, width, height);
  n.update();
}

update();