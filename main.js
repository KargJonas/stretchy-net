const k = 10;
const space = 10;

const n = new Net(20, 10);
const maxForce = 10; // !! fixme
const gravity = 0.6;
const friction = 10;
const mass = 0.1;

const edgeLeft1 = new Vec(105, 120);
const edgeRight1 = new Vec(1000, 120);
const edgeLeft2 = new Vec(-1000, 450);
const edgeRight2 = new Vec(1000, 450);

n.nodes[0][0].fix();
n.nodes[0][19].fix();

n.update();

function update() {
  requestAnimationFrame(update);
  ctx.clearRect(-100, -100, 2000, 2000);
  n.update();
  ctx.lineWidth = 5;
  line(edgeLeft1, edgeRight1);
  line(edgeLeft2, edgeRight2);
}

update();