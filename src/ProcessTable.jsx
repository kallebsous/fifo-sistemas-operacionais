import React, { useEffect, useRef } from 'react';

const ProcessTable = ({ title, processes, columns, finished = false }) => {
    const tableRef = useRef(null);

    useEffect(() => {
        if (processes.length > 0) {
            tableRef.current.classList.add('visible');
        }
    }, [processes]);

    return (
        <div className="queue-display">
            <h2>{title}</h2>
            <table ref={tableRef}>
                <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {processes.map(process => (
                    <tr key={process.id}>
                        <td>{process.id}</td>
                        {finished ? (
                            <>
                                <td>Processo {process.id}</td>
                                <td>{process.type}</td>
                                <td>Finalizado</td>
                            </>
                        ) : (
                            <>
                                <td>{process.type}</td>
                                <td>{process.burstTime}</td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProcessTable;