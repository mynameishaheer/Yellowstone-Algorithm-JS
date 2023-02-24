const numBoids = 50;

var boids = [];

function setup() {
  createCanvas(windowWidth, windowHeight - 1);
  createBoids();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 1);
}

function createBoids() {
  for (let i = 0; i < numBoids; i++) {
    boids.push(
      new Boid(
        random() * windowWidth,
        random() * windowHeight - 1,
        random(-1, 1),
        random(-1, 1)
      )
    );
  }
}

function draw() {
  background(55);
  for (let boid of boids) {
    boid.update();
    boid.draw();
  }
}
