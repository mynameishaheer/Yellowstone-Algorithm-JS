const numDeer = 50;
const numPlants = 100;
const numWolves = 0;
var deer = [];
var plants = [];
var wolves = [];
var tick = 0;
var release = false;

function setup() {
  createCanvas(windowWidth, windowHeight - 1);

  var resetButton = createButton("Reset");
  resetButton.position(10, 10);
  resetButton.mousePressed(resetSketch);

  var releaseWolves = createButton("Release Wolves");
  releaseWolves.position(10, 40);
  releaseWolves.mousePressed(() => (release = true));

  createDeer();
  createPlants();
  createWolves();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 1);
}

function resetSketch() {
  deer = [];
  plants = [];
  wolves = [];
  createDeer();
  createPlants();
  createWolves();
}

function createWolves() {
  for (let i = 0; i < numWolves; i++) {
    wolves.push(new Wolf());
  }
}

function createDeer() {
  for (let i = 0; i < numDeer; i++) {
    deer.push(new Deer());
  }
}

function createPlants() {
  for (let i = 0; i < numPlants; i++) {
    plants.push(new Plant());
  }
}

function draw() {

  tick = parseInt(tick + random(1, 10));
  background(55);
  textSize(16);
  text("Plants: " + plants.length, 10, 90);
  text("Deer: " + deer.length, 10, 110);
  text("Wolves: " + wolves.length, 10, 130);


  if (tick > 10000) {
    tick = 0;
  }

  if (tick % 1000 == 0 && release) {
    wolves.push(new Wolf());
  }

  if (tick % 16 == 0) {
    plants.push(new Plant());
  }

  if(tick % 2500 == 0){
    deer.push(new Deer());
  }

  for (let w of wolves) {
    w.update();
    w.draw(0);
  }

  for (let p of plants) {
    p.update();
    p.draw();
  }
  for (let d of deer) {
    d.update();
    d.draw(255);
  }
}
