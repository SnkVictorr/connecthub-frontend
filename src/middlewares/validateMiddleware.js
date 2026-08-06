const validateMiddleware = (schema, campo = "body") => {

  return (req, res, next) => {

    const resultado = schema.safeParse(req[campo]);
    
    if(!resultado.success) {
      return res.status(400).json({
        erros: resultado.error.flatten()
      })
    }

    req[campo] = resultado.data;

    next();
  }
}


// const validate = (schema) => {
//   return (req, res, next) => {
//     // Valida o corpo da requisição (req.body) usando o esquema fornecido. Se a validação falhar, retorna um erro 400 com os detalhes dos erros. Caso contrário, prossegue para o próximo middleware ou rota.
//     const resultado = schema.safeParse(req.body);

//     if (!resultado.success) {
//       return res.status(400).json({ erros: resultado.error.issues });
//     }

//     req.body = resultado.data;
//     next();
//   };
// };

// const validateId = (schema) => {
//   return (req,res,next) => {

//     const resultado = schema.safeParse(req.params)


//   }
// }

module.exports = validateMiddleware;
