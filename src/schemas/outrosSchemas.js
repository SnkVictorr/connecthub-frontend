const { z } = require("zod");

const outrosSchemas = z.object({
  //default() define um valor padrão caso o usuário não forneça um valor para a propriedade.
  page: z.coerce.number().default(1),

  limit: z.coerce.number().default(10),

  prioridade: z.enum(["alta", "media", "baixa"]).optional(),

  status: z.enum(["pendente", "em andamento", "concluida"]).optional(),

  telefone: z
    .string()
    .regex(/^\d{11}$/, "telefone inválido")
    .optional(),

  idade: z
    .number()
    .refine((idade) => idade >= 18, {
      message: "idade deve ser maior ou igual a 18",
    })
    .optional(),
});

module.exports = { outrosSchemas };
