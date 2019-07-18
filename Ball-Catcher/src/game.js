/**
 * This is a Game object
 * It controls the small game screen that each player will be tested in.
 */
class Game {
    constructor(x, y, width, height, origWidth, Genome) {
        this.x = x;
        this.y = y;
        this.scale = width / origWidth;
        this.width = width;
        this.height = height;
        this.ballRadius = 20 * this.scale;
        this.ball = new Ball(random(this.width / 10, this.width * (0.9)), random(this.ballRadius), this.ballRadius, this.scale);
        this.player = new Player(this.width / 2, this, this.scale, Genome);

        this.score = 0;
        this.lives = 5;
    }

    update() {
        this.ball.update();

        var input = this.detect();
        var output = this.player.brain.activate(input);
        var movement = output[0];

        this.player.Move(movement);
    }

    Draw() {
        push(); //makes it easy to return to original 0,0
        translate(this.x, this.y); //moves to each game's 0,0
        noStroke();
        fill(170);
        rect(0, 0, this.width, this.height);

        stroke(0);
        strokeWeight(1);
        noFill();

        rect(0, 0, this.width, this.height); //draws the outline for easier visualisation

        if (this.ball.y > this.height) {
            this.respawnBall();
            this.player.color = (0);
            this.lives -= 1;
        }
        if (this.height - this.ball.y < ((this.player.height + (this.height-this.player.y)) * COLLISION)) {
            if ((this.ball.x * COLLISION) > (this.player.x)) {
                if (this.ball.x < (this.player.x + this.player.width) * COLLISION) {
                    this.player.color = (0,255,0);
                    this.score++;
                    this.respawnBall();
                }
            }
        }

        this.ball.Draw();
        this.player.Draw();

        pop();
    }

    respawnBall() {
        this.ball = new Ball(random(this.width / 10, this.width * (0.9)), random(this.ballRadius), this.ballRadius, this.scale);
    }

    detect() {
        let ballX = this.ball.x / this.width;
        let ballH = (this.height- this.ball.y) / this.height;
        let playerX = this.player.x/ this.width;

        return ([ballX, ballH, playerX]);
    }
    
    Score(){
        this.fitness = this.player.score;
    }

    Reset(){
        this.ball.respawnBall();
        this.player.x = (this.width + this.player.width) / 2;
    }
}