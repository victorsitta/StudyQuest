/**
 * Repositório de Questões
 * Inclui o campo 'correct' — nunca exposto diretamente ao cliente.
 * O QuestionService remove esse campo antes de retornar ao frontend.
 */

const questions = {
  1: [
    { id: 1, phaseId: 1, question: "Qual é a fórmula da velocidade média?", options: ["v = d/t", "v = d×t", "v = t/d", "v = d²/t"], correct: 0, explanation: "Velocidade média = distância dividida pelo tempo." },
    { id: 2, phaseId: 1, question: "O que é um movimento uniforme?", options: ["Velocidade variável", "Velocidade constante", "Aceleração constante", "Sem movimento"], correct: 1, explanation: "No MU a velocidade não muda ao longo do tempo." },
    { id: 3, phaseId: 1, question: "Qual a unidade de força no SI?", options: ["Joule", "Watt", "Newton", "Pascal"], correct: 2, explanation: "A unidade de força no Sistema Internacional é o Newton (N)." },
    { id: 4, phaseId: 1, question: "O que a 1ª Lei de Newton descreve?", options: ["Ação e reação", "Inércia", "Gravitação", "Aceleração"], correct: 1, explanation: "A 1ª Lei (Inércia) diz que um corpo em repouso tende a permanecer em repouso." },
    { id: 5, phaseId: 1, question: "Qual a aceleração da gravidade na Terra?", options: ["8 m/s²", "9,8 m/s²", "10,5 m/s²", "12 m/s²"], correct: 1, explanation: "A aceleração gravitacional padrão na Terra é aproximadamente 9,8 m/s²." },
  ],
  2: [
    { id: 6, phaseId: 2, question: "Qual o número atômico do Carbono?", options: ["4", "6", "8", "12"], correct: 1, explanation: "O Carbono tem 6 prótons, portanto número atômico 6." },
    { id: 7, phaseId: 2, question: "O que é uma ligação covalente?", options: ["Transferência de elétrons", "Compartilhamento de elétrons", "Atração iônica", "Força magnética"], correct: 1, explanation: "Ligação covalente = compartilhamento de pares de elétrons entre átomos." },
    { id: 8, phaseId: 2, question: "Qual a fórmula da água?", options: ["HO₂", "H₂O", "H₃O", "OH"], correct: 1, explanation: "A água é formada por 2 átomos de Hidrogênio e 1 de Oxigênio." },
    { id: 9, phaseId: 2, question: "O que é um mol?", options: ["6,02 × 10²³ entidades", "1 grama de substância", "1 litro de gás", "Número de prótons"], correct: 0, explanation: "Um mol contém 6,02 × 10²³ entidades (Número de Avogadro)." },
    { id: 10, phaseId: 2, question: "Qual elemento tem símbolo 'Fe'?", options: ["Flúor", "Fósforo", "Ferro", "Frâncio"], correct: 2, explanation: "Fe vem do latim 'Ferrum', que significa Ferro." },
  ],
  3: [
    { id: 11, phaseId: 3, question: "Qual a função do DNA?", options: ["Produzir energia", "Armazenar informação genética", "Digerir alimentos", "Transportar oxigênio"], correct: 1, explanation: "O DNA armazena as instruções genéticas de todos os seres vivos." },
    { id: 12, phaseId: 3, question: "O que é mitose?", options: ["Divisão celular que gera 2 células iguais", "Divisão que gera 4 células", "Fusão de células", "Morte celular"], correct: 0, explanation: "Na mitose, uma célula se divide em 2 células-filhas geneticamente idênticas." },
    { id: 13, phaseId: 3, question: "Qual organela faz fotossíntese?", options: ["Mitocôndria", "Ribossomo", "Cloroplasto", "Lisossomo"], correct: 2, explanation: "O cloroplasto contém clorofila e realiza a fotossíntese nas células vegetais." },
    { id: 14, phaseId: 3, question: "O que são seres procariontes?", options: ["Com núcleo definido", "Sem núcleo definido", "Multicelulares", "Apenas plantas"], correct: 1, explanation: "Procariontes não possuem núcleo delimitado por membrana (ex: bactérias)." },
    { id: 15, phaseId: 3, question: "Qual é a função da mitocôndria?", options: ["Fotossíntese", "Digestão", "Respiração celular", "Síntese proteica"], correct: 2, explanation: "A mitocôndria é a 'usina de energia' da célula — realiza a respiração celular." },
  ],
};

class QuestionRepository {
  /**
   * Retorna todas as questões de uma fase
   * @param {number} phaseId
   * @returns {object[]}
   */
  async findByPhase(phaseId) {
    return questions[phaseId] || [];
  }

  /**
   * Busca uma questão por ID
   * @param {number} id
   * @returns {object|null}
   */
  async findById(id) {
    const all = Object.values(questions).flat();
    return all.find((q) => q.id === id) || null;
  }
}

module.exports = new QuestionRepository();
