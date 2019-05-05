class Score {
  constructor(posX, posY){
    this.score = 0,
    this.size = 32,
    this.color = 200,
    this.text = 'Score',
    this.pos = {
      x: posX,
      y: posY
    }
  }
  addPoints(points){
    this.score = this.score + points;
  }
  resetScorePoints(){
    this.score = 0;
  }
  display() {
    fill(this.color);
    textSize(this.size);
    text(`${this.text}: ${this.score}`, this.pos.x, this.pos.y);
  }
}