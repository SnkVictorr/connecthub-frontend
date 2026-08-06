// Responsavel por fazer a comunicacao com o banco de dados

const db = require("../config/database");

const listar = async () => {
  // Usa desestruturacao para pegar o primeiro elemento do array, que é o resultado da query
  const [usuarios] = await db.query(
    "SELECT id, nome, email, role FROM usuarios",
  );

  return usuarios;
};

const criar = async (usuario) => {
  const { nome, email, senha } = usuario;
  await db.query(
    `INSERT INTO usuarios 
    (nome,email,senha) VALUES (?, ?, ?)`,
    [nome, email, senha],
  );
};

const buscarPorEmail = async (email) => {
  const [usuario] = await db.query(
    "SELECT id, nome, email, senha, role FROM usuarios WHERE email = ?",
    [email],
  );

  return usuario[0];
};

const buscarPorId = async (id) => {
  const [usuarios] = await db.query(
    "SELECT id, nome, email, role FROM usuarios WHERE id = ?",
    [id],
  );
  return usuarios[0];
};

const atualizar = async (id, usuario) => {
  // const { nome, email, senha } = usuario;
  // const [resultado] = await db.query(
  //   `UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?`,
  //   [nome, email, senha, id],
  // );
  // return resultado.affectedRows > 0; // Retorna true se algum registro foi atualizado, false caso contrário
};

const deletar = async (id) => {
  const [resultado] = await db.query(`DELETE FROM usuarios WHERE id = ?`, [id]);
  return resultado.affectedRows > 0; // Retorna true se algum registro foi deletado, false caso contrário
};

module.exports = {
  listar,
  criar,
  buscarPorId,
  buscarPorEmail,
  atualizar,
  deletar,
};
