class Queue 
{ 
    constructor() 
    { 
        this.items = []; 
    } 
    
    unshift(element){
        this.items.unshift(element);
    }

    push(element) 
    {    
        this.items.push(element); 
    } 

    pop() 
    { 
        if(!this.empty())  
        return this.items.shift(); 
    } 

    front(){
        return this.items[0];
    }

    empty() 
    { 
        return this.items.length == 0; 
    }
} 