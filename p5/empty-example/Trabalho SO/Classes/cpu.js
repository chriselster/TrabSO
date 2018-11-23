class CPU{

    constructor(esc){
        this.esc = esc;
    }

    escalona(p){
        this.esc.fila.push(p);
    }

    show(time, transX,transY){
        if(!this.esc.fila.empty()){
            var p = this.esc.fila.front();
        
            hist.push({txt: time, x: time*(size+5)+size/4, y: 0*(size+5)+size/4, d: function(){

                stroke(255);
                fill(0);
                strokeWeight(2);
                translate(0,transY);
                rectMode(CENTER);
                rect(this.x-size/4, 0, size, size);
                fill(255);
                strokeWeight(1);
                text(this.txt,this.x,this.y, size, size);

            }})
            
            
            

            
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