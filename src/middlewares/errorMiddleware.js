// Middleware de erro para o Express. Ele captura qualquer erro que ocorra durante o processamento das requisições e envia uma resposta de erro apropriada para o cliente.
const logger = require("../config/logger");
// Usando o err personalizado do AppError
const errorMiddleware = (err, req, res, next) => {
  const isInvalidJson =
    err.type === "entity.parse.failed" ||
    (err instanceof SyntaxError && err.status === 400);

  const status = isInvalidJson ? 400 : err.statusCode || 500;
  const message = isInvalidJson
    ? "JSON inválido"
    : err.message || "Erro interno do servidor";

  // DEV
  // logger.error({
  //   message: err.message,

  //   stack: err.stack,

  //   url: req.originalUrl,

  //   method: req.method,
  // });

  // PROD
  logger.error(err);

  res.status(status).json({ message });
};

module.exports = errorMiddleware;
