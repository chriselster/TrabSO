function start(){
    if(cpu && ram){
        time = 0;
        frameRate(5);
        resizeCanvas(width, height+(tam-1)*(size+size*0.2));
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
        $("#success1")[0].style.display="block";
    } else {
        alert("Favor preencher todos os campos com valores válidos");
    }
    tam++;
}

function configs(){
    var escalonamento = $("#escalonamento").val();
    var paginacao = $("#paginacao").val();
    var qtm = $("#quantum").val();
    if(escalonamento !== "" && paginacao !== "" && qtm !== ""){
        if(escalonamento.toLowerCase() == "fifo"){
            cpu = new CPU(new FIFO());
        }
        else if(escalonamento.toLowerCase() == "sjf"){
            cpu = new CPU(new SJF());
        }
        else if(escalonamento.toLowerCase() == "round robin"){
            cpu = new CPU(new RoundRobin());
        }
        else if(escalonamento.toLowerCase() == "edf"){
            cpu = new CPU(new EDF());
        }

        if(paginacao.toLowerCase() == "fifo"){
            ram = new Memory(width, height, new FIFO());;
        }
        else if(paginacao.toLowerCase() == "LRU"){
            ram = new Memory(width, height, new LRU());;
        }
        quantum = qtm;
        console.log(cpu);
        console.log(ram);
        console.log(quantum);
        $("#success2")[0].style.display="block"
    }
    else{
        alert("Favor preencher todos os campos com valores válidos");
    }
}