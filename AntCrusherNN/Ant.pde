class Ant
{
  NeuralNet Brain = new NeuralNet(6, 10, 2);
  //quality of the ant
  float fitness = 0;
  //frames this ant has been alive for
  int aliveTime = 0;
  //Dist from left, dist from right, dist from top, dist from bottom, dist from MouseX, dist from mouseY
  float[] vision = new float[6];
  Boolean isDead = false;
  float x, y;
  float speed = 10;
  //Constructor
  Ant(float X, float Y)
  {
    x = X;
    y = Y;
  }
  
  Ant (Ant newAnt, float X, float Y)
  {
    Brain = newAnt.Brain;
    x = X;
    y = Y;
  }

  void Draw()
  {
    //println(x,y);
    aliveTime++;
    fill(1);
    ellipse(x-10, y, 10, 10);
    ellipse(x, y, 10, 10);
    ellipse(x+10, y, 10, 10);
  }
  void look()
  {

    //sets the inputs to the neural network
    vision[0] = x;
    vision[1] = (800-x);
    vision[2] = y;
    vision[3] = (800-y);
    vision[4] = mouseX;
    vision[5] = mouseY;
  }

  void move()
  {
    float newX = Brain.output(vision)[0]-0.5;
    float newY = Brain.output(vision)[1]-0.5;

    x+=(newX*speed);
    y+=(newY*speed);
  }

  boolean checkDeath( float mousex, float mousey)
  {
    if (mousePressed && x > mousex - 35 && x < mousex+35 && y>mousey-35 && y<mousey +35)
    {
      println("Death");
      Die();
      return true;
    }
    if (x>800 || y>800 || x<0 || y<0) {
      println("wallDeath");
      Die();
      return true;
    }
    return false;
  }

  void Die()
  {
    isDead = true;
  }

  void calcFitness()
  {
    fitness = (aliveTime*aliveTime);
  }

  void mutate(float mr)
  {
    Brain.mutate(mr);
  }
  
  Ant crossover(Ant other)
  {
    Ant newAnt = new Ant(mouseX,mouseY);
    newAnt.Brain = Brain.crossover(other.Brain);
    return newAnt;
    
  }
  
}