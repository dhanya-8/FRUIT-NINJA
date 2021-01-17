var fruit1, fruit1Image, fruit2, fruit2Image, fruit3, fruit3Image, fruit4, fruit4Image, fruitGroup;

var enemy, enemyGroup, enemyImage;

var knife, knifeImage;

var score = 0;

var game_over, gameOver;

var PLAY = 1;
var END = 0;
var gameState = 1;

var knifeSwooshSound, gameOverSound;

function preload() {

  knifeImage = loadImage("sword.png");

  enemy_moving = loadAnimation("alien1.png", "alien2.png");

  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");

  game_over = loadImage("gameover.png");

  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");

}

function setup() {

  createCanvas(600, 600);

  knife = createSprite(300, 150, 20, 50);
  knife.addImage("sword", knifeImage);
  knife.scale = 0.5

  fruitGroup = createGroup();
  enemyGroup = createGroup();

  //knife.setCollider("circle", 0, 0, 100);
  //knife.debug = true

}

function draw() {
  background("blue");

  textSize(20);

  //displaying score
  text("Score: " + score, 500, 25);

  if (gameState === PLAY) {

    knife.y = World.mouseY
    knife.x = World.mouseX

    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach();

      knifeSwooshSound.play();

      score = score + 2;
    }

    if (enemyGroup.isTouching(knife)) {
      gameState = END;
      gameOverSound.play();
    } else if (gameState === END) {

      fruitGroup.destroyEach();
      enemyGroup.destroyEach();

      gameOver.visible = true;

      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);

      sword.addImage(game_over)
      sword.x = 200;
      sword.y = 200;

      reset();
      gameState = "PLAY";

    }
  }
  
  fruits();

  enemys();
  
  drawSprites();
}

function fruits() {

  if (World.frameCount % 80 === 0) {

    var fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;

    position = Math.round(random(1, 2));

    if (position == 1) {
      fruit.x = 400
      fruit.velocityX = -(7 + (score / 4));
    } else {
      if (position == 2) {
        fruit.x = 100
        fruit.velocityX = (7 + (score / 4));
      }
    }
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1Image);
    } else if (r == 2) {
      fruit.addImage(fruit2Image);
    } else if (r == 3) {
      fruit.addImage(fruit3Image);
    } else if (r == 4) {
      fruit.addImage(fruit4Image);
    }

    fruit.y = Math.round(random(50, 340));

    fruit.velocityX = -(7 + score / 4);
    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
  }
}

function enemys() {

  if (World.frameCount % 200 === 0) {

    var Enemy = createSprite(400, 200, 20, 20);
    Enemy.addAnimation("alien", enemy_moving);

    Enemy.y = Math.round(random(100, 300));
    Enemy.velocityX = -(8 + (score / 10));
    Enemy.setLifetime = 50;

    enemyGroup.add(Enemy);
  }
}