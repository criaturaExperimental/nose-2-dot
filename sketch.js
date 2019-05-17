let video;
let poseNet;
let poses = [];
let noseX = 0;
let noseY = 0;
let goal;
let scoreBoard;
let timer;
let modelIsLoaded;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  // Hide the video element, and just show the canvas
  video.hide();
  textAlign(CENTER);

  timer = new Timer({
    seconds: 60,
    position: {
      x: width / 2,
      y: height / 2
    }
  });
  setInterval(timeIt, 1000);

  goal = new Goal();
  // scoreBoard = new Score(100, 200);
  scoreBoard = new Score(width*2/15, (height * 1)/16);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', gotPoses);
}

function timeIt() {
  if (timer.seconds > 0) {
    timer.countDownBy(1);
  } else {
    timer.endCount();
  }
}

function gotPoses(poses) {
  if (poses.length > 0) {
    noseX = poses[0].pose.keypoints[0].position.x;
    noseY = poses[0].pose.keypoints[0].position.y;
  }
}

function modelReady() {
  select('#status').html('Model Loaded');
  modelIsLoaded = true;
}

function draw() {
  image(video, 0, 0, width, height);

  scoreBoard.display();

  if(modelIsLoaded){
    timer.display();
    if(timer.isOnTime()){
      drawNose();
      goal.renderGoal();
    }
  }

  let match = goal.wasHit(noseX, noseY);
  if(match){
    scoreBoard.addPoints(1);
  }
  // We can call both functions to draw all keypoints and the skeletons
  // drawKeypoints();
  // drawSkeleton();
}

function drawNose() {
  fill(222, 0 , 0);
  ellipse(noseX, noseY, 50, 50)
}