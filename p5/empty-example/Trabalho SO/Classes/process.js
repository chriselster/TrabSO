class Process{

    constructor(pid,start,deadline,duration,priority){
        this.pid = pid;
        this.hasCpu = 0;
        this.hasMemory = 0;
        this.start = start;
        this.deadline = deadline;
        this.end = this.start+duration;
        this.priority = priority;
        if(this.end> maxi){
            maxi = this.end;
        }
    }

    show(time, transX,transY,i){
        if(!this.hasMemory){
            ram.escalona(this.pid);
        }
        if(!this.hasCpu){
            cpu.escalona(this.pid);
        }
        if(this.hasCpu){
            if(time>=this.start){
                fill(255);
                for (let a = this.start; a <= min(time,this.end); a++) {
                   
                    push();
                    translate(mid-transX*(size+5),transY);
                    rect(a*(size+5), i*(size+5), size, size);
                    pop();
                    
                }
            }
        }
    }
    
    alocaNaMemoria(){

    }

    reset(){
    }
}