class Memory {
    constructor(w, h, esq) {
        this.x = w * 0.1;
        this.y = h * 0.1;
        this.width = w * 0.3;
        this.height = h * 0.5;
        this.processos = [];
        this.esc = esq;
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
            for (let a = 0; a < min(3, this.processos[0].size); a++) {
                mem.push({x:this.x,next:this.next,y:this.y,color:this.color,width:this.width,page:page,color: this.processos[0].color,d:function(){
                    push();
                    colorMode(HSB, 100);
                    fill(this.color.h,this.color.s,this.color.b);
                    rect(this.x, this.y + this.next * this.page, this.width, this.page);
                    pop();
                }
                });
                this.next++;
                this.processos[0].size--;
            }
            if (!this.processos[0].size) {
                this.color = random(0, 1000);
                this.color %=101;
                jobs[this.processos[0].id].hasMemory = 1;
                jobs[this.processos[0].id].alocando = 0;
                this.processos.shift();
            }
        }
    }

    escalona(p) {
        console.log(p);
        p.alocando = 1;
        this.esc.push(p);
        this.processos.push({size:p.size, id: p.pid, color: p.color});
    }

    reset() {

    }
}