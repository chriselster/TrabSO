class SJF{

    constructor(){
        this.id = 2;
        this.premp = 0;
        this.fila = new PriorityQueue();
    }

    push(a){
        this.fila.push(a,a.duration);
    }

    length(){
        return this.fila.items.length;
    }
}