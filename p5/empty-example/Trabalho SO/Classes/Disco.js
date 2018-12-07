class Disco {
    constructor(w, h) {
        this.x = w * 0.55;
        this.y = h * 0.1;
        this.width = w * 0.3;
        this.height = h * 0.65;
        this.next = 0;
        this.tamProc = this.height / ((jobs.length*7));
        if(this.tamProc<0)this.tamProc = 5;
        this.vazio = new Array((jobs.length*7));
        this.paginas = new Array((jobs.length*7));
        this.vazio.fill(1);
    }

    show() {
        push();
        stroke(0);
        strokeWeight(1);
        fill(200);
        rect(this.x, this.y, this.width, this.height);
        pop();
        let u = 0;
        for (let i = this.y + this.tamProc; i < this.y + this.height+1; i += this.tamProc) {
            push();
            stroke(0);
            line(this.x, i, this.x + this.width, i);
            stroke(0);
            fill(0);
            if(this.paginas[u]!= undefined){
                colorMode(HSB, 100);
                fill(this.paginas[u].color.h,this.paginas[u].color.s,this.paginas[u].color.b);
                rect(this.x, this.y+ u*this.tamProc, this.width,this.tamProc);
                fill(0);
                strokeWeight(0.5);
                textSize(this.tamProc*1.2);
                text(this.paginas[u].pid,this.x+this.width/2, (this.y+(u+1) *this.tamProc));

            }
            pop();
            u++;
        }
    }


    aloca(p) {
        for(let i = 0;i<this.vazio.length;i++){
            if(this.vazio[i] == 1){
                this.vazio[i]=0;
                this.paginas[i] = p;
                break;
            }
        }
    }

    desaloca(p){
        push();
        colorMode(HSB, 100);
        fill(p.color.h,p.color.s,p.color.b);
        line(width*0.45, height*0.3,width*0.53,height*0.3);
        triangle(width*0.43, height*0.3, width*0.45, height*0.29, width*0.45, height*0.31)
        textSize(this.height*0.05)
        stroke(0);
        text(p.pid,width*0.47,height*0.25);

        pop();
    }

    reset() {

    }
}