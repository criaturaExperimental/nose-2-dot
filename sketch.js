let video;
let poseNet;
let poses = [];
let noseX = 0;
let noseY = 0;
const RADIOUS = 70;
let goal = null;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  // Hide the video element, and just show the canvas
  video.hide();

  goal = new Goal();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    noseX = poses[0].pose.keypoints[0].position.x;
    noseY = poses[0].pose.keypoints[0].position.y;
  }
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  drawNose();
  goal.renderGoal();
  goal.wasHit(noseX, noseY);
  // We can call both functions to draw all keypoints and the skeletons
  // drawKeypoints();
  // drawSkeleton();
}

function drawNose() {
  fill(222, 0 , 0);
  ellipse(noseX, noseY, 50, 50)
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

// Class for goal
class Goal {
  constructor(){
  this.diameter = 60,
  this.radius = this.diameter / 2,
  this.pos = this._generateRandomPos(),
  this.distance = null
  }
  _generateRandomPos() {
    return {
      x: random(this.radius, width - this.radius),
      y: random(this.radius, height - this.radius)
    }
  }
  wasHit(targetX, targetY){
    this.distance = dist(targetX, targetY, this.pos.x, this.pos.y);
    if(this.distance < (this.diameter)) {
      console.log('hit');
      this.pos = this._generateRandomPos();
    }
  }
  renderGoal(){
    strokeWeight(0);
    fill(0, 0, 222);
    ellipse(this.pos.x, this.pos.y, 60, 60);
  }

}