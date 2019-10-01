const k = 10;
const space = 10;

const n = new Net(20, 20);

n.update();

function update() {
  requestAnimationFrame(update);
  ctx.clearRect(0, 0, width, height);
  n.update();
}

update();