class CPU{

    constructor(esc){
        this.processos = [];
        this.escalonador = esc;
    }

    escalona(pid){

    }

    show(time, transX,transY){
        for (let a = 1; a <= time; a++) {
                   
            push();
            stroke(255);
            fill(0);
            strokeWeight(2);
            translate(mid-transX*(size+5),transY);
            rectMode(CENTER);
            rect(a*(size+5), 0*(size+5), size, size);
            fill(255);
            strokeWeight(1);
            text(a,a*(size+5)+size/4, 0*(size+5)+size/4, size, size);
            pop();
            
        }

    }
}