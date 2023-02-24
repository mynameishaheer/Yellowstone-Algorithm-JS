class Boid {
  constructor(position, velocity) {
    this.position = position;
    this.velocity = velocity;
    this.minSpeed = 3;
  }

  update(cFactor, sFactor, aFactor, speedLimit, visualRange, minDistance) {
    this.cohesion(cFactor, visualRange);
    this.seperation(sFactor, minDistance);
    this.alignment(aFactor, visualRange);

    this.limitSpeed(speedLimit);
    this.keepInBounds();

    this.position.add(this.velocity);
  }

  draw() {
    let angle = atan2(this.velocity.y, this.velocity.x);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    fill(255);
    triangle(0, 0, -15, -5, -15, 5);
    pop();
    this.drawStats();
  }

  drawStats() {
    textSize(16)
    fill(150);
    text("Number of Boids: " + numBoids, 10, 20);
    text("Maximum Speed: " + speedLimitSlider.value(), 10, 40);
    text("Visual Radius: " + visualRadiusSlider.value(), 10, 80);
    text("Avoidance Radius: " + minDistanceSlider.value(), 10, 120)
    text("Cohesion Factor: " + cSlider.value(), 10, 160)
    text("Seperation Factor: " + sSlider.value(), 10, 200)
    text("Alignment Factor: " + aSlider.value(), 10, 240)
  }


  keepInBounds() {
    const margin = 250;
    const turnFactor = 0.2; //how fast does it turn

    if (this.position.x < margin) {
      this.velocity.x += turnFactor;
    }
    if (this.position.x > windowWidth - margin) {
      this.velocity.x -= turnFactor;
    }
    if (this.position.y < margin) {
      this.velocity.y += turnFactor;
    }
    if (this.position.y > windowHeight - margin) {
      this.velocity.y -= turnFactor;
    }
  }

  limitSpeed(speedLimit) {
    const speed = this.velocity.mag();

    if (speed > speedLimit) {
      this.velocity.x = (this.velocity.x / speed) * speedLimit; //normalize
      this.velocity.y = (this.velocity.y / speed) * speedLimit; //normalize
    }
    if (speed < this.minSpeed) {
      this.velocity.x = (this.velocity.x / speed) * this.minSpeed; //normalize
      this.velocity.y = (this.velocity.y / speed) * this.minSpeed; //normalize
    }
  }

  calculateDistance(otherBoid) {
    return this.position.dist(otherBoid.position)
  }

  cohesion(cFactor, visualRange) {
    let centerX = 0;
    let centerY = 0;
    let nBoids = 0;

    for (let otherBoid of boids) {
      if (this.calculateDistance(otherBoid) < visualRange) {
        centerX = centerX + otherBoid.position.x;
        centerY = centerY + otherBoid.position.y;
        nBoids++;
      }
    }
    //average
    if (nBoids > 0) {
      centerX = centerX / nBoids;
      centerY = centerY / nBoids;

      this.velocity.x += (centerX - this.position.x) * cFactor;
      this.velocity.y += (centerY - this.position.y) * cFactor;
    }
  }

  seperation(sFactor, minDistance) {

    let moveX = 0;
    let moveY = 0;

    for (let otherBoid of boids) {
      if (otherBoid != this) {
        if (this.calculateDistance(otherBoid) < minDistance) {
          moveX += this.position.x - otherBoid.position.x;
          moveY += this.position.y - otherBoid.position.y;
        }
      }
    }

    this.velocity.x += moveX * sFactor;
    this.velocity.y += moveY * sFactor;
  }

  alignment(aFactor, visualRange) {

    let avgDX = 0;
    let avgDY = 0;
    let nBoids = 0;

    for (let otherBoid of boids) {
      if (this.calculateDistance(otherBoid) < visualRange) {
        avgDX += otherBoid.velocity.x;
        avgDY += otherBoid.velocity.y;
        nBoids++;
      }
    }

    if (nBoids > 0) {
      avgDX = avgDX / nBoids;
      avgDY = avgDY / nBoids;

      this.velocity.x += (avgDX - this.velocity.x) * aFactor;
      this.velocity.y += (avgDY - this.velocity.y) * aFactor;
    }
  }
}
