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