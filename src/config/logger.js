const { createLogger, format, transports } = require("winston");


// Cria um logger com nível de log "info" e formatação JSON
const logger = createLogger({
  level: "info",

  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    // Registra mensagens no console
    new transports.Console(),
    // login, cadastro, logout, refresh token, etc
    new transports.File({ filename: "logs/error.log", level: "error" }),

    // erros, exception, stack trace
    new transports.File({ filename: "logs/app.log" }),
  ],
});

module.exports = logger;
