const WIDTH = 600;
const HEIGHT = 600;

var GAMES = 9; //try to keep a square number

var paddleWidth = 30; //(0-100) percent of bottom of game that paddle takes up
var paddleheight = 2; //(0-100) percent of height of game that paddle takes up
var groundDistance = 2; //percent of screen that is below paddle 

var paddleSpeed = 10; //percent of screen that paddle moves each time the key is pressed
var ballSpeed = 2; //percent of screen that ball can move each time step (mag. of vector)
var maxBallSpeed = 10;

var ballRadius = 3; //percent of screen width ball radius takes up

var ballBounceRotate = 0.1; // how much to randomly rotate vector of veloctiy by when ball bounces

var game_width = WIDTH / Math.sqrt(GAMES);
var game_height = HEIGHT / Math.sqrt(GAMES);

var g;
var g1;

var games = [];

function setup() {
    frameRate(300);
    createCanvas(WIDTH, HEIGHT);
    g = new Game(0, 0);
    g1 = new Game(game_width, 0);

}

function draw() {
    background(155);
    g.show();
    g.move();
    g1.show();
}

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        g.movePaddle(-1);
    }
    if (keyCode == RIGHT_ARROW) {
        g.movePaddle(1);
    }
}