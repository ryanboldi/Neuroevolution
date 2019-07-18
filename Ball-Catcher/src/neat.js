/** Rename variables */
var Neat = neataptic.Neat;
var Methods = neataptic.Methods;
var Config = neataptic.Config;
var Architect = neataptic.Architect;

Config.warnings = false;

/* settings */
var WIDTH = 1000;
var HEIGHT = 800;
var SMALL_WIDTH;
var SMALL_HEIGHT;

/* genetic algorithm settings */
var GAMES = 20; //How many games to test at a time
var ITERATIONS = 300; //how many frames per generation
var MUTATION_RATE = 0.3; 
var ELITISM = Math.round(0.1 * GAMES);
var START_HIDDEN_SIZE = 4;
var LOSS_PENALTY = 0; //fraction of lives added to score

/* Visual game settings */
var ROWS = 4;
var FRAMERATE = 120;
var GAMES_PER_ROW = GAMES / ROWS;
SMALL_WIDTH = WIDTH / GAMES_PER_ROW;
SMALL_HEIGHT = HEIGHT / ROWS;
var PLAYERWIDTH = 80;
var PLAYERHEIGHT = 20;

var COLLISION = 1.1;


/* trained Population */
var USE_TRAINED_POP = false;

/** Global Variables */
var neat;

/*construct GA*/
function initNeat() {
    neat = new Neat(
        3, 1,
        null,
        {
            mutation: [
                Methods.Mutation.ADD_NODE,
                Methods.Mutation.SUB_NODE,
                Methods.Mutation.ADD_CONN,
                Methods.Mutation.SUB_CONN,
                Methods.Mutation.MOD_WEIGHT,
                Methods.Mutation.MOD_BIAS,
                Methods.Mutation.MOD_ACTIVATION,
                Methods.Mutation.ADD_GATE,
                Methods.Mutation.SUB_GATE,
                Methods.Mutation.ADD_SELF_CONN,
                Methods.Mutation.SUB_SELF_CONN,
                Methods.Mutation.ADD_BACK_CONN,
                Methods.Mutation.SUB_BACK_CONN
              ],
            popsize: GAMES,
            mutationRate: MUTATION_RATE,
            elitism: ELITISM,
            network: new Architect.Random(3, START_HIDDEN_SIZE, 1)
        }

    );

    if (USE_TRAINED_POP) neat.population = population;
}

function startEvaluation() {
    games = [];
    highestScore = 0;
    X = 0;
    Y = 0;
    for (var genome in neat.population) {
        genome = neat.population[genome];
        games.push(new Game(X, Y, SMALL_WIDTH, SMALL_HEIGHT, WIDTH, genome))
        if (X == SMALL_WIDTH * (GAMES_PER_ROW-1)) {
            X = 0;
            Y += SMALL_HEIGHT;
        }
        else {
            X += SMALL_WIDTH;
        }
    }
}

function endEvaluation() {
    console.log('Generation: ', neat.generation, ' - average score: ', neat.getAverage());

    //networks shouldn't get too big
    for (var genome in neat.population){
        genome = neat.population[genome];
        genome.score -= (genome.nodes.length);
    }

    neat.sort();
    var newPopulation = [];

    //Elitism
    for (var i = 0; i < neat.elitism; i++) {
        newPopulation.push(neat.population[i]);
    }

    //breed next population
    for (var i = 0; i < neat.popsize - neat.elitism; i++) {
        newPopulation.push(neat.getOffspring());
    }

    //replace old pop with new
    neat.population = newPopulation;
    neat.mutate();

    neat.generation++;
    startEvaluation();
}