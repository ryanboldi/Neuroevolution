/* global Variables */
var games = [];
var iteration = 0;
var highestScore = 0;

function setup() {
    frameRate(FRAMERATE);
    createCanvas(WIDTH, HEIGHT);
    initNeat();


    if (!USE_TRAINED_POP){
        for(var i = 0; i < 1; i++) neat.mutate();
    }

    startEvaluation();
}

function draw() {
    background(255);
    if (iteration == ITERATIONS){
        endEvaluation();
        iteration = 0;
    }


    /* draw all games */
    for (var i = games.length-1; i>=0; i--){
        var game = games[i];

        game.update();
        game.Draw();
    }

    iteration ++;
}
  

    
