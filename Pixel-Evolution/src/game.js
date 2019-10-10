class Game {
    constructor(pixel = NaN) {
        if (pixel instanceof Pixel) {
            this.p = pixel;
        }
        else {
            this.p = new Pixel();
            this.p.randomise();
        }

        this.w = width / SCALE;
        this.h = height / SCALE;

        this.score = 0;
        this.foods = 0;


        this.f = new Food();
    }

    Update() {
        this.p.Update();

        let dist = (this.p.x - this.f.x) ** 2 + (this.p.y - this.f.y) ** 2;

        if (this.f.x == this.p.x & this.f.y == this.p.y) {
            this.foods++;
            this.f = new Food();
        }

        this.score = map(dist, 0, this.w * this.h, 100, 0) + ((this.foods) * 100);
    }

    Draw() {
        this.p.Draw(this.score);
        this.f.Draw();
    }


    timeStep() {
        this.Update();
        this.Move();
        //this.Draw();
    }

    // Move(u, d, r, l) {
    //     this.p.Move(u, d, r, l);
    // }
    Move() {
        // this.p.decide(this.toArray());
        this.p.decide(this.p.x - this.f.x, this.p.y - this.f.y)
    }

    getFitness() {
        return this.score;
    }

    toArray() {//1 for pixel, 2 for food;
        let arr = [];
        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                if (this.f.x != i | this.f.y != j) {
                    if (this.p.x != i | this.p.y != j) {
                        arr.push(0);
                    }
                    if (this.p.x == i & this.p.y == j) {
                        arr.push(1);
                    }
                }
                if (this.f.x == i & this.f.y == j) {
                    arr.push(2);
                }
            }
        }
        return arr;
    }

    Mutate(mr) {
        let g = new Game(this.p.Mutate(mr));
        return g;
    }

    Reset() {
        this.p = new Pixel(this.p);
        this.f = new Food();
    }

    static crossover(g1 , g2){
        var p = Pixel.crossover(g1.p, g2.p);
        return (new Game(p))
    }
}