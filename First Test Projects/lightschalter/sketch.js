var res_x=1280;
var res_y=720;
var on = false;
var kreisLimit = 2000;
var kreise = false;
var kreisRadius = 0;

var pastCount = 0;
var past_mouseX = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var past_mouseY = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var zeit = 0;
var zeitLimit = 1;
var istZeit = false;

function setup() {
  createCanvas(res_x,res_y);
  frameRate(60);
}

function draw() {
  if(on){
    background(0, 255, 0);
  }else{
    background(0);
  }

  stroke(150);
  strokeWeight(7);
  if(mouseInRect())
  {
    
    stroke(255);
    if(!kreise){
      erzeugeKreis();
      //kreise = true;
    }
    fill(90, 0, 50);
    if(mouseIsPressed){
      fill(180, 0, 130)
    }
  }else{
    noFill();
    kreise = false;
  }
  rect(res_x/2,res_y/2,200,200);
  

  erzeugeVergangenheit();
  

}

function mousePressed(){
  if(mouseInRect()){
    on =! on;
  }

  print("X: " + mouseX + "  Y: " +mouseY);
}

function erzeugeKreis(){
  noFill();
  //print("Kreisradius: " +kreisRadius);
  //fill(255, 255, 255);
  if(kreisRadius <= kreisLimit){
    stroke(255);
    ellipse(res_x/2+100,res_y/2+100,kreisRadius, kreisRadius);
    kreisRadius+=250;
  }else{
    kreisRadius = 0;
    kreise = true;
  }
  stroke(150);
}

function erzeugeVergangenheit(){
  stroke(190,0,60,100);

    for(var i=0; i<=89; i++)
    {
      point(past_mouseX[i], past_mouseY[i]);
      
      if(i<89)
      {
      line(past_mouseX[i],past_mouseY[i],past_mouseX[i+1],past_mouseY[i+1])
      }
    }

  zeit++;
  if(zeit % zeitLimit == 0){
    istZeit = true;
  }
  if(istZeit){
    past_mouseX[0] = mouseX;
    past_mouseY[0] = mouseY;
    
    for(var j=89; j>=1; j--)
    {
      //print("past_mouseX: "+ past_mouseX[j]);
      
      past_mouseX[j]=past_mouseX[j-1];
      past_mouseY[j]=past_mouseY[j-1];
    }
    istZeit = false;
  }
}

function mouseInRect(){
  if(mouseX > res_x/2 && mouseX < res_x/2+200 && mouseY > res_y/2 && mouseY < res_y/2+200)
  {
    return true;
  } else{
    return false;
  }
}