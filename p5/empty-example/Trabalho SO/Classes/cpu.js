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
                    if(!p.bloqueado)p.alocaMem();
                    this.esc.fila.pop();
                    this.esc.fila.push(p);
                }
            }
            if(p == undefined|| p.pagsForaDaMem)return;
            if(p.pid != this.emExecucao && this.emExecucao!= Infinity){
                this.emExecucao = Infinity;
                this.ov = over;
                quantum = qt;
                this.overhead();
            }
            else {
                p.memPos.forEach(page => {
                    ram.pages[page].r = 1;
                });
                this.emExecucao = p.pid;
                hist.push({pid: p.pid,x:time*(size+size*0.2),y: (p.pid+1)*(size+size*0.2), trans: [mid-transX*(size+size*0.2),transY],
                    d: function(){
                    push();
                    stroke(0);
                    fill(255);
                    rectMode(CENTER);
                    translate(0,this.trans[1]);
                    rect(this.x, this.y,size,size);
                    fill(0);
                    text(this.pid,this.x+size/2, this.y+size/2,size,size);
                    pop();
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
                this.emExecucao = Infinity;
                var p = this.esc.fila.front();
                this.esc.fila.pop();
                if(this.esc.id == 0)this.esc.fila.push(p,p.deadline);
                else if(this.esc.id == 1) this.esc.fila.push(p);
                else this.esc.fila.push(p, p.val);
                this.ov = over;
                quantum =qt;
            }
        }
    }
}