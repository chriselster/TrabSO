function start(){
    time = 0;
    frameRate(5);
    resizeCanvas(width, height+(tam-1)*(size+size*0.2));
}

function calcularTurnaround(){
    var tot = 0;
    jobs.forEach(p => {
        tot += p.end -p.start;
    });
    return tot/jobs.length;
}

function selectCPUEsc(){
    switch (escCPU.value()){
        case "FIFO":
            cpu.esc = new FIFO();
            break;
        case "SJF":
            cpu.esc = new SJF();
            break;
        case "Round Robin":
            cpu.esc = new RoundRobin();
            break;
        case "SJF":
            cpu.esc = new SJF();
            break;
    }
}

function selectMemoryEsc(){
    switch (escMem.value()){
        case "FIFO":
            ram.esc = new FIFO();
            break;
        case "LRU":
            ram.esc = new LRU();
            break;
    }
}