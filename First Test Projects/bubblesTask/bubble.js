function Bubble(x, y) {
  this.x = x;
  this.y = y;
  this.a = 1.2;
  this.v = 0;
  this.r = 48;
  this.rx = 48;
  this.ry = 48;
  this.deformLimit = 10;
  this.deformSpeed = 25;
  this.deformAccel = 4;
  this.bounce = 35.0;
  this.bounced = false;
  this.stopped = false;
  this.flat = false;
  this.color_r = random(150,255);
  this.color_g = random(10);
  this.color_b = random(150,255);
  
  this.display = function() {
    stroke(255);
    fill(this.color_r,this.color_g,this.color_b,150);
    ellipse(this.x, this.y, this.rx, this.ry);
  }
  
  this.move = function() {
    //accelaration
    this.v = this.v + this.a;
    //velocity
    this.y = this.y + this.v;
    //bouncing
    if(!this.stopped && this.y >= height-this.ry)
    {
      //print("now " + this.v);
      this.bounced = true;
      //this.bounce();
      if(this.v > 1.21)
      {
        this.bounce = this.v;
        this.v = -this.bounce;
      } else {
        if(this.v > 0)
        {
         this.a = 0;
         this.v = 0;
         this.stopped = true;
         this.bounced = false;
        }
      }
    }
    //this.deform();
    //print("deformSpeed :"+ this.deformSpeed + "  deformAccel : " + this.deformAccel);
    if(this.bounced && this.bounce >= 5){
      if(!this.flat){
        //print("now2 " + this.ry + " bounce: " + this.bounce);
        this.deformSpeed = this.deformSpeed - this.deformAccel;
        this.ry = this.ry - this.deformSpeed;
        //print("dS :"+ this.deformSpeed + "  dA : " + this.deformAccel + " ry : " +this.ry);
      }
      if(this.ry <= this.deformLimit)
      {
        this.flat = true;
      }
      if(this.flat)
      {
        //this.deformSpeed = this.deformSpeed + this.deformAccel;
        this.ry = this.ry + 15;
        //print("wtf" + " feddisch: " + this.ry >= this.r);
        if(this.ry >= this.r)
        {
          this.ry = this.r;
          this.deformSpeed = 25;
          this.bounced = false;
          this.flat = false;
        }
      }
      
    } 
  }
}