class CPU{

    constructor(esc){
        this.esc = esc;
        this.ov = over;
        this.emExecucao = Infinity;
    }

    escalona(p){
        this.esc.push(p);
    }

    overhead(){
        this.ov--;
        hist.push({x:time*(size+size*0.2),y: (this.ant+1)*(size+size*0.2), trans: [mid-transX*(size+size*0.2),transY],
            d: function(){
            colorMode(HSB, 100);
            fill(0,100,100);
            rectMode(CENTER);
            translate(0,this.trans[1]);
            rect(this.x, this.y,size,size);}});
    }

    show(time, transX,transY){
        hist.push({txt: time, x: (time)*(size+size*0.2)+size/4, y: 0*(size+size*0.2)+size/4, d: function(){

            stroke(255);
            fill(0);
            strokeWeight(2);
            translate(0,transY);
            fill(255);
            strokeWeight(1);
            rectMode(CENTER);
            text(this.txt,this.x-size/2,this.y, size, size);
            line(this.x-size+size*0.15, this.y+size/4, this.x-size+size*0.15,this.y+(size+size*0.2)*tam);

        }})
        if(this.ov){
          this.overhead();
            
        }else
        if(! this.esc.fila.empty()){
            var p;
            for(let i = 0; i<this.esc.length(); i++){
                p = this.esc.fila.front();
                if(!p.pagsForaDaMem)break;
                else{
                    if(!p.alocando)p.alocaMem();
                    this.esc.fila.pop();
                    this.esc.fila.push(p);
                }
            }
            console.log(this.emExecucao, p.pid, quantum);
            if(p == undefined|| p.pagsForaDaMem)return;
            if(p.pid != this.emExecucao && this.emExecucao!= Infinity){
                this.emExecucao = Infinity;
                this.ov = over;
                quantum = qt;
                this.overhead();
            }
            // if(this.ant != Infinity && p.pid != this.ant&& quantum!=qt && this.esc.premp){
            //     //Page Fault
            //     this.ov = over;
            //     quantum = qt;
            // }
            else {
                this.emExecucao = p.pid;
                hist.push({pid: p.pid,x:time*(size+size*0.2),y: (p.pid+1)*(size+size*0.2), trans: [mid-transX*(size+size*0.2),transY],
                    d: function(){
                    rectMode(CENTER);
                    translate(0,this.trans[1]);
                    rect(this.x, this.y,size,size);
                    fill(0);
                    text(this.pid,this.x+size/2, this.y+size/2,size,size);
                }});
                this.ant = p.pid;
                p.duration--;
                if(this.esc.premp)quantum--;
                if(p.duration == 0){
                    this.emExecucao = Infinity;
                    this.esc.fila.pop();
                    quantum = qt;
                }
            }
            if(this.esc.premp&&quantum == 0){
                console.log("fudeu")
                this.emExecucao = Infinity;
                var p = this.esc.fila.front();
                this.esc.fila.pop();
                if(this.esc.id == 0)this.esc.fila.push(p,p.deadline);
                else this.esc.fila.push(p);
                this.ov = over;
                quantum =qt;
            }
        }
    }
}