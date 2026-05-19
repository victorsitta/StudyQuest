const { v4: uuidv4 } = require("uuid");

/**
 * Repositório de Usuários
 * Atualmente usa armazenamento em memória.
 * Para migrar para banco de dados, basta substituir os métodos
 * mantendo a mesma interface (mesmos parâmetros e retornos).
 */

// Simulação de banco em memória
const users = [];

class UserRepository {
  /**
   * Cria um novo usuário
   * @param {object} data
   * @returns {object} usuário criado
   */
  async create(data) {
    const user = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...data,
    };
    users.push(user);
    return user;
  }

  /**
   * Busca usuário por ID
   * @param {string} id
   * @returns {object|null}
   */
  async findById(id) {
    return users.find((u) => u.id === id) || null;
  }

  /**
   * Busca usuário por e-mail
   * @param {string} email
   * @returns {object|null}
   */
  async findByEmail(email) {
    return users.find((u) => u.email === email) || null;
  }

  /**
   * Atualiza dados do usuário
   * @param {string} id
   * @param {object} data
   * @returns {object|null}
   */
  async update(id, data) {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...data, updatedAt: new Date().toISOString() };
    return users[index];
  }
}

module.exports = new UserRepository();
