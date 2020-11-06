
var monkey , monkey_running;
var bananaImage,obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var gamestate;
var ground,invisibleground;
var gameOver,gameOverImage,restart,restartImage;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage= loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
}



function setup() {
 createCanvas(600, 600);
  
    invisibleground = createSprite(20,570,800,10);
  invisibleground.visible = false;
  
  monkey = createSprite(100,570,20,50);
  monkey.addAnimation("running",monkey_running );                
  monkey.scale = 0.1;
  
  ground = createSprite(800,800,300,300);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,400);
  gameOver.addImage(gameOverImage);
  
  gameOver.scale = 1;
  
  restart=createSprite(300,500,200,200);
   restart.addImage(restartImage);
  
  restart.scale=0.5;
  
  //create Obstacle and Cloud Groups
  obstaclesgroup = createGroup();
   bananagroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
  score = 0;
  
  gamestate = "play";
}


function draw() {
 background(180);
  text("Score: "+ score, 500,50);
  
  
  if(gamestate === "play" ){

    gameOver.visible = false;
    restart.visible=false;
    ground.velocityX = -(4 + 3* score/5)    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 450) {
        monkey.velocityY = -14;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    spawnbananas();
  
    //spawn obstacles on the ground
    spawnobstacles();
  
        if(bananagroup.isTouching(monkey)){
           bananagroup.destroyEach()            
          score=score+2
          monkey.scale= monkey.scale+0.02; 
      
    }
    if(obstaclesgroup.isTouching(monkey)){
       monkey.scale= monkey.scale-0.03 
       obstaclesgroup.destroyEach()
      
    }
    if(monkey.scale<0.01){
      gamestate = "END";
    }
  }
   else if (gamestate === "END") {
      gameOver.visible = true;
      restart.visible=true;   
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     

    obstaclesgroup.setLifetimeEach(-1);
    bananagroup.setLifetimeEach(-1);
     
     obstaclesgroup.setVelocityXEach(0);
     bananagroup.setVelocityXEach(0);  
     
      if(mousePressedOver(restart)) {
      reset();
    }
   }
    monkey.collide(invisibleground);

  drawSprites();
  
}
function reset(){
  gamestate="play"
   bananagroup.destroyEach()
   obstaclesgroup.destroyEach()
  score=0
}
function spawnobstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,550,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -(3 + score/5);           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesgroup.add(obstacle);
 }
}

function spawnbananas() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var banana= createSprite(600,400,40,10);
    banana.addImage(bananaImage)
    banana.y = Math.round(random(350,400));
    banana.scale = 0.15;
    banana.velocityX = -(2+ score/3);
    
     //assign lifetime to the variable
    banana.lifetime = 1000;
        
    //add each cloud to the group
    bananagroup.add(banana);
  }
}


