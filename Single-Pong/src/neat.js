/** Rename variables */
var Neat = neataptic.Neat;
var Methods = neataptic.Methods;
var Config = neataptic.Config;
var Architect = neataptic.Architect;

Config.warnings = false;

/* genetic algorithm settings */
var GAMES = 30; //How many games to test at a time
var ITERATIONS = 5000; //how many frames per generation maximum
var MUTATION_RATE = 0.3;
var ELITISM = Math.round(0.1 * PLAYERS);
var START_HIDDEN_SIZE = 6;

/* trained Population */
var USE_TRAINED_POP = false;

/** Global Variables */
var neat;

/*construct GA*/
function initNeat() {
    neat = new Neat(
        5, 1,
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
            network: new Architect.Random(5, START_HIDDEN_SIZE, 1)
        }

    );

    if (USE_TRAINED_POP) neat.population = population;
}

function startEvaluation() {
    games = [];
    highestScore = 0;
    var X = 0;
    var Y = 0;

    for (var genome in neat.population) {
        genome = neat.population[genome];
        new Game(X, Y, genome);
        if (X < (WIDTH - game_width)) {
            X += game_width;
        }
        else{
            X = 0;
            y+= game_height;
        }
    }
}


function endEvaluation() {
    console.log('Generation: ', neat.generation, ' - average score: ', neat.getAverage());

    //networks shouldn't get too big
    for (var genome in neat.population) {
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