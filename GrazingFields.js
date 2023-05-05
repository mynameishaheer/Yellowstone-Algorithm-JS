class GrazingFields {
  constructor(x, y, r) {
    this.position = createVector(x, y);
    this.radius = r;
    this.color = 0;
  }

  calculateDistance(otherBoid) {
    return this.position.dist(otherBoid.position);
  }

  increaseColor() {
    this.color += 1;
  }

  update() {
    if (this.color > 150) {
      this.color = 150;
    }
    if (this.color < 0) {
      this.color = 0;
    }

    for (let d of deer) {
      if (this.calculateDistance(d) < 150) {
        this.color -= 0.5;
      }
    }
  }

  draw() {
    // fill(80, 90, 100, 50);
    // noStroke();
    fill(171, 200, 138, this.color);
    circle(this.position.x, this.position.y, this.radius);
    stroke(0);
  }
}
