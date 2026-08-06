// app.js
// Configura a aplicação.

const express = require("express");

// cookie-parser é um middleware que analisa os cookies da requisição e os adiciona ao objeto req.cookies. Ele é usado para ler e escrever cookies no lado do cliente.
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

// Importando a rota
const usuarioRoutes = require("./routes/usuarioRoutes");

const authRoutes = require("./routes/authRoutes");

const chamadoRoutes = require("./routes/chamadoRoutes");

const errorMiddleware = require("./middlewares/errorMiddleware");

const requestLogger = require("./middlewares/requestLoggerMiddleware");

const app = express();
const PORT = process.env.PORT || 8080;
const apiLimiter = require("./middlewares/rateLimitMiddleware").apiLimiter;
// Helmet é um middleware de segurança que ajuda a proteger a aplicação contra algumas vulnerabilidades da web, definindo cabeçalhos HTTP apropriados.
app.use(helmet());
// Configuracões de Cors
const allowedOrigins = [
  "http://localhost:5500",
  "https://connecthub.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    // Permite o envio de credenciais (cookies, autenticação, etc.). Só funciona origin definida
    credentials: true,

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Configurações de proxy. Isso é necessário se você estiver usando um proxy reverso (como Nginx) ou se estiver implantando em um ambiente de nuvem que usa proxies.
// app.set("trust proxy", 1);

app.use(requestLogger);

// API LIMITER
app.use(apiLimiter);
// Middleware para analisar o corpo da requisição como JSON. Ele converte o corpo da requisição em um objeto JavaScript acessível através de req.body.
app.use(express.json());

app.use(cookieParser());

// Quando entrar na rota /usuarios, o usuariosRoutes vai ser usado
app.use("/usuarios", usuarioRoutes);

app.use("/auth", authRoutes);

app.use("/chamados", chamadoRoutes);

// Middleware de erro deve ser registrado após todas as rotas e middlewares. Ele captura qualquer erro que ocorra durante o processamento das requisições e envia uma resposta de erro apropriada para o cliente.
app.use(errorMiddleware);

module.exports = app;
