//TODO: formulario quantum e alg escalonador
var button;
var cancel;
var cpu;
var okay = 1;
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
var quantum;
var ram;
var size;
var start;
var submit;
var tam = 10;
var time = 0;
var transX = 0;
var transY = 0;
var turnar = 0;
var velocidade;
//TODO: Adicionar overhead
function setup() {
    createCanvas(windowWidth - 7, windowHeight - 7, P2D);
    velocidade = createSlider(1, 60, 2);

    background(255);
    transY = height * 0.8;
    size = ceil(height * 0.03);
    //IO
    /*var job = new Process(0, 0, 1, 6, 6);
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
    job = new Process(6, 0, 6, 6, 6);
    processos.push(job, 0);
    jobs.push(job);
    job = new Process(7, 0, 6, 6, 6);
    processos.push(job, 0);
    jobs.push(job);
    job = new Process(8, 0, 6, 6, 6);
    processos.push(job, 0);
    jobs.push(job);*/

    disco = new Disco(width, height);

    button = createButton('Novo processo');
    button.id("newprocess");
    addAttr("#newprocess", "class", "btn btn-primary");
    addAttr("#newprocess", "data-toggle", "modal");
    addAttr("#newprocess", "data-target", "#Modal");
    displaceX = width / 2;
    mid = width / 2;

    iniciar = createButton('Iniciar');
    iniciar.id("iniciar")
    addAttr("#iniciar", "class", "btn btn-success");
    iniciar.mousePressed(start);
    frameRate(0);

    config = createButton('Configurações');
    config.id("config");
    addAttr("#config", "class", "btn btn-info");
    addAttr("#config", "data-toggle", "modal");
    addAttr("#config", "data-target", "#Modal3");

    turn = createButton('Calcular Turnaround');
    turn.id("turn")
    addAttr("#turn", "class", "btn btn-warning");
    turn.mousePressed(function(){
        if(turnar==1){
            var tot = 0;
            jobs.forEach(p => {
                tot += p.end -p.start;
            });
            return alert(tot/jobs.length);
        }
        else{
            alert("Espere todos os processos serem iniciados e executados antes de calcular o turnaround");
        }
    });
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

    iniciar.position(width * 0.005, height * 0.01);
    button.position(iniciar.x + iniciar.width + 20, height * 0.01);
    config.position(iniciar.x + iniciar.width + 160, height * 0.01);
    turn.position(iniciar.x + button.width + 230, height * 0.01);
    icon.position(iniciar.x + button.width + 410, height * 0.01);
    velocidade.position(width * 0.35, height * 0.05);
    textSize(15);
    text("VELOCIDADE:", velocidade.x * 1, height*0.03);

    addAttr("#icon", "data-toggle", "modal");
    addAttr("#icon", "data-target", "#Modal2");

}

function draw() {
    background(255);
    frameRate(velocidade.value());
    while (processos.front().start == time) {
        processos.front().aloca();
        let u = processos.front().pagsForaDaMem;
        while (u--) processos.front().alocaDisco();
        processos.pop();
    }
    if (!(processos.empty() && cpu.esc.fila.empty())) {
        cpu.show(time, transX, transY);
        displaceX -= size + floor(size * 0.1);
    } else {
        frameRate(100);
        if(okay == 1){
            okay=0;
            turnar=1;
        }
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

