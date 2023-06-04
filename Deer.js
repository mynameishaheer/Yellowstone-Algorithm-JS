class Deer {
  constructor() {
    this.position = createVector(
      random() * windowWidth,
      random() * windowHeight - 1
    );
    this.velocity = createVector(random(-1, 1), random(-1, 1));

    //data used to control the behavior of the deer
    this.minSpeed = 1;
    this.maxSpeed = 2;
    this.turnFactor = 0.2;
    this.fleeFactor = 0.05;
    this.grazingFieldFactor = 0.00005;
    this.grazingFactor = 0.0005;
    this.avoidLakeFactor = 5;
    this.avoidMountainsFactor = 5;
    this.cohesionFactor = 0.005;
    this.alignmentFactor = 0.09;
    this.seperationFactor = 0.01;
  }

  update() {
    this.cohesion();
    this.seperation();
    this.alignment();

    this.graze();
    // this.enterGrazingField();
    this.flee();
    this.avoidMountains();
    this.avoidLake();
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
    triangle(0, 0, -10, -3, -10, 3);
    pop();
  }

  keepInBounds() {
    const margin = 50;

    if (this.position.x < margin) {
      this.velocity.x += this.turnFactor;
    }
    if (this.position.x > windowWidth - margin) {
      this.velocity.x -= this.turnFactor;
    }
    if (this.position.y < margin) {
      this.velocity.y += this.turnFactor;
    }
    if (this.position.y > windowHeight - margin) {
      this.velocity.y -= this.turnFactor;
    }
  }

  limitSpeed() {
    const speed = this.velocity.mag();

    if (speed > this.maxSpeed) {
      this.velocity.x = (this.velocity.x / speed) * this.maxSpeed; //normalize
      this.velocity.y = (this.velocity.y / speed) * this.maxSpeed; //normalize
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

      this.velocity.x += centerX * this.fleeFactor;
      this.velocity.y += centerY * this.fleeFactor;
    }
  }

  enterGrazingField() {
    var closestField;

    //? Boids travel towards the closest plant to them
    for (let fields of grazingFields) {
      if (closestField == null) {
        closestField = fields;
      } else if (
        this.calculateDistance(fields) < this.calculateDistance(closestField)
      ) {
        closestField = fields;
      }
    }

    let centerX = 0;
    let centerY = 0;
    let nBoids = 0;

    centerX = centerX + closestField.position.x;
    centerY = centerY + closestField.position.y;
    nBoids++;
    if (nBoids > 0) {
      centerX = centerX / nBoids;
      centerY = centerY / nBoids;

      this.velocity.x += (centerX - this.position.x) * this.grazingFieldFactor;
      this.velocity.y += (centerY - this.position.y) * this.grazingFieldFactor;
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

    this.velocity.x += (closestPlant.position.x - this.position.x) * this.grazingFactor;
    this.velocity.y += (closestPlant.position.y - this.position.y) * this.grazingFactor;

    for (var i = 0; i < plants.length; i++) {
        if (this.calculateDistance(plants[i]) < 10) {
          plants.splice(i, 1);
      }
    }
  }

  avoidLake() {
    let centerX = 0;
    let centerY = 0;
    let nBoids = 0;

    if (this.calculateDistance(lake) < 150) {
      centerX = centerX - (lake.position.x - this.position.x);
      centerY = centerY - (lake.position.y - this.position.y);
      nBoids++;
    }

    if (nBoids > 0) {
      centerX = centerX / nBoids;
      centerY = centerY / nBoids;

      this.velocity.x += centerX * this.avoidLakeFactor;
      this.velocity.y += centerY * this.avoidLakeFactor;
    }
  }

  avoidMountains() {
    let centerX = 0;
    let centerY = 0;
    let nBoids = 0;

    for (let mountain of mountains) {
      if (this.calculateDistance(mountain) < 50) {
        centerX = centerX - (mountain.position.x - this.position.x);
        centerY = centerY - (mountain.position.y - this.position.y);
        nBoids++;
      }

      if (nBoids > 0) {
        centerX = centerX / nBoids;
        centerY = centerY / nBoids;

        this.velocity.x += centerX * this.avoidMountainsFactor;
        this.velocity.y += centerY * this.avoidMountainsFactor;
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

      this.velocity.x += (centerX - this.position.x) * this.cohesionFactor;
      this.velocity.y += (centerY - this.position.y) * this.cohesionFactor;
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

    this.velocity.x += moveX * this.seperationFactor;
    this.velocity.y += moveY * this.seperationFactor;
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

      this.velocity.x += (avgDX - this.velocity.x) * this.alignmentFactor;
      this.velocity.y += (avgDY - this.velocity.y) * this.alignmentFactor;
    }
  }
}
