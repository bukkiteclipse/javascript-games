var bubbles = [];

function setup() {
  createCanvas(1900,1000);
  frameRate(60);
}

function draw() {
  

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
  //handleBubbleCollision();
  noStroke();
  fill(0,255,0);
  rect(0,height-25,width,25);
  rect(0,0,25,height);
  rect(width-25,0,25,height);
  cursor(HAND);
  
  background(0);
}

function mousePressed() {
  for(var i = 0; i < 1; i++)
  {
    var x = width/2;
    var y = height/2;
    bubbles.push(new Bubble(mouseX,mouseY));
  }
}

function keyPressed() {
  bubbles.splice(0,bubbles.length);
}

function handleBubbleCollision() {
  for(var i = 0; i < bubbles.length; i++)
  {
    for(var j = i+1; j < bubbles.length; j++)
    {
      //print("i " + i + "  j " +j);
      if(dist(bubbles[i].x,bubbles[i].y,bubbles[j].x,bubbles[j].y) <= bubbles[i].r /*+ bubbles[j].r*/)
      {
        //print("collision " + dist(bubbles[i].x,bubbles[i].y,bubbles[j].x,bubbles[j].y));
         var vx1 = bubbles[i].vx;
         var vy1 = bubbles[i].vy;
         
         var vx2 = bubbles[j].vx;
         var vy2 = bubbles[j].vy;
         //print("x");
         bubbles[i].collision(vx2, vy2);
         bubbles[j].collision(vx1, vy1);
         
      }
    }
  }
}