# StudyQuest

Plataforma gamificada de estudos para o Ensino Médio, desenvolvida para pessoas com TDAH e Autismo Nível 1.

---

## Estrutura do Projeto

```
StudyQuest/
├── frontend/          # React + Vite + TypeScript
└── backend/           # Node.js + Express (MVC em camadas)
```

---

## Frontend

Stack: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, TanStack Query.

```
frontend/
├── src/
│   ├── components/
│   │   ├── Games/         # Módulos de jogo (Newton, Sports...)
│   │   └── ui/            # Componentes shadcn/ui
│   ├── contexts/          # GameContext (estado global)
│   ├── data/              # mockData e types (temporário até integrar API)
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilitários (cn, etc.)
│   ├── pages/             # Landing, Auth, Dashboard, Play, Profile
│   └── test/              # Testes com Vitest
├── .env.example
├── vite.config.ts         # Proxy /api → backend:3001
└── package.json
```

### Rodar o frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:8080
```

---

## Backend

Stack: Node.js, Express, JWT, bcryptjs, express-validator.

Arquitetura MVC em 4 camadas:

```
backend/
├── src/
│   ├── server.js              # Entry point
│   ├── routes/                # Definição de rotas (apenas roteamento)
│   │   ├── index.js
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── phase.routes.js
│   │   ├── question.routes.js
│   │   ├── badge.routes.js
│   │   └── progress.routes.js
│   ├── controllers/           # Recebe req/res, chama Service, devolve resposta
│   │   ├── AuthController.js
│   │   ├── UserController.js
│   │   ├── PhaseController.js
│   │   ├── QuestionController.js
│   │   ├── BadgeController.js
│   │   └── ProgressController.js
│   ├── services/              # Regras de negócio (independente de HTTP)
│   │   ├── AuthService.js
│   │   ├── UserService.js
│   │   ├── PhaseService.js
│   │   ├── QuestionService.js
│   │   ├── BadgeService.js
│   │   └── ProgressService.js
│   ├── repositories/          # Acesso a dados (trocar por ORM sem mudar Services)
│   │   ├── UserRepository.js
│   │   ├── PhaseRepository.js
│   │   ├── QuestionRepository.js
│   │   ├── BadgeRepository.js
│   │   └── ProgressRepository.js
│   ├── middlewares/
│   │   ├── auth.js            # Verificação JWT
│   │   ├── errorHandler.js    # Tratamento global de erros
│   │   └── notFound.js        # 404
│   ├── validators/
│   │   └── auth.validator.js  # Validação de inputs com express-validator
│   └── utils/
│       └── AppError.js        # Classe de erro operacional
├── .env.example
└── package.json
```

### Rodar o backend

```bash
cd backend
npm install
cp .env.example .env        # Preencha JWT_SECRET
npm run dev                 # http://localhost:3001
```

---

## Rodar os dois juntos (da raiz)

No Windows, abra **dois terminais separados**:

```bash
# Terminal 1 — Frontend (http://localhost:8080)
npm run dev:frontend

# Terminal 2 — Backend (http://localhost:3001)
npm run dev:backend
```

> O comando `npm run dev` com `&` não funciona no Windows CMD/PowerShell.  
> Se quiser rodar com um único comando, instale o pacote `concurrently` globalmente:  
> `npm install -g concurrently` e então use `concurrently "npm run dev:frontend" "npm run dev:backend"`

---

## Endpoints da API

| Método | Rota                                  | Descrição                        | Auth |
|--------|---------------------------------------|----------------------------------|------|
| GET    | /api/health                           | Health check                     | —    |
| POST   | /api/auth/register                    | Criar conta                      | —    |
| POST   | /api/auth/login                       | Login                            | —    |
| POST   | /api/auth/logout                      | Logout                           | —    |
| GET    | /api/users/me                         | Dados do usuário logado          | ✓    |
| PUT    | /api/users/me                         | Atualizar perfil                 | ✓    |
| GET    | /api/users/me/stats                   | Estatísticas de desempenho       | ✓    |
| GET    | /api/phases                           | Listar fases com progresso       | ✓    |
| GET    | /api/phases/:id                       | Detalhes de uma fase             | ✓    |
| GET    | /api/questions/phase/:phaseId         | Questões de uma fase             | ✓    |
| POST   | /api/questions/answer                 | Responder questão                | ✓    |
| GET    | /api/badges                           | Badges com status do usuário     | ✓    |
| GET    | /api/progress                         | Progresso completo               | ✓    |
| POST   | /api/progress/phase/:phaseId/complete | Concluir fase                    | ✓    |
| POST   | /api/progress/xp                      | Adicionar XP                     | ✓    |

---

## Fluxo das camadas (Backend)

```
Request → Route → Middleware (auth/validator) → Controller → Service → Repository → Response
```

- **Route**: só define o caminho e aplica middlewares
- **Controller**: lida com HTTP (req/res), delega lógica ao Service
- **Service**: regras de negócio puras, sem conhecer HTTP
- **Repository**: acesso a dados — hoje em memória, amanhã em banco sem mudar o Service
