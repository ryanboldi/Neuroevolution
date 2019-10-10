Game g;

void setup() {
  size(800, 800);
  translate(0, height);
  frameRate(60);
  g = new Game(50,10);
  
}

void draw() {
  g.update();
}
