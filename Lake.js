class Lake {
  constructor(x, y, r) {
    this.position = createVector(x, y);
    this.radius = r;
  }
  update() {}

  draw() {
    // noStroke();
    fill(0, 0, 255, 100);
    // Rectangle(this.position.x, this.position.y, 100, 100)
    circle(this.position.x, this.position.y, this.radius);
    stroke(0);
  }
}
