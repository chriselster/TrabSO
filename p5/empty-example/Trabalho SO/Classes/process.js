class Process{

    constructor(pid,start,deadline,duration,priority){
        this.pid = pid;
        this.hasMemory = 0;
        this.alocando = 0;
        this.start = start;
        this.deadline = deadline;
        this.duration = duration;
        this.priority = priority;
        this.size = 7;
    }

    aloca(){
        cpu.escalona(this);
        ram.escalona(this);
    }

    alocaMem(){
        ram.escalona(this);
    }
    
    alocaNaMemoria(){

    }

    reset(){
    }
}