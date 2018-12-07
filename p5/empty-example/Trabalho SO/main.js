//TODO: formulario quantum e alg escalonador
var button;
var cancel;
var cpu;
var displaceX = 0;
var displaceY = 0;
var graph = [];
var hist = [];
var hu = 0,
    sat = 0,
    brig = 0;
var i;
var jobs = [];
var mem = [];
var disco;
var mid;
var ok = false;
var ok = false;
var over = 1;
var pid = 0;
var processos = new PriorityQueue();
var qt = 2;
var quantum = 2;
var ram;
var size;
var start;
var submit;
var tam = 12;
var time = 0;
var transX = 0;
var transY = 0;
var velocidade;
//TODO: Adicionar overhead
function setup() {
    createCanvas(windowWidth - 7, windowHeight - 7, P2D);
    velocidade = createSlider(1, 60, 2);
    cpu = new CPU(new FIFO());
    ram = new Memory(width, height, new FIFO());
    velocidade.position = (width * 0.1, height * 0.05);
    background(255);
    transY = height * 0.8;
    size = ceil(height * 0.03);
    //IO
    var job = new Process(0, 0, 1, 6, 6);
    processos.push(job, 0);
    jobs.push(job);
    job = new Process(1, 0, 1, 6, 1);
    processos.push(job, 0);
    jobs.push(job);
    job = new Process(2, 0, 1, 6, 1);
    processos.push(job, 0);
    jobs.push(job);
    job = new Process(3, 0, 1, 6, 6);
    processos.push(job, 0);
    jobs.push(job);
    job = new Process(4, 0, 6, 6, 6);
    processos.push(job, 0);
    jobs.push(job);
    job = new Process(5, 0, 6, 6, 6);
    processos.push(job, 0);
    jobs.push(job);
    job = new Process(6, 3, 6, 6, 6);
    processos.push(job, 3);
    jobs.push(job);
    job = new Process(7, 0, 6, 6, 6);
    processos.push(job, 0);
    jobs.push(job);
    job = new Process(8, 0, 6, 6, 6);
    processos.push(job, 0);
    jobs.push(job);

    escCPU = createSelect();
    escCPU.position(10, 10);
    escCPU.option('FIFO');
    escCPU.option('SJF');
    escCPU.option('EDF');
    escCPU.option('Round Robin');
    escCPU.changed(selectCPUEsc);

    escMem = createSelect();
    escMem.position(200, 10);
    escMem.option('FIFO');
    escMem.option('LRU');
    escMem.changed(selectMemoryEsc);

    disco = new Disco(width, height);
    button = createButton('Novo processo');
    button.id("newprocess");
    addAttr("#newprocess", "class", "btn btn-primary");
    addAttr("#newprocess", "data-toggle", "modal");
    addAttr("#newprocess", "data-target", "#Modal");
    displaceX = width / 2;
    button.position(width * 0.7, height * 0.01);
    mid = width / 2;
    iniciar = createButton('Iniciar');
    iniciar.id("iniciar")
    addAttr("#iniciar", "class", "btn btn-success");
    iniciar.mousePressed(start);
    iniciar.position(button.x + button.width + 20, height * 0.01);
    frameRate(0);
    node = document.createElement("i");
    node.setAttribute("id", "question");
    node.setAttribute("class", "fas fa-question-circle");
    node.style.fontSize = "38px";
    node.dataToggle = "tooltip";
    node.dataPlacement = "bottom";
    node.title = "Dúvidas sobre os algoritmos"
    icon = createDiv();
    icon.id("icon");
    document.getElementById("icon").appendChild(node);
    icon.position(button.x + button.width + 100, height * 0.01);
    addAttr("#icon", "data-toggle", "modal");
    addAttr("#icon", "data-target", "#Modal2");

}

function draw() {
    background(255);
    frameRate(velocidade.value());
    while (processos.front().start == time) {
        processos.front().aloca();
        let u = processos.front().pagsForaDaMem;
        while(u--)processos.front().alocaDisco();
        processos.pop();
    }
    //console.log(cpu.esc.fila);
    if (!(processos.empty() && cpu.esc.fila.empty())) {
        cpu.show(time, transX, transY);
        displaceX -= size + floor(size * 0.1);
    } else {
        frameRate(100);
        calcularTurnaround();
    }
    ram.show();
    disco.show();
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

    if (ram.esc.id == 1) ram.atualValPaginas();
    if (keyIsDown(RIGHT_ARROW)) {
        displaceX -= size + floor(size * 0.2);
    }
    if (keyIsDown(LEFT_ARROW)) {
        displaceX += size + floor(size * 0.2);
    }
    if (keyIsDown(UP_ARROW)) {
        displaceY += size + floor(size * 0.2);
    }
    if (keyIsDown(DOWN_ARROW)) {
        displaceY -= size + floor(size * 0.2);
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
    } else {
        alert("Favor preencher todos os campos com valores válidos");
    }
    tam++;
}
