class EDF{

    constructor(){
        this.id = 3;
        this.premp = 1;
        this.fila = new PriorityQueue();
    }

    push(a){
        this.fila.push(a,a.deadline);
    }

    length(){
        return this.fila.items.length;
    }
}