const { z } = require("zod");

const authSchema = z.object({
  email: z.string().trim().email("email inválido").toLowerCase(),
  senha: z
    .string()
    .min(6, "senha é muito curta")
    .max(20, "senha é muito longa"),
});

module.exports = { authSchema };
