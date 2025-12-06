import { useLocation } from 'react-router-dom';

export default function Confirmacao() {
  const { state } = useLocation();
  const dados = state;

  const texto = `
*ATENDIMENTO REGISTRADO - HUPE*
*Data/Hora:* ${new Date().toLocaleString('pt-BR')}
*Solicitante:* ${dados?.solicitante}
*Paciente:* ${dados?.nomePaciente}
*Leito/Local:* ${dados?.localizacao || 'Triagem'}
*PCR:* ${dados?.pcr ? 'Sim' : 'Não'}
*Queixa:* ${dados?.queixa}
*Risco:* ${dados?.risco || '—'}
  `.trim();

  const copiar = () => {
    navigator.clipboard.writeText(texto);
    alert('Copiado para WhatsApp!');
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Atendimento Registrado!</h2>
        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{texto}</pre>
        <button onClick={copiar} className="mt-6 bg-green-600 text-white px-8 py-3 rounded text-lg">
          Copiar para WhatsApp/Telegram
        </button>
      </div>
    </div>
  );
}
