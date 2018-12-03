class Memory {
    constructor(w, h, esq) {
        this.x = w * 0.1;
        this.y = h * 0.1;
        this.width = w * 0.3;
        this.height = h * 0.5;
        this.acumulador = [];
        this.processos = [];
        this.pages = new Array(50);
        for (let i = 0; i < this.pages.length; i++) {
            let t = {val: "", r: 0};
            this.pages[i] = t;
        }
        this.esc = esq;
        this.qtd = 50;
        this.map = {};
        this.next = 0;
        this.color = {h:50,s:50,b:100};
    }

    atualValPaginas(){
        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].val += this.pages[i].r;
            this.pages[i].r = 0;
            if(this.pages[i].val.length>8){
                
                this.pages[i].val = this.pages[i].val.substring(1,8);
            }
        }
        console.log(this.pages);
        console.log(this.esc.fila);
        this.esc.clear();
        this.esc.pushAll(this.pages);
    }

    show() {
        var tamPage = this.height / 50;
        push();
        stroke(255);
        strokeWeight(1);
        fill(255);
        rect(this.x, this.y, this.width, this.height);
        pop();
        let u = 0;
        for (let i = this.y + tamPage; i < this.y + this.height; i += tamPage) {
            push();
            stroke(0);
            line(this.x, i, this.x + this.width, i);
            stroke(255);
            fill(255);
            text(u++,this.x-20, i, 20, this.tamPage);
            pop();
        }
        if (this.processos.length>0) {
            for (let a = 0; a < 7; a++) {
                if(this.qtd == 0){
                    //console.log(this.esc.fila.front());
                    this.next = this.esc.front();
                    jobs[this.map[this.esc.front()].pid].pagsForaDaMem++;
                    jobs[this.map[this.esc.front()].pid].memPos.shift();
                    this.esc.fila.pop();
                    //this.pages[this.next].val = "11111111";
                    this.qtd++;
                }
                // console.log(jobs[this.processos[0].id].pid);
                mem.push({width:this.width,pid:jobs[this.processos[0].id].pid,x:this.x,next:this.next,y:this.y,color:this.color,width:this.width,tamPage:tamPage,color: this.processos[0].color,d:function(){
                    push();
                    colorMode(HSB, 100);
                    stroke(0);
                    fill(this.color.h,this.color.s,this.color.b);
                    rect(this.x, this.y + this.next * this.tamPage, this.width, this.tamPage);
                    fill(0);
                    stroke(0);
                    text(this.pid,this.x+this.width/2, this.y + this.next * this.tamPage, this.width, this.tamPage);
                    text(this.pid,this.x+this.width/2, this.y + this.next * this.tamPage, this.width, this.tamPage);
                    pop();
                }
                });
                //console.log(jobs);
                jobs[this.processos[0].id].memPos.push(this.next);
                this.map[this.next] = jobs[this.processos[0].id];                
                if(this.esc.id == -1)this.esc.push(this.next);
                // this.acumulador.push(this.next);
                
                this.next++;
                this.qtd--;

                jobs[this.processos[0].id].pagsForaDaMem--;
                
                if (!jobs[this.processos[0].id].pagsForaDaMem) {
                    
                    // this.acumulador.forEach(pag => {
                    //     this.pages[pag].val = "0000000";
                    // });
                    // this.acumulador = [];
                    this.color = random(0, 1000);
                    this.color %=101;
                    jobs[this.processos[0].id].bloqueado = 0;
                    this.processos.shift();
                    if(!this.processos.length)break;
                }
            }
        }
    }

    escalona(p) {
        p.bloqueado = 1;
        //this.esc.push(p);
        this.processos.push({pagsForaDaMem:p.pagsForaDaMem, id: p.pid, color: p.color});
    }

    reset() {

    }
}