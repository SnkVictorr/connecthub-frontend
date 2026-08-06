// Route recebe a url e direciona para o controller

const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/authMiddleware");

const validateMiddleware = require("../middlewares/validateMiddleware");

const authorizeMiddleware = require("../middlewares/authorizeMiddleware");

const usuarioSchema = require("../schemas/usuarioSchema");

router.post(
  "/",
  validateMiddleware(usuarioSchema.criarUsuarioSchema, "body"),
  usuarioController.criar,
);

// Aplica o middleware de autenticação a todas as rotas abaixo
router.use(auth);

// A pessoa precisa estar autenticada para acessar a rota de listar usuários, por isso o middleware auth é usado antes do controller.
router.get("/", authorizeMiddleware("admin"), usuarioController.listar);
router.get(
  "/:id",
  // authorizeMiddleware("admin"),
  validateMiddleware(usuarioSchema.buscarPorIdSchema, "params"),
  usuarioController.buscarPorId,
);

// router.put(
//   "/:id",
//   validateMiddleware(usuarioSchema.buscarPorIdSchema, "params"),
//   // partial() permite que alguns campos sejam opcionais
//   validateMiddleware(usuarioSchema.criarUsuarioSchema.partial(), "body"),
//   // Definindo quem vai poder acessar a rota pelo papel
//   authorizeMiddleware("admin"),
//   usuarioController.atualizar,
// );

router.delete(
  "/:id",
  validateMiddleware(usuarioSchema.buscarPorIdSchema, "params"),
  authorizeMiddleware("admin"),
  usuarioController.deletar,
);

module.exports = router;
