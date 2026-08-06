const AppError = require("../errors/AppError");

// Middleware para autorizar o acesso a rotas com base no papel do usuário
const authorize = (...rolesPermitidas) => {
  return (req, res, next) => {
    if (!req.usuario) {
      throw new AppError("Usuário não autenticado.", 401);
    }

    if (!rolesPermitidas.includes(req.usuario.role)) {
      throw new AppError("Acesso negado.", 403);
    }

    next();
  };
};

module.exports = authorize;
