class Blob {
  float maxSpeed = 10;
  //penalty for hitting walls
  int penalty = 0;
  int foodScore = 1; //how much score when food is eaten
  float minSpeed = 1;
  float lineLength = 5;
  PVector pos;//position of front tip of triangle
  PVector vel;
  float rad = 12;
  NeuralNet Brain = new NeuralNet(4, 15, 4);

  Food Closest = new Food();

  int score = 0;

  Blob() {
    pos = new PVector(height/2, width/2);
    vel = new PVector(1, 1);
  }

  void update() {
    //vel = new PVector(random(-maxSpeed,maxSpeed),random(-maxSpeed,maxSpeed));
    //move

    pos.x += vel.x;
    if (pos.x > width) {
      pos.x = 0;
      score -= penalty;
    }
    if (pos.x < 0) {
      pos.x = width;
      score -= penalty;
    }
    pos.y += vel.y;
    if (pos.y > height) { 
      pos.y = 0;
      score -= penalty;
    }
    if (pos.y < 0) {
      pos.y = height;
      score -= penalty;
    }

    //draw
    fill(0);
    ellipse(pos.x, pos.y, rad, rad);
    //shows the direction
    line(pos.x, pos.y, (vel.x*lineLength+pos.x), (vel.y*lineLength+pos.y));
    stroke(0);


    float[] inputs = {PVector.angleBetween(pos, Closest.pos), pos.dist(Closest.pos), Closest.vel.mag(), Closest.vel.heading()};

    float[] outputs = Brain.output(inputs);
    if (vel.mag() < maxSpeed) if (outputs[0] > 0.5) vel.mult(1.1);
    if (vel.mag() > minSpeed)  if (outputs[1] > 0.5) vel.mult(0.9);
    if (outputs[2] > 0.5) vel.rotate((11*PI)/6);
    if (outputs[3] > 0.5) vel.rotate((PI/6));
    //fill(0,outputs[4],0);
  }

  //checks collision with food
  ArrayList<Food> checkFood(ArrayList<Food> food) {
    for (int i  = 0; i< food.size(); i++) {
      Food f = food.get(i);
      if ((f.pos.x < pos.x+rad+1 && f.pos.x > pos.x-rad-1)&&(f.pos.y < pos.y+rad+1 && f.pos.y > pos.y-rad-1)) { 
        score+=foodScore;
        food.remove(i);
      }
    }
    if (food.size() > 0) Closest = food.get(0);
    for (Food f : food) {
      if (f.pos.dist(pos) < Closest.pos.dist(pos)) Closest = f;
    }


    return food;
  }
}
