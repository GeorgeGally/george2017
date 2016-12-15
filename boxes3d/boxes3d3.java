import processing.core.*; 


import processing.video.*; 

import java.applet.*; 
import java.awt.*; 
import java.awt.image.*; 
import java.awt.event.*; 
import java.io.*; 
import java.net.*; 
import java.text.*; 
import java.util.*; 
import java.util.zip.*; 
import java.util.regex.*; 

public class boxes3d3 extends PApplet {

 class Box{
 float ht;
 int x, y;
 
 Box(int ww, int hh){
 ht= 10;
 x=ww;
 y=hh;
 }
 
 public void draw(){
   float bA = brightness( myCapture.pixels[(y*width)+width-x]); 
   if (toggle) {  bA = 255- bA; } 

if (design==1)  { fill(( myCapture.pixels[(y*width)+width-x])); } 
else if (design==2)  { fill( 255); }
else if (design==3)  { fill(bA,0,0); }
else if (design==4)  { fill(0, bA,0);  }
else if (design==5)  { fill(0, 0, bA);  }
else if (design==6)  { stroke(255); fill(( myCapture.pixels[(y*width)+width-x]));  }
else if (design==7)  {  fill(30); }
else if (design==8)  { fill(255); }
ht=bA;
translate (x,y);
rotateY (radians(22));
box(boxsize, boxsize, ht);
rotateY (- radians(22));
translate (-x,-y);
  
 }
  } 
  
  
public void captureEvent(Capture myCapture) { 
  myCapture.read(); 
}


  
 
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
float damp = 0.6f;
PImage txt;
PFont font;
  int btnx;
HScrollbar hs1;
int sw=120;

public void setup() 
{
size(720, 540, P3D);
btnx=width-150;
hs1 = new HScrollbar(btnx, height-35, sw, 10, 3);
frameRate(60);
//rectMode(CENTER);
font = loadFont("Verdana-12.vlw"); 
textFont(font); 
logo=loadImage("logo.jpg");
noStroke();
spacew=12;
spaceh=9;
String s = "IIDC FireWire Video"; 
myCapture = new Capture(this,  width, height,s, 20); 
r=20;

int count=0;
m=40;
for (int h=0; h<PApplet.parseInt(height/spaceh); h++){
for (int w=0; w<PApplet.parseInt(width/spacew); w++){
b[count] = new Box(width-(w*spacew), h*spaceh);
count++;
}
}
total=count-1;
print("Total boxes: " + count);
  txty=500;
  ty=330;
}
 

public void draw() 
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
  
public void keyPressed(){
  if (keyCode == LEFT) {
  if (r< 70) {r--; m -=2;}
  else if (r>=60 && r<180) { r-=4;  m -=1; }
  else { r-=12;  m -=11.9f; }

  }
else if(keyCode == RIGHT) {
  if (r< 70) {r++; m +=2;}
  else if (r>=60 && r<180) { r+=4;  m +=1; }
  else { r+=12;  m +=1; }

  }
  if (r> 360) {r=0; m=0;}
}

public void btns(){

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

public void mouseReleased(){
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

class HScrollbar
{
  int swidth, sheight;    // width and height of bar
  int xpos, ypos;         // x and y position of bar
  float spos, newspos;    // x position of slider
  int sposMin, sposMax;   // max and min values of slider
  int loose;              // how loose/heavy
  boolean over;           // is the mouse over the slider?
  boolean locked;
  float ratio;

  HScrollbar (int xp, int yp, int sw, int sh, int l) {
    swidth = sw;
    sheight = sh;
    int widthtoheight = sw - sh;
    ratio = (float)sw / (float)widthtoheight;
    xpos = xp;
    ypos = yp-sheight/2;
    spos = xpos + swidth/2 - sheight/2-30;
    newspos = spos;
    sposMin = xpos;
    sposMax = xpos + swidth - sheight;
    loose = l;
  }

  public void update() {
    if(over()) {
      over = true;
    } else {
      over = false;
    }
    if(mousePressed && over) {
      locked = true;
    }
    if(!mousePressed) {
      locked = false;
    }
    if(locked) {
      newspos = constrain(mouseX-sheight/2, sposMin, sposMax);
    }
    if(abs(newspos - spos) > 1) {
      spos = spos + (newspos-spos)/loose;
    }
  }

  public int constrain(int val, int minv, int maxv) {
    return min(max(val, minv), maxv);
  }

  public boolean over() {
    if(mouseX > xpos && mouseX < xpos+swidth &&
    mouseY > ypos && mouseY < ypos+sheight) {
      return true;
    } else {
      return false;
    }
  }

  public void display() {
    fill(35);
    stroke(255);
    rect(xpos, ypos, swidth, sheight);
    if(over || locked) {
      fill(100);
    } else {
      fill(80);
    }
    rect(spos, ypos, sheight, sheight);
    noStroke();
  }

  public float getPos() {
    // Convert spos to be values between
    // 0 and the total width of the scrollbar
    return spos * ratio;
  }
}



  static public void main(String args[]) {
    PApplet.main(new String[] { "--bgcolor=#ffffff", "boxes3d3" });
  }
}
