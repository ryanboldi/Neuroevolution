const MaxSpeed = 5;
const mouseSpeed = 10;

var mouseSize = 30;
const MaxMouseSize = 10;
var change;

var mutationRate = 0.05;

var ants = [];
var aliveAnts = 0;

var generation = 0;
var averageFitness = 0;
var globalBestFitness = 0;

var scoreText;

var antColor = (150, 150, 150);
var backColor = (153, 225, 255);

var popLength = 10; //seconds, leave as NaN if you want it to go on for ever
var popSize = 100; // ants
var matingPoolSize = Math.round(popSize / 2);

var MouseX = 0;
var MouseY = 0;
var MouseDir;
var clicked = false;

var mouseController;

function setup() {
    angleMode(DEGREES);
    let canvas = createCanvas(600, 600);
    scoreText = createDiv('').size(100, 100);
    generationText = createDiv('').size(100, 100);
    fitText = createDiv('').size(1000, 200);
    bestFit = createDiv('').size(1000, 300);

    MouseX = width / 2;
    MouseY = height / 2;

    for (let i = 0; i < popSize; i++) ants.push(new Ant());
    aliveAnts = ants.length;

    //MouseDir = createVector(random(-mouseSpeed, mouseSpeed), random(-mouseSpeed, mouseSpeed));
    //MouseDir.setMag(mouseSpeed);

    change = (MaxMouseSize - mouseSize) / (popLength * 60);
}

function draw() {
    //mouseSize += change;
    background(153, 225, 255);

    fill(antColor);

    let aliveCount = 0;
    for (let i = 0; i < ants.length; i++) {
        ants[i].Update();
        ants[i].Draw();
        if (ants[i].alive) aliveCount++;
    }

    aliveAnts = aliveCount;

    if (clicked) fill(255, 0, 0);
    else fill(255, 0, 0, 50);
    ellipse(mouseX, mouseY, mouseSize, mouseSize)

    scoreText.html('Ants alive: ' + aliveAnts);
    generationText.html('Generation: ' + generation);
    fitText.html('Average fitness: ' + averageFitness);
    bestFit.html('Best fitness: ' + globalBestFitness);

    scoreText.position(width + 50, 50);
    generationText.position(width + 50, 75);
    fitText.position(width + 50, 100);
    bestFit.position(width + 50, 125);

    let run = 0;
    for (let i = 0; i < ants.length; i++) {
        run += ants[i].fitness;
        if (ants[i].fitness > globalBestFitness) globalBestFitness = ants[i].fitness;
    }

    averageFitness = (run / ants.length);

    if (frameCount % (popLength * 60) == 0) makeNewPop(ants);

    if (aliveAnts == 0) {
        makeNewPop(ants);
    }
    clicked = true;
    //MoveMouse();
}

//takes last generation and their fitnesses and makes a new generation
function makeNewPop(oldAnts) {
    mouseSize = 0;
    generation++;
    matingPool = [];
    newGen = [];
    for (let i = 0; i < matingPoolSize; i++) matingPool.push(pickAnt(oldAnts));

    for (let i = 0; i < popSize; i++) {
        let parent1 = random(matingPool);

        let childbrain = parent1.brain.mutate();
        newGen.push(new Ant(childbrain));
    }
    ants = newGen;
    MouseX = width / 2;
    MouseY = height / 2;
}

function getFits(ants) {
    let fits = []
    for (let i = 0; i < ants.length; i++) {
        fits.push(ants[i].fitness);
    }
}

function pickAnt(ants) {
    if (ants.length > 0) {
        var index = 0;
        var r = random(1);
        while (r > 0) {
            r -= ants[index].fitness;
            index += 1;
        }
        index -= 1;
        return new Ant(ants[index].brain);
    }
    else {
        return new Ant();
    }
}

function MoveMouse() {
    MouseX += MouseDir.x;
    if (MouseX + MaxMouseSize / 2 > width) MouseDir.x *= -1;
    if (MouseX - MaxMouseSize / 2 < 0) MouseDir.x *= -1;
    MouseY += MouseDir.y;
    if (MouseY + MaxMouseSize / 2 > height) MouseDir.y *= -1;
    if (MouseY - MaxMouseSize / 2 < 0) MouseDir.y *= -1;

    //i chose 33 as it has the most natural movement
    let rotater = map(mouseSpeed, 0, 500, 5, 0);
    if (random(1) > 0.5) {
        MouseDir.rotate(-33 / rotater);
    }
    if (random(1) > 0.5) {
        MouseDir.rotate(33 / rotater);
    }

    //limits the velocity to max speed
    MouseDir.setMag(mouseSpeed);
    clicked = true;
}
