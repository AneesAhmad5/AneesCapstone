// Capstone Project - Cannon Game
// Anees Ahmad
// 11/28/2024
//
// I am creating a two-player game that has two cannons shooting at each other, and whoever survives the longest wins. 

//broadcasting statements that dictate what stage the game is at. 
let menu_screen = true;
let transition = false;
let countdown = false;
let game_start = false;
let normal_mode = false;

//setting a colour for the background that will change.
let backgroundRed = 100;
let backgroundGreen = 0;
let backgroundBlue = 0;
let BlackScreen = false;


function preload(){ 
  //loading fonts for the title
  titlefont = loadFont("assets/GAMEDAY.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if(menu_screen === true){ //checking for menu broadcast
    menu();
  }
  //transition
  else if (transition === true){
    if(BlackScreen === false){
      fadeOut();
    }
    if(BlackScreen !== true){ // FIX THIS <-----------------------------------------------------------------------
      fadeOut;
    }
    print(backgroundRed, backgroundGreen, backgroundBlue);
    transition = false;
    BlackScreen = false;
  }
  //game page
  else if(game_start === true){
    game_background();
  }
  else{ //if nothing is received, just make a black screen. 
    background(0);
  }
}

//creating the menu
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
    transition = true;
    print(menu_screen);
  }
}


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
  if(backgroundRed < r){
    backgroundRed += 1; 
  }
  if(backgroundBlue > b){
    backgroundBlue += 1;
  }
  if(backgroundGreen > g){
    backgroundGreen += 1;
  }
}

function game_background(){
  background(backgroundRed, backgroundGreen, backgroundBlue); //setting the background.
}