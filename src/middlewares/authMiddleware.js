// Middleware no geral serve para interceptar requisições e respostas, permitindo que você execute código antes de passar o controle para a próxima função na cadeia de middlewares.
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    // O token é enviado no cabeçalho da requisição no formato "Bearer <token>". O código abaixo extrai apenas o token, removendo a palavra "Bearer" e o espaço em branco.
    const token = authHeader.split(" ")[1];

    // Verifica se o token foi criada com a mesma chave secreta, se o token não foi alterado, se não expirou. Se falhar, lança uma exceção que é capturada pelo bloco catch.
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Se o token for válido, o payload (informações do usuário) é adicionado ao objeto req, permitindo que as rotas subsequentes acessem essas informações.
    req.usuario = payload;

    next();
  } catch {
    return res.status(401).json({
      mensagem: "Token inválido.",
    });
  }
};

module.exports = auth;
