class Particle {
  constructor(pos, mass) {
    this.pos = pos;
    this.mass = mass;
    this.frictionFactor = 6;
    this.sigmaForce = 0;

    this.vel = new Vec(0, 0);
    this.acc = new Vec(0, 0);
  }

  applyForce(force) {
    // F = a / m
    this.acc = this.acc.add(force.div(this.mass));
    this.sigmaForce += force.mag();
  }

  friction(frictionFactor) {
    this.frictionFactor = frictionFactor;
  }

  updatePos() {
    this.vel = this.vel.add(this.acc);
    this.vel = this.vel.div(this.frictionFactor);

    if (this.pos.y > 215 && this.pos.x > 105) {
      this.vel.y = 0;
    }

    this.pos = this.pos.add(this.vel);
    this.acc = new Vec(0, 0);
  }

  draw() {
    ctx.fillStyle = `rgb(${this.sigmaForce * 150}, ${255 - this.sigmaForce * 150}, 0)`;
    point(this.pos, 3);
    this.sigmaForce = 0;

  }

  gravity(amount) {
    this.applyForce(new Vec(0, amount));
  }
}