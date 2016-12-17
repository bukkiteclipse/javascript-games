var bubbles = [];

function setup() {
  createCanvas(1280,720);
  frameRate(60);
}

function draw() {
  background(0);

  if(bubbles.length >= 100)
  {
    bubbles.splice(0,1);
  }
  for(var i = 0; i < bubbles.length; i++)
  {
    bubbles[i].move();
    bubbles[i].display();
   /* if(bubbles[i].stopped)
    {
      bubbles.splice(i,1);
    } */
  }
  noStroke();
  fill(0,255,0);
  rect(0,height-25,width,25);
  cursor(HAND);
}

function mousePressed() {
  for(var i = 0; i < 1; i++)
  {
    var x = width/2;
    var y = height/2;
    bubbles.push(new Bubble(mouseX,mouseY));
  }
}