const k = 10;
const space = 10;

const n = new Net(20, 20);
const maxForce = 10; // !! fixme

n.nodes[0][0].fix();
n.nodes[0][19].fix();

n.update();

function update() {
  requestAnimationFrame(update);
  ctx.clearRect(-halfWidth, -halfHeight, width, height);
  n.update();
}

update();