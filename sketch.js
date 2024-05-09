let sounds;
let keys;
let cols;
let gameState;
let r;
let bg = 0;
let audio; //Belongs to p3
let img; //Belongs to p3
let sus; //Belongs to p3
var fade; //Belongs to p3
var fadeAmount = 1 //Belongs to p3

function preload() {
  img = loadImage('creepy.png'); //Belongs to p3
  audio = loadSound('kamek.wav'); //Belongs to p3
  // temp variables;
  let b = [];
  let s = [];
  let f = [];
  

  for (let i = 1; i < 5; i++) {
    b.push(loadSound("steel" + i + ".wav"));
    s.push(loadSound("sharp" + i + ".wav"));
    f.push(loadSound("flat" + i + ".wav"));
  }

  sounds = [b, s, f];
}

function setup() {
  var canvas = createCanvas(800, 800);
  canvas.parent("drum");
  background(250);

  keys = [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW];
  cols = ["yellow", "lime", "red", "blue"];

  gameState = -1;
  r = 100;
  img.loadPixels();//Belongs to Helena
  c = img.get(img.width / 2, img.height / 2);//Belongs to p3
  
  textSize(30);
  text('Click to Start', 330, 400);
}

function draw() {
  if (gameState == -1) {
    start();
  } else if (gameState == 0) {
    base();
  } else if (gameState == 1) {
    sharp();
  } else if (gameState == 2) {
    flat();
  }

  console.log(gameState);
}

// p3
function base() {
  background(bg);
  noFill();
  stroke(random(255), random(255), random(255));
  strokeWeight(10);
  ellipse(height / 2, width / 2, r);
  
  if (keyIsPressed){
    r = random(50);
  }
}

// p2
function sharp() {
  background(bg);
  noStroke();
  fill(random(255), random(255), random(255));
  strokeWeight(10);
  rectMode(CENTER);
  rect(height / 2, width / 2, r);
}

// p3
function flat() {
  
  if (keyIsDown(32)){
    audio.play();
  }
  
  background(img);
  noStroke();
  fill(random(255), random(255), random(255));
  strokeWeight(10);
  rectMode(CENTER);
  rect(height / 2, width / 2, r);
  tint(0, 0, 0, fade)
  
  if (fade<255) fadeAmount=5; 
 
  if (fade>0) fadeAmount=-1; 
 
  fade += fadeAmount; 
  print(fade)
  
}

function mousePressed() {
  gameState++;

  if (gameState >= 3) {
    gameState = 0;
  }
}

// Don't Touch
function keyPressed() {
  if (keyIsDown(32)) {
    gameState--;
  }

  if (gameState <= -1) {
    gameState = 2;
  }

  for (let i = 0; i < 4; i++) {
    if (keyIsDown(keys[i])) {
      sounds[gameState][i].play();
      //background(cols[i]);
      bg = cols[i];
      console.log(keys[i], cols[i]);
    }
  }
}

