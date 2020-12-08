var PLAY=1;
var END=0;
var gameState = PLAY;
var monkey, mon_running, monkey_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var gameOver, restart;

var score;
var gameover_img,restart_img;

function preload(){
  monkey_running = loadAnimation("Monkey_01.png" ,"Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  trex_collided = loadImage("Monkey_01.png");
  
  groundImage = loadImage("jungle.png");
  
  cloudImage = loadImage("cloud.png");
  
  gameover_img= loadImage("gameOver.png");
  restart_img=loadImage("restart.png");
  
  
  obstacle1 = loadImage("stone.png");
  obstacle2 = loadImage("stone.png");
  obstacle3 = loadImage("stone.png");
  obstacle4 = loadImage("stone.png");
  obstacle5 = loadImage("stone.png");
  obstacle6 = loadImage("stone.png");
}

function setup() {
  createCanvas(600,200);

   monkey = createSprite(50,180,20,50);
  
 monkey.addAnimation("running", monkey_running);
  
 
  monkey.scale = 0.5;
   monkey.addAnimation("collided",monkey_collided);
  
   gameOver = createSprite(300,100);
 gameOver.addImage(gameover_img);
 restart = createSprite(300,140);
restart.addImage(restart_img);
gameOver.scale = 0.5;

restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
  
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
 

  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  
    
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*score/100);
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
   
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 161){
      monkey.velocityY = -12 ;
    
    }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(obstaclesGroup.isTouching(monkey)){
   
      gameState = END;
 
    }
  }
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    monkey.changeAnimation("collided",monkey_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
      if(mousePressedOver(restart)) {
    reset();
  }
    
  }

  
  
  text("Score: "+ score, 500,50);
  
  
  
  monkey.collide(invisibleGround);

 
 drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",monkey_running);
  
  score=0;
  
}  

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
 obstacle.velocityX = -(6 + 3*score/100);  
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}