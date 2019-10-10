class Food {
    constructor() {
        this.x = floor(random(width / SCALE));
        this.y = floor(random(height / SCALE));
    }

    Draw() {
        fill(0,254,0, 50);
        rect(this.x * SCALE + 1, this.y * SCALE + 1, SCALE - 2, SCALE - 2)
    }
}