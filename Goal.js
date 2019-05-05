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
      return true;
    }
  }
  renderGoal(){
    strokeWeight(0);
    fill(0, 0, 222);
    ellipse(this.pos.x, this.pos.y, 60, 60);
  }

}