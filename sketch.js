

var bullet , enemy;

var score = 0;

var gameState = "serve";

var Level = 1;
var visibility = 0;
//var lives = 3;
function preload()
{
	spaceRangerImg = loadImage("1NOYbJA.png");
	spaceBackgroundImg = loadImage("depositphotos_3846803-Space-background.jpg");
	enemyImg = loadImage("cw3-enemyship7-3.png");
	specialEnemyImg = loadImage("F5S4.png");
	asteroidImg = loadImage("354-3542393_meteor-png-meteor-transparent-background.png");
	wowtextImg = loadImage("4d464d898006f910d9dd3a67773c42c1.gif");
	wonderfultextImg = loadImage("5ddd8b41b7a872243b1e720178478918.jpg");
	awesometextImg = loadImage("unnamed.png");
	enemyGroup = new Group();
	bulletGroup = new Group();
	bullet1Group = new Group();
	specialEnemyGroup = new Group();
	asteroidGroup = new Group();
	//levelupSound = loadSound("y2mate.com - Level Up Sound Effect.mp3");
}

function setup() {
	createCanvas(800, 700);

	spaceRanger = createSprite(400,550,50,50);
	spaceRanger.addImage(spaceRangerImg);
	spaceRanger.scale = 0.2;

}


function draw() {
  rectMode(CENTER);
  background(spaceBackgroundImg);
  drawSprites();
  
  if(score<50){
	  Level = 1;
  }
  if(score>50&&score<100){
	  Level = 2;
  }
  if(score>100){
	  Level = 3;
  }
  
  if(gameState === "serve"){
	  textSize(40);
	  fill("white");
	  text("Press S to  Start",300,350);
	  text("Be Aware of enemies",200,450);  
	  text("Be Aware of Special enemies",200,500);
	  text("If You Touch them you will die",200,550);
	  text("and also be aware of asteroid!!",200,600);
	  
    }

  if(keyDown("S")&&gameState === "serve"){
	  gameState = "play";
  }

  if(gameState === "play"){

	if(Level===1){
	  textSize(20);
	  text("LEVEL 1",400,50);
	  enemyship();
	}

	if(Level===2){	
      textSize(20);
	  text("LEVEL 2",400,50);	
	  enemyship();
	  specialenemyship();
	}

	if(Level===3){	
	  textSize(20);
	  text("LEVEL 3",400,50);
	  enemyship();
	  specialenemyship();
	  asteroidStone();
	}


	if(keyDown("LEFT_ARROW")){
		spaceRanger.x-=5;
	}

	if(keyDown("RIGHT_ARROW")){
		spaceRanger.x+=5;
	}

	if(keyDown("space")){
		bullet();
	}

	for(var i = 0;i<enemyGroup.length;i++){
		if(enemyGroup.get(i).isTouching(bulletGroup)||enemyGroup.get(i).isTouching(bullet1Group)){
			enemyGroup.get(i).destroy();
			bulletGroup.destroyEach();
			bullet1Group.destroyEach();
			score = score+1;
		}
 	}

	if(score === 50){
		wowtext();
		//levelupSound.play();
	}
	if(score === 100){
		wonderfultext();
	}
	if(score === 150){
		awesometext();
	}

  	textSize(20);
  	fill("white");
	text("Score: "+score,400,20);
	  
	if(spaceRanger.isTouching(asteroidGroup)||spaceRanger.isTouching(specialEnemyGroup)||spaceRanger.isTouching(enemyGroup)){
		gameState = "end";
	}
  }

  if(gameState === "end"){
	  asteroidGroup.destroyEach();
	  specialEnemyGroup.destroyEach();
	  enemyGroup.destroyEach();
	  bullet1Group.destroyEach();
	  bulletGroup.destroyEach();

	  textSize(40);
	  fill("red");
	  text("GAME OVER!!",300,350);
	  text("Press R to Replay",300,500);
  }
    
  if(keyDown("R")&&gameState === "end"){
	  score = 0;
	  gameState = "serve";
  }
}

function bullet(){
	if(frameCount%9===0){
		var bullet = createSprite(spaceRanger.x-30,spaceRanger.y,10,30);
		bullet.velocityY = -6;
		bullet.shapeColor = "yellow";
		bullet.lifetime = 116.67;
		bulletGroup.add(bullet);

		var bullet1 = createSprite(spaceRanger.x+30,spaceRanger.y,10,30);
		bullet1.velocityY = -6;
		bullet1.shapeColor = "yellow";
		bullet1.lifetime = 116.67;
		bullet1Group.add(bullet1)
	}

	
}

function enemyship(){
	if(frameCount%50===0){
		enemy = createSprite(Math.round(random(10,700)),0,50,50);
		enemy.addImage(enemyImg);
		enemy.scale = 0.5;
		enemy.velocityY = 4;
		enemy.lifetime = 175;
		enemyGroup.add(enemy);
	}
   
}

function specialenemyship(){
	if(frameCount%70===0){
		specialEnemy = createSprite(Math.round(random(10,700)),0,50,50);
		specialEnemy.addImage(specialEnemyImg);
		specialEnemy.scale = 0.5;
		specialEnemy.velocityY = 3;
		specialEnemy.lifetime = 175;
		specialEnemyGroup.add(specialEnemy);
	}
}

function asteroidStone(){
	if(frameCount%90===0){
		asteroid = createSprite(Math.round(random(10,700)),0,50,50);
		asteroid.addImage(asteroidImg);
		asteroid.scale = 0.1;
		asteroid.velocityY = 6;
		asteroid.lifetime = 116;
		asteroidGroup.add(asteroid);
	}
}

function wowtext(){
	wow = createSprite(400,100,50,50);
	wow.addImage(wowtextImg);
	wow.scale = 0.5;
	wow.lifetime = 20;
}

function wonderfultext(){
	wonderful = createSprite(400,100,50,50);
	wonderful.addImage(wonderfultextImg);
	wonderful.scale = 0.5;
	wonderful.lifetime = 20; 
}

function awesometext(){
	awesome = createSprite(400,100,50,50);
	awesome.addImage(awesometextImg);
	awesome.scale = 0.5;
	awesome.lifetime = 20;
}
