class CPU {

    constructor(esc) {
        this.esc = esc;
        this.ov = 0;
        this.emExecucao = Infinity;
    }

    escalona(p) {
        this.esc.push(p);
    }

    overhead() {
        this.ov--;
        hist.push({
            x: time * (size + size * 0.2),
            y: (this.ant + 1) * (size + size * 0.2),
            trans: [mid - transX * (size + size * 0.2), transY],
            d: function () {
                push();
                colorMode(HSB, 100);
                fill(0, 100, 100);
                rectMode(CENTER);
                translate(0, this.trans[1]);
                rect(this.x, this.y, size, size);
                pop();
            }
        });
        for(let i = 0; i<jobs.length;i++){
            let p = jobs[i];
            if(this.ant!= p.pid && time>=p.start && p.duration){
                hist.push({
                    pid: p.pid,
                    x: time * (size + size * 0.2),
                    y: (p.pid + 1) * (size + size * 0.2),
                    trans: [mid - transX * (size + size * 0.2), transY],
                    d: function () {
                        push();
                        stroke(0);
                        colorMode(RGB,255);
                        fill(255, 246, 201);
                        rectMode(CENTER);
                        translate(0, this.trans[1]);
                        rect(this.x, this.y, size, size);
                        pop();
                    }
                });
            }
        }
    }

    show(time, transX, transY) {
        hist.push({
            txt: time,
            x: (time) * (size + size * 0.2) + size / 4,
            y: 0 * (size + size * 0.2) + size / 4,
            d: function () {
                push();
                stroke(0);
                strokeWeight(2);
                translate(0, transY);
                fill(0);
                strokeWeight(1);
                rectMode(CENTER);
                text(this.txt, this.x - size / 2, this.y, size, size);
                line(this.x - size + size * 0.15, this.y + size / 4, this.x - size + size * 0.15, this.y+size/2 + (size + size * 0.2) * tam);
                pop();

            }
        })
        

        if (this.ov) {
            this.overhead();
        } else if (!this.esc.fila.empty()) {
            var p;
            for (let i = 0; i < this.esc.length(); i++) {
                p = this.esc.fila.front();

                if (!p.pagsForaDaMem) break;
                else {
                    if (!p.bloqueado) {
                        p.alocaMem();
                        ram.show();
                        break;
                    }
                    //this.esc.fila.push(p);
                }
            }
            if (p == undefined || p.pagsForaDaMem) return;
            p.executando = 1;
            p.memPos.forEach(page => {
                ram.pages[page].r = 1;
            });

            this.emExecucao = p.pid;
            let dead = 255;
            if(this.esc.id == 3&&p.deadline<=time)dead = 180;
            hist.push({
                pid: p.pid,
                color: dead,
                x: time * (size + size * 0.2),
                y: (p.pid + 1) * (size + size * 0.2),
                trans: [mid - transX * (size + size * 0.2), transY],
                d: function () {
                    push();
                    stroke(0);
                    fill(dead);
                    rectMode(CENTER);
                    translate(0, this.trans[1]);
                    rect(this.x, this.y, size, size);
                    fill(0);
                    noStroke();
                    textSize(height*0.015);
                    text(this.pid, this.x -size*0.1, this.y+size*0.4);
                    pop();
                }
            });
            
            for(let i = 0; i<jobs.length;i++){
                let p = jobs[i];
                if(this.esc.id == 3&&p.deadline == time){
                    hist.push({
                        x: time * (size + size * 0.2),
                        y: (p.pid + 1) * (size + size * 0.2),
                        trans: transY,
                        d: function () {
                            push();
                            translate(0, this.trans);
                            stroke(255,0,0);
                            strokeWeight(3);
                            line(this.x-size/2-size*0.1, this.y-size/2,this.x-size/2-size*0.1, this.y+size/2);
                            pop();
                        }
                    })
                }
                if(this.emExecucao!= p.pid && time>=p.start && p.duration){
                    hist.push({
                        x: time * (size + size * 0.2),
                        y: (p.pid + 1) * (size + size * 0.2),
                        trans: transY,
                        d: function () {
                            push();
                            stroke(0);
                            colorMode(RGB,255);
                            fill(255, 246, 201);
                            rectMode(CENTER);
                            translate(0, this.trans);
                            rect(this.x, this.y, size, size);
                            pop();
                        }
                    });
                }
            }
            this.ant = p.pid;
            p.duration--;
            if (this.esc.premp) quantum--;
            if (p.duration == 0) {
                p.end = time+1;
                p.executando = 0;
                this.emExecucao = Infinity;
                this.esc.fila.pop();
                quantum = qt;
            }

            if (this.esc.premp && quantum == 0) {

                this.emExecucao = Infinity;
                var p = this.esc.fila.front();
                p.executando = 0;
                this.esc.fila.pop();
                if (this.esc.id == 0) this.esc.fila.push(p, p.deadline);
                else if (this.esc.id == 1) this.esc.fila.push(p);
                else this.esc.fila.push(p, p.val);
                this.ov = over;
                quantum = qt;
            }
        }
    }
}