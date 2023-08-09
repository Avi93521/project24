  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score=0;
var distance=0;
var gameOver

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("download (6).png","download (7).png","download (8).png","download (9).png");
  climberImg = loadImage("download (5).png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameOver=loadImage("download (3).png");
}

function setup() {
  createCanvas(600,400);
  
  tower = createSprite(300,400);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  
  ghost = createSprite(400,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);


}


function draw() {
  background(0);
  if(tower.y > 400){
    tower.y = height/2;
  } 
  
  
  if (gameState === "play") {
    
    
    if(keyDown("left_arrow")){
        ghost.x = ghost.x-3;

      // write a code to move left when left arrow is pressed
    }
    if(keyDown("right_arrow")){
  
          ghost.x = ghost.x + 3;

      // write a code to move left when right arrow is pressed
      
    }
    if(keyDown("space")){
  
         ghost.velocityY = -10;

      // write a code to move up when space arrow is pressed
      
    }
  
  ghost.velocityY = ghost.velocityY + 0.5;
  
   
      //write a condition for infinte scrolling tower
    
      spawnDoors();

  
//write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.
     if(climbersGroup.isTouching(ghost)){
      distance = distance + Math.round(getFrameRate()/50);
      ghost.velocityY = -(6 + 2*distance/150);
      score=score+1;
      climbersGroup.destroyEach();
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 400){
      ghost.destroy();
      gameState = "end"
    }
   

  drawSprites();
}
  if (gameState === "end"){
    fill("white");
    textSize(30);
    text("Score:"+score, 230,250)
    text("Press UP ARROW to Restart", 200,290) 
    if(keyDown("UP_ARROW")) {
      reset();
    }
  }
}

function spawnDoors()
 {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
    var door = createSprite(width/2,100);
    door.scale= 0.2;
    var climber = createSprite(70,100);
    climber.scale=0.3;
    var invisibleBlock = createSprite(width/2,100);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 1;
    //add the random function
    door.x=Math.round(random(width/2,70));
    climber.x=Math.round(random(width/2,150));;
    invisibleBlock.x=door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 3;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 3;

    //change the depth of the ghost and door
    
     
ghost.depth = door.depth;
    ghost.depth =1;
    
    //assign lifetime for the  door, climber and invisible block

 door.lifetime = 700;
    climber.lifetime = 900;
    invisibleBlock.lifetime = 700;
    //add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block
    
     doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
function reset(){
  gameState ="play";
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;
  

  doorsGroup.destroyEach();
  climbersGroup.destroyEach();
  invisibleBlockGroup.destroyEach();
  ghost = createSprite(400,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
 
  score=0;
  distance=0;
  
 }

