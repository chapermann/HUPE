# HUPE - Plantão Geral (Dr. Fernando Chapermann)

Sistema completo Web + App para o HUPE.

### Rodar em 3 minutos
```bash
# Backend
cd backend
npm install
npx prisma migrate dev --name init
npm run dev

# Frontend (novo terminal)
cd ../frontend
npm install
npm run dev   → abre http://localhost:5173