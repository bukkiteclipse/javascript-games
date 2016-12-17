var col=0;
var res_x = 1280;
var res_y = 720;

var past_mouseX;
var past_mouseY;

var txt_size = 30;

function setup() {
  createCanvas(res_x,res_y);
  
  frameRate(120);
  textSize(20);
  textSize(txt_size);
  textAlign(CENTER);
  
}

function draw() {
  col= map(mouseX, 0, res_x, 0, 255);
  background(col);
  if(frameCount%1000 == 0)
  {
    txt_size += 10;
    textSize(txt_size);
    print("Hallo")
  }
  text(frameCount, width/2, height/2);
}