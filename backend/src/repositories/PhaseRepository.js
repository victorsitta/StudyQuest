/**
 * Repositório de Fases
 * Os dados das fases são a fonte da verdade do conteúdo.
 * Futuramente virão de um banco de dados.
 */

const phases = [
  { id: 1, title: "Movimento e Velocidade", subject: "Física", order: 1 },
  { id: 2, title: "Átomos e Moléculas", subject: "Química", order: 2 },
  { id: 3, title: "A Célula Viva", subject: "Biologia", order: 3 },
  { id: 4, title: "Forças e Leis de Newton", subject: "Física", order: 4 },
  { id: 5, title: "Tabela Periódica", subject: "Química", order: 5 },
  { id: 6, title: "Ecossistemas", subject: "Biologia", order: 6 },
];

class PhaseRepository {
  /**
   * Retorna todas as fases ordenadas
   * @returns {object[]}
   */
  async findAll() {
    return [...phases].sort((a, b) => a.order - b.order);
  }

  /**
   * Busca fase por ID
   * @param {number} id
   * @returns {object|null}
   */
  async findById(id) {
    return phases.find((p) => p.id === id) || null;
  }
}

module.exports = new PhaseRepository();
