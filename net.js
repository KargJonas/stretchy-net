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