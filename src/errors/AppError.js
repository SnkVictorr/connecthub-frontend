// Classe de erro personalizada para a aplicação. Ela estende a classe Error nativa do JavaScript e adiciona um statusCode, que pode ser usado para enviar respostas HTTP apropriadas para o cliente.
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
