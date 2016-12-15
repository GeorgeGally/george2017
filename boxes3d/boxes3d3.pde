 class Box{
 float ht;
 int x, y;
 
 Box(int ww, int hh){
 ht= 10;
 x=ww;
 y=hh;
 }
 
 void draw(){
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
  
  
void captureEvent(Capture myCapture) { 
  myCapture.read(); 
}


  
