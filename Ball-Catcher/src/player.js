class Player {
    constructor(x, game, scale, genome) {
        this.x = x;
        this.scale = scale;
        this.width = PLAYERWIDTH * scale;
        this.height = PLAYERHEIGHT * scale;
        this.game = game;
        this.speed = 5;

        this.color = (0);

        this.y = this.game.height - this.height * 2;

        this.brain = genome;
        this.brain.score = 0;
    }

    Draw() {
        stroke(this.color);
        rect(this.x, this.y, this.width, this.height);
    }

    /**
     * 
     * @param {Number} dir Number between 0 and 1 that tells the player how to move.
     * Anything less than 0.5 is a movement to the left.
     * Anything more than 0.5 is a movement to the right.
     */
    Move(dir) {
        let movement = (dir - 0.5) * this.speed;
        if (((this.x + this.width + movement) < this.game.width) && ((this.x + movement) > 0)) {
            this.x += movement
        }
        this.Score();
    }

    Score() {
        this.brain.score = this.game.score + (this.game.lives * LOSS_PENALTY);
    }
}