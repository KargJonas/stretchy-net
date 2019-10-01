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