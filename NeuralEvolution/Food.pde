class Food {
  PVector pos;
  PVector vel;
  float speed = 1;
  float rad = 10;

  Food() {

    pos = new PVector(random(0, width), random(0, height));
    vel = new PVector(random(-1, 1)*speed, random(-1, 1)*speed);
  }


  void update() {

    //move
    pos.x += vel.x;
    pos.y += vel.y;

    //draw
    fill(0, 155, 0);
    ellipse(pos.x, pos.y, rad, rad);

    if (pos.x > width) vel.x *= -1;
    if (pos.y > height) vel.y *= -1;
    if (pos.x < 0) vel.x *= -1;
    if (pos.y < 0) vel.y *= -1;
    
  }
}
