import React from 'react';
import './ProcessDiagram.css';

const ProcessDiagram = ({ readyProcesses, runningProcess, waitingProcesses, transitioningState }) => {
    return (
        <div className="diagram-container">
            {/* Estado "Execução" */}
            <div className="state-circle execution">
                <h3>Execução</h3>
                <div className="process-list">
                    {runningProcess ? (
                        <p className="process-item">
                            Processo {runningProcess.id} ({runningProcess.type}) - {runningProcess.burstTime} ms
                        </p>
                    ) : (
                        <p className="process-item empty">Nenhum processo em execução</p>
                    )}
                </div>
            </div>

            {/* Estado "Espera" */}
            <div className="state-circle waiting">
                <h3>Espera</h3>
                <div className="process-list">
                    {waitingProcesses.length > 0 ? (
                        waitingProcesses.map(process => (
                            <p key={process.id} className="process-item">
                                Processo {process.id} ({process.type}) - {process.burstTime} ms
                            </p>
                        ))
                    ) : (
                        <p className="process-item empty">Nenhum processo em espera</p>
                    )}
                </div>
            </div>

            {/* Estado "Pronto" */}
            <div className="state-circle ready">
                <h3>Pronto</h3>
                <div className="process-list">
                    {readyProcesses.length > 0 ? (
                        readyProcesses.map(process => (
                            <p key={process.id} className="process-item">
                                Processo {process.id} ({process.type}) - {process.burstTime} ms
                            </p>
                        ))
                    ) : (
                        <p className="process-item empty">Nenhum processo pronto</p>
                    )}
                </div>
            </div>

            {/* Setas com classe dinâmica para indicar transição */}
            <div className={`arrow execution-to-waiting ${transitioningState === 'execution-to-waiting' ? 'active' : ''}`}></div>
            <div className={`arrow waiting-to-ready ${transitioningState === 'waiting-to-ready' ? 'active' : ''}`}></div>
            <div className={`arrow ready-to-execution ${transitioningState === 'ready-to-execution' ? 'active' : ''}`}></div>
            <div className={`arrow execution-to-ready ${transitioningState === 'execution-to-ready' ? 'active' : ''}`}></div>
        </div>
    );
};

export default ProcessDiagram;