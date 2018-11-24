const size = 30;
var button;
var cancel;
var cpu = new CPU(new SJF);
var displaceX = 0;
var displaceY = 0;
var graph = [];
var hist = [];
var mem = [];
var jobs = [];
var i;
var mid;
var ok = false;
var ok = false;
var pid = 0;
var processos = new PriorityQueue;
var ram;
var start;
var submit;
var tam = 1;
var time = 0;
var transX = 0;
var transY = 0;

function setup() {
    createCanvas(windowWidth, windowHeight, P2D);
    background(0);
    ram = new Memory(width, height, new FIFO);
    // graph = new Graph(width,height);
    transY = height - 200;
    //IO
    var job = new Process(0,3,11,33,3);
    processos.push(job,3);
    jobs.push(job);
    job = new Process(1,3,10,33,3);
    processos.push(job,3);
    jobs.push(job);
    button = createButton('Novo processo');
    button.id("newprocess");
    addAttr("#newprocess", "data-toggle", "modal");
    addAttr("#newprocess", "data-target", "#Modal");

    button.position(width * 0.7, height * 0.01);
    mid = width / 2;
    iniciar = createButton('Iniciar');
    iniciar.mousePressed(start);
    iniciar.position(button.x + button.width + 20, height * 0.01);
    frameRate(0);
}

function draw() {
    background(0);
    frameRate(2);

    ram.show();
    if (!(processos.empty() && cpu.esc.fila.empty())) cpu.show(time, transX, transY);
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

    if (keyIsDown(RIGHT_ARROW)) { displaceX -= size + 5; }
    if (keyIsDown(LEFT_ARROW)) { displaceX += size + 5; }
    if (keyIsDown(UP_ARROW)) { displaceY += size + 5; }
    if (keyIsDown(DOWN_ARROW)) { displaceY -= size + 5; }

    if (ok == true) {
        //TODO: criar imputs ()
        rectMode(CENTER);
        stroke(60);
        fill(60);
        rect(width * 0.5, height * 0.5, width * 0.6, height * 0.6);
        cancel = createButton('Cancelar');
        cancel.mousePressed(cancelaProcesso);
        cancel.position(width * 0.6, height * 0.7);
        submit = createButton('Adicionar');
        submit.position(width * 0.7, height * 0.7);
        frameRate(0);
    }
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

