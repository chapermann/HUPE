import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-800 text-white p-6">
        <h1 className="text-3xl font-bold text-center">HUPE - Plantão Geral</h1>
      </header>

      <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <button onClick={() => navigate('/cadastro-plantonista')} className="bg-white shadow-lg rounded-xl p-10 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-blue-700">Cadastro de Plantonistas</h2>
          <p className="mt-3 text-gray-600">Internos • Residentes • Staff</p>
        </button>

        <button onClick={() => navigate('/externo')} className="bg-white shadow-lg rounded-xl p-10 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-red-600">Atendimento Externo (Triagem)</h2>
          <p className="mt-3 text-gray-600">Pacientes ambulatoriais</p>
        </button>

        <button onClick={() => navigate('/interno')} className="bg-white shadow-lg rounded-xl p-10 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-orange-600">Paciente Internado / Intercorrência</h2>
          <p className="mt-3 text-gray-600">Internados • Intercorrências</p>
        </button>
      </div>
    </div>
  );
}
