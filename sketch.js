const numBoids = 50;
var boids = [];

let cSlider,
  sSlider,
  aSlider,
  speedLimitSlider,
  visualRadiusSlider,
  minDistanceSlider;

function setup() {
  createCanvas(windowWidth, windowHeight - 1);
  cSlider = createSlider(0, 0.05, 0.005, 0.005);
  cSlider.position(10, 165);
  sSlider = createSlider(0, 0.1, 0.01, 0.01);
  sSlider.position(10, 205);
  aSlider = createSlider(0, 0.2, 0.09, 0.01);
  aSlider.position(10, 245);
  speedLimitSlider = createSlider(0, 20, 5, 0.5);
  speedLimitSlider.position(10, 45);
  visualRadiusSlider = createSlider(0, 300, 60, 1);
  visualRadiusSlider.position(10, 85);
  minDistanceSlider = createSlider(0, 150, 40, 1);
  minDistanceSlider.position(10, 125);

  var resetButton = createButton("Reset");
  resetButton.position(10, 285);
  resetButton.mousePressed(resetSketch);

  createBoids();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 1);
}

function resetSketch(){
  cSlider.value(0.005);
  sSlider.value(0.01);
  aSlider.value(0.09);
  speedLimitSlider.value(5);
  visualRadiusSlider.value(60);
  minDistanceSlider.value(40);
  boids = [];
  createBoids();
}

function createBoids() {
  for (let i = 0; i < numBoids; i++) {
    boids.push(
      new Boid(
        createVector(random() * windowWidth, random() * windowHeight - 1),
        createVector(random(-1, 1), random(-1, 1))
      )
    );
  }
}

function draw() {
  background(55);
  for (let boid of boids) {
    boid.update(
      cSlider.value(),
      sSlider.value(),
      aSlider.value(),
      speedLimitSlider.value(),
      visualRadiusSlider.value(),
      minDistanceSlider.value()
    );
    boid.draw();
  }
}
