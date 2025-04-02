import { useState, useEffect } from 'react';

class Process {
    constructor(id, type, burstTime) {
        this.id = id;
        this.type = type; // "CPU" ou "IO"
        this.burstTime = burstTime;
        this.state = "Pronto"; // Estados: Pronto, Executando, Esperando, Finalizado
        this.waitTimeRemaining = 0; // Tempo restante de espera para processos I/O
    }
}

const useSimulation = () => {
    const [readyQueue, setReadyQueue] = useState([]);
    const [waitingQueue, setWaitingQueue] = useState([]);
    const [runningProcess, setRunningProcess] = useState(null);
    const [finishedProcesses, setFinishedProcesses] = useState([]);
    const [processCount, setProcessCount] = useState(0);
    const [isSimulating, setIsSimulating] = useState(false);

    // Adicionar um novo processo
    const addProcess = (type, burstTime) => {
        const newProcess = new Process(processCount + 1, type, burstTime);
        setProcessCount(processCount + 1);
        setReadyQueue([...readyQueue, newProcess]);
    };

    // Gerenciar processos em espera
    const manageWaitingProcesses = () => {
        const updatedWaitingQueue = [...waitingQueue];
        for (let i = updatedWaitingQueue.length - 1; i >= 0; i--) {
            const process = updatedWaitingQueue[i];
            process.waitTimeRemaining -= 1000;
            if (process.waitTimeRemaining <= 0) {
                process.burstTime = Math.max(0, process.burstTime - 2000);
                if (process.burstTime > 0) {
                    process.state = "Pronto";
                    setReadyQueue(prev => [...prev, process]);
                } else {
                    process.state = "Finalizado";
                    setFinishedProcesses(prev => [...prev, process]);
                }
                updatedWaitingQueue.splice(i, 1);
            }
        }
        setWaitingQueue(updatedWaitingQueue);
    };

    // Simulação principal
    const runSimulation = () => {
        manageWaitingProcesses();

        if (!runningProcess && readyQueue.length > 0) {
            const nextProcess = readyQueue[0];
            nextProcess.state = "Executando";
            setRunningProcess(nextProcess);
            setReadyQueue(readyQueue.slice(1));

            setTimeout(() => {
                if (nextProcess.type === "IO") {
                    nextProcess.state = "Esperando";
                    nextProcess.waitTimeRemaining = 2000;
                    setWaitingQueue(prev => [...prev, nextProcess]);
                } else {
                    nextProcess.state = "Finalizado";
                    setFinishedProcesses(prev => [...prev, nextProcess]);
                }
                setRunningProcess(null);
            }, nextProcess.type === "IO" ? 2000 : nextProcess.burstTime);
        }
    };

    // Iniciar a simulação
    const startSimulation = () => {
        if (readyQueue.length === 0) {
            alert("A fila de processos está vazia!");
            return;
        }
        setIsSimulating(true);
    };

    // Reiniciar a simulação
    const resetSimulation = () => {
        setReadyQueue([]);
        setWaitingQueue([]);
        setRunningProcess(null);
        setFinishedProcesses([]);
        setProcessCount(0);
        setIsSimulating(false);
    };

    // Efeito para rodar a simulação em ciclos
    useEffect(() => {
        if (isSimulating) {
            const interval = setInterval(() => {
                runSimulation();
                if (readyQueue.length === 0 && waitingQueue.length === 0 && !runningProcess) {
                    setIsSimulating(false);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isSimulating, readyQueue, waitingQueue, runningProcess]);

    return {
        readyQueue,
        waitingQueue,
        runningProcess,
        finishedProcesses,
        isSimulating,
        addProcess,
        startSimulation,
        resetSimulation,
    };
};

export default useSimulation;