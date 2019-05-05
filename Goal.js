let x = 100;
let y = 100;
let xspeed = 2.5;
let yspeed = 2;
const diameter = 50;
let initialPos = null;
const width = 400;
const height = 400;

let goal;

function setup() {
  createCanvas(width, height);
  smooth();
  goal = new Goal();
}

function draw() {
  background(255);


  // Add the current speed to the position.
  x = x + xspeed;
  y = y + yspeed;

  if ((x > width - diameter / 2) || (x < 0 + diameter / 2)) {
    xspeed = xspeed * -1;
  }
  if ((y > height - diameter / 2) || (y < 0 + diameter / 2)) {
    yspeed = yspeed * -1;
  }


  // Display circle at x position
  stroke(0);
  strokeWeight(2);
  fill(127);
  ellipse(x, y, diameter, diameter);
  // Draw goal
  goal.renderGoal();
  goal.wasHit(x, y);
}

function generateRandomPos(radius){
  return {
    X: random(radius / 2, width - radius / 2),
    Y: random(radius / 2, height - radius / 2)
  }
}

class Goal {
  constructor(){
  this.radius = 60,
  this.pos = generateRandomPos(this.radius),
  this.distance = null
  }
  wasHit(targetX, targetY){
    this.distance = dist(targetX, targetY, this.pos.X, this.pos.Y);
    if(this.distance < (this.radius)) {
      console.log('hit');
      this.pos = generateRandomPos(this.radius);
    }
  }
  renderGoal(){
    strokeWeight(0);
    fill(0, 0, 222);
    ellipse(this.pos.X, this.pos.Y, 60, 60);
  }

}