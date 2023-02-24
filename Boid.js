class Boid {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.visualRange = 50;
  }

  update() {
    this.cohesion();
    this.seperation();
    this.alignment();
    this.limitSpeed();
    this.keepInBounds();
    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    let angle = atan2(this.dy, this.dx);
    push();
    translate(this.x, this.y);
    rotate(angle);
    fill(255);
    triangle(0, 0, -15, -5, -15, 5);
    pop();
  }

  keepInBounds() {
    const margin = 500;
    const turnFactor = 0.1; //how fast does it turn

    if (this.x < margin) {
      this.dx += turnFactor;
    }
    if (this.x > windowWidth - margin) {
      this.dx += -turnFactor;
    }
    if (this.y < margin) {
      this.dy += turnFactor;
    }
    if (this.y > windowHeight - margin) {
      this.dy += -turnFactor;
    }
  }

  limitSpeed() {
    const speedLimit = 5;
    const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy); //magnitude
    if (speed > speedLimit) {
      this.dx = (this.dx / speed) * speedLimit; //normalize
      this.dy = (this.dy / speed) * speedLimit; //normalize
    }
  }

  calculateDistance(otherBoid) {
    return Math.sqrt(
      (this.x - otherBoid.x) * (this.x - otherBoid.x) +
        (this.y - otherBoid.y) * (this.y - otherBoid.y)
    );
  }

  cohesion() {
    const cFactor = 0.005;
    let centerX = 0;
    let centerY = 0;
    let nBoids = 0;

    for (let otherBoid of boids) {
      if (this.calculateDistance(otherBoid) < this.visualRange) {
        centerX = centerX + otherBoid.x;
        centerY = centerY + otherBoid.y;
        nBoids++;
      }
    }
    //average
    if (nBoids > 0) {
      centerX = centerX / nBoids;
      centerY = centerY / nBoids;

      this.dx += (centerX - this.x) * cFactor;
      this.dy += (centerY - this.y) * cFactor;
    }
  }

  seperation() {
    const minDistance = 40;
    const sFactor = 0.01;

    let moveX = 0;
    let moveY = 0;

    for (let otherBoid of boids) {
      if (otherBoid != this) {
        if (this.calculateDistance(otherBoid) < minDistance) {
          moveX += this.x - otherBoid.x;
          moveY += this.y - otherBoid.y;
        }
      }
    }

    this.dx += moveX * sFactor;
    this.dy += moveY * sFactor;
  }

  alignment() {
    const aFactor = 0.05;

    let avgDX = 0;
    let avgDY = 0;
    let nBoids = 0;

    for (let otherBoid of boids) {
      if (this.calculateDistance(otherBoid) < this.visualRange) {
        avgDX += otherBoid.dx;
        avgDY += otherBoid.dy;
        nBoids++;
      }
    }

    if (nBoids > 0) {
      avgDX = avgDX / nBoids;
      avgDY = avgDY / nBoids;

      this.dx += (avgDX - this.dx) * aFactor;
      this.dy += (avgDY - this.dy) * aFactor;
    }
  }
}
