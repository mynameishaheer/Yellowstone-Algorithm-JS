class Mountain {
  constructor(x, y, r) {
    this.position = createVector(x, y);
    this.radius = r;
  }
  update() {
  }

  draw() {
    noStroke();
    fill(123, 123, 123, 0);
    // Rectangle(this.position.x, this.position.y, 100, 100)
    circle(this.position.x, this.position.y, this.radius);
    stroke(0);
  }
}
