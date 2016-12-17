function OptionMenu() {
  this.x = x;
  this.y = y;
  
  
  this.display = function() {
    stroke(255);
    fill(this.color_r,this.color_g,this.color_b,190);
    ellipse(this.x, this.y, this.rx, this.ry);
  }
  
  
}