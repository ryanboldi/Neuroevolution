mr = 0.1; //mutation rate
genSize = 100;//creatures
genLength = 5;//seconds
creatures = [];

function setup() {
    createCanvas(800, 800);
    for (let i = 0; i < genSize; i++) {
        creatures.push(new Creature);
    }
}

function draw() {
    background(0);
    stroke(255);
    fill(255);
    for (let i = 0; i < creatures.length; i++) {
        creatures[i].Update();
    }

    if ((frameCount / 60) % genLength == 0) {
        creatures = getNewPopulation(creatures);
    }

}

function getNewPopulation(c) {
    //work on this
    let sorted = [];
    let fits = [];
    for (let i = 0; i < c.length; i++){
        fits.push(c[i].getFitness());
    }

    //sorts creatures by fitness;
    sorted = sortArrayOnAnother(c, fits);
    //highest first;
    sorted.reverse();
    //kill worst 5
    sorted = sorted.slice(0,6);//first 5

    let newPop = [];

    for (let i = 0; i < c.length; i++) {
        let parent = sorted[Math.floor(i/2)];
        if (parent instanceof Creature) newPop.push(parent.mutate(mr));
        else newPop.push(new Creature());
            
    }

    return newPop;
}

function sortArrayOnAnother(items, sorting) {

    var length = sorting.length;
    //Number of passes
    for (var i = 0; i < length; i++) {
        //Notice that j < (length - i)
        for (var j = 0; j < (length - i - 1); j++) {
            //Compare the adjacent positions
            if (sorting[j] > sorting[j + 1]) {
                //Swap the numbers
                var tmp = sorting[j];  //Temporary variable to hold the current number
                sorting[j] = sorting[j + 1]; //Replace current number with adjacent number
                sorting[j + 1] = tmp; //Replace adjacent number with current number

                var temp = items[j];  //Temporary variable to hold the current number
                items[j] = items[j + 1]; //Replace current number with adjacent number
                items[j + 1] = temp; //Replace adjacent number with current number
            }
        }
    }
    return items;
}




