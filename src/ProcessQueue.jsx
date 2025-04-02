import React from 'react';

const ProcessQueue = ({ queue }) => {
    return (
        <div className="queue-display">
            <h2>Fila de Pronto</h2>
            <ul id="readyQueue">
                {queue.map(process => (
                    <li key={process.id}>
                        Processo {process.id} ({process.type}) - {process.burstTime} ms
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProcessQueue;