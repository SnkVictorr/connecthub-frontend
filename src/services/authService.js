const usuarioRepository = require("../repositories/usuarioRepository");

const authRepository = require("../repositories/authRepository");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

const login = async (email, senha) => {
  const usuario = await usuarioRepository.buscarPorEmail(email);

  if (!usuario) {
    throw new AppError("LOGIN_INVALIDO", 401);
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    throw new AppError("LOGIN_INVALIDO", 401);
  }

  // token é um objeto que contém informações sobre o usuário, como id e email. Ele é assinado com uma chave secreta e tem um tempo de expiração definido.
  const accesstoken = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      role: usuario.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  const refreshToken = jwt.sign(
    {
      id: usuario.id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: 7 * 24 * 60 * 60,
    },
  );

  await authRepository.salvarRefreshToken(usuario.id, refreshToken);

  return { accesstoken, refreshToken, usuarioId: usuario.id };
};

const novoAccessToken = async (refreshToken) => {
  console.log("Solicitando novo access token com refresh token:", refreshToken);
  const usuario =
    await authRepository.buscarUsuarioPorRefreshToken(refreshToken);

  if (!usuario) {
    throw new AppError("REFRESH_TOKEN_INVALIDO, USUARIO NAO ENCONTRAOD", 401);
  }

  const tokenExpirado = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    (err) => {
      if (err) {
        throw new AppError("REFRESH_TOKEN_INVALIDO, TOKEN EXPIRADO", 401);
      }
    },
  );
  console.log("Refresh token válido. Gerando novo access token para o usuário:", usuario);
  const novoRefreshToken = jwt.sign(
    {
      id: usuario.usuario_id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: 7 * 24 * 60 * 60,
    },
  );
  
  const accessToken = jwt.sign(
    {
      id: usuario.usuario_id,
      role: usuario.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  const novoRefreshSalvo = await authRepository.salvarRefreshToken(
    usuario.usuario_id,
    novoRefreshToken,
  );

  if (!novoRefreshSalvo) {
    throw new AppError("ERRO AO SALVAR NOVO REFRESH TOKEN", 500);
  }
  console.log("novo refresh token salvo com sucesso:", novoRefreshToken);

  // await authRepository.deletarRefreshToken(refreshToken);

  // return { accesstoken };
  return { accessToken, novoRefreshToken, usuarioId: usuario.usuario_id };
};

const logout = async (refreshToken) => {
  const usuario =
    await authRepository.buscarUsuarioPorRefreshToken(refreshToken);
  if (!usuario) {
    throw new AppError("REFRESH_TOKEN_INVALIDO", 401);
  }

  await authRepository.deletarRefreshToken(refreshToken);
};

module.exports = { login, novoAccessToken, logout };
