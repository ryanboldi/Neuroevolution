/**
 * Class that controls the ball object
 * Spawned many times in a scene to try to be caught
 */
class Ball {
    //coordinates are in respect to their respective game class.
    constructor(x, y, r, scale) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.scale = scale;
        this.acc = 10 * this.scale;
        this.vel = 1;
        this.terminalVelocity = 10; //maximum fall speed
    }

    //updates physics
    update() {
        if (this.vel < this.terminalVelocity) {
            this.vel += this.acc;
        }
        this.y += this.vel;
    }

    Draw() {
        fill(0);
        ellipse(this.x, this.y, this.r * 2);
    }
}