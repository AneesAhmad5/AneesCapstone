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

//creating two characters
let player1;
let player2;


//setting a colour for the background that will change.
let backgroundRed = 100;
let backgroundGreen = 10;
let backgroundBlue = 10;
let BlackScreen = false;

//setting a array for either player
player1Projectile = [];
player2Projectile = [];

// WEBSITE FUNCTIONS

function preload() {
  //loading fonts for the title
  titlefont = loadFont("assets/GAMEDAY.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //setting cannon positions. Must be done before creating new cannons and has to be within a system. 
  cannonX = windowWidth * 0.25;
  cannonX2 = windowWidth * 0.75;
  cannonY = 0;        // int(windowHeight * 0.4);
  cannonY2 = 0;       //int(windowHeight * 0.4);
  player1 = new Cannon(cannonX, cannonY, 0);
  angleMode(DEGREES);
  player2 = new Cannon(cannonX2, cannonY2, 0);

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
    fadeIn(200, 196, 255);

  }
  //game page
  else if (game_start === true) {
    game_background();
    renderTerrain();
  }
  else { //if nothing is received, just make a black screen. 
    background(0);
  }

  //key pressing functions.
  //player 1
  if (keyIsDown(83) === true && player1.direction < 10) {
    player1.direction += 5;
  }
  if (keyIsDown(87) === true && player1.direction > -190) {
    player1.direction -= 5;
  }

  //player 2
  if (keyIsDown(UP_ARROW) === true && player2.direction < 190) {
    player2.direction += 5;
  }
  if (keyIsDown(DOWN_ARROW) === true && player2.direction > - 10) {
    player2.direction -= 5;
  }


  //physics
  //checking to see if the cannon touches the ground
  for (let i of terrain_heights) {
    if (int(player1.cannonBase) >= int(i.top) && int(i.left) <= int(player1.x) && int(player1.x) <= int(i.right)) {
      player1.drop = false;
    }
    // print(i.left, i.right);
    // print(player1.x);
    if (int(player2.cannonBase) >= int(i.top) && int(i.left) <= int(player2.x) && int(player2.x) <= int(i.right)) {
      player2.drop = false;
    } 
  }

}

//shooting
function keyPressed(){
  if(keyCode === 70){
    player1Projectile.push(new Projectile(windowWidth/2-20, windowHeight/2, 60, 5, 1));
    print("player1 shot");
  }
  if(keyCode === 16){
    player2Projectile.push(new Projectile(windowWidth/2+20, windowHeight/2, 60, 5, 1));
    print("player2 shot");
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

//all the mouse clicking functions will be here.
function mouseClicked() {
  if (menu_screen === true && mouseY < windowHeight / 2 + 350 && mouseY > windowHeight / 2 + 50 && mouseX > windowWidth / 2 - 400 && mouseX < windowWidth / 2 + 400) {//if mouse is hovering over the play button
    menu_screen = false;
    transitionBlack = true;
    game_start = true;
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

  player1.display();
  player2.display();

  for(missles of player1Projectile){
    missles.display();
  }

  for(missles of player2Projectile){
    missles.display();
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
    terrain_heights.push(new TerrainUnit(x,h));
    time += interval;
  }
}

function renderTerrain() {
  let x = 0;
  for (let u of terrain_heights) {
    u.display();
  }
}

class TerrainUnit {
  constructor(x, h){
    this.x = x;
    this.y = height;
    this.h = h;
    this.top = height-h/2;
    this.left = this.x-terrainUnitWidth/2;
    this.right = this.x+terrainUnitWidth/2;
  }

  display(){
    noStroke();
    fill(backgroundRed * 0.5, backgroundGreen * 0.5, backgroundBlue * 0.5);
    rectMode(CENTER);
    rect(this.x, this.y, terrainUnitWidth, this.h);
  }
}

//CANNON
//player 1
let cannonX;
let cannonY;
//player2
let cannonX2;
let cannonY2;


class Cannon {
  constructor(x, y, direction) { //need to know where each wheel is and if they're touching the ground.
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.forcedown_y = 0;
    this.drop_speed = 0.1;
    this.drop = true;
    this.touching_ground = false;

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
      //rotating the canon
      push();
      translate(this.x, this.y);
      rotate(this.direction);
      rect(-25, 0, 70, 20);
      pop();
    }
    //player 1
    else {
      push();
      translate(this.x, this.y);
      rotate(this.direction);
      rect(25, 0, 70, 20);
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
    if (this.drop === false){
      this.forcedown_y = 0;
    }
    if (this.drop === true) {
      this.y += this.forcedown_y;
      this.wheelY += this.forcedown_y;
      this.forcedown_y = this.forcedown_y + this.drop_speed;
    }


    //hitbox
    this.cannonLeftSide = this.x-35;
    this.cannonRightSide = this.x+35;
    this.cannonTop = this.y - 25;
    this.cannonBase = this.y + 35;
  }

}

class Projectile {
  constructor(x, y, direction, speed, type) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
    this.type = type;
  }

  display(){
    if(this.type === 1){ //rocket type 1

      fill(156, 156, 156); //gray
      rect(this.x, this.y, 10, 20);

      fill(173, 0, 0); //red
      triangle(this.x-10, this.y-10, this.x, this.y-30, this.x+10, this.y-10);  
    }
  }
}
