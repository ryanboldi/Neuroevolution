class Gen
{
  Ant[] ants;


  //Constructor function from Ant Array
  Gen(Ant[] newAnts) {
    ants = new Ant[newAnts.length];
    for (int i =0; i< newAnts.length; i++) {
      ants[i] = newAnts[i];
    }
  }

  //WIP, should return a random ant, the higher the fitness,
  //the higher the probability of choosing it
  Ant getGoodAnt()
  {
    float totalFit = 0;

    for (int i = 0; i< ants.length; i++) {
      totalFit += ants[i].fitness;
    }

    int selection = floor(random(0, totalFit));
    float runningTotal = 0;

    for (int i = 0; i< ants.length; i++) {
      if (runningTotal < selection && selection < ants[i].fitness) {
        runningTotal += ants[i].fitness;
        return ants[i];
      }
    }
    //returns random one to make the parser happy
    return ants[0];
  }

  //everyframe, update the alive ants and draw them
  void updateAlive()
  {
    for (int i = 0; i< ants.length; i++) {
      ants[i].checkDeath(mouseX, mouseY);
      if (ants[i].isDead == false) {
        ants[i].look();
        ants[i].move();
        ants[i].Draw();
      }
    }
  }
  //is every ant in this Gen Dead?
  boolean Dead() {
    for (int i = 0; i < ants.length; i++) {
      if (ants[i].isDead == false) {
        return false;
      }
    }  
    return true;
  }
  //make the next generation using this generation
  Gen newGen()
  {
    Ant[] newAnts = new Ant[ants.length];
    //Sets each ant in the new array to a random one of the old gen.
    //the higher the fitness the higher the chance of selection
    for (int i = 0; i< newAnts.length; i++) {
      newAnts[i] = getGoodAnt().crossover(getGoodAnt());
    }
    return new Gen(newAnts);
  }
}