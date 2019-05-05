class Timer{
   constructor({
     seconds,
     position
   }){
    this.seconds = seconds;
    this.pos = position
   }
  countDownBy(seconds){
    this.seconds = this.seconds - seconds;
  }
  endCount(){
    this.seconds = `Time's up!!`;
  }
  isOnTime(){
    let onTime = true;
    if (typeof this.seconds !== 'number') {
      onTime = false;
    }
     return onTime;
  }
  display(){
    fill(150);
    text(this.seconds, this.pos.x, this.pos.y);
  }
}