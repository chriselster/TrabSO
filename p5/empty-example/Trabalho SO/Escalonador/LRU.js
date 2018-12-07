class LRU{

    constructor(){
        this.id = 1;
        this.premp = 1;
        this.fila = new PriorityQueue();
    }

    front(){
        return this.fila.front();
    }
    
    pushAll(pages){
        var u = 0;
        pages.forEach(page => {
            var tot = 0;
            for(let i=0;i<page.val.length;i++){
                tot += pow(2,i)*parseInt(page.val[i]);
            }
            this.fila.push(u,tot);
            u++;
        });

    }

    clear(){
        this.fila.clear();
    }

    length(){
        return this.fila.items.length;
    }
}