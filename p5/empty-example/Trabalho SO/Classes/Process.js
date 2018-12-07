class Process {

    constructor(pid, start, deadline, duration, priority) {
        this.pid = pid;
        this.end;
        this.hasMemory = 0;
        this.bloqueado = 0;
        this.executando = 0;
        this.start = start;
        this.deadline = deadline;
        this.duration = duration;
        this.priority = priority;
        this.memPos = [];
        this.pagsForaDaMem = 7;
        this.color = {
            h: hu,
            s: sat + 40,
            b: 100
        };
        hu += 39;
        sat += 39;
        sat %= 60;
        hu %= 100;
    }

    aloca() {
        cpu.escalona(this);
    }

    alocaMem() {
        ram.escalona(this);
    }

    alocaDisco() {
        disco.aloca(this);
    }

    desalocaDisco() {
        disco.desaloca(this);
    }

    reset() {}
}