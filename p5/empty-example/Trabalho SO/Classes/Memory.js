class Memory {
    constructor(w, h, esq) {
        this.x = w * 0.1;
        this.y = h * 0.12;
        this.width = w * 0.3;
        this.height = h * 0.65;
        this.processos = [];
        this.pages = new Array(50);
        for (let i = 0; i < this.pages.length; i++) {
            let t = {
                val: "",
                r: 0
            };
            this.pages[i] = t;
        }
        this.esc = esq;
        this.qtd = 50;
        this.map = {};
        this.next = 0;
        this.color = {
            h: 50,
            s: 50,
            b: 100
        };
    }

    atualValPaginas() {
        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].val += this.pages[i].r;

            this.pages[i].r = 0;
            if (this.pages[i].val.length > 60) {

                this.pages[i].val = this.pages[i].val.substring(1, 61);

            }
        }
        this.esc.clear();
        this.esc.pushAll(this.pages);
    }

    show() {
        var tamPage = this.height / 50;
        push();
        stroke(0);
        strokeWeight(1);
        fill(255);
        rect(this.x, this.y, this.width, this.height);
        pop();
        let u = 0;
        for (let i = this.y + tamPage; i < this.y + this.height + 1; i += tamPage) {
            push();
            stroke(0);
            line(this.x, i, this.x + this.width, i);
            stroke(0);
            fill(0);
            strokeWeight(0.7);
            textSize(tamPage*1.1)
            text(u++, this.x - 20, i);
            pop();
        }
        if (this.processos.length > 0) {
            var acumulador = [];
            for (let a = 0; a < 7; a++) {
                if (this.qtd == 0) {
                    var p = jobs[this.map[this.esc.front()].pid];
                    while (p.executando) {
                        acumulador.push(this.esc.front());
                        this.esc.fila.pop();
                        if (this.esc.fila.empty()) {
                            for (var i = acumulador.length - 1; i >= 0; i--) {
                                this.esc.pushFront(acumulador[i]);
                            }
                            return;
                        }
                        p = jobs[this.map[this.esc.front()].pid];
                    }
                    this.next = this.esc.front();
                    p.pagsForaDaMem++;
                    p.memPos.shift();
                    p.alocaDisco();
                    this.esc.fila.pop();
                    this.qtd++;
                }
                var n = jobs[this.processos[0].id].pid;

                mem.push({
                    width: this.width,
                    id: parseInt(n),
                    x: this.x,
                    next: this.next,
                    y: this.y,
                    color: this.color,
                    width: this.width,
                    tamPage: tamPage,
                    color: this.processos[0].color,
                    d: function () {
                        push();
                        colorMode(HSB, 100);
                        stroke(0);
                        fill(this.color.h, this.color.s, this.color.b);
                        rect(this.x, this.y + this.next * this.tamPage, this.width, this.tamPage);
                        fill(0);
                        stroke(0);
                        strokeWeight(0.7);
                        textSize(tamPage*1.1)
                        text(this.id, this.x + this.width / 2, this.y + (this.next+1) * this.tamPage);
                        pop();
                    }
                });
                jobs[this.processos[0].id].memPos.push(this.next);
                this.map[this.next] = jobs[this.processos[0].id];
                if (this.esc.id == -1) this.esc.push(this.next);
                this.pages[this.next].r = 1;
                if(this.esc.id == 1)this.atualValPaginas();
                this.next++;
                this.qtd--;

                jobs[this.processos[0].id].pagsForaDaMem--;
                jobs[this.processos[0].id].desalocaDisco();
                if (!jobs[this.processos[0].id].pagsForaDaMem) {

                    this.color = random(0, 1000);
                    this.color %= 101;
                    jobs[this.processos[0].id].bloqueado = 0;
                    this.processos.shift();
                    if (!this.processos.length) break;
                }
            }
            for (var i = acumulador.length - 1; i >= 0; i--) {
                this.esc.pushFront(acumulador[i]);
            }
        }
    }

    escalona(p) {
        p.bloqueado = 1;
        this.processos.push({
            pagsForaDaMem: p.pagsForaDaMem,
            id: p.pid,
            color: p.color
        });
        //this.show();
    }

    aloca() {

    }

    reset() {

    }
}