const usuarioRepository = require("../repositories/usuarioRepository");
const bcrypt = require("bcrypt");
const AppError = require("../errors/AppError");

const listar = async () => {
  return await usuarioRepository.listar();
};

const criar = async (dados) => {
  const usuario = await usuarioRepository.buscarPorEmail(dados.email);

  if (usuario) {
    throw new AppError(
      "Email já cadastrado.",

      409,
    );
  }

  const senhaHash = await bcrypt.hash(dados.senha, 10);
  dados.senha = senhaHash;
  return await usuarioRepository.criar(dados);
};

const buscarPorEmail = async (email) => {
  return await usuarioRepository.buscarPorEmail(email);
};

const buscarPorId = async (id) => {
  return await usuarioRepository.buscarPorId(id);
};

const atualizar = async (id, { nome, email }) => {
  return await usuarioRepository.atualizar(id, { nome, email });
};

const deletar = async (id) => {
  return await usuarioRepository.deletar(id);
};



module.exports = {
  listar,
  criar,
  buscarPorEmail,
  buscarPorId,
  atualizar,
  deletar,
};
