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



// WEBSITE FUNCTIONS

function preload(){ 
  //loading fonts for the title
  titlefont = loadFont("assets/GAMEDAY.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //setting cannon positions. Must be done before creating new cannons and has to be within a system. 
  cannonX = windowWidth * 0.25;
  cannonX2 = windowWidth * 0.75;
  cannonY = windowHeight *0.75;
  cannonY2 = windowHeight * 0.75;
  player1 = new Cannon(cannonX, cannonY, mouseX);

  player2 = new Cannon(cannonX2, cannonY2, mouseX);
}

function draw() {
  if(menu_screen === true){ //checking for menu broadcast
    menu();
  }
  //transition
  else if (transitionBlack === true){
    fadeOut();
    print(backgroundRed, backgroundGreen, backgroundBlue);
    if(backgroundRed === 0 && backgroundGreen === 0 && backgroundBlue ===0){ //if the colour is black, stop transitioning.
      transitionBlack = false;
      transitionColour = true;
    }
  }
  else if (transitionColour === true){ //transitioning to the colour i need
    fadeIn(200, 196, 255);
    print(backgroundRed, backgroundGreen, backgroundBlue);
  }
  //game page
  else if(game_start === true){
    game_background();
  }
  else{ //if nothing is received, just make a black screen. 
    background(0);
  }

}









//                MENU                 \\
function menu(){
  background(backgroundRed, backgroundGreen, backgroundBlue); //setting the background.
  //the title
  fill(0);
  textAlign(CENTER);
  textFont(titlefont); //new font
  textSize(200); 
  text("Cannon Game", windowWidth/2, windowHeight/2-100);
  //adding a play button as a separate function to clean this up
  play_button();
}

let playcolour = (69, 140, 81); //play text colour
let buttonColour = (40, 65, 158); //play button colour
//play button
function play_button(){ 
  fill(buttonColour);
  rectMode(CENTER);
  rect(windowWidth/2, windowHeight/2+200, 800, 300);
  fill(playcolour);
  textSize(100);
  text("PLAY", windowWidth/2, windowHeight/2+225); // play button
  if(mouseY < windowHeight/2+350 && mouseY > windowHeight/2+50 && mouseX > windowWidth/2-400 && mouseX < windowWidth/2+400){ //mouse hover function - changes colour
    buttonColour = color(28, 53, 97); //second colours
    playcolour = color(36, 74, 43);
  }
  else{
    buttonColour = color(40, 65, 158); // base colours
    playcolour = color(69, 140, 81);
  }
}

//all the mouse clicking functions will be here.
function mouseClicked(){
  if(menu_screen === true && mouseY < windowHeight/2+350 && mouseY > windowHeight/2+50 && mouseX > windowWidth/2-400 && mouseX < windowWidth/2+400 ) {//if mouse is hovering over the play button
    menu_screen = false;
    transitionBlack = true;
    game_start = true;
    print(menu_screen);
  }
}


//    TRANSITIONING    \\

//adding a fading transition that can be applied
function fadeOut(){
  //fade into black
  background(backgroundRed, backgroundGreen, backgroundBlue);
  if(backgroundRed > 0){ 
    backgroundRed -= 1; 
  }
  if(backgroundBlue > 0){
    backgroundBlue -= 1;
  }
  if(backgroundGreen > 0){
    backgroundGreen -= 1;
  }
}

function fadeIn(r, g, b){
  background(backgroundRed, backgroundGreen, backgroundBlue);
  //fade into specfied colour
  if(backgroundRed < r){
    backgroundRed += 1; 
  }
  if(backgroundBlue < b){
    backgroundBlue += 1;
  }
  if(backgroundGreen < g){
    backgroundGreen += 1;
  }
  if(backgroundRed === r && backgroundGreen === g && backgroundBlue ===b){ //once the colour has been applied, stop. 
    transitionColour = false;
  }
}



//        GAME SETUP        \\
function game_background(){
  background(backgroundRed, backgroundGreen, backgroundBlue); //setting the background.
  createTerrain();
  player1.display();
  player2.display();
}

//TERRAIN GENERATING
//setting variables for the terrain 
let terrainUnitWidth = 10; //width of each terrain unit
let interval = 0.01; //the difference in unit heights
function createTerrain(){
  let time = 0;
  for(let x = 0; x < width; x += terrainUnitWidth){
    let y = noise(time) * height;
    noStroke();
    fill(backgroundRed*0.5, backgroundGreen *0.5, backgroundBlue*0.5);
    rect(x, height, terrainUnitWidth, -1*y);
    time += interval;  
  }
}

//CANNON
//player 1
let cannonX;
let cannonY;
//player2
let cannonX2;
let cannonY2;


class Cannon{
  constructor(x,y,direction){
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
  display(){
    stroke(0);
    fill(122, 63, 0);
    circle(this.x, this.y, 50);
    rectMode(CENTER);
    fill(99, 95, 91);
    if(this.x > windowWidth/2){
      rect(this.x-25, this.y, 70, 20);
    }
    else{
      rect(this.x+25, this.y, 70, 20);
    }
    rect(this.x, this.y+25, 50, 20);
  }

} 

