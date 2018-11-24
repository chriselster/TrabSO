class FIFO{

    constructor(){
        this.fila = new Queue;
    }

    push(a){
        this.fila.push(a);
    }

    length(){
        return this.fila.items.length;
    }
}