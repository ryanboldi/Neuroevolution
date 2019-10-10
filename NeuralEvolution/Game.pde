class Game {
  int genLength = 10;
  float mr = 0.05;
  ArrayList<Blob> Blobs = new ArrayList<Blob>();
  ArrayList<Food> Food = new ArrayList<Food>(); 
  FloatList fitnesses = new FloatList();

  int popSize;
  int foodAm;

  Game(int food, int blobs) {

    popSize = blobs;
    foodAm = food;

    for (int i = 0; i < blobs; i++) {
      Blobs.add(new Blob());
    }
    for (int i = 0; i< food; i++) {
      Food.add(new Food());
    }
  }

  void update() {
    //println(Food.size());
    //println(Blobs.size());
    //println(frameCount);

    background(255);
    for (Blob B : Blobs) B.update();
    for (Food F : Food) F.update();
    for (Blob B : Blobs) {
      Food = B.checkFood(Food);
    }
    if ((frameCount % (60*genLength)) == 0) { 
      println("MAKING NEW GEN");
      Blob best = Blobs.get(0);
      for (int i = 0; i< Blobs.size(); i++) {
        if (Blobs.get(i).score > best.score) best = Blobs.get(i);
      }
      Blobs.remove(best);

      Blob sec = Blobs.get(0);
      for (int i = 0; i< Blobs.size(); i++) {
        if (Blobs.get(i).score > sec.score) sec = Blobs.get(i);
      }


      makeNewGen(best, sec);
    };
  }

  void makeNewGen(Blob parent1, Blob parent2) {
    Blobs.clear();
    Food.clear();
    fitnesses.clear();

    //add them back
    Blobs.add(parent1);
    Blobs.add(parent2);

    //popsize -4 crossover creatures
    for (int i = 0; i< popSize-4; i++) {
      Blob b = Crossover(parent1,parent2);
      b.Brain.mutate(mr);
      Blobs.add(b);
      
    }
    //2 new random creatures
    Blobs.add(new Blob());
    Blobs.add(new Blob());

    for (int i = 0; i< foodAm; i++) {
      Food.add(new Food());
    }
  }

  Blob Crossover(Blob one, Blob two) {
    NeuralNet newBrain = one.Brain.crossover(two.Brain);
    Blob b = new Blob();
    b.Brain = newBrain;
    return b;
  }


  FloatList getFitness(ArrayList<Blob> blobs) {
    FloatList Scores = new FloatList();
    for (Blob b : blobs) {
      Scores.append(b.score);
    }

    return Scores;
  }
}
