const express = require("express");
const router = express.Router();

const chamadosController = require("../controllers/chamadoController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateMiddleware = require("../middlewares/validateMiddleware");
const { chamadoSchema } = require("../schemas/chamadosSchema");

router.use(authMiddleware);

router.post(
  "/",
  validateMiddleware(chamadoSchema, "body"),
  chamadosController.criarChamado,
);

router.get("/", chamadosController.buscarChamadosPorUsuario);

// router.get("/q", chamadosController.buscarPorPesquisa);

router.put("/:id", chamadosController.atualizarChamado);

router.delete("/:id", chamadosController.deletarChamado);

module.exports = router;
