const k = 10;
const space = 10;

const n = new Net(20, 20);

n.update();

function update() {
  requestAnimationFrame(update);
  ctx.clearRect(-halfWidth, -halfHeight, width, height);
  n.update();
}

update();