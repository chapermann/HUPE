import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/login', { telefone, senha });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch {
      alert('Login falhou');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">HUPE - Plantão Geral</h1>
        <input
          type="text"
          placeholder="Telefone (21999999999)"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="w-full p-3 border mb-4 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-3 border mb-6 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
