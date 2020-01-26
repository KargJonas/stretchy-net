const k = 10;
const space = 10;

const n = new Net(20, 20);
const maxForce = 10; // !! fixme

const edgeLeft = new Vec(105, 220);
const edgeRight = new Vec(1000, 220);

n.nodes[0][0].fix();
n.nodes[0][19].fix();

n.update();

function update() {
  requestAnimationFrame(update);
  ctx.clearRect(-halfWidth, -halfHeight, width, height);
  n.update();
  ctx.lineWidth = 5;
  line(edgeLeft, edgeRight)
}

update();