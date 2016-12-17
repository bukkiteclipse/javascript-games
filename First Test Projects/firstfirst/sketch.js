var color_r, color_g,color_b, fr;

var rechteck={
  b : 50,
  h : 30
};

function setup() {
  createCanvas(800,600);
  color_r = 0;
  color_g = 0;
  color_b = 0;
  fr = 0;
}

function draw() {
  
  changeColor();

  background(color_r,color_g,color_b);
  fill(200,40,60);
  rect(mouseX,mouseY,rechteck.b,rechteck.h);
}

function changeColor()
{
  fr++;
  if(fr >= 3)
  {
    fr = 0;
    color_r++;
    color_g = color_g + 2;
    color_b = color_b + 4;
    
    if(color_r > 255)
    {
      color_r = 0;
    }
    if(color_g > 255)
    {
      color_g = 0;
    }
      if(color_b > 255)
    {
      color_b = 0;
    }
  }
}