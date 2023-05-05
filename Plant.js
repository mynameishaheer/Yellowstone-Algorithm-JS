class Plant {
  constructor(x, y) {
    this.position = createVector(
      x,
      y
      // random() * windowWidth,
      // random() * windowHeight - 1
    );
    // this.position = pos;
    this.alive = true;
  }

  calculateDistance(otherBoid) {
    return this.position.dist(otherBoid.position);
  }

  update() {}

  draw() {
    fill(0, 255, 100);
    circle(this.position.x, this.position.y, 5);
  }
}
