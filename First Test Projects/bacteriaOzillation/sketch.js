var bubbles = [];
var timeToReverse = false;


function setup() {
  createCanvas(1280,720);
  frameRate(60);
  for(var i = 0; i < 3000; i++){
    bubbles[i] = {
      x : 1280/2,
      y : 720/2,
      display: function() {
        //stroke(random(0,255),random(0,255),random(0,255),255);
        if(!timeToReverse){
          stroke(0);
        }else{
          stroke(255)
        }
        noFill();
        ellipse(this.x, this.y, 150,150);
      },
      move: function() {
        this.x = this.x + random(-3,3);
        this.y = this.y + random(-3,3);
      }
    }
  }
}

function draw() {
  background(255-(frameCount/15));
  
  if(255-(frameCount/15) <= 0 && !timeToReverse)
  {
    timeToReverse = true
  }
  
  for(var i = 0; i < bubbles.length; i++)
  {
   bubbles[i].move();
   
   bubbles[i].display();
  }
}