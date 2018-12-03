class FIFO{

    constructor(){
        this.id = -1;
        this.premp = 0;
        this.fila = new Queue();
    }

    front(){
        return this.fila.front();
    }
    
    push(a){
        this.fila.push(a);
    }

    length(){
        return this.fila.items.length;
    }
}