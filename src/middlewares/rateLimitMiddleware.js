const rateLimit = require("express-rate-limit");

// Limite de requisições para todas as rotas por ip
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP

  standardHeaders: true, // Retorna informações de limite de taxa nos cabeçalhos `RateLimit-*`

  legacyHeaders: false, // Desativa os cabeçalhos `X-RateLimit-*`

  message: {
    message: "Muitas requisições. Por favor tente novamente mais tarde.",
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 30, // Limite de 30 requisições por IP,
  message: {
    message: "Muitas tentativas de login. Por favor tente novamente mais tarde.",
  },
});

module.exports = {
  apiLimiter,
  loginLimiter,
};
