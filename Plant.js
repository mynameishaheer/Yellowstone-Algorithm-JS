class Plant {
  constructor() {
    this.position = createVector(
      random() * windowWidth,
      random() * windowHeight - 1
    );
    this.alive = true;
  }

  update() {}

  draw() {
    fill(0, 255, 0);
    circle(this.position.x, this.position.y, 5);
  }
}
