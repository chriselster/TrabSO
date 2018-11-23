class Curve{
    
    constructor(){
        this.path = [];
        this.current = createVector();
    }

    setX(x){
        this.current.x = x;
    }

    setY(y){
        this.current.y = y;
    }

    addPoint(){
        this.path.push(this.current);
        this.current = createVector();
    }

    show(){
        stroke(255);
        strokeWeight(1);
        beginShape();
        this.path.forEach(v => {
            vertex(v.x, v.y);
        });
        endShape();
    }
    
    reset(){
        this.path = [];
    }
}