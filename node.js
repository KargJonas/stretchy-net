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
      if (x < space) return;

      const f = distVec.mul(k).div(-1000);

      this.applyForce(f);
      this.updatePos();
    }
  }
}