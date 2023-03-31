class Deer {
  constructor() {
    this.position = createVector(
      random() * windowWidth,
      random() * windowHeight - 1
    );
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.minSpeed = 3;
  }

  update() {
    this.cohesion();
    this.seperation();
    this.alignment();

    this.graze();
    this.flee();

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

  limitSpeed() {
    const speed = this.velocity.mag();

    if (speed > 5) {
      this.velocity.x = (this.velocity.x / speed) * 5; //normalize
      this.velocity.y = (this.velocity.y / speed) * 5; //normalize
    }
    if (speed < this.minSpeed) {
      this.velocity.x = (this.velocity.x / speed) * this.minSpeed; //normalize
      this.velocity.y = (this.velocity.y / speed) * this.minSpeed; //normalize
    }
  }

  calculateDistance(otherBoid) {
    return this.position.dist(otherBoid.position);
  }

  flee() {
    let centerX = 0;
    let centerY = 0;
    let nBoids = 0;

    for (let wolf of wolves) {
      if (this.calculateDistance(wolf) < 150) {
        centerX = centerX - (wolf.position.x - this.position.x);
        centerY = centerY - (wolf.position.y - this.position.y);
        nBoids++;
      }
    }

    if (nBoids > 0) {
      centerX = centerX / nBoids;
      centerY = centerY / nBoids;

      this.velocity.x += centerX * 0.05;
      this.velocity.y += centerY * 0.05;
    }
  }

  graze() {
    var closestPlant;


    //? Boids travel towards the closest plant to them
    for (let plant of plants) {
      if (closestPlant == null) {
        closestPlant = plant;
      } else if (
        this.calculateDistance(plant) < this.calculateDistance(closestPlant)
      ) {
        closestPlant = plant;
      }
    }

    let centerX = 0;
    let centerY = 0;
    let nBoids = 0;

    centerX = centerX + closestPlant.position.x;
    centerY = centerY + closestPlant.position.y;
    nBoids++;
    if (nBoids > 0) {
      centerX = centerX / nBoids;
      centerY = centerY / nBoids;

      this.velocity.x += (centerX - this.position.x) * 0.0005;
      this.velocity.y += (centerY - this.position.y) * 0.0005;
    }


    //? Boids travel towards the center of all the plant mass
    // let plantCenterX = 0;
    // let plantCenterY = 0;
    // for (let plant of plants) {
    //   plantCenterX += plant.position.x;
    //   plantCenterY += plant.position.y;
    // }

    // plantCenterX = plantCenterX / plants.length;
    // plantCenterY = plantCenterY / plants.length;

    // this.velocity.x += (plantCenterX - this.position.x) * 0.0001;
    // this.velocity.y += (plantCenterY - this.position.y) * 0.0001;

    for (var i = 0; i < plants.length; i++) {
      if (plants[i].alive) {
        if (this.calculateDistance(plants[i]) < 10) {
          plants[i].alive = false;
          plants.splice(i, 1);
        }
      }
    }
  }

  cohesion() {
    let centerX = 0;
    let centerY = 0;
    let nBoids = 0;

    for (let otherBoid of deer) {
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

      this.velocity.x += (centerX - this.position.x) * 0.005;
      this.velocity.y += (centerY - this.position.y) * 0.005;
    }
  }

  seperation() {
    let moveX = 0;
    let moveY = 0;

    for (let otherBoid of deer) {
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

    for (let otherBoid of deer) {
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
