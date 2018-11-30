class Process{

    constructor(pid,start,deadline,duration,priority){
        this.pid = pid;
        this.executando =0;
        this.exeption = 0;
        this.hasMemory = 0;
        this.alocando = 0;
        this.start = start;
        this.deadline = deadline;
        this.duration = duration;
        this.priority = priority;
        this.memPos = [];
        this.pagsForaDaMem = 7;
        this.color = {h:hu,s:sat+40,b:100};
        hu+=36;sat+=36;brig+=36;
        sat%=60;
        hu%=100;
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