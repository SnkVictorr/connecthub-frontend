const { z } = require("zod");

const criarUsuarioSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(3, "nome é muito curto")
    .max(100, "nome é muito longo"),
  email: z.string().trim().toLowerCase().email("email inválido").min(5).max(50),
  senha: z
    .string()
    .min(6, "senha é muito curta")
    .max(20, "senha é muito longa"),
});

const buscarPorIdSchema = z.object({
  // O coerce converte "10" para 10.
  id: z.coerce.number().int().positive("id deve ser um número positivo"),
});

const buscarPorEmailSchema = z.object({
  email: z.string().email("email inválido").trim(),
});

module.exports = {
  criarUsuarioSchema,
  buscarPorIdSchema,
  buscarPorEmailSchema,
};
