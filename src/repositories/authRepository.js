const db = require("../config/database");

const salvarRefreshToken = async (usuarioId, refreshToken) => {
  const [resultado] = await db.query(
    "INSERT INTO refresh_tokens (usuario_id, token, expira_em) VALUES (?, ?, ?)",
    [
      usuarioId,
      refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
    ],
  );

  return resultado.affectedRows > 0;
};

const buscarUsuarioPorRefreshToken = async (refreshToken) => {
  const [usuario] = await db.query(
   "SELECT u.id AS usuario_id, u.role FROM usuarios u JOIN refresh_tokens r ON u.id = r.usuario_id WHERE r.token = ?",
    [refreshToken],
  );
  return usuario[0];
};

const deletarRefreshToken = async (refreshToken) => {
  await db.query("DELETE FROM refresh_tokens WHERE token = ?", [refreshToken]);
};

module.exports = {
  salvarRefreshToken,
  buscarUsuarioPorRefreshToken,
  deletarRefreshToken,
};
