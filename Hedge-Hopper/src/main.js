/* Game constants */
var WIDTH = 1000;
var HEIGHT = 400;

var WARMUP = 60; //frames before spawning anything

var HEDGE_WIDTH = 40;
var HEDGE_HEIGHT_MIN = 70;
var HEDGE_HEIGHT_MAX = 150;
var HEDGE_SPEED = 6.5;

var PLAYER_WIDTH = 30;
var PLAYER_HEIGHT = 70;
var PLAYER_X = PLAYER_WIDTH * 5;

var START_HEDGE_INTERVAL = 110;
var HEDGE_INTERVAL = START_HEDGE_INTERVAL; //frames between spawns
var MIN_HEDGE_INTERVAL = 50;
var HEDGE_INTERVAL_DECREASE = 5; //decrease in interval every spawn

var JUMP_PENALTY = 0.5; //try to keep jump penalty less than hedge score as then genomes just kill themselves
var SCORE_PER_HEDGE = 1;

var spawnCounter = 0;
var spawning = false;

/* player variables */
var JUMP_STRENGTH = 12; //how much to increase upwards velocity by every jump
var GRAV = 1.5;// how much to decrease upwards velocity every frame

var closestHedge;

var BGCOLOR = 123;

var floorHeight = 20;
var floorY = HEIGHT - floorHeight;

var hedges = [];
var players = [];
var iteration = 0;


function setup() {
    createCanvas(WIDTH, HEIGHT);
    background(BGCOLOR);

    initNeat();
    startEvaluation();
}
function draw() {
    background(BGCOLOR);

    if (iteration == ITERATIONS) {
        endEvaluation();
        iteration = 0;
        hedges = [];
        HEDGE_INTERVAL = START_HEDGE_INTERVAL;
    }
    var alive = false;
    for (let i = 0; i < players.length; i++) {
        if (players[i].alive) {
            alive = true;
        }
    }

    if (!alive) {
        hedges = [];
        closestHedge = null;
        endEvaluation();
        iteration = 0;
        HEDGE_INTERVAL = START_HEDGE_INTERVAL;
    }

    //don't spawn hedges until warmup is over;
    if (spawnCounter > WARMUP) {
        spawning = true;
    }

    // spawn hedge 
    if (spawning) {
        if (spawnCounter >= Math.ceil(HEDGE_INTERVAL)) {
            spawnHedge();
            spawnCounter = 0;
            if ((HEDGE_INTERVAL - HEDGE_INTERVAL_DECREASE) >= MIN_HEDGE_INTERVAL) {
                HEDGE_INTERVAL -= HEDGE_INTERVAL_DECREASE;
            }
        }
    }

    for (let i = 0; i < hedges.length; i++) {
        if (hedges[i].x < -hedges[i].width) {
            hedges.splice(i, 1);
        }
        else {
            hedges[i].move();
            hedges[i].show();
        }
    }

    for (let i = 0; i < players.length; i++) {
        players[i].move();
        players[i].show();
    }

    checkForCollisions();
    //score();
    showFloor();
    spawnCounter++;
    iteration++;
}

function showFloor() {
    fill(150);
    noStroke();
    rect(0, floorY - 2, WIDTH, floorHeight + 2);
}

function spawnHedge() {
    if (hedges.length == 0) {
        hedges.push(new Hedge);
        closestHedge = hedges[0];
    }
    else {
        hedges.push(new Hedge);
    }
}

function checkForCollisions() {
    //checks if hedge has passed safely
    if (closestHedge instanceof Hedge) {
        if ((closestHedge.x + closestHedge.width) < PLAYER_X) { //all players have same x value
            let index = hedges.findIndex(compareHedge);
            //closest hedge is now next hedge
            closestHedge = hedges[index + 1];
            score();
        }
    }
    //checks if each player collided with hedge
    for (let i = 0; i < players.length; i++) {
        players[i].collisionCheck(closestHedge);
    }
}

function compareHedge(hedge) {
    if (hedge == closestHedge) {
        return true;
    }
}

/**
 * Checks and sets score for all players in population.
 * should be called once every frame
 */
function score() {
    for (let i = 0; i < players.length; i++) {
        if (players[i].alive) {
            players[i].brain.score += SCORE_PER_HEDGE;
        }
    }
}
