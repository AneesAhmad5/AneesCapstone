// Capstone Project - Cannon Game
// Anees Ahmad
// 11/28/2024
//
// I am creating a two-player game that has two cannons shooting at each other, and whoever survives the longest wins. 

//broadcasting statements that dictate what stage the game is at. 
let menu_screen = true;
let transitionBlack = false;
let transitionColour = false;
let countdown = false;
let game_start = false;
let normal_mode = false;
let game_over = false;

//creating two characters
let player1;
let player2;
//CANNON
//player 1
let cannonX;
let cannonY;
let elapsed_timeA = 0, start_timeA = 0;
//player2
let cannonX2;
let cannonY2;
let elapsed_timeB = 0, start_timeB = 0;

//setting a variable to see the rocket's speed change rate
let change_rate = 0;

//setting a variable to change missle types
let missle_type = 1;

//setting a colour for the background that will change.
let backgroundRed = 100;
let backgroundGreen = 10;
let backgroundBlue = 10;
let BlackScreen = false;

//setting a array for either player
player1Projectile = [];
player2Projectile = [];

//setting an array to carry explosions
explosions = [];

// WEBSITE FUNCTIONS

function preload() {
  //loading fonts for the title
  titlefont = loadFont("assets/GAMEDAY.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //degrees for rotating cannon and projectiles
  angleMode(DEGREES);

  //setting cannon positions. Must be done before creating new cannons and has to be within a system. 
  cannonX = windowWidth * 0.25;
  cannonX2 = windowWidth * 0.75;
  cannonY = 0;        // int(windowHeight * 0.4);
  cannonY2 = 0;       //int(windowHeight * 0.4);

  //adding the cannon variables and their power meters
  player1 = new Cannon(cannonX, cannonY, 0);
  power_gauge1 = new PowerMeter(0, windowHeight / 2, 5);

  player2 = new Cannon(cannonX2, cannonY2, 0);
  power_gauge2 = new PowerMeter(windowWidth, windowHeight / 2, 5);

  //generating the terrain
  createTerrain();

}

function draw() {

  if (menu_screen === true) { //checking for menu broadcast
    menu();
  }
  //transition
  else if (transitionBlack === true) {
    fadeOut();

    if (backgroundRed === 0 && backgroundGreen === 0 && backgroundBlue === 0) { //if the colour is black, stop transitioning.
      transitionBlack = false;
      transitionColour = true;
    }
  }
  else if (transitionColour === true) { //transitioning to the colour i need
    fadeIn(200, 196, 255);                                                                                                  ///change colour here

  }
  //game page
  else if (game_start === true) {
    game_background();
    renderTerrain();
  }
  else if (game_over === true) {
    game_over_screen();
  }
  else { //if nothing is received, just make a black screen. 
    background(0);
  }




  //key pressing functions.
  //player 1
  if (keyIsDown(83) === true && player1.direction > -10) {
    player1.direction -= 1;
  }
  if (keyIsDown(87) === true && player1.direction < 190) {
    player1.direction += 1;
  }

  //player 2
  if (keyIsDown(UP_ARROW) === true && player2.direction > -190) {
    player2.direction -= 1;
  }
  if (keyIsDown(DOWN_ARROW) === true && player2.direction < 10) {
    player2.direction += 1;
  }




  //physics for cannon
  //checking to see if the cannon touches the ground
  for (let i of terrain_heights) {
    if (int(player1.cannonBase) >= int(i.top) && int(i.left) <= int(player1.x) && int(player1.x) <= int(i.right)) {
      player1.drop = false;
    }
    if (int(player2.cannonBase) >= int(i.top) && int(i.left) <= int(player2.x) && int(player2.x) <= int(i.right)) {
      player2.drop = false;
    }
  }

  if (start_timeA > 0 && game_start === true) { //displaying the gauges once the timer begins
    power_gauge1.display();
  }
  if (start_timeB > 0 && game_start === true) {
    power_gauge2.display();
  }
  //resetting meter colours
  if (start_timeA === 0) {
    power_gauge1.empty_gauge();
    power_gauge1.rate = 1
  }
  if (start_timeB === 0) {
    power_gauge2.empty_gauge();
    power_gauge2.rate = 1;
  }
  print(missle_type);
}





//shooting
function keyReleased() {
  if (keyCode === 70) { //"F" key
    elapsed_timeA = millis() - start_timeA;
    player1Projectile.push(new Projectile(player1.x, player1.y, player1.direction + 90, elapsed_timeA / 100 + 2, missle_type));
    start_timeA = 0;
  }
  if (keyCode === 76) { //"L" key
    elapsed_timeB = millis() - start_timeB;
    //                                                       the direction must have 90 added or subtracted because of the difference in starting positions.
    player2Projectile.push(new Projectile(player2.x, player2.y, player2.direction - 90, elapsed_timeB / 100 + 2, missle_type)); //creates new projectile at the cannon position
    start_timeB = 0;
  }
}


//creating a function to set the fire gauge


function keyPressed() {
  if (keyIsDown(70)) {
    start_timeA = millis();
  }
  if (keyIsDown(76)) {
    start_timeB = millis();
  }
}





//                MENU                 \\
function menu() {
  background(backgroundRed, backgroundGreen, backgroundBlue); //setting the background.
  //the title
  fill(0);
  textAlign(CENTER);
  textFont(titlefont); //new font
  textSize(200);
  text("Cannon Game", windowWidth / 2, windowHeight / 2 - 100);
  //adding a play button as a separate function to clean this up
  play_button();
  controls();
  versions();
}

let playcolour = (69, 140, 81); //play text colour
let buttonColour = (40, 65, 158); //play button colour
//play button
function play_button() {
  fill(buttonColour);
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 2 + 200, 800, 300);
  fill(playcolour);
  textSize(100);
  text("PLAY", windowWidth / 2, windowHeight / 2 + 225); // play button
  if (mouseY < windowHeight / 2 + 350 && mouseY > windowHeight / 2 + 50 && mouseX > windowWidth / 2 - 400 && mouseX < windowWidth / 2 + 400) { //mouse hover function - changes colour
    buttonColour = color(28, 53, 97); //second colours
    playcolour = color(36, 74, 43);
  }
  else {
    buttonColour = color(40, 65, 158); // base colours
    playcolour = color(69, 140, 81);
  }
}

//adding a function to include player controls 
function controls() {
  fill(0);
  textSize(20);
  //player 1
  text("Player 1:", windowWidth * 0.125, windowHeight / 2 + 100)
  text("W + S to move cannon", windowWidth * 0.125, windowHeight / 2 + 160)
  text("F to shoot", windowWidth * 0.125, windowHeight / 2 + 220)

  //player 2
  text("Player 2:", windowWidth * 0.875, windowHeight / 2 + 100)
  text("UP + DOWN ARROW to move cannon", windowWidth * 0.875, windowHeight / 2 + 160)
  text("L to shoot", windowWidth * 0.875, windowHeight / 2 + 220)
}

//adding a tab to select projectile types

function versions() {
  rectMode(CENTER);
  fill(buttonColour);
  rect(windowWidth / 2, windowHeight * 0.1 - 10, 200, 40);
  textAlign(CENTER);
  fill(playcolour);
  textSize(30);
  //switching text to display missle type
  if (missle_type === 1) {
    text("VERSION 1", windowWidth / 2, windowHeight * 0.1);
  }
  else if (missle_type === 2) {
    text("VERSION 2", windowWidth / 2, windowHeight * 0.1);
  }
  //hover changes colour
  // if (menu_screen === true && mouseY < windowHeight * 0.1 - 5 && mouseY < windowHeight * 0.1 + 5 && mouseX > windowWidth - 100 && mouseX < windowWidth + 100) {
  //   buttonColour = color(0); //second colours
  //   playcolour = color(36, 74, 43);
  // }
  // else {
  //   buttonColour = color(40, 65, 158); // base colours
  //   playcolour = color(69, 140, 81);
  // }
}

//all the mouse clicking functions will be here.
function mouseClicked() {
  if (menu_screen === true && mouseY < windowHeight / 2 + 350 && mouseY > windowHeight / 2 + 50 && mouseX > windowWidth / 2 - 400 && mouseX < windowWidth / 2 + 400) {//if mouse is hovering over the play button
    menu_screen = false;
    transitionBlack = true;
    game_start = true;
  }
  else if (menu_screen === true && mouseY > windowHeight * 0.1 - 5 && mouseY < windowHeight * 0.1 + 5 && mouseX > windowWidth / 2 - 100 && mouseX < windowWidth / 2 + 100) {

    missle_type++;
  }
  //versions cant cycle out of range
  if (missle_type > 2) {
    missle_type = 1;
  }
}


//    TRANSITIONING    \\

//adding a fading transition that can be applied
function fadeOut() {
  //fade into black
  background(backgroundRed, backgroundGreen, backgroundBlue);
  if (backgroundRed > 0) {
    backgroundRed -= 1;
  }
  if (backgroundBlue > 0) {
    backgroundBlue -= 1;
  }
  if (backgroundGreen > 0) {
    backgroundGreen -= 1;
  }
}

function fadeIn(r, g, b) {
  background(backgroundRed, backgroundGreen, backgroundBlue);
  //fade into specfied colour
  if (backgroundRed < r) {
    backgroundRed += 1;
  }
  if (backgroundBlue < b) {
    backgroundBlue += 1;
  }
  if (backgroundGreen < g) {
    backgroundGreen += 1;
  }
  if (backgroundRed === r && backgroundGreen === g && backgroundBlue === b) { //once the colour has been applied, stop. 
    transitionColour = false;
  }
}



//        GAME SETUP        \\
function game_background() {
  background(backgroundRed, backgroundGreen, backgroundBlue); //setting the background.


  for (missles of player1Projectile) {
    missles.action();
  }

  for (missles of player2Projectile) {
    missles.action();
  }

  player1.display();
  player2.display();

  // deleting missles if they go out of range
  for (let missles of player1Projectile) {
    if (missles.pos.x < 0) { // left side
      player1Projectile.splice(missles, 1);
    }
    if (missles.pos.x > windowWidth) {  // right side
      player1Projectile.splice(missles, 1);
    }
    if (missles.pos.y > windowHeight) { //bottom of page
      player1Projectile.splice(missles, 1);
    }
    //missles cannot go out of bounds going upwards.

    //missle Contact
    //player1 missles
    if (missles.ProjectileRight >= player2.cannonLeftSide && missles.ProjectileRight <= player2.cannonRightSide && missles.ProjectileBottom >= player2.cannonTop && missles.ProjectileBottom <= player2.cannonBase) {
      player1Projectile.splice(missles, 1);
      player2.health_amount -= 1;
      explosions.push(new Explosion(missles.pos.x, missles.pos.y)) //creates an explosion
    }
  }

  for (let missles of player2Projectile) {
    if (missles.pos.x < 0) { // left side
      player2Projectile.splice(missles, 1);
    }
    if (missles.pos.x > windowWidth) { // right side
      player2Projectile.splice(missles, 1);
    }
    if (missles.pos.y > windowHeight) { //bottom of page
      player2Projectile.splice(missles, 1);
    }
    //missles cannot go out of bounds going upwards.
    //missle contact
    //player2 missles
    if (missles.ProjectileLeft <= player1.cannonRightSide && missles.ProjectileLeft >= player1.cannonLeftSide && missles.ProjectileBottom >= player1.cannonTop && missles.ProjectileBottom <= player1.cannonBase) {
      player2Projectile.splice(missles, 1);
      player1.health_amount -= 1;
      explosions.push(new Explosion(missles.pos.x, missles.pos.y)) //creates an explosion
    }
  }

  //adding the explosion rendering
  for (let i of explosions) {
    i.display();
    print('boom');
    if (i.opacity < 0) {
      explosions.splice(i, 1);
    }
  }


  //game OVER
  if (player1.health_amount === 0 || player2.health_amount === 0) {
    game_over = true;
    game_start = false;
  }

}

function game_over_screen() {
  background(backgroundRed, backgroundGreen, backgroundBlue);
  fill(0);
  textAlign(CENTER);
  textFont(titlefont); //new font
  textSize(200);
  if (player2.health_amount === 0) {
    text("PLAYER 1 WINS", windowWidth / 2, windowHeight / 2);
  }
  else {
    text("PLAYER 2 WINS", windowWidth / 2, windowHeight / 2);
  }

}

let terrain_heights = [];

//TERRAIN GENERATING
//setting variables for the terrain 
let terrainUnitWidth = 10; //width of each terrain unit
let interval = 0.01; //the difference in unit heights
function createTerrain() {
  let time = 0;
  for (let x = 0; x < width; x += terrainUnitWidth) {
    let h = noise(time) * height;

    // terrain_heights.push(int(y));
    terrain_heights.push(new TerrainUnit(x, h));
    time += interval;
  }
}

function renderTerrain() {
  for (let u of terrain_heights) { //creating the terrain units
    u.display();
  }
}

class TerrainUnit { //creating a class for the terrain so that each individual part can be located and given a hitbox
  constructor(x, h) {
    this.x = x;
    this.y = height;
    this.h = h;
    this.top = height - h / 2;
    this.left = this.x - terrainUnitWidth / 2;
    this.right = this.x + terrainUnitWidth / 2;
  }

  display() {
    noStroke();
    fill(backgroundRed * 0.5, backgroundGreen * 0.5, backgroundBlue * 0.5);
    rectMode(CENTER);
    rect(this.x, this.y, terrainUnitWidth, this.h);
  }
}


// CANNON

class Cannon {
  constructor(x, y, direction) { //pretty self-explanatory variables
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.forcedown_y = 0; //  gravity
    this.drop_speed = 0.1; // <
    this.drop = true; //      <
    this.touching_ground = false;
    this.health_amount = 5;

    //hitbox
    this.cannonLeftSide;
    this.cannonRightSide;
    this.cannonTop;
    this.cannonBase;
  }
  display() {
    noStroke();
    fill(31, 26, 26);
    //cannon barrel
    //player 2
    rectMode(CENTER);
    if (this.x > windowWidth / 2) {
      //rotating the cannon
      push();
      translate(this.x, this.y);
      rotate(this.direction);
      rect(25, 0, 70, 20);
      pop();
    }
    //player 1
    else {
      push();
      translate(this.x, this.y); //rotation
      rotate(this.direction);
      rect(-25, 0, 70, 20);
      pop();
    }
    fill(31, 26, 26);
    //cannon head
    circle(this.x, this.y, 50);
    rectMode(CENTER);
    //wheels - optional
    fill(0);

    //cannon base
    fill(122, 63, 0);
    rect(this.x, this.y + 25, 70, 20);
    //making it drop\\
    if (this.drop === false) {
      this.forcedown_y = 0;
    }
    if (this.drop === true) {
      this.y += this.forcedown_y; //adding gravity to the Y position
      this.forcedown_y = this.forcedown_y + this.drop_speed; //making the force generate overtime
    }

    //health bar
    fill(3, 252, 32);
    if (this.health_amount === 1) { circle(this.x - 50, this.y - 50, 20); } //1 HEALTH
    if (this.health_amount === 2) { circle(this.x - 25, this.y - 50, 20); circle(this.x - 50, this.y - 50, 20); } //2 HEALTH
    if (this.health_amount === 3) { circle(this.x, this.y - 50, 20); circle(this.x - 25, this.y - 50, 20); circle(this.x - 50, this.y - 50, 20); } //3 HEALTH
    if (this.health_amount === 4) { circle(this.x + 25, this.y - 50, 20); circle(this.x, this.y - 50, 20); circle(this.x - 25, this.y - 50, 20); circle(this.x - 50, this.y - 50, 20); } //4 HEALTH
    if (this.health_amount === 5) { circle(this.x + 50, this.y - 50, 20); circle(this.x + 25, this.y - 50, 20); circle(this.x, this.y - 50, 20); circle(this.x - 50, this.y - 50, 20); circle(this.x - 25, this.y - 50, 20); }  //5 HEALTH

    //hitbox
    this.cannonLeftSide = this.x - 35;
    this.cannonRightSide = this.x + 35;
    this.cannonTop = this.y - 25;
    this.cannonBase = this.y + 35;
  }

}



// PROJECTILE TYPES


class Projectile {
  constructor(x, y, direction, speed, type) {
    this.pos = createVector(x, y); //creating a position vector 
    this.type = type;
    this.velocity = createVector(speed * cos(direction + 90), speed * sin(direction + 90)); //creating a velocity vector which horizantally moves the rocket by the adjacent direction to the angle of the cannon, 
    //and then again using sine to find the vertical angle relative to the cannon angle
    this.gravity = createVector(0, 0.1); //creating a gravity vector that only moves the rocket downwards over time.

    //hitbox
    this.ProjectileRight = 0;
    this.ProjectileLeft = 0;
    this.ProjectileTop = 0;
    this.ProjectileBottom = 0;
  }

  display() {
    if (this.type === 1) { //rocket type 1

      //creating a new grid to turn the rocket on
      push();
      translate(this.pos.x, this.pos.y);

      //turning the rocket image
      rotate(this.velocity.heading() + 90);

      //rocket body
      fill(156, 156, 156); //gray
      rect(0, 0, 10, 20);

      //rocket head
      fill(173, 0, 0); //red
      triangle(-10, 0 - 10, 0, -30, 10, -10);
      pop();


      //hitbox
      this.ProjectileRight = this.pos.x + 20;
      this.ProjectileLeft = this.pos.x - 20;
      this.ProjectileTop = this.pos.y - 20;
      this.ProjectileBottom = this.pos.y + 20;
    }
    //rocket type 2 (WIP)
//     if (this.type === 2) { //fireball
//       // creating a new grid to turn the rocket on
//       push();
//       translate(this.pos.x, this.pos.y);
// // 
//       // turning the rocket image
//       rotate(this.velocity.heading() + 90);
// // 
//       // fireball
//       fill(252, 143, 0); //orange-yellow
//       circle(0, 0, 20);
//       pop();
//     }
  }
  move() {
    //physics to move the rocket
    this.pos.add(this.velocity); //change the position of the rocket (x,y)
    this.velocity.add(this.gravity); //adding gravity to the velocity of the rocket
  }
  action() { //displaying all individual parts
    this.display();
    this.move();
  }
}

//  POWER METER
class PowerMeter { //--adding a rate to know how fast the meter moves up. Depends on time variable
  constructor(x, y, rate) {
    this.x = x;
    this.y = y;
    this.rate = rate;
    //creating colours for the fire gauge
    this.fire_gauge_red = 255;
    this.fire_gauge_green = 0;
    this.fire_gauge_blue = 0;
  }
  display() {
    //fire gauge
    fill(this.fire_gauge_red, this.fire_gauge_green, this.fire_gauge_blue);
    rect(this.x, this.y, 30, this.rate);

    //changing gauge colours
    if (this.fire_gauge_red >= 255) {
      this.fire_gauge_green += 10;
    }
    if (this.fire_gauge_green >= 255) {
      this.fire_gauge_red -= 10;
    }
    if (this.fire_gauge_red <= 0) {
      this.fire_gauge_blue += 10;
    }
    if (this.fire_gauge_blue >= 255) {
      this.fire_gauge_green -= 10;
    }


    this.rate += 2;
  }
  empty_gauge() {
    this.fire_gauge_red = 255;
    this.fire_gauge_green = 0;
    this.fire_gauge_blue = 0;
  }

}

//eXPLOSION
class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.opacity = 200
  }
  display() {
    fill(252, 84, 0, this.opacity);
    circle(this.x, this.y, 100);
    this.opacity -= 5;
  }
}
