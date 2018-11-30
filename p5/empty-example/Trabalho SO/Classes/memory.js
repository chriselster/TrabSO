class Memory {
    constructor(w, h, esq) {
        this.x = w * 0.1;
        this.y = h * 0.1;
        this.width = w * 0.3;
        this.height = h * 0.5;
        this.processos = [];
        this.esc = esq;
        this.qtd = 50;
        this.next = 0;
        this.color = {h:50,s:50,b:100};
    }
    show() {
        var page = this.height / 50;
        stroke(255);
        strokeWeight(1);
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    
        for (let i = this.y + page; i < this.y + this.height; i += page) {
            stroke(0);
            line(this.x, i, this.x + this.width, i);
            
        }
        if (this.processos.length>0) {
            
            for (let a = 0; a < tempi[u]; a++) {
                
                if(this.qtd == 0){
                    this.next = jobs[this.esc.front().pid].memPos[0];
                    jobs[this.esc.front().pid].hasMemory = 0;
                    jobs[this.esc.front().pid].pagsForaDaMem++;
                    jobs[this.esc.front().pid].memPos.shift();
                    if(jobs[this.esc.front().pid].memPos.length == 0){
                        this.esc.fila.pop();
                    }
                    this.qtd++;
                }
                mem.push({width:this.width,pid:jobs[this.processos[0].id].pid,x:this.x,next:this.next,y:this.y,color:this.color,width:this.width,page:page,color: this.processos[0].color,d:function(){
                    push();
                    colorMode(HSB, 100);
                    fill(this.color.h,this.color.s,this.color.b);
                    rect(this.x, this.y + this.next * this.page, this.width, this.page);
                    fill(0);
                    stroke(0);
                    text(this.pid,this.x+this.width/2, this.y + this.next * this.page, this.width, this.page);
                    pop();
                }
                });
                jobs[this.processos[0].id].memPos.push(this.next);
                this.next++;
                this.qtd--;
                jobs[this.processos[0].id].pagsForaDaMem--;
                if (!jobs[this.processos[0].id].pagsForaDaMem) {
                    this.color = random(0, 1000);
                    this.color %=101;
                    jobs[this.processos[0].id].alocando = 0;
                    this.processos.shift();
                }
                if(!this.processos.length)break;
            }
            u++;
            u%=3;
        }
    }

    escalona(p) {
        p.alocando = 1;
        this.esc.push(p);
        this.processos.push({pagsForaDaMem:p.pagsForaDaMem, id: p.pid, color: p.color});
    }

    reset() {

    }
}