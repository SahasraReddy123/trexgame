var trex,trexrunning;
var ground,groundimage;
var Play=1;
var End=0;
var gamestate=Play;
var cloudimage;
var obs1,obs2,obs3,obs4,obs5,obs6;
var obstaclesGroup;
var cloudsGroup;
var gameover,gameoverimg,restart,restartimg;
var trexcollided;
var score=0,highscore=0;
var jump,die,checkpoint;

function preload(){
  trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundimage=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  trexcollided=loadAnimation("trex_collided.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
  }

function setup(){
  createCanvas(600,200);
  trex=createSprite(50,180,10,10);
  trex.addAnimation ("trex",trexrunning);
  trex.addAnimation("collided",trexcollided);
 trex.scale=0.5; 
  
  ground=createSprite(300,180,600,20);
  ground.addImage("ground",groundimage);
  ground.x=ground.width/2;
  
  invisibleground=createSprite(300,185,600,5);
  invisibleground.visible=false;
  obstaclesGroup=new Group();
  cloudsGroup=new Group();
  gameover=createSprite(300,100) ;
  gameover.addImage(gameoverimg);
  gameover.scale=0.5;
  restart=createSprite(300,140);
  restart.addImage(restartimg);
  restart.scale=0.5;
  gameover.visible=false;
  restart.visible=false;
}

function draw(){
  background(180);
  text("Highscore: "+highscore,450,50);
  text("score: "+score,530,50);
  if(gamestate==Play){
    ground.velocityX=-6;
    score=score+Math.round(getFrameRate()/60);
    if(score>0 && score%100==0){
      checkpoint.play();
     }
  if(ground.x<0){
    ground.x=ground.width/2;
}
    if(keyDown("space") && trex.y>=159){
     trex.velocityY=-12;   
      jump.play();
       }
    trex.velocityY=trex.velocityY+ 0.8;
  spawnClouds(); 
    spawnObstacles();
    if(obstaclesGroup.isTouching(trex)) {
      gamestate=End;
      die.play();
    }
 }
  else if(gamestate==End){
    ground.velocityX=0;
    trex.velocityyY=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    gameover.visible=true;
    restart.visible=true;
    trex.changeAnimation("collided",trexcollided);
  }
  if(mousePressedOver(restart)){
    gamestate=Play;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    gameover.visible=false;
    restart.visible=false;
    trex.changeAnimation("trex",trexrunning);
    if(highscore<score){
      highscore=score;
    }
    score=0;
  }
trex.collide(invisibleground);
  drawSprites();
}
function spawnClouds(){
  if(World.frameCount% 60== 0){
    var cloud=createSprite(600,140,40,10);
    cloud.y=random(100,140);
    cloud.addImage("cloud",cloudimage);
    cloud.scale=0.5;
   cloud.velocityX=-4; 
    cloud.lifetime=150;
    cloud.depth=trex.depth;
    trex.depth=trex.depth + 1;
    cloudsGroup.add(cloud);
   }
  }
function spawnObstacles() {
  if(World.frameCount% 60== 0) {
    var obstacles=createSprite(600,165,10,40);
    obstacles.velocityX=-6;
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1: obstacles.addImage(obs1);
        break;
        case 2:obstacles.addImage(obs2);
        break;
        case 3:obstacles.addImage(obs3);
        break;
        case 4:obstacles.addImage(obs4);
        break;
        case 5:obstacles.addImage(obs5);
        break;
        case 6:obstacles.addImage(obs6);
        break;
        default : break;
    }
   obstacles.scale=0.5; 
    obstacles.lifetime=100;
    obstaclesGroup.add(obstacles);
    
    
  }
}


 

