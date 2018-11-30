//TODO: formulario quantum e alg escalonador
var button;
var u = 0;
var tempi = [2,2,3];
var cancel;
var cpu;
var displaceX = 0;
var displaceY = 0;
var graph = [];
var hist = [];
var hu=0,sat=0,brig=0;
var i;
var jobs = [];
var mem = [];
var mid;
var ok = false;
var ok = false;
var over = 1;
var pid = 0;
var processos = new PriorityQueue();
var qt =2;
var quantum = 2;
var ram;
var size;
var start;
var submit;
var tam = 12;
var time = 0;
var transX = 0;
var transY = 0;
//TODO: Adicionar overhead
function setup() {
    cpu = new CPU(new RoundRobin());
    createCanvas(windowWidth-7, windowHeight-7, P2D);
    background(0);
    ram = new Memory(width, height, new FIFO());
    // graph = new Graph(width,height);
    transY = height*0.65;
    size = ceil(height*0.03);
    //IO
    var job = new Process(0,0,1,6,6);
    processos.push(job,0);
    jobs.push(job);
    job = new Process(1,0,1,6,1);
    processos.push(job,0);
    jobs.push(job);
    job = new Process(2,0,1,6,1);
    processos.push(job,0);
    jobs.push(job);
    job = new Process(3,0,1,6,6);
    processos.push(job,0);
    jobs.push(job);
    job = new Process(4,0,6,6,6);
    processos.push(job,0);
    jobs.push(job);
    job = new Process(5,0,6,6,6);
    processos.push(job,0);
    jobs.push(job);
    job = new Process(6,0,6,6,6);
    processos.push(job,0);
    jobs.push(job);
    job = new Process(7,0,6,6,6);
    processos.push(job,0);
    jobs.push(job);
    job = new Process(8,0,6,6,6);
    processos.push(job,0);
    jobs.push(job);
    job = new Process(9,0,6,6,6);
    processos.push(job,0);
    jobs.push(job);
    job = new Process(10,0,6,6,6);
    processos.push(job,0);
    jobs.push(job);
    job = new Process(11,0,6,6,3);
    processos.push(job,0);
    jobs.push(job);
    
    button = createButton('Novo processo');
    button.id("newprocess");
    addAttr("#newprocess", "data-toggle", "modal");
    addAttr("#newprocess", "data-target", "#Modal");
    displaceX = width/2;
    button.position(width * 0.7, height * 0.01);
    mid = width / 2;
    iniciar = createButton('Iniciar');
    iniciar.mousePressed(start);
    iniciar.position(button.x + button.width + 20, height * 0.01);
    frameRate(0);
}

function draw() {
    background(0);
    frameRate(100);

    ram.show();
    if (!(processos.empty() && cpu.esc.fila.empty())) {cpu.show(time, transX, transY); displaceX-=size+floor(size*0.1);}
    else frameRate(100);
    while (processos.front().start == time) { processos.front().aloca(); processos.pop(); }
    for (let q = 0; q < hist.length; q++) {
        push();
        translate(displaceX, displaceY);
        hist[q].d();
        pop();
    }
    for (let q = 0; q < mem.length; q++) {
        push();
        mem[q].d();
        pop();
    }
    //colocar num while
    transX++;
    time++;

    if (keyIsDown(RIGHT_ARROW)) { displaceX -= size + floor(size*0.2); }
    if (keyIsDown(LEFT_ARROW)) { displaceX += size + floor(size*0.2); }
    if (keyIsDown(UP_ARROW)) { displaceY += size + floor(size*0.2); }
    if (keyIsDown(DOWN_ARROW)) { displaceY -= size + floor(size*0.2); }
}

function mouseClicked(){
    redraw();
}

function addAttr(button, data, item) {
    $(button).attr(data, item);
}

function addProcess() {
    var start = $("#start").val();
    var duration = $("#duration").val();
    var deadline = $("#deadline").val();
    var priority = $("#priority").val();
    if (start !== "" && duration !== "" && deadline !== "" && priority !== "") {
        var job = new Process(pid++, start, deadline, duration, priority);
        processos.push(job, start);
        jobs.push(job);
        $("#start").val("");
        $("#duration").val("");
        $("#deadline").val("");
        $("#priority").val("");
    }
    else {
        alert("Favor preencher todos os campos com valores válidos");
    }
    tam++;
}

