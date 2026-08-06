// Controller Converte HTTP em JavaScript. Cuida da requisição e resposta. Chama o service para tratar a regra de negócio.

const usuarioService = require("../services/usuarioService");
const asyncHandler = require("../middlewares/asyncHandler");

// usando asyncHandler para lidar com erros através do middleware de erro
const listar = asyncHandler(async (req, res) => {
  const usuarios = await usuarioService.listar();
  res.json(usuarios);
});

// const login = async (req, res) => {
//   const { email, senha } = req.body;
//   try {
//     const token = await usuarioService.login(email, senha);
//     res.json({
//       accessToken: token,
//     });
//   } catch {
//     res.status(401).json({
//       messagem: "Email ou senha inválidos",
//     });
//   }
// };

const criar = asyncHandler(async (req, res) => {
  const id = await usuarioService.criar(req.body);
  res.status(201).json({ message: "Usuario criado com sucesso", id });

  // Adicione este log para verificar o erro
  // res.sendStatus(500); // Internal Server Error
});

const buscarPorId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const usuario = await usuarioService.buscarPorId(id);
  if (!usuario) {
    return res.status(404).json({ message: "Usuario por id não encontrado" });
  }
  res.json(usuario);
});

const buscarPorEmail = asyncHandler(async (req, res) => {
  const { email } = req.params;

  const usuario = await usuarioService.buscarPorEmail(email);
  if (!usuario) {
    return res.status(404).json({
      message: "Usuário por email não encontrado",
    });
  }

  res.json(usuario);
});

const atualizar = asyncHandler(async (req, res) => {
  const linhas = await usuarioService.atualizar(req.params.id, req.body);
  if (!linhas) {
    return res.status(404).json({ message: "Usuario não encontrado" });
  }
  res.json({ message: "Usuario atualizado com sucesso" });
});

const deletar = asyncHandler(async (req, res) => {
  const linhas = await usuarioService.deletar(req.params.id);
  if (!linhas) {
    return res.status(404).json({ message: "Usuario não encontrado" });
  }
  res.sendStatus(204); // No Content
});

module.exports = {
  listar,
  criar,

  buscarPorId,
  buscarPorEmail,
  atualizar,
  deletar,
};
