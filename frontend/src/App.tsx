import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AtendimentoExterno from './pages/AtendimentoExterno';
import Confirmacao from './pages/Confirmacao';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/externo" element={<AtendimentoExterno />} />
        <Route path="/confirmacao" element={<Confirmacao />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
