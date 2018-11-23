class Process{

    constructor(pid,start,deadline,duration,priority){
        this.pid = pid;
        this.hasCpu = 1;
        this.hasMemory = 0;
        this.start = start;
        this.deadline = deadline;
        this.duration = duration;
        this.priority = priority;
    }

    aloca(){
        cpu.escalona(this);
        //ram.escalona(this);
    }
    
    alocaNaMemoria(){

    }

    reset(){
    }
}