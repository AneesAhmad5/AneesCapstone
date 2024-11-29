// Capstone Project - Cannon Game
// Anees Ahmad
// 11/28/2024
//
// I am creating a two-player game that has two cannons shooting at each other, and whoever survives the longest wins. 

//broadcasting statements that dictate what stage the game is at. 
let menu_screen = true;
let countdown = false;
let game_start = false;
let normal_mode = false;

//setting a colour for the background that will change.
let backgroundRed = 100;
let backgroundGreen = 0;
let backgroundBlue = 0;



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
  else{ //if nothing is received, just make a black screen. 
    background(0);
  }
}

function menu(){
  background(backgroundRed, backgroundGreen, backgroundBlue); //setting the background.
  //the title
  fill(0);
  textAlign(CENTER);
  textFont(titlefont);
  textSize(200);
  text("Cannon Game", windowWidth/2, windowHeight/2-100);
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
  text("PLAY", windowWidth/2, windowHeight/2+225);
  if(mouseY < windowHeight/2+350 && mouseY > windowHeight/2+50 && mouseX > windowWidth/2-400 && mouseX < windowWidth/2+400){ //mouse hover function - changes colour
    print("monkey");
    buttonColour = color(28, 53, 97);
    playcolour = color(36, 74, 43);
  }
  else{
    buttonColour = color(40, 65, 158);
    playcolour = color(69, 140, 81);
  }
}

