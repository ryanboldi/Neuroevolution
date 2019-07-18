class Hedge {
    constructor() {
        this.width = HEDGE_WIDTH;
        this.height = Math.floor(random(HEDGE_HEIGHT_MIN, HEDGE_HEIGHT_MAX));

        this.y = floorY - this.height;
        this.x = WIDTH + this.width;

        this.color = color(0,120,20);
    }

    move() {
        this.x -= HEDGE_SPEED;
    }

    show() {
        push();
        stroke(0);
        strokeWeight(1);
        fill(this.color);
        rect(this.x, this.y, this.width, this.height, 10);
        pop();
    }
}