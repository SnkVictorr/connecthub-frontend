const asyncHandler = require("express-async-handler");
const chamadosService = require("../services/chamadoService");
const AppError = require("../errors/AppError");

const criarChamado = asyncHandler(async (req, res) => {
  
  const { titulo, descricao, prioridade, progresso } = req.body;
  const usuarioId = req.usuario.id;

  if (!titulo || !descricao || !prioridade || !progresso) {
    throw new AppError("Todos os campos são obrigatórios.", 400);
  }
  
  const chamadoId = await chamadosService.criarChamado(
    titulo,
    descricao,
    prioridade,
    progresso,
    usuarioId,
  );

  if (!chamadoId) {
    throw new AppError("Erro ao criar chamado.", 500);
  }

  res.status(201).json({ id: chamadoId });
});

const buscarChamadosPorUsuario = asyncHandler(async (req, res) => {
  const usuarioId = req.usuario.id;
  const chamados = await chamadosService.buscarChamadosPorUsuario(usuarioId);
  res.status(200).json(chamados);
});

const buscarPorPesquisa = asyncHandler(async (req, res) => {
  const usuarioId = req.usuario.id;
  const { pesquisa } = req.query;
  const chamados = await chamadosService.buscarPorPesquisa(usuarioId, pesquisa);

  if (!chamados) {
    throw new AppError("Nenhum chamado encontrado.", 404);
  }
  res.status(200).json(chamados);
});

const atualizarChamado = asyncHandler(async (req, res) => {
  const chamadoId = req.params.id;
  const usuarioId = req.usuario.id;
  const { progresso } = req.body;
  const resultado = await chamadosService.atualizarChamado(
    chamadoId,
    usuarioId,
    progresso,
  );

  if (!resultado) {
    throw new AppError(
      "Chamado não encontrado ou não pertence ao usuário.",
      404,
    );
  }
  res.status(200).json({ message: "Chamado atualizado com sucesso" });
});

const deletarChamado = asyncHandler(async (req, res) => {
  const chamadoId = req.params.id;
  const usuarioId = req.usuario.id;

  const rows = await chamadosService.deletarChamado(chamadoId, usuarioId);

  if (!rows) {
    throw new AppError(
      "Chamado não encontrado ou não pertence ao usuário.",
      404,
    );
  }

  res.status(204).json({ message: "Chamado deletado com sucesso" });
});

module.exports = {
  criarChamado,
  atualizarChamado,
  buscarChamadosPorUsuario,
  buscarPorPesquisa,
  deletarChamado,
};
