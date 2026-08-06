const db = require("../config/database");

const criarChamado = async (
  titulo,
  descricao,
  prioridade,
  progresso,
  usuarioId,
) => {
  const [resultado] = await db.query(
    "INSERT INTO chamados (titulo, descricao, prioridade, progresso, usuario_id) VALUES (?, ?, ?, ?, ?)",
    [titulo, descricao, prioridade, progresso, usuarioId],
  );
  return resultado.insertId;
};

const buscarChamadosPorUsuario = async (usuarioId) => {
  const [chamados] = await db.query(
    "SELECT * FROM chamados WHERE usuario_id = ? ORDER BY progresso ASC, prioridade DESC",
    [usuarioId],
  );
  return chamados;
};

const buscarPorPesquisa = async (usuarioId, pesquisa) => {
  const [chamados] = await db.query(
    "SELECT * FROM chamados WHERE usuario_id = ? AND (titulo LIKE ? OR descricao LIKE ?) ORDER BY progresso ASC, prioridade DESC",
    [usuarioId, `%${pesquisa}%`, `%${pesquisa}%`],
  );
  return chamados;
};

const atualizarChamado = async (chamadoId, usuarioId, progresso) => {
  console.log("progressso", progresso);
  const [resultado] = await db.query(
    "UPDATE chamados SET progresso = ? WHERE id = ? AND usuario_id = ?",
    [progresso, chamadoId, usuarioId],
  );
  return resultado.affectedRows > 0;
};

const deletarChamado = async (chamadoId, usuarioId) => {
  const [resultado] = await db.query(
    "DELETE FROM chamados WHERE id = ? AND usuario_id = ?",
    [chamadoId, usuarioId],
  );
  return resultado.affectedRows > 0;
};

module.exports = {
  criarChamado,
  buscarChamadosPorUsuario,
  buscarPorPesquisa,
  atualizarChamado,
  deletarChamado,
};
