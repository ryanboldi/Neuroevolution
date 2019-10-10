class Creature {
    constructor(brain = NaN) {
        this.minSpeed = 1;
        this.maxSpeed = 5;

        this.fitness = 0;

        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(this.minSpeed, this.maxSpeed), random(this.minSpeed, this.maxSpeed));
        this.rad = 10;

        if (brain instanceof NeuralNetwork) this.brain = brain;
        else this.brain = new NeuralNetwork(2, 4, 4);
    }

    Update() {
        let mouseVec = createVector(mouseX, mouseY);
        let inputs = [this.pos.dist(mouseVec), this.pos.angleBetween(mouseVec)];
        let outputs = this.brain.feedforward(inputs);
        if (outputs[0] > 0.5) if (this.vel < this.maxSpeed) this.vel.mult(1.1);
        if (outputs[1] > 0.5) if (this.vel > this.minSpeed) this.vel.mult(0.9);
        if (outputs[2] > 0.5) this.vel.rotate((11 * PI) / 6);
        if (outputs[3] > 0.5) this.vel.rotate(PI / 6);

        if (this.pos.x + this.vel.x > width) this.pos.x = 0 - (width - this.pos.x + this.vel.x)//spawn on other side
        else if (this.pos.x + this.vel.x < 0) this.pos.x = width - (0 + this.pos.x + this.vel.x)
        else if (this.pos.y + this.vel.y > height) this.pos.y = 0 - (height - this.pos.y + this.vel.y)
        else if (this.pos.y + this.vel.y < 0) this.pos.y = height - (0 + this.pos.y + this.vel.y);
        else {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        }

        this.fitness += (this.pos.dist(mouseVec));

        //draw
        ellipse(this.pos.x, this.pos.y, this.rad);
        line(this.pos.x, this.pos.y, (this.vel.x) * 5 + this.pos.x, (this.vel.y) * 5 + this.pos.y);
    }

    getFitness() {
        return this.fitness;
    }

    mutate(mr) {
        let cre = new Creature(this.brain)
        cre.brain.mutate(mr)

        return cre;
    }
}