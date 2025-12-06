import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cron from 'node-cron';
import pdfMake from 'pdfmake';

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

// Login
app.post('/api/login', async (req, res) => {
  const { telefone, senha } = req.body;
  const user = await prisma.usuario.findUnique({ where: { telefone } });
  if (!user || !bcrypt.compareSync(senha, user.senha)) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ id: user.id, tipo: user.tipo }, process.env.JWT_SECRET!);
  res.json({ token, user: { nome: user.nome, tipo: user.tipo } });
});

// Rota protegida (exemplo)
const auth = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token necessário' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};

app.get('/api/test', auth, (req, res) => {
  res.json({ message: 'Backend HUPE funcionando!' });
});

// Boletim automático 08h e 20h
cron.schedule('0 8,20 * * *', async () => {
  console.log('Gerando boletim automático...');
  // Aqui você adiciona geração de PDF com pdfMake
});

app.listen(3000, () => console.log('Backend rodando na porta 3000'));
