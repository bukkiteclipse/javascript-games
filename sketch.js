var bubbles = [];
var backgroundShade = 0;
var flash = 150;
var score = 0;
var highScore = 0;
var lostScore = 0;
var lost = false;
var betterScore = false;
var resetFrame = 0;
var restarted = false;
var spawnFrequency = 240;
var spawnReduction = 5;
var bubbleCount = 0;
var scoreBonus = 0.0;
var playSpeed = 0;
var overallSpeed = 0.25;
var song;
var bounceSound;

var scoreBonusTextSize = 60;

function preload() {
  song = loadSound('assets//sounds/LOOP2_140BPM.mp3');
  bounceSound = loadSound('assets//sounds/pop.mp3');
  bounceSound2 = loadSound('assets//sounds/pop2.mp3');
  lostSound = loadSound('assets//sounds/lost_sound.mp3');
  lostMusic = loadSound('assets//sounds/lost_atmos.mp3');
  
} 

function setup() {
  createCanvas(1900,920);
  //song.loop();
  frameRate(60);
  textSize(50);
  
}

function draw() {
  if(!lost)
  {
    playBackgroundMusic();  
  }
  
  if(backgroundShade > 0)
  {
    if(backgroundShade > 255)
    {
      backgroundShade = 255;
    }
    backgroundShade = backgroundShade - 10;
    if(backgroundShade < 0)
    {
      backgroundShade = 0;
    }
  }
  background(backgroundShade);
  handleScore();
  
  if(lost)
  {
    fill(190,190,190)
    textSize(500);
    textAlign(CENTER);
    text("LOST", width/2, height/2+150);
    textSize(300);
    fill(190,0,190)
    text("Score : " + lostScore, width/2, height/2+150+230);
    textSize(50);
    textAlign(LEFT);
  }
  textSize(50);
  fill(0,255,255)
  text("Highscore : " + highScore, 70, 60);
  fill(255,255,255)
  text("Score : " + score, 70, 110);
  
  spawnBubbles();
  
  if(bubbles.length >= 100)
  {
    bubbles.splice(0,1);
  }
  for(var i = 0; i < bubbles.length; i++)
  {
    /*if(bubbles[i].stoppedX)
      {
        print("x stop");
      }if(bubbles[i].stoppedY)
      {
        print("y stop");
      } */
    if(bubbles[i].stoppedX && bubbles[i].stoppedY)
    {
      bubbles.splice(i,1);
    } else
    {
      if(playSpeed !== 0)
      {
        bubbles[i].adjustSpeed(playSpeed);
        print(playSpeed + " os: "+ overallSpeed +" speed: " + bubbles[i].speed);
      }
      
       if(bubbles[i].playSound)
      {
        if(lost)
        {
          //bubbles[i].playBounceSound(bounceSound2);
        } else{
          bubbles[i].playBounceSound(bounceSound);
        }
      } 
      
      bubbles[i].move();
      bubbles[i].display();
    }
   /* if(bubbles[i].stopped)
    {
      bubbles.splice(i,1);
    } */
  }
  playSpeed = 0;
  //handleBubbleCollision();
  handleBubbleMouseCollision();
  
  textAlign(CENTER);
  fill(255,255,0);
  scoreBonusTextSize = map(floor(scoreBonus),0,20,60,120);
  textSize(scoreBonusTextSize);
  text(bubbleCount +" Balls X " + floor(scoreBonus), 1200, 110);
  textAlign(LEFT);
  
  noStroke();
  fill(0,255,0);
  rect(0,height-25,width,25);
  rect(0,0,25,height);
  rect(width-25,0,25,height);
  cursor(HAND);
  
  
}

function mousePressed() {
  /*for(var i = 0; i < 1; i++)
  {
    var x = width/2;
    var y = height/2;
    bubbles.push(new Bubble(mouseX,mouseY));
  } */
  /*for(var i = 0; i < 1; i++)
  {
    var randomX = random(78,width-78);
    var randomY = random(-78,-500);
    var randomVelocityX = random(-60,60);
    var randomVelocityY = random(0,30);
    bubbles.push(new Bubble(randomX,randomY,randomVelocityX,randomVelocityY));
  } */
  
  
  restartGame();
}

function keyPressed() {
  restartGame();
}

function restartGame() {
  lost = true;
  restarted = true;
  spawnFrequency = 240;
  bubbleCount = 0;
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

function handleBubbleMouseCollision() {
  for(var i = 0; i < bubbles.length; i++)
  {
      //print("i " + i + "  j " +j);
      if(dist(bubbles[i].x, bubbles[i].y, mouseX, mouseY) <= bubbles[i].r/2)
      {
        bubbles[i].changeColor();
        backgroundShade = backgroundShade + flash;
        if(!lost)
        {
          lost = true;
          song.pause();
          lostSound.play();
          lostMusic.play();
          lostScore = score;
        }
      }
  }
}

function handleScore() {
  if(lost)
  {
    if(highScore < score)
    {
      highScore = score;
    }
    score = 0;
    resetFrame = frameCount;
    if(restarted)
    {
      lost = false;
      restarted = false;
    }
  } else {
    if(!restarted)
    {
      scoreBonus = map(bubbleCount, 0, 100, 0.0, 20)
      score = round(floor((frameCount-resetFrame)/60)*scoreBonus);
      //print(bubbleCount/4);
    }
  }
}

function spawnBubbles() {
  if(frameCount%spawnFrequency === 0)
  {
    if(spawnFrequency > 60)
    {
      spawnFrequency = spawnFrequency - spawnReduction;
      if(spawnFrequency < 60)
      {
        spawnFrequency = 60;
      }
    }
    for(var i = 0; i < 1; i++)
    {
      var randomX = random(78,width-78);
      var randomY = random(-78,-79);
      var randomVelocityX = random(-100,100);
      var randomVelocityY = random(0,10);
      //bubbleCount++;
      bubbles.push(new Bubble(randomX,randomY,randomVelocityX,randomVelocityY, overallSpeed));
      bubbleCount = bubbles.length;
    }
  }
}

function mouseWheel(event) {
  
  playSpeed =  event.delta*0.001;
  adjustOverallSpeed(event.delta*0.001);
  return false;
}

this.adjustOverallSpeed = function(s) {
    overallSpeed = overallSpeed - s;
    if(overallSpeed < 0.01)
    {
      overallSpeed = 0.01;
    }else if(overallSpeed > 2)
    {
      overallSpeed = 2;
    }
  }
  
  function playBackgroundMusic() {
    if(lostMusic.isPlaying())
    {
      lostMusic.stop();
    }
    if(song.isPlaying()) { // .isPlaying() returns a boolean
      //song.pause();
    } else {
      song.play();
    }
  }