import processing.video.*; 
Capture myCapture; 
int r, m, total;
boolean toggle;
PImage logo;
Box[] b= new Box [50000];
boolean start;
float boxsize = 20;
int design = 1;
float ty, txty;
int spacew, spaceh;
float damp = 0.6;
PImage txt;
PFont font;
  int btnx;
HScrollbar hs1;
int sw=120;

void setup() 
{
size(720, 540, P3D);
btnx=width-150;
hs1 = new HScrollbar(btnx, height-35, sw, 10, 3);
frameRate(60);
//rectMode(CENTER);
//font = loadFont("Verdana-12.vlw"); 
//textFont(font); 
//logo=loadImage("logo.jpg");
noStroke();
spacew=12;
spaceh=9;
myCapture = new Capture(this,  width, height, 20);
myCapture.start();
r=20;

int count=0;
m=40;
for (int h=0; h<int(height/spaceh); h++){
for (int w=0; w<int(width/spacew); w++){
b[count] = new Box(width-(w*spacew), h*spaceh);
count++;
}
}
total=count-1;
print("Total boxes: " + count);
  txty=500;
  ty=330;
}
 

void draw() 
{
background(0);
pushMatrix();

  
rotateY (radians(r));
translate(radians(width/2),0,m);
    
  directionalLight(126, 126, 126, 0, 0, -1); 
ambientLight(102, 102, 102);

for (int i=0; i<=total; i++){
 b[i].draw();
 }

rotateY (radians(-r));
popMatrix();
btns();
  }
  
void keyPressed(){
  if (keyCode == LEFT) {
  if (r< 70) {r--; m -=2;}
  else if (r>=60 && r<180) { r-=4;  m -=1; }
  else { r-=12;  m -=11.9; }

  }
else if(keyCode == RIGHT) {
  if (r< 70) {r++; m +=2;}
  else if (r>=60 && r<180) { r+=4;  m +=1; }
  else { r+=12;  m +=1; }

  }
  if (r> 360) {r=0; m=0;}
}

void btns(){

 noFill();
stroke(255);
//btn1
rect(btnx, height-20, 10,10);
if (!toggle){
line(btnx, height-20, btnx+10, height-10);
line(btnx, height-10, btnx+10, height-20);
}

//btn2
if (design==1) { fill(80);} else {noFill();}
rect(btnx+20, height-20, 10,10);
if (design==2) { fill(80);} else {noFill();}
rect(btnx+35, height-20, 10,10);
if (design==3) { fill(80);} else {noFill();}
rect(btnx+50, height-20, 10,10);
if (design==4) { fill(80);} else {noFill();}
rect(btnx+65, height-20, 10,10);
if (design==5) { fill(80);} else {noFill();}
rect(btnx+80, height-20, 10,10);
if (design==6) { fill(80);} else {noFill();}
rect(btnx+95, height-20, 10,10);
if (design==7) { fill(80);} else {noFill();}
rect(btnx+110, height-20, 10,10);
//btn3



strokeWeight(1);

noStroke();
hs1.update();
hs1.display();
 boxsize=((hs1.getPos()-width+97)/2);
 //println(hs1.getPos()-width+97);
}

void mouseReleased(){
  if (mouseX>btnx && mouseX <btnx+10 && mouseY > height-20 && mouseY <height-10){
   if (toggle){
    toggle=false;
   } else {
    toggle=true;
   } 
  }
  // 1
    if (mouseX>btnx+20 && mouseX <btnx+30 && mouseY > height-20 && mouseY <height-10){
      design=1;
    }
    if (mouseX>btnx+35 && mouseX <btnx+45 && mouseY > height-20 && mouseY <height-10){
      design=2;
    }
    if (mouseX>btnx+50 && mouseX <btnx+60 && mouseY > height-20 && mouseY <height-10){
      design=3;
    }
    if (mouseX>btnx+65 && mouseX <btnx+75 && mouseY > height-20 && mouseY <height-10){
      design=4;
    }
    if (mouseX>btnx+80 && mouseX <btnx+90 && mouseY > height-20 && mouseY <height-10){
      design=5;
    }
    if (mouseX>btnx+95 && mouseX <btnx+105 && mouseY > height-20 && mouseY <height-10){
      design=6;
    }
    if (mouseX>btnx+110 && mouseX <btnx+120 && mouseY > height-20 && mouseY <height-10){
      design=7;
    }
}
