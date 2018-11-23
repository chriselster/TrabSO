class QElement { 
    constructor(element, priority) 
    { 
        this.element = element; 
        this.priority = priority; 
    } 
} 
  
class PriorityQueue { 
  
    constructor() 
    { 
        this.items = []; 
    } 
  
    push(element, priority) 
    { 
        var qElement = new QElement(element, priority); 
        var contain = false; 
        for (var i = 0; i < this.items.length; i++) { 
            if (this.items[i].priority > qElement.priority) { 
                this.items.splice(i, 0, qElement); 
                contain = true; 
                break; 
            } 
        } 
    

        if (!contain) { 
            this.items.push(qElement); 
        } 
    }
    
    pop() 
    { 
        if (this.isEmpty()) 
            return "Underflow"; 
        return this.items.pop(); 
    } 

    front() 
    { 
        if (this.isEmpty()) 
            return "No elements in Queue"; 
        return this.items[0]; 
    } 

    isEmpty() 
    { 
        return this.items.length == 0; 
    } 
} 