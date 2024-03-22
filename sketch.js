var splashscreen;
var playbutton, aboutbutton;
var gameState = "wait";
var health1 = 200;
var maxhealth1 = 200;
var score1 = 0;
var bgwait, reward, rewardGroup;
var playerimg, player;
var enemy, enemyimg, enemyGroup;
var fuelimg, starimg, fuelGroup, starGroup;
var bg2, bg3;
var meteorimg, meteor, meteorGroup;
var enemy2, enemyimg2;
var enemy3, enemyimg3;
var cometimg, comet;
var score2 = 0;
var health2 = 200;
var maxhealth2 = 200;
var enemyGroup2, fuelGroup2, meteorGroup2
var gameOverSound,winSound,hitSound,shootSound;

function preload() {
  splashscreen = loadImage("assets/The hunters union.gif");
  bgwait = loadImage("assets/background.png");
  playerimg = loadImage("assets/Alien_UFO.png");

  enemyimg = loadImage("assets/Alien_UFO_against.png");
  enemyimg2 = loadImage("assets/Alien_UFO_against2.png");
  enemyimg3 = loadImage("assets/Alien_UFO_against3.png");
  fuelimg = loadImage("assets/fuel.png");
  starimg = loadImage("assets/Star.png");
  bg2 = loadImage("assets/background_L2.png");
  bg3 = loadImage("assets/background_L3.png");
  meteorimg = loadImage("assets/meteor.png");
  cometimg = loadImage("assets/comet.png");
  hitSound = loadSound("assets/bulletHit.mp3");
  gameOverSound = loadSound("assets/bulletHit.mp3");
  winSound = loadSound("assets/win.mp3");
  shootSound = loadSound("assets/shooting.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  playbutton = createImg("assets/Play_button.png");
  playbutton.position(width - 300, height - 100);
  playbutton.size(200, 75);

  aboutbutton = createImg("assets/info.png");
  aboutbutton.position(1, 1);
  aboutbutton.size(200, 75);

  player = createSprite(50, 50);
  player.addImage(playerimg);
  player.scale = 0.4;
  player.visible = false;

  // create Groups
  fuelGroup = new Group();
  enemyGroup = new Group();
  meteorGroup = new Group();

  // create Groups
  fuelGroup2 = new Group();
  enemyGroup2 = new Group();
  meteorGroup2 = new Group();
}

function draw() {
  if (gameState == "wait") {
    background(splashscreen);
  }
  playbutton.mousePressed(() => {
    gameState = "play";
    playbutton.hide();
  });

  aboutbutton.mousePressed(() => {
    gameState = "aboutgame";
    aboutbutton.hide();
  });

  if (gameState == "aboutgame") {
    aboutpopup();
  }

  if (gameState == "play") {
    background(bgwait);
    player.visible = true;
    aboutbutton.hide();
    playbutton.hide();
    // health bar
    healthBar(width - 300, 33, health1, maxhealth1, "violet");

    // target
    healthBar(155, 33, score1, 200, "green");
    movement();
    spawnRewards();
    spawnEnemy();

    // fireball touching enemy
    for (var i = 0; i < meteorGroup.length; i++) {
      if (meteorGroup.isTouching(enemyGroup.get(i))) {
        hitSound.play()
        score1 += 10;
        enemyGroup.get(i).remove();
        meteorGroup.destroyEach();
      }
    }

    // player touching enemy
    for (var i = 0; i < enemyGroup.length; i++) {
      if (player.isTouching(enemyGroup.get(i))) {
        enemyGroup.get(i).remove();

        health1 -= 10;
      }
    }

    // player touching reward
    for (var i = 0; i < fuelGroup.length; i++) {
      if (player.isTouching(fuelGroup.get(i))) {
        fuelGroup.get(i).remove();

        if (health1 < maxhealth1) {
          health1 += 5;
        }
      }
    }

    if (score1 >= 200 && health1 >= 20) {
      nextlevelpopup();
      enemyGroup.destroyEach();
      meteorGroup.destroyEach();
      player.visible = false;
      fuelGroup.destroyEach();
    }
  }

  // level 2 start
  if (gameState == "level2") {
    background(bg2);
    player.visible = true;

    movement1();
    spawnEnemy2();
    spawnRewards2();

    // health bar
    healthBar(width - 300, 33, health2, maxhealth2, "violet");

    // target

    healthBar(155, 33, score2, 200, "green");

    // fireball touching enemy
    for (var i = 0; i < meteorGroup2.length; i++) {
      if (meteorGroup2.isTouching(enemyGroup2.get(i))) {
        hitSound.play()
        score2 += 10;
        enemyGroup2.get(i).remove();
        meteorGroup2.destroyEach();
       console.log ("metortouched")
      }
    }

    // player touching enemy
    for (var i = 0; i < enemyGroup2.length; i++) {
      if (player.isTouching(enemyGroup2.get(i))) {
        enemyGroup2.get(i).remove();

        health2 -= 50;
      }
    }

    // player touching reward
    for (var i = 0; i < fuelGroup2.length; i++) {
      if (player.isTouching(fuelGroup2.get(i))) {
        fuelGroup2.get(i).remove();

        if (health2 < maxhealth2) {
          health2 += 100;
        }
      }
    }

    if (score2 >= 200 && health2 >= 20) {
      winSound.play()
      FinalWin();
      enemyGroup2.destroyEach();
      meteorGroup2.destroyEach();
      player.visible = false;
      fuelGroup2.destroyEach();
    }


    if(health2<=15){
      fuelGroup2.destroyEach();
      enemyGroup2.destroyEach();
      meteorGroup2.destroyEach();
 
      GameOver()
    }
  }

  drawSprites();

  if (gameState == "play") {
    textSize(50);
    stroke("red");
    strokeWeight(4);
    fill("yellow");
    text("LEVEL 1", width / 2 - 100, 50);
    textSize(30);
    fill("cyan");
    stroke("red");
    text("TARGET :", 15, 50);
  }

  if (gameState == "level2") {
    textSize(50);
    stroke("red");
    strokeWeight(4);
    fill("yellow");
    text("LEVEL 2", width / 2 - 100, 50);
    textSize(30);
    fill("cyan");
    stroke("red");
    text("TARGET :", 15, 50);
  }
}

function aboutpopup() {
  swal(
    {
      title: "HOW TO  UNITE - AGAINST THE ODDS !!!",
      text: "Come on, lets unite together out in space. Pass all the enimies and collect stuf on your journey to increase your health. Dont forget to level up.",
      textAlign: "center",
      imageUrl: "assets/Alien_UFO.png",
      imageSize: "200x200",
      confirmButtonText: "LET's UNITE!!!",
      confirmButtonColor: "#0000bf",
    },
    function () {
      gameState = "wait";
    }
  );
}

function healthBar(x, y, h, mx, clr) {
  noFill();
  stroke("cyan");
  strokeWeight(2);
  rect(x, y, mx, 20);
  fill(clr);
  rect(x, y, h, 20);
}

function spawnRewards() {
  if (frameCount % 250 == 0) {
    reward = createSprite(
      Math.round(random(10, width - 100)),
      Math.round(random(50, height - 100)),
      50,
      50
    );
    reward.addImage(fuelimg);
    reward.scale = 0.295;
    fuelGroup.add(reward);
  }
}

function movement() {
  if (keyDown("RIGHT")) {
    player.x += 5;
  }
  if (keyDown("DOWN")) {
    player.y += 5;
  }
  if (keyDown("LEFT")) {
    player.x -= 5;
  }
  if (keyDown("UP")) {
    player.y -= 5;
  }

  if (keyDown("space")) {
    shootSound.play()
    if (frameCount % 10 == 0) {
      meteor = createSprite(player.x, player.y);
      meteor.velocityX = 15;
      meteor.scale = 0.25;
      meteor.addImage(meteorimg);
      player.depth = meteor.depth;
      meteor.depth = +1;
      // meteor.debug = true;
      meteorGroup.add(meteor);
    }
  }
}

function spawnEnemy() {
  if (frameCount % 60 == 0) {
    enemy = createSprite(width, Math.round(random(50, height - 150)));
    enemy.velocityX = -7;
    enemy.addImage(enemyimg);
    enemy.scale = 0.4;
    // enemy.debug = true;
    enemyGroup.add(enemy);
  }
}

function nextlevelpopup() {
  swal(
    {
      title: "Congratulations!!! You have successfully completed level 1!",
      text: "Now, dive into the next level. Lets Unite once again in the next level and you are left with just one more step to getting back home. Just click on the button below!",
      textAlign: "center",
      imageUrl: "assets/Alien_UFO.png",
      imageSize: "200x200",
      confirmButtonText: "Start Level 2!",
      confirmButtonColor: "blue",
    },
    function () {
      gameState = "level2";
    }
  );
}

//level 2
function spawnRewards2() {
  if (frameCount % 200 == 0) {
    reward = createSprite(
      Math.round(random(10, width - 100)),
      Math.round(random(50, height - 100)),
      50,
      50
    );
    reward.addImage(fuelimg);
    reward.scale = 0.3;

    fuelGroup2.add(reward);
  }
}

function spawnEnemy2() {
  if (frameCount % 60 == 0) {
    enemy2 = createSprite(width, Math.round(random(50, height - 150)));
    // enemy2.addImage(enemyimg2)
    enemy2.scale = 0.5;
    enemy2.velocityX = -7;
    // enemy2.debug=true

    rand1 = Math.round(random(1, 3));

    switch (rand1) {
      case 1:
        enemy2.addImage(enemyimg2);
        break;

      case 2:
        enemy2.addImage(enemyimg3);
        break;
      case 3:
        enemy2.addImage(enemyimg);
        break;

      default:
        break;
    }

    enemyGroup2.add(enemy2);
  }
}

function winpopup() {
  swal(
    {
      title: "Congratulations!!! You have successfully completed level 1!",
      text: "Now, dive into level 2 and get another step closer to locating the missing Avengers and Nick Fury, Just click on the button below!",
      textAlign: "center",
      imageUrl: "assets/captain_america.png",
      imageSize: "200x200",
      confirmButtonText: "Start Level 2!",
      confirmButtonColor: "blue",
    },
    function (isConfirm) {
      if (isConfirm) {
        score1 = 0;
        health1 = 200;
        maxhealth1 = 200;
        gameState = "wait";
        location.reload();
      }
    }
  );
}


function movement1() {
  if (keyDown("RIGHT")) {
    player.x += 5;
  }
  if (keyDown("DOWN")) {
    player.y += 5;
  }
  if (keyDown("LEFT")) {
    player.x -= 5;
  }
  if (keyDown("UP")) {
    player.y -= 5;
  }

  if (keyDown("space")) {
    shootSound.play()
    if (frameCount % 10 == 0) {
      meteor = createSprite(player.x, player.y);
      meteor.velocityX = 15;
      meteor.scale = 0.25;
      meteor.addImage(meteorimg);
      player.depth = meteor.depth;
      meteor.depth = +1;
      // meteor.debug = true;
      meteorGroup2.add(meteor);
    }
  }
}


function FinalWin() {
  swal(
    {
      title: "Congratulations Marsian, We have united together and achieved our target",
      text: "Well done Marsian, now you may go back home and lets unite to gether later.",
      textAlign: "center",
      imageUrl: "assets/alienFace.png",
      imageSize: "200x200",
      confirmButtonText: "Restart",
      confirmButtonColor: "blue",
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}


function GameOver() {
  swal(
    {
      title: "GAME OVER",
      text: "AWW!! YOU LOST!! ",
      textAlign: "center",
      imageUrl: "assets/GameOver.png",
      imageSize: "200x200",
      confirmButtonText: "Restart",
      confirmButtonColor: "blue",
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
