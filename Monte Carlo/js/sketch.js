/*
 * MONTE CARLO SIMULATION FOR APPROXIMATION OF PI.
 * Author- SAJAL AGRAWAL
 * @sajal.agrawal1997@gmail.com
*/

var now;//keeps track of time only when we update, not continuously
var wait;//a delay value to check against
var slider;
var button;
// grid specific vars
// grid spacing in pixels
var GRID_MINOR_SPACING = 5;
var GRID_MAJOR_SPACING = 50;
// gridline colors
var GRID_MINOR_COLOR = color(200,200,200);
var GRID_MAJOR_COLOR = color(160,160,160);
// gridline weights in pixels
var GRID_MINOR_WEIGHT = 1;
var GRID_MAJOR_WEIGHT = 1.2;

var ans=0;
var counter,inside;
var count=0;

// grid code
function drawGrid() {
    GRID_MINOR_SPACING = 5;
    GRID_MAJOR_SPACING = 50;
    GRID_MINOR_WEIGHT = 1;
    GRID_MAJOR_WEIGHT = 1.2;
    var num_minor_x = width/GRID_MINOR_SPACING;
    var num_minor_y = height/GRID_MINOR_SPACING;
    var num_major_x = width/GRID_MAJOR_SPACING;
    var num_major_y = height/GRID_MAJOR_SPACING;
    push();
    //strokeCap(PROJECT);
    strokeWeight(GRID_MINOR_WEIGHT);
    stroke(200,200,200);
    for (var i = 0; i < num_minor_y; i++) {
      var y = i * GRID_MINOR_SPACING;
      line(0, y, width, y);
    }
    for (var i = 0; i < num_minor_x; i++) {
      var x = i * GRID_MINOR_SPACING;
      line(x, 0, x, height);
    }
    strokeWeight(GRID_MAJOR_WEIGHT);
    stroke(160,160,160);
    for (var i = 0; i < num_major_y; i++) {
      var y = i * GRID_MAJOR_SPACING;
      line(0, y, width, y);
    }
    for (var i = 0; i < num_major_x; i++) {
      var x = i * GRID_MAJOR_SPACING;
      line(x, 0, x, height);
    }
    pop(); 
}

//draws circle and square on canvas
function drawDiagram(){
  fill(255,255,255,0);
  stroke(42, 49, 50);
  strokeWeight(1.2);
  rect(width/2-300,height/2-300,600,600);
  ellipse(width/2,height/2,600,600);
  line(50,height/2,650,height/2);
  line(width/2,50,width/2,650);
  textSize(28);
  fill(0);
  text("radius = r", 450, 385);
}

//initial setup
function setup(){
  noLoop();
  //initialize variables
  wait = 1;
  counter=1;
  inside=0;
  
  createCanvas(700,700);
  background(245);
  now=millis();
  drawGrid();
  drawDiagram();
  
  //input textarea number of experiments
  var inp = createInput('');
  inp.position(35,170);
  inp.size(70);
  inp.input(myInputEvent);
  inp.style("padding", '5px');
  
  //colors for buttons
  var col = color(51, 107, 135);
  var col2 = color(255);
  
  //simulate button
  button = createButton('SIMULATE');
  button.position(115, 170);
  button.mouseClicked(start);
  button.style("background-color", col);
  button.style("color", col2);
  button.style("padding", '5px');
  
  //reset button
  button = createButton('RESET');
  button.position(210, 170);
  button.mouseClicked(clean);
  button.style("background-color", col);
  button.style("color", col2);
  button.style("padding", '5px');
  
  //pause button
  button = createButton('PAUSE SIMULATION');
  button.position(285, 170);
  button.mouseClicked(pause);
  button.style("background-color", col);
  button.style("color", col2);
  button.style("padding", '5px');
  
  //framerate slider
  slider = createSlider(1, 200, 150, 10);
  slider.position(110,215);
  slider.style('width', '80px');
}

//takes user input for no of trials
function myInputEvent(){
    count=this.value();
}

//called when SIMULATE button is clicked
function start(){
    loop();
}

//displays simulation output
function displayResult(){
  fill(255);
  stroke(255);
  rect(25,50,275,150,25);  
  textSize(20);
  fill(0);
  text("m = "+counter, 50, 100);
  text("n = "+inside, 50, 135); 
  text("\u03A0 = "+ans, 50, 170);
}

//called when RESET button is clicked
function clean(){
    clear();
    background(245);
    drawGrid();
    drawDiagram(); 
    counter=1;
    inside=0;
    ans=0;
    displayResult();
}

//called when PAUSE SIMULATION button is clicked
function pause(){
    noLoop();
}

//animation
function draw(){
  var wait = 200-slider.value();
  now=millis();
  while(millis()-now < wait){//if the difference between the last 'stop-watch' update and the current time in millis is lesser than the wait time

  }
  var x=random(350.0,650.0);
  var y=random(50.0,350.0);
  var cx=350,cy=350;

  if((cx-x)*(cx-x)+(cy-y)*(cy-y)>=300*300){   //point lies outside cirlce
    fill(68, 76, 92);
    stroke(8, 76, 92);
  }else{            //point lies inside circle
    inside++;
    fill(225, 177, 106);
    stroke(225, 177, 106);
  }   
  ellipse(x,y,10,10);
  ans=(inside*4)/counter;
  displayResult();  //simulation output
  //console.log("PI="+ans);
  counter++;
  if(counter>count)noLoop();    //stop simulation
}