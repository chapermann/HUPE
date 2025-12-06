import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AtendimentoExterno() {
  const [nome, setNome] = useState('');
  const [prontuario, setProntuario] = useState('');
  const [queixa, setQueixa] = useState('');
  const [risco, setRisco] = useState('VERDE');
  const [onco, setOnco] = useState(false);
  const [hemato, setHemato] = useState(false);
  const [outros, setOutros] = useState(false);
  const navigate = useNavigate();

  const enviar = async () => {
    if (queixa.length > 250) return alert('Queixa máxima 250 caracteres');
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3000/api/atendimento-externo', {
      nomePaciente: nome,
      prontuario,
      queixa,
      risco,
      onco,
      hemato,
      outros
    }, { headers: { Authorization: `Bearer ${token}` } });

    navigate('/confirmacao', { state: { nomePaciente: nome, prontuario, queixa, risco } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-red-600 mb-8">Triagem - Atendimento Externo</h2>

        <input placeholder="Nome do Paciente" value={nome} onChange={e => setNome(e.target.value)} className="w-full p-3 border mb-4 rounded" />
        <input placeholder="Prontuário" value={prontuario} onChange={e => setProntuario(e.target.value)} className="w-full p-3 border mb-4 rounded" />

        <textarea
          placeholder="Queixa/Demanda (máx 250 caracteres)"
          value={queixa}
          onChange={e => setQueixa(e.target.value)}
          maxLength={250}
          className="w-full p-3 border mb-4 rounded h-32"
        />

        <div className="mb-6">
          <p className="font-bold mb-2">Classificação de Risco:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['VERDE', 'AMARELO', 'VERMELHO', 'PCR'].map(r => (
              <button key={r} onClick={() => setRisco(r)} className={`p-4 rounded font-bold ${risco === r ? 'ring-4 ring-blue-500' : ''} ${r === 'VERDE' ? 'bg-green-500 text-white' : r === 'AMARELO' ? 'bg-yellow-500 text-white' : r === 'VERMELHO' ? 'bg-red-600 text-white' : 'bg-black text-white'}`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="font-bold mb-2">Critérios de Inclusão:</p>
          <label><input type="checkbox" checked={onco} onChange={e => setOnco(e.target.checked)} /> Oncologia</label><br/>
          <label><input type="checkbox" checked={hemato} onChange={e => setHemato(e.target.checked)} /> Hematologia</label><br/>
          <label><input type="checkbox" checked={outros} onChange={e => setOutros(e.target.checked)} /> Outros</label>
        </div>

        <button onClick={enviar} className="w-full bg-red-600 text-white py-4 rounded text-xl font-bold hover:bg-red-700">
          Registrar Atendimento
        </button>
      </div>
    </div>
  );
}
