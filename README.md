<div align="center">

<img src="https://img.shields.io/badge/StudyQuest-Plataforma%20Educacional-7c3aed?style=for-the-badge&logo=gamepad&logoColor=white" alt="StudyQuest" />

<h1>🎮 StudyQuest</h1>

<p><strong>Plataforma gamificada de estudos para o Ensino Médio</strong><br/>
Desenvolvida especialmente para pessoas com <strong>TDAH</strong> e <strong>Autismo Nível 1</strong></p>

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white" />
</p>

<p>
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-estrutura">Estrutura</a> •
  <a href="#-como-rodar">Como Rodar</a> •
  <a href="#-api">API</a> •
  <a href="#-acessibilidade">Acessibilidade</a>
</p>

</div>

---

## 📖 Sobre o Projeto

O **StudyQuest** transforma o estudo do Ensino Médio em uma experiência de jogo. A plataforma foi projetada do zero pensando nas necessidades de estudantes com **TDAH** e **Autismo Nível 1**, aplicando princípios de design acessível, gamificação e aprendizado visual.

### Por que gamificação para TDAH e Autismo?

| Característica | Como o StudyQuest responde |
|---|---|
| Dificuldade de manter foco | Sessões curtas por fase, uma coisa de cada vez |
| Necessidade de recompensa imediata | XP, badges e feedback instantâneo a cada resposta |
| Preferência por previsibilidade | Opções A/B/C/D com cores fixas, fluxo sempre igual |
| Sobrecarga sensorial | Paleta suave, sem neon, sem elementos piscando |
| Aprendizado visual | Animações interativas antes de cada quiz |
| Paralisia de escolha | Trilha linear — só um caminho possível |

---

## ✨ Funcionalidades

### 🎯 Sistema de Aprendizado em 3 Etapas
Cada fase segue o fluxo: **Aprender → Praticar → Quiz**

- **Aprender** — slides com conceito + animação visual interativa
- **Praticar** — interação hands-on (sliders, cliques em organelas, modelos atômicos)
- **Quiz** — perguntas com feedback imediato e explicação da resposta correta

### 🗺️ Trilha de Fases (estilo Duolingo)
- 6 fases desbloqueadas progressivamente
- Matérias: Física, Química e Biologia (1º ano EM)
- Status visual claro: bloqueada 🔒 / disponível / concluída ✅

### 🏆 Sistema de Progressão
- XP ganho a cada resposta correta
- Sistema de níveis com barra de progresso
- 6 badges desbloqueáveis por conquistas

### 🎮 Módulos Especiais
- **Leis de Newton** — teoria, simulador físico interativo e quiz (tema cyberpunk)
- **Esportes Paralímpicos** — Goalball, Futebol e Handebol com flashcards e revisão

### 🔐 Autenticação
- Registro e login com validação de campos
- Feedback de erro acessível (aria-live)
- Proteção de rotas — redireciona para login se não autenticado

---

## 🏗️ Estrutura do Projeto

```
StudyQuest/
├── 📁 frontend/          # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── Games/         # Newton.tsx, Sports.tsx
│   │   │   ├── lesson/
│   │   │   │   └── animations/ # Animações visuais por fase
│   │   │   └── ui/            # shadcn/ui components
│   │   ├── contexts/          # GameContext (estado global)
│   │   ├── data/
│   │   │   ├── lessonData.ts  # Conteúdo das lições (slides + quiz)
│   │   │   ├── mockData.ts    # Dados mock (fases, badges, usuário)
│   │   │   └── types.ts       # Interfaces TypeScript
│   │   ├── hooks/             # Custom hooks
│   │   ├── pages/             # Landing, Auth, Dashboard, Play, Profile
│   │   └── lib/               # Utilitários
│   ├── vite.config.ts         # Proxy /api → backend:3001
│   └── package.json
│
├── 📁 backend/           # Node.js + Express (MVC em camadas)
│   └── src/
│       ├── server.js
│       ├── routes/            # Definição de rotas
│       ├── controllers/       # Recebe req/res, chama Service
│       ├── services/          # Regras de negócio puras
│       ├── repositories/      # Acesso a dados (em memória → banco)
│       ├── middlewares/       # auth JWT, errorHandler, notFound
│       ├── validators/        # Validação com express-validator
│       └── utils/             # AppError
│
├── netlify.toml          # Config de deploy (base: frontend/)
├── package.json          # Scripts raiz
└── README.md
```

### Fluxo das camadas (Backend)

```
Request → Route → Middleware → Controller → Service → Repository → Response
```

---

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 18+
- npm 9+

### 1. Clone o repositório

```bash
git clone https://github.com/victorsitta/StudyQuest.git
cd StudyQuest
```

### 2. Instale as dependências

```bash
npm run install:all
```

### 3. Configure o backend

```bash
cd backend
cp .env.example .env
# Edite o .env e defina JWT_SECRET
```

### 4. Rode os projetos

> ⚠️ **Windows**: abra dois terminais separados

```bash
# Terminal 1 — Frontend → http://localhost:8080
npm run dev:frontend

# Terminal 2 — Backend → http://localhost:3001
npm run dev:backend
```

### 5. Acesse

| Serviço | URL |
|---|---|
| Frontend | http://localhost:8080 |
| Backend API | http://localhost:3001/api |
| Health check | http://localhost:3001/api/health |

---

## 🌐 Deploy

O frontend está configurado para deploy no **Netlify** via `netlify.toml`:

```toml
[build]
  base    = "frontend"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from   = "/*"
  to     = "/index.html"
  status = 200
```

O redirect garante que o React Router funcione em todas as rotas.

---

## 📡 API — Endpoints

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| `GET` | `/api/health` | Health check | — |
| `POST` | `/api/auth/register` | Criar conta | — |
| `POST` | `/api/auth/login` | Login | — |
| `POST` | `/api/auth/logout` | Logout | — |
| `GET` | `/api/users/me` | Dados do usuário | ✓ |
| `PUT` | `/api/users/me` | Atualizar perfil | ✓ |
| `GET` | `/api/users/me/stats` | Estatísticas | ✓ |
| `GET` | `/api/phases` | Listar fases | ✓ |
| `GET` | `/api/phases/:id` | Detalhes da fase | ✓ |
| `GET` | `/api/questions/phase/:id` | Questões da fase | ✓ |
| `POST` | `/api/questions/answer` | Responder questão | ✓ |
| `GET` | `/api/badges` | Badges do usuário | ✓ |
| `GET` | `/api/progress` | Progresso completo | ✓ |
| `POST` | `/api/progress/phase/:id/complete` | Concluir fase | ✓ |
| `POST` | `/api/progress/xp` | Adicionar XP | ✓ |

### Exemplo de uso

```bash
# Registrar
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Naty","email":"naty@email.com","password":"123456"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"naty@email.com","password":"123456"}'

# Listar fases (com token)
curl http://localhost:3001/api/phases \
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## ♿ Acessibilidade

O projeto aplica as seguintes práticas de acessibilidade:

- `aria-label` em todos os botões e controles interativos
- `aria-live="polite"` nos feedbacks de erro e sucesso
- `aria-invalid` nos campos com erro de validação
- `role="group"` nas opções de quiz
- `role="tab"` e `aria-selected` nas abas de autenticação
- Navegação completa por teclado
- Contraste adequado em todos os textos
- Fonte **Lexend** — projetada para melhorar a leitura de pessoas com dislexia

> ⚠️ Validação completa de acessibilidade requer testes manuais com tecnologias assistivas.

---

## 🛠️ Stack Tecnológica

### Frontend
| Tecnologia | Uso |
|---|---|
| React 18 | Interface |
| TypeScript 5 | Tipagem |
| Vite 5 | Build tool |
| Tailwind CSS 3 | Estilização |
| shadcn/ui | Componentes base |
| Framer Motion 12 | Animações |
| React Router 6 | Roteamento |
| TanStack Query 5 | Cache de dados |
| Lucide React | Ícones |
| React Confetti | Celebrações |

### Backend
| Tecnologia | Uso |
|---|---|
| Node.js | Runtime |
| Express 4 | Framework HTTP |
| JWT (jsonwebtoken) | Autenticação |
| bcryptjs | Hash de senhas |
| express-validator | Validação de inputs |
| helmet | Segurança HTTP |
| cors | Cross-Origin |
| morgan | Logs de requisição |

---

## 📁 Branches

| Branch | Propósito |
|---|---|
| `main` | Branch principal — sempre estável |
| `develop` | Desenvolvimento de novas features |
| `prod` | Espelho de produção |

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

<div align="center">

Feito com ❤️ para tornar o aprendizado mais acessível

<img src="https://img.shields.io/badge/TDAH%20Friendly-✓-7c3aed?style=flat-square" />
<img src="https://img.shields.io/badge/Autismo%20Nível%201-✓-10b981?style=flat-square" />
<img src="https://img.shields.io/badge/Ensino%20Médio-✓-f59e0b?style=flat-square" />

</div>
