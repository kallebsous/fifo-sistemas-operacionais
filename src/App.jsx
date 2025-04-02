import React from 'react';
import ProcessForm from './ProcessForm';
import ProcessQueue from './ProcessQueue';
import ProcessTable from './ProcessTable';
import ProcessDiagram from './ProcessDiagram';
import useSimulation from './useSimulation';
import './App.css';

const App = () => {
    const {
        readyQueue,
        waitingQueue,
        runningProcess,
        finishedProcesses,
        isSimulating,
        addProcess,
        startSimulation,
        resetSimulation,
    } = useSimulation();

    return (
        <div className="app">
            <header className="header">
                <img src="/logo-invisivel.png" alt="logo-grupo" className="logo" />
                <h1>Simulação de Escalonamento de Processos (FIFO)</h1>
            </header>

            <div className="container">
                <ProcessForm addProcess={addProcess} />
                <ProcessQueue queue={readyQueue} />

                <button
                    className="btn"
                    onClick={startSimulation}
                    style={{ display: isSimulating ? 'none' : 'block' }}
                >
                    Iniciar Simulação
                </button>
                <button
                    className="btn"
                    onClick={resetSimulation}
                    style={{ display: isSimulating ? 'none' : 'block' }}
                >
                    Nova Simulação
                </button>

                <ProcessDiagram
                    readyProcesses={readyQueue}
                    runningProcess={runningProcess}
                    waitingProcesses={waitingQueue}
                />

                <ProcessTable
                    title="Processos Finalizados"
                    processes={finishedProcesses}
                    columns={['PID', 'Processo', 'Tipo', 'Status']}
                    finished
                />
            </div>

            <footer className="footer">
                <p>Equipe os Miseraveis</p>
                <p>Disciplina de Sistemas Operacionais - Unifesspa</p>
            </footer>
        </div>
    );
};

export default App;