// ─────────────────────────────────────────────────────────────────────────────
// Dados de lição: cada fase tem slides de aprendizado + prática + quiz
// Pensado para TDAH e Autismo Nível 1:
//   - Chunks pequenos (1 conceito por slide)
//   - Linguagem direta, sem rodeios
//   - Animação visual antes da pergunta
// ─────────────────────────────────────────────────────────────────────────────

export type SlideType = "concept" | "visual" | "practice" | "quiz";

export interface ConceptSlide {
  type: "concept";
  emoji: string;
  title: string;
  body: string;
  highlight?: string; // fórmula ou palavra-chave em destaque
}

export interface VisualSlide {
  type: "visual";
  animation: string; // chave que o componente de animação usa
  title: string;
  caption: string;
}

export interface PracticeSlide {
  type: "practice";
  instruction: string;
  interaction: string; // chave do tipo de interação
  data: Record<string, unknown>;
}

export interface QuizSlide {
  type: "quiz";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export type Slide = ConceptSlide | VisualSlide | PracticeSlide | QuizSlide;

export interface LessonData {
  phaseId: number;
  title: string;
  subject: string;
  color: string;
  emoji: string;
  slides: Slide[];
}

// ─────────────────────────────────────────────────────────────────────────────
// FASE 1 — Movimento e Velocidade (Física)
// ─────────────────────────────────────────────────────────────────────────────
const fase1: LessonData = {
  phaseId: 1,
  title: "Movimento e Velocidade",
  subject: "Física",
  color: "from-blue-600 to-cyan-400",
  emoji: "🚀",
  slides: [
    {
      type: "concept",
      emoji: "🚗",
      title: "O que é velocidade?",
      body: "Velocidade mede o quanto você se move em um certo tempo. Quanto mais rápido você vai, maior a velocidade.",
      highlight: "v = d ÷ t",
    },
    {
      type: "visual",
      animation: "car-speed",
      title: "Veja a velocidade em ação",
      caption: "O carro percorre mais distância no mesmo tempo quando vai mais rápido.",
    },
    {
      type: "practice",
      instruction: "Arraste o controle de velocidade e veja o carro se mover!",
      interaction: "speed-slider",
      data: { min: 10, max: 100, unit: "km/h" },
    },
    {
      type: "concept",
      emoji: "📏",
      title: "Movimento Uniforme",
      body: "Quando a velocidade não muda, chamamos de Movimento Uniforme (MU). O carro anda sempre igual, sem acelerar nem frear.",
      highlight: "Velocidade constante = MU",
    },
    {
      type: "visual",
      animation: "uniform-motion",
      title: "MU vs Movimento Variado",
      caption: "No MU os pontos ficam igualmente espaçados. No variado, os espaços mudam.",
    },
    {
      type: "quiz",
      question: "Qual é a fórmula da velocidade média?",
      options: ["v = d/t", "v = d×t", "v = t/d", "v = d²/t"],
      correct: 0,
      explanation: "Velocidade = distância dividida pelo tempo. Se você andou 100m em 10s, v = 100/10 = 10 m/s.",
    },
    {
      type: "concept",
      emoji: "⚡",
      title: "Aceleração",
      body: "Aceleração é a mudança de velocidade. Quando você pisa no acelerador, a velocidade aumenta — isso é aceleração positiva.",
      highlight: "a = Δv ÷ t",
    },
    {
      type: "visual",
      animation: "acceleration",
      title: "Aceleração e Frenagem",
      caption: "Aceleração positiva = velocidade aumenta. Negativa (frenagem) = velocidade diminui.",
    },
    {
      type: "quiz",
      question: "O que é um movimento uniforme?",
      options: ["Velocidade variável", "Velocidade constante", "Aceleração constante", "Sem movimento"],
      correct: 1,
      explanation: "No MU a velocidade não muda. O objeto se move sempre na mesma rapidez.",
    },
    {
      type: "quiz",
      question: "Qual a unidade de força no SI?",
      options: ["Joule", "Watt", "Newton", "Pascal"],
      correct: 2,
      explanation: "A unidade de força é o Newton (N), em homenagem a Isaac Newton.",
    },
    {
      type: "quiz",
      question: "O que a 1ª Lei de Newton descreve?",
      options: ["Ação e reação", "Inércia", "Gravitação", "Aceleração"],
      correct: 1,
      explanation: "A 1ª Lei é a Lei da Inércia: um objeto em repouso fica em repouso, e em movimento continua em movimento, a menos que uma força aja sobre ele.",
    },
    {
      type: "quiz",
      question: "Qual a aceleração da gravidade na Terra?",
      options: ["8 m/s²", "9,8 m/s²", "10,5 m/s²", "12 m/s²"],
      correct: 1,
      explanation: "A gravidade na Terra é aproximadamente 9,8 m/s². Em cálculos simples usamos 10 m/s².",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FASE 2 — Átomos e Moléculas (Química)
// ─────────────────────────────────────────────────────────────────────────────
const fase2: LessonData = {
  phaseId: 2,
  title: "Átomos e Moléculas",
  subject: "Química",
  color: "from-purple-600 to-pink-400",
  emoji: "⚗️",
  slides: [
    {
      type: "concept",
      emoji: "⚛️",
      title: "O que é um átomo?",
      body: "Átomo é a menor parte de um elemento químico. Tudo ao redor é feito de átomos — sua mesa, o ar, você mesmo!",
      highlight: "Prótons + Nêutrons + Elétrons",
    },
    {
      type: "visual",
      animation: "atom-model",
      title: "Modelo do Átomo",
      caption: "O núcleo tem prótons (+) e nêutrons. Os elétrons (-) orbitam ao redor.",
    },
    {
      type: "practice",
      instruction: "Clique nas partes do átomo para descobrir o que cada uma faz!",
      interaction: "atom-tap",
      data: {
        parts: [
          { id: "proton", label: "Próton", color: "#ef4444", info: "Carga positiva (+). Define o elemento químico." },
          { id: "neutron", label: "Nêutron", color: "#94a3b8", info: "Sem carga. Estabiliza o núcleo." },
          { id: "electron", label: "Elétron", color: "#3b82f6", info: "Carga negativa (-). Participa das ligações químicas." },
        ],
      },
    },
    {
      type: "concept",
      emoji: "🔗",
      title: "Ligações Químicas",
      body: "Átomos se unem para formar moléculas. Na ligação covalente, eles compartilham elétrons. Na iônica, um transfere para o outro.",
      highlight: "Covalente = compartilha elétrons",
    },
    {
      type: "visual",
      animation: "water-molecule",
      title: "A Molécula de Água (H₂O)",
      caption: "2 átomos de Hidrogênio + 1 de Oxigênio, unidos por ligações covalentes.",
    },
    {
      type: "quiz",
      question: "Qual o número atômico do Carbono?",
      options: ["4", "6", "8", "12"],
      correct: 1,
      explanation: "O Carbono tem 6 prótons no núcleo, por isso seu número atômico é 6.",
    },
    {
      type: "quiz",
      question: "O que é uma ligação covalente?",
      options: ["Transferência de elétrons", "Compartilhamento de elétrons", "Atração iônica", "Força magnética"],
      correct: 1,
      explanation: "Na ligação covalente os átomos compartilham pares de elétrons para ficarem estáveis.",
    },
    {
      type: "quiz",
      question: "Qual a fórmula da água?",
      options: ["HO₂", "H₂O", "H₃O", "OH"],
      correct: 1,
      explanation: "A água tem 2 átomos de Hidrogênio (H) e 1 de Oxigênio (O): H₂O.",
    },
    {
      type: "quiz",
      question: "O que é um mol?",
      options: ["6,02 × 10²³ entidades", "1 grama de substância", "1 litro de gás", "Número de prótons"],
      correct: 0,
      explanation: "Um mol contém 6,02 × 10²³ partículas (Número de Avogadro). É como uma 'dúzia' gigante da química.",
    },
    {
      type: "quiz",
      question: "Qual elemento tem símbolo 'Fe'?",
      options: ["Flúor", "Fósforo", "Ferro", "Frâncio"],
      correct: 2,
      explanation: "Fe vem do latim 'Ferrum', que significa Ferro.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FASE 3 — A Célula Viva (Biologia)
// ─────────────────────────────────────────────────────────────────────────────
const fase3: LessonData = {
  phaseId: 3,
  title: "A Célula Viva",
  subject: "Biologia",
  color: "from-emerald-600 to-teal-400",
  emoji: "🔬",
  slides: [
    {
      type: "concept",
      emoji: "🔬",
      title: "A célula é a unidade da vida",
      body: "Toda coisa viva é feita de células. Você tem trilhões delas! Cada célula tem uma função específica no seu corpo.",
      highlight: "Célula = unidade básica da vida",
    },
    {
      type: "visual",
      animation: "cell-parts",
      title: "Partes da Célula Animal",
      caption: "Membrana, núcleo, mitocôndria, ribossomo — cada parte tem uma função.",
    },
    {
      type: "practice",
      instruction: "Toque em cada organela para ver o que ela faz!",
      interaction: "cell-tap",
      data: {
        organelles: [
          { id: "nucleus", label: "Núcleo", emoji: "🧬", color: "#8b5cf6", info: "Guarda o DNA — as instruções da célula." },
          { id: "mitochondria", label: "Mitocôndria", emoji: "⚡", color: "#f59e0b", info: "Produz energia para a célula (respiração celular)." },
          { id: "ribosome", label: "Ribossomo", emoji: "🔩", color: "#6b7280", info: "Fabrica proteínas seguindo as instruções do DNA." },
          { id: "membrane", label: "Membrana", emoji: "🛡️", color: "#10b981", info: "Controla o que entra e sai da célula." },
        ],
      },
    },
    {
      type: "concept",
      emoji: "🧬",
      title: "O DNA",
      body: "O DNA é como um manual de instruções dentro do núcleo. Ele contém todas as informações para construir e manter seu corpo.",
      highlight: "DNA = informação genética",
    },
    {
      type: "visual",
      animation: "dna-helix",
      title: "A Dupla Hélice do DNA",
      caption: "O DNA tem formato de escada torcida (dupla hélice). Cada degrau é um par de bases nitrogenadas.",
    },
    {
      type: "concept",
      emoji: "✂️",
      title: "Divisão Celular — Mitose",
      body: "Quando uma célula precisa se multiplicar, ela faz mitose: divide-se em 2 células filhas idênticas. É assim que você cresce e se cura.",
      highlight: "1 célula → 2 células iguais",
    },
    {
      type: "visual",
      animation: "mitosis",
      title: "Mitose em 4 passos",
      caption: "Prófase → Metáfase → Anáfase → Telófase. Resultado: 2 células idênticas.",
    },
    {
      type: "quiz",
      question: "Qual a função do DNA?",
      options: ["Produzir energia", "Armazenar informação genética", "Digerir alimentos", "Transportar oxigênio"],
      correct: 1,
      explanation: "O DNA armazena as instruções genéticas — o 'manual' de como construir e manter o organismo.",
    },
    {
      type: "quiz",
      question: "O que é mitose?",
      options: ["Divisão celular que gera 2 células iguais", "Divisão que gera 4 células", "Fusão de células", "Morte celular"],
      correct: 0,
      explanation: "Na mitose uma célula se divide em 2 células-filhas geneticamente idênticas à célula original.",
    },
    {
      type: "quiz",
      question: "Qual organela faz fotossíntese?",
      options: ["Mitocôndria", "Ribossomo", "Cloroplasto", "Lisossomo"],
      correct: 2,
      explanation: "O cloroplasto contém clorofila e realiza a fotossíntese nas células vegetais.",
    },
    {
      type: "quiz",
      question: "O que são seres procariontes?",
      options: ["Com núcleo definido", "Sem núcleo definido", "Multicelulares", "Apenas plantas"],
      correct: 1,
      explanation: "Procariontes não têm núcleo delimitado por membrana. Bactérias são o exemplo mais comum.",
    },
    {
      type: "quiz",
      question: "Qual é a função da mitocôndria?",
      options: ["Fotossíntese", "Digestão", "Respiração celular", "Síntese proteica"],
      correct: 2,
      explanation: "A mitocôndria é a 'usina de energia' da célula — realiza a respiração celular e produz ATP.",
    },
  ],
};

export const lessonData: Record<number, LessonData> = {
  1: fase1,
  2: fase2,
  3: fase3,
};
