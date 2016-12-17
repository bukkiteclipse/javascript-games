function Bubble(x, y, velocityX, velocityY, overallSpeed) {
  this.x = x;
  this.y = y;
  this.g = 1.5;
  this.vy = 0;
  this.vx = 0;
  this.r = 48;
  this.rx = this.r;
  this.ry = this.r;
  this.deformLimit = 10;
  this.deformSpeed = 25;
  this.deformAccel = 4;
  this.bounceY = 35.0;
  this.bounceX = 35.0;
  this.bounceLossX = 0.5;
  this.bouncedY = false;
  this.stoppedY = false;
  this.stoppedX = false;
  this.flat = false;
  this.playSound = false;
  this.color_r = random(150,255);
  this.color_g = random(10);
  this.color_b = random(150,255);
  
  this.correctedX = true;
  this.correctedY = true;
  
  this.mouseControl = true;
  this.pastMouseX = [0];
  this.pastMouseY = [0];
  this.velocityX = velocityX;
  this.velocityY = velocityY;
  this.airRes = 0.019;
  this.floorF = 0.1;
  this.firstFloorFrame = 0;
  this.firstFloorFrameCaptured = false;
  
  this.speed = overallSpeed;
  
  this.display = function() {
    stroke(255);
    fill(this.color_r,this.color_g,this.color_b,190);
    ellipse(this.x, this.y, this.rx, this.ry);
  }
  
  this.adjustSpeed = function(s) {
    this.speed = this.speed - s;
    if(this.speed < 0.01)
    {
      this.speed = 0.01;
    }else if(this.speed > 2)
    {
      this.speed = 2;
    }
  }
  
  this.move = function() {
    
    //accelaration
    this.vy = this.vy + this.g + this.velocityY;
    this.velocityY = 0;
    
    this.vx = this.vx + this.velocityX;
    this.velocityX = 0;
    if(this.vx > 0)
    {
      if(this.stoppedY)
      {
        this.vx = this.vx - this.floorF;
      } else{
        this.vx = this.vx - this.airRes;
      }
      if(this.vx <= 0)
      {
        this.vx = 0;
      }
    }
    else if(this.vx < 0)
    {
      if(this.stoppedY)
      {
        this.vx = this.vx + this.floorF;
      } else{
      this.vx = this.vx + this.airRes;
      }
      if(this.vx >= 0)
      {
        this.vx = 0;
        this.stoppedX = true;
      }
    }

    
    //velocity
    this.y = this.y + this.vy * this.speed;
    if(this.vy === 0 && !this.stoppedY)
    {
      
      if(this.firstFloorFrameCaptured)
      {
        if(frameCount - this.firstFloorFrame >= 3)
        {
          //this.stoppedY = true;
          firstFloorFrameCaptured = false;
        }
      }
      
      if(!this.firstFloorFrameCaptured)
      {
        this.firstFloorFrame = frameCount;
        this.firstFloorFrameCaptured = true;
      }
    }
    
    
    this.x = this.x + this.vx * this.speed;
    
    //bouncing X
    if(!this.stoppedX && (this.x >= width-this.rx || this.x <= 0+this.rx))
    {
      this.bouncedX = true;
      
      this.playSound = true;
      
      this.bounceX = this.vx;
      this.vx = -this.bounceX;
      if(this.vx > 0.3)
      {
        if(!this.correctedX)
        {
          if(this.x < 0+this.rx && frameCount % 2 === 0)
          {
           this.x = width-this.rx;
            this.correctedX = true;
          }
        }
        this.vx = this.vx - this.bounceLossX;
        if(this.vx === 0)
        {
          this.stoppedX = true;
        }
        if(this.vx <= 0)
        {
         this.vx = 0;
         this.bouncedX = false;
         this.stoppedX = true;
        }
      }
      else if(this.vx > 0)
      {
        this.vx = 0;
        this.bouncedX = false;
        this.stoppedX = true;
      }
      
      if(this.vx < -0.3)
      {
        if(!this.correctedX)
        {
          if(this.x > width-this.rx && frameCount % 2 === 0)
          {
            this.x = 0+this.rx;
            this.correctedX = true;
          }
        }
        this.vx = this.vx + this.bounceLossX;
        if(this.vx >= 0)
        {
         this.vx = 0;
         this.bouncedX = false;
         this.stoppedX = true;
        }
      }
      else if(this.vx < 0)
      {
        this.vx = 0;
        this.bouncedX = false;
        this.stoppedX = true;
      }
    }
    if(!this.stoppedX && this.vx === 0)
    {
      this.stoppedX = true;
    }
    
    //bouncing Y
    if(!this.stoppedY && this.y >= height-this.ry)
    {
      if(!this.correctedY)
        {
          if(this.y > height-this.ry && frameCount % 2 === 0)
          {
           this.y = height-this.ry;
           this.correctedY = true;
          }
        }
      //print("now " + this.v);
      this.bouncedY = true;
      
      this.playSound = true;
      //this.bounce();
      if(this.vy > 1.21)
      {
        this.bounceY = this.vy;
        this.vy = -this.bounceY;
      } else {
        if(this.vy > 0)
        {
         this.g = 0;
         this.vy = 0;
         this.stoppedY = true;
         this.bouncedY = false;
        }
      }
    }
    this.deform();
    //correction 
    if(frameCount % 2 === 0)
    {
      if(this.x < 0+this.rx)
      {
        //print("lol");
        this.x = 0+this.rx;
      }
      if(this.x > width-this.rx)
      {
        //print("lol2");
        this.x = width-this.rx;
      }
      if(this.y > height-this.ry)
      {
        //print("lol3");
        this.y = height-this.ry;
      }  
    }
    
    //} 
  }
  
  this.deform = function() {
    if(this.bouncedY && this.bounce >= 5){
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
          this.bouncedY = false;
          this.flat = false;
        }
      }
    }
  }
  
  this.mouseGrab = function() {
    this.x = mouseX;
    this.y = mouseY;
    
    this.velocityX = (mouseX - this.pastMouseX[0])*0.6;
    this.pastMouseX.push(mouseX);
    this.pastMouseX.splice(0,1);
    
    this.velocityY = (mouseY - this.pastMouseY[0])*0.6;
    this.pastMouseY.push(mouseY);
    this.pastMouseY.splice(0,1);
  }
  
  this.collision = function(vx, vy) {
    this.vx =   vx;
    this.vy =   vy;
    this.stoppedX = false;
    this.stoppedY = false;
    //print("yo");
  }
  
  this.changeColor = function() {
    this.color_r = 0;
    this.color_g = 255;
    this.color_b = 80;
  }
  
  this.playBounceSound = function(sound) {
    sound.play();
    this.playSound = false;
  }
}