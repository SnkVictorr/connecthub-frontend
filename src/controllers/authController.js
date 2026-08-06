const authService = require("../services/authService");
const asyncHandler = require("../middlewares/asyncHandler");

const login = asyncHandler(async (req, res) => {
  const { email, senha } = req.body;

  const tokens = await authService.login(email, senha);
  console.log("Tokens gerados:", tokens);
  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.SECURE === "production", // Defina como true se estiver usando HTTPS
    sameSite: "lax", // Ajuste conforme necessário
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias em milissegundos
  });
  res.json({
    accessToken: tokens.accesstoken,
    usuarioId: tokens.usuarioId,
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  console.log("Refresh token solicitado", req.cookies.refreshToken);
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token não fornecido" });
  }

  const tokens = await authService.novoAccessToken(refreshToken);
  res.cookie(
    "refreshToken",

    tokens.novoRefreshToken,

    {
      httpOnly: true,
      secure: process.env.SECURE === "production", // Defina como true se estiver usando HTTPS
      sameSite: "lax", // Ajuste conforme necessário
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias em milissegundos
    },
  );
  console.log("tokens gerados:", tokens);
  res.status(200).json({
    accessToken: tokens.accessToken,
    usuarioId: tokens.usuarioId,
  });
});

const logout = asyncHandler(async (req, res) => {
  console.log("Logout iniciado");
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token não fornecido" });
  }

  await authService.logout(refreshToken);

  res.clearCookie("refreshToken");

  res.status(204).json({ message: "Logout realizado com sucesso" });
});

module.exports = {
  login,
  refreshToken,
  logout,
};
