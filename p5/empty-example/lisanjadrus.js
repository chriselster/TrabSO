var angle = 0;
var w = 40;
var cols;
var rows;
var curves;

function setup() {
  createCanvas(400 , 400, P2D);
  cols = floor(width/w);
  rows = floor(height/w);
  curves = new Array(rows);
  for(var i = 0; i<rows;i++){
    curves[i] = new Array(cols);
    for(var j = 0; j<cols;j++){
      curves[i][j] = new Curve;
    }
  }
}

function draw() {
  background(0);
  frameRate(60);
  var d = w-10;
  var r = d/2;
  for(var i = 0; i<cols;i++){
    var cx = i * w + w*1.5;
    var cy = w/2;
    noFill();
    stroke(255);
    ellipse(cx, cy, d, d);
    var x = r * cos(angle * (i+1) - HALF_PI);
    var y = r * sin(angle * (i+1)- HALF_PI);
    strokeWeight(5);
    point(x+cx, y+cy);
    stroke(255,50);
    strokeWeight(1);
    line(cx+x, cy+y,cx+x,height);
    for(var j = 0; j<rows;j++){
      curves[j][i].setX(cx+x);
    }
  }
  
  for(var j = 0; j<rows;j++){
    cy = j * w + w*1.5;
    cx = w/2;
    noFill();
    stroke(255);
    ellipse(cx, cy, d, d);
    x = r * cos(angle * (j+1) - HALF_PI);
    y = r * sin(angle * (j+1)- HALF_PI);
    strokeWeight(5);
    point(x+cx, y+cy);
    stroke(255,50);
    strokeWeight(1);
    line(cx+x, cy+y,width,cy+y);
    for(var i = 0; i<cols;i++){
      curves[j][i].setY(cy+y);
    }
  }
  for(var j = 0; j<cols;j++){
    for(var i = 0; i<rows;i++){
      curves[i][j].addPoint();
      curves[i][j].show();
    }
  }

  angle-=0.01;
  if(angle<-TWO_PI){
    for(var j = 0; j<cols;j++){
      for(var i = 0; i<rows;i++){
        curves[i][j].reset();
      }
    }
    angle = 0;
  }
}
