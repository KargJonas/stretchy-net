class Particle {
  constructor(pos) {
    this.pos = pos;
    this.sigmaForce = 0;

    this.vel = new Vec(0, 0);
    this.acc = new Vec(0, 0);
  }

  applyForce(force) {
    // F = a / m
    this.acc = this.acc.add(force.div(mass));
    this.sigmaForce += force.mag();
  }

  updatePos() {
    this.vel = this.vel.add(this.acc);
    this.vel = this.vel.div(friction);

    if ((this.pos.y > 115 && this.pos.x > 105) || this.pos.y > 445) {
      this.vel.y = 0;
    }

    this.pos = this.pos.add(this.vel);
    this.acc = new Vec(0, 0);
  }

  draw() {
    ctx.fillStyle = `rgb(${this.sigmaForce * 50}, ${255 - this.sigmaForce * 50}, 0)`;
    point(this.pos, 3);
    this.sigmaForce = 0;

  }

  gravity(amount) {
    this.applyForce(new Vec(0, amount));
  }
}