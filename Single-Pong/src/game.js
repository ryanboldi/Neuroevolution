class Game {
    /**
     * 
     * @param {number} x x coordinate of top left corner of game
     * @param {number} y y coordinate of top left corner of game 
     * @param {genome} genome
     */
    constructor(x, y, ) {
        this.x = x;
        this.y = y;
        this.width = game_width;
        this.height = game_height;

        this.pWidth = (paddleWidth / 100) * this.width;
        this.pHeight = (paddleheight / 100) * this.height;

        this.pX = 0;
        this.pY = (this.height - this.pHeight) - ((groundDistance / 100) * this.height);

        this.bR = (ballRadius / 100) * this.width;
        this.bX = this.width / 2;
        this.bY = 0 + this.bR;

        this.bSpeed = createVector(random(-1, 1), random(-1, 1));

        this.bSpeed.normalize();
        this.bSpeed.mult((ballSpeed / 100) * this.width);

        this.pSpeed = (paddleSpeed / 100) * this.width;
        //this.brain = genome;
        //this.brain.score = 0;

        games.push(this);
    }

    //draws game's current state to canvas
    show() {
        push();
        translate(this.x, this.y);
        noFill();
        strokeWeight(1);
        stroke(0);
        rect(0, 0, this.width, this.height);


        fill(0);
        rect(this.pX, this.pY, this.pWidth, this.pHeight);

        ellipse(this.bX, this.bY, this.bR * 2);

        pop();
    }

    //updates physics of the game
    move() {
        //if ball collides with ceiling
        if (this.bY - this.bR <= 0) {
            //collided
            this.bY = 0 + this.bR;
            this.bSpeed.y *= -1;
        }

        //collided with bottom of screen
        if (this.bY + this.bR >= this.height) {
            this.bY = this.height - this.bR
            this.bSpeed.y *= -1;
        }

        //if ball collides with left wall
        if (this.bX - this.bR <= 0) {
            //collided
            this.bX = 0 + this.bR;
            this.bSpeed.x *= -1;
        }

        //if ball collides with right wall
        if (this.bX + this.bR >= this.width) {
            this.bX = this.width - this.bR;
            this.bSpeed.x *= -1;
        }

        //if ball collides with paddle from top
        if (this.bX - this.bR < (this.pX + this.pWidth)){
            if (this.bX + this.bR > (this.pX)){
                if(this.bY + this.bR > this.pY){
                    this.bY = (this.pY - this.bR);
                    //this.brain.score ++;
                    this.bSpeed.y *= -1;
                    this.bSpeed.rotate(random(-ballBounceRotate, ballBounceRotate))
                    // console.log(this.bSpeed.x);
                    //this.bSpeed.normalize();
                    //this.bSpeed.mult((ballSpeed / 100) * this.width);
                }
            }
        }




        this.bX += this.bSpeed.x;
        this.bY += this.bSpeed.y;
    }


    /**
     * 
     * @param {number} dir -1 for left, 1 for right
     */
    movePaddle(dir) {
        if (dir > 0) {
            if ((this.pX + this.pWidth + this.pSpeed) < this.width) {
                this.pX += this.pSpeed;
            }
            else {
                this.pX = this.width - this.pWidth;
            }
        }
        if (dir < 0) {
            if ((this.pX - this.pSpeed) > 0) {
                this.pX -= this.pSpeed;
            }
            else {
                this.pX = 0;
            }
        }

    }

}