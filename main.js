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

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    return new Vec(
      this.x + other.x,
      this.y + other.y
    );
  }

  sub(other) {
    return this.add(other.mul(-1));
  }

  mul(factor) {
    return new Vec(
      this.x * factor,
      this.y * factor
    );
  }

  div(factor) {
    return this.mul(1 / factor);
  }

  mag() {
    // a² + b² = c²
    return Math.sqrt(
      Math.pow(this.x, 2) +
      Math.pow(this.y, 2)
    );
  }
}

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

class Particle {
  constructor(pos, mass) {
    this.pos = pos;
    this.mass = mass;

    this.vel = new Vec(0, 0);
    this.acc = new Vec(0, 0);
  }

  applyForce(force) {
    // F = a / m
    this.acc = this.acc.add(force.div(this.mass));
  }

  updatePos() {
    this.vel = this.vel.add(this.acc);
    this.pos = this.pos.add(this.vel);
    this.acc = new Vec(0, 0);
  }

  draw() {
    point(this.pos, 3);
  }
}

class Node extends Particle {
  constructor(pos) {
    super(pos, 10);
    this.neighbors = [];
  }

  addNeighbor(neighbor) {
    this.neighbors.push(neighbor);
  }

  update() {
    // For each neighbor:
    // - calc distance vector using positions
    // - calc distance using distance vector
    // - calc spring force (directional) using dist and k

    for (let neighbor of this.neighbors) {
      const distVec = this.pos.sub(neighbor.pos);
      const x = distVec.mag();
      // const factor = x / space;
      const factor = x - space;

      // console.log(factor)

      if (factor < 0) return;

      // k = spring-constant
      // F = k * Dx
      // const f = distVec.mul(k).div(factor);
      const f = distVec.mul(k).div(-10000);

      this.applyForce(f);
      this.updatePos();
    }
  }
}

class Net {
  constructor(width, height) {
    this.nodes = [];

    for (let y = 0; y < height; y++) {
      this.nodes.push([]);

      for (let x = 0; x < width; x++) {
        this.nodes[y].push(new Node(new Vec(x, y).mul(space)));
      }
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const neighborsPos = [
          [-1, 0], [0, -1], [1, 0], [0, 1]
        ];

        for (let pos of neighborsPos) {
          const neighbor = (this.nodes[pos[1]] || [])[pos[0]];
          if (!neighbor) continue;
          this.nodes[y][x].addNeighbor(neighbor);
        }
      }
    }
  }

  update() {
    for (let row of this.nodes) {
      for (let node of row) {
        node.update();
      }
    }

    for (let row of this.nodes) {
      for (let node of row) {
        node.updatePos();
        node.draw();
      }
    }
  }
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