import { Question, Phase, Badge, UserData } from "./types";

export const mockQuestions: Record<number, Question[]> = {
  1: [
    { id: 1, question: "Qual é a fórmula da velocidade média?", options: ["v = d/t", "v = d×t", "v = t/d", "v = d²/t"], correct: 0 },
    { id: 2, question: "O que é um movimento uniforme?", options: ["Velocidade variável", "Velocidade constante", "Aceleração constante", "Sem movimento"], correct: 1 },
    { id: 3, question: "Qual a unidade de força no SI?", options: ["Joule", "Watt", "Newton", "Pascal"], correct: 2 },
    { id: 4, question: "O que a 1ª Lei de Newton descreve?", options: ["Ação e reação", "Inércia", "Gravitação", "Aceleração"], correct: 1 },
    { id: 5, question: "Qual a aceleração da gravidade na Terra?", options: ["8 m/s²", "9,8 m/s²", "10,5 m/s²", "12 m/s²"], correct: 1 },
  ],
  2: [
    { id: 1, question: "Qual o número atômico do Carbono?", options: ["4", "6", "8", "12"], correct: 1 },
    { id: 2, question: "O que é uma ligação covalente?", options: ["Transferência de elétrons", "Compartilhamento de elétrons", "Atração iônica", "Força magnética"], correct: 1 },
    { id: 3, question: "Qual a fórmula da água?", options: ["HO₂", "H₂O", "H₃O", "OH"], correct: 1 },
    { id: 4, question: "O que é um mol?", options: ["6,02 × 10²³ entidades", "1 grama de substância", "1 litro de gás", "Número de prótons"], correct: 0 },
    { id: 5, question: "Qual elemento tem símbolo 'Fe'?", options: ["Flúor", "Fósforo", "Ferro", "Frâncio"], correct: 2 },
  ],
  3: [
    { id: 1, question: "Qual a função do DNA?", options: ["Produzir energia", "Armazenar informação genética", "Digerir alimentos", "Transportar oxigênio"], correct: 1 },
    { id: 2, question: "O que é mitose?", options: ["Divisão celular que gera 2 células iguais", "Divisão que gera 4 células", "Fusão de células", "Morte celular"], correct: 0 },
    { id: 3, question: "Qual organela faz fotossíntese?", options: ["Mitocôndria", "Ribossomo", "Cloroplasto", "Lisossomo"], correct: 2 },
    { id: 4, question: "O que são seres procariontes?", options: ["Com núcleo definido", "Sem núcleo definido", "Multicelulares", "Apenas plantas"], correct: 1 },
    { id: 5, question: "Qual é a função da mitocôndria?", options: ["Fotossíntese", "Digestão", "Respiração celular", "Síntese proteica"], correct: 2 },
  ],
};

export const mockPhases: Phase[] = [
  { id: 1, title: "Movimento e Velocidade", subject: "Física", unlocked: true, completed: true },
  { id: 2, title: "Átomos e Moléculas", subject: "Química", unlocked: true, completed: true },
  { id: 3, title: "A Célula Viva", subject: "Biologia", unlocked: true, completed: false },
  { id: 4, title: "Forças e Leis de Newton", subject: "Física", unlocked: false, completed: false },
  { id: 5, title: "Tabela Periódica", subject: "Química", unlocked: false, completed: false },
  { id: 6, title: "Ecossistemas", subject: "Biologia", unlocked: false, completed: false },
];

export const mockBadges: Badge[] = [
  { id: 1, name: "Primeiro Passo", description: "Completou a primeira fase", icon: "🚀", unlocked: true },
  { id: 2, name: "Cientista Iniciante", description: "Acertou 5 questões seguidas", icon: "🧪", unlocked: true },
  { id: 3, name: "Explorador", description: "Visitou 3 fases diferentes", icon: "🗺️", unlocked: true },
  { id: 4, name: "Mestre do Tempo", description: "Completou uma fase em menos de 2 min", icon: "⏱️", unlocked: false },
  { id: 5, name: "Sábio", description: "Alcançou nível 10", icon: "📚", unlocked: false },
  { id: 6, name: "Lendário", description: "Completou todas as fases", icon: "👑", unlocked: false },
];

export const defaultUser: UserData = {
  name: "Estudante Quest",
  avatar: "🧑‍🎓",
  level: 3,
  xp: 450,
  maxXp: 1000,
};
