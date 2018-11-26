class CPU{

    constructor(esc){
        this.esc = esc;
        this.ov = 0;
        this.pos = 0;
    }

    escalona(p){
        this.esc.push(p);
    }

    show(time, transX,transY){
        hist.push({txt: time, x: (time+1)*(size+5)+size/4, y: 0*(size+5)+size/4, d: function(){

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
        console.log(this.esc.fila);
        if(this.ov){
            this.ov--;
            hist.push({x:time*(size+5),y: (this.pos+1)*(size+5), trans: [mid-transX*(size+5),transY],
                d: function(){
                colorMode(HSB, 100);
                fill(0,100,100);
                rectMode(CENTER);
                translate(0,this.trans[1]);
                rect(this.x, this.y,size,size);}});
        }else 
        if(!this.esc.fila.empty()){
            var p;
            for(let i = 0; i<this.esc.length(); i++){
                p = this.esc.fila.front();
                if(p.hasMemory)break;
                else{
                    if(!p.alocando)p.alocaMem();
                    this.esc.fila.pop();
                    this.esc.fila.push(p);
                }
            }
            if(p == undefined)return;
            if(!p.hasMemory)return;
            hist.push({x:time*(size+5),y: (p.pid+1)*(size+5), trans: [mid-transX*(size+5),transY],
                d: function(){
                rectMode(CENTER);
                translate(0,this.trans[1]);
                rect(this.x, this.y,size,size);}});

                
            
        
            p.duration--;
            if(this.esc.premp)quantum--;
            if(p.duration == 0){
                this.esc.fila.pop();
                quantum = qt;
            }
            else if(this.esc.premp&&quantum == 0){
                var p = this.esc.fila.front();
                console.log(this.esc.fila.front());
                this.esc.fila.pop();
                if(this.esc.id == 0)this.esc.fila.push(p,p.deadline);
                else this.esc.fila.push(p);
                quantum = qt;
                this.ov = over;
                this.pos = p.pid;
            }
        }
    }
}