const numDeer = 130;
const numPlants = 100;
const numWolves = 0;

var lake;
var grazingFields = [];
var mountains = [];
var deer = [];
var plants = [];
var wolves = [];

var tick = 0;
var release = false;

let bg;
var ctx;
var canvas;

function setup() {
  bg = loadImage("assets/yellowstone_map.png");
  canvas = createCanvas(windowWidth, windowHeight - 1);
  ctx = canvas.drawingContext;

  var resetButton = createButton("Reset");
  resetButton.position(10, 10);
  resetButton.mousePressed(resetSketch);

  var releaseWolves = createButton("Release Wolves");
  releaseWolves.position(10, 40);
  releaseWolves.mousePressed(() => (release = true));

  createLake();
  createMountains();
  createFields();
  createDeer();
  createPlants();
  // createWolves();
}
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight - 1);
// }

function resetSketch() {
  deer = [];
  plants = [];
  wolves = [];
  mountains = [];
  grazingFields = [];
  createLake();
  createMountains();
  createFields();
  createDeer();
  createPlants();
  // createWolves();
}

function createMountains() {
  mountains.push(new Mountain(200, 30, 70));
  mountains.push(new Mountain(250, 60, 70));
  mountains.push(new Mountain(150, 190, 180));
  mountains.push(new Mountain(275, 841, 150));
  mountains.push(new Mountain(1707 / 2 + 165, 235, 200));
  mountains.push(new Mountain(1707 / 2, 110, 80));
  mountains.push(new Mountain(1707 / 2 + 50, 40, 100));
  mountains.push(new Mountain(1707 / 2 + 140, 20, 90));
  mountains.push(new Mountain(1707 - 100, 850, 350));
  mountains.push(new Mountain(1707 - 130, 320, 100));
  mountains.push(new Mountain(1707 - 160, 280, 100));
  mountains.push(new Mountain(1707 - 200, 240, 100));
  mountains.push(new Mountain(1707 - 250, 200, 100));
  mountains.push(new Mountain(1707 - 300, 160, 100));
  mountains.push(new Mountain(1707 - 350, 120, 100));
}

function createFields() {
  grazingFields.push(new GrazingFields(50, 400, 250));
  grazingFields.push(new GrazingFields(500, 10, 100));
  grazingFields.push(new GrazingFields(500, 110, 100));
  grazingFields.push(new GrazingFields(500, 210, 100));
  grazingFields.push(new GrazingFields(500, 310, 100));
  grazingFields.push(new GrazingFields(620, 10, 100));
  grazingFields.push(new GrazingFields(620, 110, 100));
  grazingFields.push(new GrazingFields(620, 210, 100));
  grazingFields.push(new GrazingFields(620, 310, 100));
  grazingFields.push(new GrazingFields(520, 760, 200));
  grazingFields.push(new GrazingFields(120, 685, 280));
  grazingFields.push(new GrazingFields(1000, 400, 100));
  grazingFields.push(new GrazingFields(1100, 400, 100));
  grazingFields.push(new GrazingFields(1100, 500, 100));
  grazingFields.push(new GrazingFields(1150, 550, 100));
  grazingFields.push(new GrazingFields(1340, 500, 100));
  grazingFields.push(new GrazingFields(1250, 300, 170));
  grazingFields.push(new GrazingFields(1400, 300, 90));
  grazingFields.push(new GrazingFields(1400, 400, 130));
  grazingFields.push(new GrazingFields(1230, 150, 150));
  grazingFields.push(new GrazingFields(1300, 700, 70));
  grazingFields.push(new GrazingFields(1230, 700, 70));
  grazingFields.push(new GrazingFields(1170, 690, 50));
  grazingFields.push(new GrazingFields(1350, 690, 50));
  // grazingFields.push(new GrazingFields(1350, 690, 50));
  // grazingFields.push(new GrazingFields(50, 400, 250));
}

function createLake() {
  lake = new Lake(1707 - 1707 / 3 + 50, 860, 280);
}
// function createWolves() {
//   for (let i = 0; i < numWolves; i++) {
//     wolves.push(new Wolf());
//   }
// }

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
  bg.resize(1707, 0);
  tick = parseInt(tick + random(1, 10));
  // background(bg);
  image(bg, 0, -120);
  textSize(16);
  // text("Plants: " + plants.length, 10, 90);
  text("Window Width: " + windowWidth, 10, 90);
  text("Window Height: " + windowHeight, 10, 110);
  text("Deer: " + deer.length, 10, 110);
  text("Wolves: " + wolves.length, 10, 130);

  if (tick > 10000) {
    tick = 0;
  }

  if (tick % 100 == 0 && release) {
    if (wolves.length < 33) {
      wolves.push(new Wolf());
    }
  }

  if (tick % 16 == 0) {
    for (g of grazingFields) {
      let position = createVector(
        g.position.x - g.radius + random() * g.radius,
        g.position.y - g.radius + random() * g.radius
      );
      // print(plants.length);
      if (plants.length < 700) plants.push(new Plant(position.x, position.y));
    }
  }

  if (tick % 1000 == 0) {
    deer.push(new Deer());
  }

  for (let m of mountains) {
    m.draw();
  }
  for (let w of wolves) {
    w.update();
    w.draw(0);
  }

  for (let p of plants) {
    p.update();
    p.draw();
    if (p.alive == false) {
      // plants.splice(plants.indexOf(p), 1);
    }
  }
  for (let gf of grazingFields) {
    // if (tick % 100 == 0) {
    gf.increaseColor();
    // }
    gf.update();
    gf.draw();
  }

  for (let d of deer) {
    d.update();
    //RGB for brown color
    d.draw(139, 69, 19);
    // d.draw(178, 34, 34);
  }

  lake.draw();
}
