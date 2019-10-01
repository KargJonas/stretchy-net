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

  cap(maxMag) {
    const mag = this.mag();
    if (mag > maxMag) {
      return new Vec(this.x / mag, this.y / mag);
    }

    return this;
  }
}