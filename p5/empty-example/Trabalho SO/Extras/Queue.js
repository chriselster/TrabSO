class Queue 
{ 
    constructor() 
    { 
        this.items = []; 
    } 
                  
    push(element) 
    {    
        this.items.push(element); 
        console.log(this.front().duration);
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