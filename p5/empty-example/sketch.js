var angle = 0;
var w = 30;
var h=0;
var a;
var offset = 0;

function setup() {
  createCanvas(600 , 600, WEBGL);
  max = dist(0,0,width/2,height/2);
}

function draw() {
  background(60);
  rotateX(-PI/4);
  rotateY(PI/4);
  stroke(0);
  ortho(-width,width,-height,height,-1000,1000);
  directionalLight(0, 255, 255, -2, -3, -4);
  directionalLight(255, 0, 0, 2, -2, -2);
  for(var y=0; y<=height;y+=w){
    for(var x=0; x<=width;x+=w){
      push();
      let d = dist(x,y,width/2,height/2);
      offset = map(d,0,max,-3,3);
      let a = angle + offset;
      h = map(sin(a),-1,1,w,w*20);
      ambientMaterial(255);
      translate(x-width/2,0,y-height/2);
      box(w,h,w);
      pop();
    }
  }
  angle += 0.1;
}
