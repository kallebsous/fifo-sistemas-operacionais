import React, { useState } from 'react';

const ProcessForm = ({ addProcess }) => {
    const [type, setType] = useState('CPU');
    const [burstTime, setBurstTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const burstTimeValue = parseInt(burstTime);
        if (isNaN(burstTimeValue) || burstTimeValue <= 0) {
            alert("Digite um tempo de execução válido!");
            return;
        }
        addProcess(type, burstTimeValue);
        setBurstTime('');
    };

    return (
        <div className="input-section">
            <h2>Configurar Processos</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="processType">Tipo de Processo:</label>
                    <select id="processType" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="CPU">CPU</option>
                        <option value="IO">I/O</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="burstTime">Tempo de Execução (ms):</label>
                    <input
                        type="number"
                        id="burstTime"
                        min="1"
                        placeholder="Ex: 1000"
                        value={burstTime}
                        onChange={(e) => setBurstTime(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn">Adicionar Processo</button>
            </form>
        </div>
    );
};

export default ProcessForm;