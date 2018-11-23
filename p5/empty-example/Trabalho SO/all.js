const size = 20;
var mem;
var ok = false;
var button;
var start;
var time = 0;
var ok = false;
var cancel;
var i;
var pid = 0;
var transX = 0;
var transY;
var maxi = 0;
// var graph;
var submit;
var processos = new PriorityQueue;
var mid;
function setup() {
    createCanvas(displayWidth, displayHeight, P2D);
    
    background(0);
    mem = new Memory(width,height);
    // graph = new Graph(width,height);
    processos.push(new Process(pid++,0,0,10,0),0);
    processos.push(new Process(pid++,5,0,10,0),5);
    console.log(maxi);
    transY= height-200;
    //IO
    var inp = createInput('Oi');
    inp.input(novoProcesso);
    
    button = createButton('Novo processo');
    button.mousePressed(novoProcesso);
    button.position(width*0.7, height*0.01);
    mid = width/2;
    iniciar = createButton('Iniciar');
    iniciar.mousePressed(start);
    console.log(button.position);
    iniciar.position(button.position.x, height*0.01);
    frameRate(0);
}

function draw() {
    background(0);
    frameRate(5);
    
    mem.show();
    processos.forEach(p => {
        p.show(time, transX,transY);
    });
    console.log(maxi);
    if(keyIsDown(RIGHT_ARROW)){transX++;}
    if(keyIsDown(LEFT_ARROW)){transX--;}
    if(keyIsDown(UP_ARROW)){transY+=size+5;}
    if(keyIsDown(DOWN_ARROW)){transY-=size+5;}
    if(time<maxi){
        transX++;
        time++;
    }else noLoop();
    if(ok == true){
        //TODO: criar imputs ()
        rectMode(CENTER);
        stroke(60);
        fill(60);
        rect(width*0.5, height*0.5, width*0.6,height*0.6);
        cancel = createButton('Cancelar');
        cancel.mousePressed(cancelaProcesso);
        cancel.position(width*0.6, height*0.7);
        submit = createButton('Adicionar');
        submit.position(width*0.7, height*0.7);
        frameRate(0);
    }
}

function keyPressed(){
    console.log(key);
    redraw();
}