class Memory{

    constructor(w,h){
        this.x = w*0.2;
        this.y = h*0.3;
        this.width = w/3.5;
        this.height = h*0.4;
        this.processos = [];
    }

    show(){
        stroke(255);
        strokeWeight(1);
        fill(255);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
    }
    
    reset(){
        
    }
}