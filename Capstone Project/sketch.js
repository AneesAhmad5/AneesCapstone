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

//play button
function play_button(){
  let buttonColour = color(100,20,20);
  fill(buttonColour);
  rectMode(CENTER);
  rect(windowWidth/2, windowHeight/2+200, 800, 300);
  fill(0);
  textSize(100);
  text("PLAY", windowWidth/2, windowHeight/2+225);
  if(mouseY > windowHeight/2+350 && mouseY < windowHeight/2+50){
    // console.log("monkey");
    buttonColour = color(0,20,20);
  }
  else{
    buttonColour = color(100,20,20);
  }
}