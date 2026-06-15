# 🎮 SwitchRent
Sistema web de aluguel de cartuchos de Nintendo Switch.

**Aluno:** Rodrigo Cardoso Rodrigues da Silva
**Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas — ULBRA EAD

---

## 🔗 Links
- **Sistema online:** https://switchrent.vercel.app/
- **API online:** https://switchrent-production.up.railway.app/api
- **Repositório:** https://github.com/RCardoso87/switchrent

## 👤 Usuários de teste
| Perfil | E-mail | Senha |
|---|---|---|
| Administrador | admin@switchrent.com | admin123 |
| Cliente | cliente@teste.com | cliente123 |

---

## 🛠️ Tecnologias
- **Front-end:** React + Vite + Tailwind CSS + React Router
- **Back-end:** Node.js + Express + Sequelize + JWT + bcrypt
- **Banco de dados:** MySQL
- **Deploy:** Vercel (front) + Railway (back + DB)

---

## 💻 Como rodar localmente

### Pré-requisitos
- Node.js 18+
- MySQL Server
- Git

### 1. Clonar o repositório
```bash
git clone [URL_DO_REPO]
cd "Rodrigo Cardoso Rodrigues da Silva"
```

### 2. Criar banco MySQL
```sql
CREATE DATABASE switchrent;
```

### 3. Backend
```bash
cd backend
npm install
# editar o arquivo .env com sua senha do MySQL
npm run seed   # popula com dados de teste
npm run dev    # inicia em http://localhost:3001
```

### 4. Frontend (em outro terminal)
```bash
cd frontend
npm install
npm run dev    # inicia em http://localhost:5173
```
Acesse **http://localhost:5173** no navegador.

---

## ✅ Tabela de Funcionalidades

| # | Funcionalidade (proposta) | Status | Observação |
|---|---|---|---|
| 1 | Cadastro e login de cliente com senha criptografada | ✅ Implementada | Hash com bcrypt |
| 2 | Área restrita do admin (cadastrar, editar, inativar, listar jogos) | ✅ Implementada | CRUD completo em `/admin/jogos` |
| 3 | Busca por nome e filtro por gênero | ✅ Implementada | Filtros no catálogo |
| 4 | Verificação automática de estoque antes da reserva | ✅ Implementada | Transação no backend |
| 5 | Cálculo e exibição da data prevista de devolução | ✅ Implementada | Exibido no card antes da confirmação |
| 6 | Alteração de status do aluguel pelo admin | ✅ Implementada | aguardando_retirada → alugado → devolvido → atrasado |
| 7 | Histórico de aluguéis do cliente | ✅ Implementada | Página `/meus-alugueis` |
| 8 | Interface responsiva (desktop, tablet, mobile) | ✅ Implementada | Tailwind CSS |
| 9 | Logo SwitchRent em todas as telas | ✅ Implementada | Componente Header |
| 10 | Carregamento rápido (< 3s) | ✅ Implementada | Vite + queries indexadas |

---

## 🗂️ Estrutura do projeto

```text
Rodrigo Cardoso Rodrigues da Silva/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuração do banco
│   │   ├── models/         # Modelos Sequelize (Usuario, Jogo, Locacao)
│   │   ├── controllers/    # Lógica das rotas
│   │   ├── middlewares/    # Autenticação JWT
│   │   ├── routes/         # Rotas da API
│   │   ├── seed.js         # Script de população
│   │   └── server.js       # Entrada do servidor
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Header, JogoCard, ProtectedRoute
│   │   ├── context/        # AuthContext
│   │   ├── pages/          # Login, Cadastro, Catalogo, etc
│   │   ├── services/       # api.js (axios)
│   │   └── App.jsx
│   └── package.json
└── README.md
```