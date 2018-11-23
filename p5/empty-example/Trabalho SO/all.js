const size = 30;
var ram;
var ok = false;
var button;
var start;
var time = 0;
var ok = false;
var cancel;
var graph = [];
var hist = [];
var displaceX =0;
var displaceY = 0;
var i;
var pid = 0;
var transX = 0;
var transY;
var maxi = 0;
// var graph;
var x = new Process(pid++,0,0,20,0);
var y = new Process(pid++,5,0,20,0);
var submit;
var processos = [];
var mid;
var cpu = new CPU(new FIFO);
function setup() {
    createCanvas(displayWidth, displayHeight, P2D);
    
    background(0);
    ram = new Memory(width,height);
    // graph = new Graph(width,height);
    processos.push(x,0);
    processos.push(y,5);
    transY= height-200;
    //IO
    
    button = createButton('Novo processo');
    button.id("newprocess");
    addAttr("#newprocess", "data-toggle", "modal");
    addAttr("#newprocess", "data-target", "#Modal");
    
    button.position(width*0.7, height*0.01);
    mid = width/2;
    iniciar = createButton('Iniciar');
    iniciar.mousePressed(start);
    iniciar.position(button.position.x, height*0.01);
    frameRate(0);
}

function draw() {
    background(0);
    frameRate(5);
    
    ram.show();
    cpu.show(time, transX,transY);
    while(processos.front().start == time){processos.front().aloca();processos.pop();}
    for(let q = 0; q< hist.length; q++){
        push();
        translate(displaceX,displaceY);
        hist[q].d();
        pop();
    }
    //colocar num while
    transX++;
    time++;
   // if(!(processos.isEmpty()&&cpu.esc.fila.empty()))noLoop()
    if(keyIsDown(RIGHT_ARROW)){displaceX+=size+5;}
    if(keyIsDown(LEFT_ARROW)){displaceX-=size+5;}
    if(keyIsDown(UP_ARROW)){displaceY+=size+5;}
    if(keyIsDown(DOWN_ARROW)){displaceY-=size+5;}
    
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
function addAttr(button,data,item){
    $(button).attr(data,item);
}

function addProcess(){
    var start = $("#start").val();  
    var duration = $("#duration").val();  
    var deadline = $("#deadline").val();  
    var priority = $("#priority").val();
    if(start !== "" && duration !== "" && deadline !== "" && priority !== "" ){
        processos.push(new Process(pid++,start,deadline,duration,priority));
        $("#start").val("");  
        $("#duration").val("");  
        $("#deadline").val("");  
        $("#priority").val("");
    }
    else{
        alert("Favor preencher todos os campos com valores válidos");
    }

}

