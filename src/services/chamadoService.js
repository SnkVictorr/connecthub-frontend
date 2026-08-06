const chamadoRepository = require("../repositories/chamadoRepository");
const AppError = require("../errors/AppError");

const buscarChamadosPorUsuario = async (usuarioId) => {
  return await chamadoRepository.buscarChamadosPorUsuario(usuarioId);
};

const buscarPorPesquisa = async (usuarioId, pesquisa) => {
  const chamados = await chamadoRepository.buscarPorPesquisa(
    usuarioId,
    pesquisa,
  );
  return chamados;
};

const criarChamado = async (
  titulo,
  descricao,
  prioridade,
  progresso,
  usuarioId,
) => {
  const chamadoId = await chamadoRepository.criarChamado(
    titulo,
    descricao,
    prioridade,
    progresso,
    usuarioId,
  );

  return chamadoId;
};
async function atualizarChamado(id, usuarioId, progresso) {
  return await chamadoRepository.atualizarChamado(id, usuarioId, progresso);
}
async function deletarChamado(chamadoId, usuarioId) {
  const rows = await chamadoRepository.deletarChamado(chamadoId, usuarioId);

  return rows > 0;
}

module.exports = {
  criarChamado,
  buscarChamadosPorUsuario,
  buscarPorPesquisa,
  atualizarChamado,
  deletarChamado,
};
