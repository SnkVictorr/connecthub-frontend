const { z } = require("zod");

const chamadoSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(1, "O título é obrigatório.")
    .max(100, "O título deve ter no máximo 100 caracteres."),
  descricao: z
    .string()
    .trim()
    .min(1, "A descrição é obrigatória.")
    .max(500, "A descrição excede o limite permitido."),
  prioridade: z.enum(
    ["alta", "media", "baixa"],
    "A prioridade deve ser 'alta', 'media' ou 'baixa'.",
  ),
  progresso: z
    .enum(
      ["pendente", "em-andamento", "concluido"],
      "O progresso deve ser 'pendente', 'em-andamento' ou 'concluido'.",
    )
    .default("pendente"),
});

module.exports = {
  chamadoSchema,
};
