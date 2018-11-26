class RoundRobin{

    constructor(){
        this.id = 1;
        this.premp = 1;
        this.fila = new Queue();
    }

    push(a){
        this.fila.push(a);
    }

    length(){
        return this.fila.items.length;
    }
}