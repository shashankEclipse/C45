var canvas;
var player;
var backgroundImg;
var playerImg;
var object1Img , object2Img , object3Img;
var objects;
const PLAY = 1;
const END = 0;
var gameState = PLAY;
var gameOver , gameOverImg;
var score = 0;
var asteroid;
var asteroidImg;
var asteroids;
var score2 = 0;
var lazers, lazerImg;

function preload(){
    backgroundImg = loadImage("images/backgroundImg.jpg");
    playerImg = loadImage("images/player.png");
    object1Img = loadImage("images/object1.png");
    object2Img = loadImage("images/object2.png");
    object3Img = loadImage("images/objects.png");
    gameOverImg = loadImage("images/gameOver.jpg");
    asteroidImg = loadImage("images/asteroid.png");
    lazerImg = loadImage("images/lazer.png");
    
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);

  bg = createSprite(displayWidth/2,displayHeight/2);
  bg.velocityY = 2;

  bg.addImage(backgroundImg);

  player = createSprite(displayWidth/2,displayHeight/2+50);
  player.addImage(playerImg);
  player.debug = true;
  player.setCollider("rectangle",0,0,player.width/2,player.height/2)


  objects = new Group();
  asteroids = new Group();
  lazers = new Group();
}

function movement(){

    if(keyDown(LEFT_ARROW)){
      player.x-=10;
    }
    if(keyDown(RIGHT_ARROW)){
      player.x+=10;
    }
}
function spawnAsteroids(){
     if(frameCount % 100 === 0){
      //% divides the frames by 50 and if the reaminder is 0 the if condition works.
     asteroid = createSprite(200,50,20,20);
      asteroid.addImage("ob",asteroidImg);
      asteroid.x = Math.round(random(30, displayWidth-100))
      asteroid.velocityY = 5;
      asteroid.scale = 0.2;
      asteroids.add(asteroid);
    
     }
}
function spawnObjects(){
    
    if(frameCount % 100 === 0){
      //% divides the frames by 50 and if the reaminder is 0 the if condition works.
      object = createSprite(200,50,20,20);
      object.addImage("ob",object1Img);
      object.x = Math.round(random(30, displayWidth-100))
      object.velocityY = 5;
      object.scale = 0.2;
      objects.add(object);
            var rand = Math.round(random(1, 3));
      switch (rand) {

        case 1:
          object.addImage("ob", object1Img);
          break;
        case 2:
          object.addImage("ob", object2Img);
          break;
        case 3:
          object.addImage("ob", object3Img);
          break;
        default:
          break;
      }
    }
}
function destroyPlayer(){
  if (objects.isTouching(player)) {
      player.destroy();
      gameState = END;
 
}
}
  function gameEnd(){
    gameOver = createSprite(displayWidth/2,displayHeight/2+50);
    gameOver.addImage(gameOverImg);
    objects.setVelocityYEach(0);
    asteroids.setVelocityYEach(0);
    bg.velocityY = 0;
  }
function calculateScore(){
  
  score = score + Math.round(getFrameRate() / 40);

  if(lazers.isTouching(asteroids)){
    score2 = score2 + 100;
    asteroids.destroyEach();
  }
}
function  shoot() {
  if(keyDown("f")) {
     lazer = createSprite(400,200,20,50);
     lazer.addImage("lazer", lazerImg);
     lazer.scale = 0.3;
     //lazer.addImage("arrow",arrowImage);
 
     lazer.velocityY = -10;
     lazer.x = player.x
     lazer.y = player.y
     lazers.add(lazer);

       
      
     } 

}
function draw(){
 background(0,0,255);

 //(bbackgroundackgroundImg)
 

  if(gameState=== PLAY){
    destroyPlayer();
    spawnObjects();
    movement();
    if(bg.y>displayHeight){
      bg.y = bg.height/2;
    }
  }
    else if(gameState===END){
      gameEnd();
    }
 
 drawSprites();
 calculateScore();
 spawnAsteroids();
 shoot();
 textSize(20);
 text("Score = " + score, 530, 50);
 text("Score = " + score2, 530, 70);
 
}
