class CPU{

    constructor(esc){
        this.esc = esc;
    }

    escalona(p){
        this.esc.push(p);
    }

    show(time, transX,transY){
        hist.push({txt: time, x: time*(size+5)+size/4, y: 0*(size+5)+size/4, d: function(){

            stroke(255);
            fill(0);
            strokeWeight(2);
            translate(0,transY);
            fill(255);
            strokeWeight(1);
            rectMode(CENTER);
            text(this.txt,this.x-size/2,this.y, size, size);
            line(this.x-size+5, this.y+size/4, this.x-size+5,this.y+size*tam);

        }})
        if(!this.esc.fila.empty()){
            var p = this.esc.fila.front();
        
            
            
            

            
            hist.push({x:time*(size+5),y: (p.pid+1)*(size+5), trans: [mid-transX*(size+5),transY],
                d: function(){

                translate(0,this.trans[1]);
                rect(this.x, this.y,size,size);}});

                
            
        
        
            p.duration--;
            if(p.duration == 0){
                this.esc.fila.pop();
            }
        
        }
    }
}