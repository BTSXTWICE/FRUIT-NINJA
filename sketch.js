//gamestate
var PLAY=1;
var END=0;
var gameState=PLAY;

//create variables for fruits ,aliens, sword, gameover, background
var sword,fruit1,fruit2,fruit3,fruit4,monster1,monster2;
var gameOver,gameOverImage,background;

var enemyGroup, fruitGroup;

var swordImage,fruit1Image,fruit2Image,fruit3Image,fruit4Image,enemy1Image,enemy2Image,backgroundImage,monster,monsterImage;

// create variables for score 
var score;

var knifeSwooshSound,gameOverSound;



function preload(){
 
 knifeSwooshSound=loadSound("knifeSwooshSound.mp3"); 
 gameOverSound=loadSound("gameover.mp3");
  
swordImage=loadImage("sword.png");
 
  //load the images 
  
  monsterImage=loadAnimation("alien1.png","alien2.png");
  fruit1Image=loadImage ("fruit1.png");
  fruit2Image=loadImage ("fruit2.png");
  fruit3Image=loadImage ("fruit3.png");
  fruit4Image=loadImage ("fruit4.png");

  gameOver=loadImage ("gameover.png");
  
 }

function setup(){
  // create the edges 
  createCanvas(400,400);
 
  enemyGroup=new Group();
  fruitGroup=new Group();
  
  
  sword=createSprite(50,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7

 score = 0;
 
}

function draw(){

background("lightblue");
  
  text("Score: "+ score, 300,50);
  
  console.log("this is ",gameState)
  
  if (gameState===PLAY){
  
    gameOver.visible=false
    
     sword.y=World.mouseY;
  sword.x=World.mouseX;
    
    fruits();
  Enemy();
    
    
    if (fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
      knifeSwooshSound.play();
    score=score+2;
  }
    
    
 
  
  if(enemyGroup.isTouching(sword)){
 enemyGroup.destroyEach();
    gameOverSound.play();
   gameState=END;
        
  }
  }
  
  
  
  if(gameState===END){
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    fruitGroup.setLifetimeEach(-2);
    enemyGroup.setLifetimeEach(-2);
    enemyGroup.destroyEach();
    sword.x=200
    sword.y=200
    sword.addImage(gameOver)
    gameOver.visible=true;
    
  }
  drawSprites();
}


function fruits(){
    if(World.frameCount%80===0){
   var fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
   var r=Math.round(random(1,4));
    if (r==1){
      fruit.addImage(fruit1Image);
    } else if (r==2){
      fruit.addImage(fruit2Image);
    } else if (r==3) {
      fruit.addImage(fruit3Image);
    } else {
      fruit.addImage(fruit4Image);
    }
      fruitGroup.y=Math.round(random(50,340));
      
  fruit.sclae=0.2
  fruit.velocityX=-(7+(score/4));
  fruit.setLifetime=100;
  
  fruitGroup.add(fruit);
      position=Math.round(random(1,2));
 
  
  if(position==1)
  {
    fruit.x=400;
    fruit.velocityX=-(7+(score/4));
  }
  else
  {
    if(position==2){
      fruit.x=0;
      fruit.velocityX=(7+(score/4));
    }
    }
    }   
  
  
  
    
}

function Enemy(){
if (World.frameCount%200===0){
  monster=createSprite(400,200,20,20);
  monster.addAnimation("moving",monsterImage); 
  monster.y=Math.round(random(100,300));
  monster.velocityX=-(8+(score/10));  monster.setLifetime=50

enemyGroup.add(monster);
  }
  
  

}