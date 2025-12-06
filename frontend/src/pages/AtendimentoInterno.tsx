import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AtendimentoInterno() {
  const [tipo, setTipo] = useState<'interno' | 'intercorrencia'>('interno');
  const [setor, setSetor] = useState('');
  const [nomePaciente, setNomePaciente] = useState('');
  const [prontuario, setProntuario] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [queixa, setQueixa] = useState('');
  const [pcr, setPcr] = useState(false);
  const navigate = useNavigate();

  const enviar = async () => {
    const token = localStorage.getItem('token');
    const payload = tipo === 'interno'
      ? { tipo: 'interno', setor, nomePaciente, prontuario, localizacao, queixa, pcr }
      : { tipo: 'intercorrencia', setor, descricao: queixa };

    await axios.post('http://localhost:3000/api/atendimento-interno', payload, {
      headers: { Authorization: `Bearer ${token}` }
    });

    navigate('/confirmacao', {
      state: {
        solicitante: localStorage.getItem('nome') || 'Usuário',
        nomePaciente,
        localizacao: localizacao || setor,
        pcr,
        queixa
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex gap-4 mb-6">
          <button onClick={() => setTipo('interno')} className={`px-6 py-3 rounded ${tipo === 'interno' ? 'bg-orange-600 text-white' : 'bg-gray-300'}`}>Paciente Internado</button>
          <button onClick={() => setTipo('intercorrencia')} className={`px-6 py-3 rounded ${tipo === 'intercorrencia' ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>Intercorrência</button>
        </div>

        <input placeholder="Setor Solicitante" value={setor} onChange={e => setSetor(e.target.value)} className="w-full p-3 border mb-4 rounded" />
        {tipo === 'interno' && (
          <>
            <input placeholder="Nome do Paciente" value={nomePaciente} onChange={e => setNomePaciente(e.target.value)} className="w-full p-3 border mb-4 rounded" />
            <input placeholder="Prontuário" value={prontuario} onChange={e => setProntuario(e.target.value)} className="w-full p-3 border mb-4 rounded" />
            <input placeholder="Leito / Localização" value={localizacao} onChange={e => setLocalizacao(e.target.value)} className="w-full p-3 border mb-4 rounded" />
            <label className="flex items-center gap-3 mb-4"><input type="checkbox" checked={pcr} onChange={e => setPcr(e.target.checked)} /> PCR?</label>
          </>
        )}

        <textarea
          placeholder={tipo === 'interno' ? "Queixa/Demanda" : "Descrição da Intercorrência"}
          value={queixa}
          onChange={e => setQueixa(e.target.value)}
          maxLength={250}
          className="w-full p-3 border mb-6 rounded h-40"
        />

        <button onClick={enviar} className="w-full bg-orange-600 text-white py-4 rounded text-xl font-bold hover:bg-orange-700">
          Registrar {tipo === 'interno' ? 'Atendimento Interno' : 'Intercorrência'}
        </button>
      </div>
    </div>
  );
}
