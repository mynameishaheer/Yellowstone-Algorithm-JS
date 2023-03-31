class Wolf {
  constructor() {
    this.position = createVector(
      random() * windowWidth,
      (random() * windowHeight) / 2 - 1
    );
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.minSpeed = 3;
  }

  update() {
    this.cohesion();
    this.seperation();
    this.alignment();

    //   this.graze();
    this.chase();
    this.kill();

    this.limitSpeed();
    this.keepInBounds();

    this.position.add(this.velocity);
  }

  draw(color) {
    let angle = atan2(this.velocity.y, this.velocity.x);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    fill(color);
    triangle(0, 0, -15, -5, -15, 5);
    pop();
  }

  keepInBounds() {
    const margin = 250;
    const turnFactor = 0.2; //how fast does it turn

    if (this.position.x < windowWidth - windowWidth / 3) {
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

  limitSpeed() {
    const speed = this.velocity.mag();

    if (speed > 8) {
      this.velocity.x = (this.velocity.x / speed) * 8; //normalize
      this.velocity.y = (this.velocity.y / speed) * 8; //normalize
    }
    if (speed < this.minSpeed) {
      this.velocity.x = (this.velocity.x / speed) * this.minSpeed; //normalize
      this.velocity.y = (this.velocity.y / speed) * this.minSpeed; //normalize
    }
  }

  calculateDistance(otherBoid) {
    return this.position.dist(otherBoid.position);
  }

  chase() {
    for (let d of deer) {
      if (this.calculateDistance(d) < 100) {
        this.velocity.x += (d.position.x - this.position.x) * 0.001;
        this.velocity.y += (d.position.y - this.position.y) * 0.001;
        // this.kill()
      }
    }
  }

  kill() {
    for (var i = 0; i < deer.length; i++) {
      if (this.calculateDistance(deer[i]) < 10) {
        //   deer[i].alive = false;
        deer.splice(i, 1);
      }
    }
  }

  cohesion() {
    let centerX = 0;
    let centerY = 0;
    let nBoids = 0;

    for (let otherBoid of wolves) {
      if (this.calculateDistance(otherBoid) < 60) {
        centerX = centerX + otherBoid.position.x;
        centerY = centerY + otherBoid.position.y;
        nBoids++;
      }
    }
    //average
    if (nBoids > 0) {
      centerX = centerX / nBoids;
      centerY = centerY / nBoids;

      this.velocity.x += (centerX - this.position.x) * 0.0005;
      this.velocity.y += (centerY - this.position.y) * 0.0005;
    }
  }

  seperation() {
    let moveX = 0;
    let moveY = 0;

    for (let otherBoid of wolves) {
      if (otherBoid != this) {
        if (this.calculateDistance(otherBoid) < 40) {
          moveX += this.position.x - otherBoid.position.x;
          moveY += this.position.y - otherBoid.position.y;
        }
      }
    }

    this.velocity.x += moveX * 0.01;
    this.velocity.y += moveY * 0.01;
  }

  alignment() {
    let avgDX = 0;
    let avgDY = 0;
    let nBoids = 0;

    for (let otherBoid of wolves) {
      if (this.calculateDistance(otherBoid) < 60) {
        avgDX += otherBoid.velocity.x;
        avgDY += otherBoid.velocity.y;
        nBoids++;
      }
    }

    if (nBoids > 0) {
      avgDX = avgDX / nBoids;
      avgDY = avgDY / nBoids;

      this.velocity.x += (avgDX - this.velocity.x) * 0.09;
      this.velocity.y += (avgDY - this.velocity.y) * 0.09;
    }
  }
}
