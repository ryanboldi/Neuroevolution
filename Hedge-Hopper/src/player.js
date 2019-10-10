class Player {
    constructor(genome) {
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;

        this.x = PLAYER_X;
        this.Starty = floorY - this.height;
        this.y = this.Starty;
        this.yVel = 0;

        this.alive = true;

        this.brain = genome;
        this.brain.score = 0;

        this.closestHedge;

        players.push(this);
    }

    jump() {
        if (this.y >= this.Starty - 20) {
            this.yVel -= JUMP_STRENGTH;
            this.brain.score -= JUMP_PENALTY;
        }
    }

    move() {
        var input = this.detect();
        var output = this.brain.activate(input);

        if (output[0] > 0.5) {
            this.jump();
        }
        //if above the ground
        if ((this.y < this.Starty) || (this.yVel < 0)) {
            this.y += this.yVel;
            this.yVel += GRAV;
            //gravity    
        }
        if (this.y >= this.Starty) {
            this.y = this.Starty;
            this.yVel = 0;
        }
    }

    //checks for collision with closest hedge
    collisionCheck(hedge) {
        this.closestHedge = hedge;
        if (hedge instanceof Hedge) {
            //if hedge is behind the far right edge of the player
            if (hedge.x < (this.x + this.width)) {
                //if hedge is infront of far left edge of player
                if (hedge.x > this.x) {
                    //if any part of the player touches the hedge
                    if ((this.y + this.height) > hedge.y) {
                        this.die();
                    }
                }
            }
            if (hedge.x + hedge.width < (this.x + this.width)) {
                //if hedge is infront of far left edge of player
                if (hedge.x + hedge.width > this.x) {
                    //if any part of the player touches the hedge
                    if ((this.y + this.height) > hedge.y) {
                        this.die();
                    }
                }
            }
        }
    }

    die() {
        this.alive = false;
    }

    show() {
        if (this.alive) {
            push();
            fill(200, 100, 0);
            stroke(0);
            rect(this.x, this.y, this.width, this.height, 50);
            pop();
        }
    }

    /**
     * detects the player's surroundings and normalises them
     */
    detect() {
        this.closestHedge = closestHedge;

        if (this.closestHedge instanceof Hedge) {
            var xDist = normalise((this.x - (this.closestHedge.x + this.closestHedge.width)), 0, WIDTH - PLAYER_X, 0, 1);
            var yDist = normalise((this.y - this.closestHedge.y), (this.Starty - HEDGE_HEIGHT_MIN), (0 - HEDGE_HEIGHT_MIN), 0, 1);
            var nextHeight = normalise(this.closestHedge.height, HEDGE_HEIGHT_MIN, HEDGE_HEIGHT_MAX, 0, 1);

            return [xDist, yDist, nextHeight];
        }
        else return [0, 0, 0];
    }
}

//normalises a value between two values to two different ones
function normalise(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}