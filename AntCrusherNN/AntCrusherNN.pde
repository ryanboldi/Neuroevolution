int genNum;
float mr = 0.1;
Ant[] randomAnts = new Ant[10];

Gen thisGen;
Gen newGen;

void setup()
{
  frameRate(60);
  size(800, 800);
  genNum = 1;
  for (int i = 0 ; i< randomAnts.length; i++){
    randomAnts[i] = new Ant(400,400);
  }
  thisGen = new Gen(randomAnts);
}

void draw()
{
  println(thisGen.ants.length);
  background(255);
  fill(0,1,0);
  noStroke();
  fill(255, 0, 0);

  if (mousePressed)
  {
    ellipse(mouseX, mouseY, 70, 70);
  }
  fill(1);
  textSize(20);
  text("generation:  "+genNum, 30, 30);
  
  thisGen.updateAlive();
  
  if (thisGen.Dead()){
    genNum++;
    newGen = thisGen.newGen();
    for (int i = 0; i<thisGen.ants.length;i++)
    {
     newGen.ants[i] = new Ant(thisGen.ants[i],400,400); 
     newGen.ants[i].mutate(mr);
    }
    
    thisGen = newGen;
  }
  
}