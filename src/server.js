// server.js -> tem a unica responsabilidade de iniciar a aplicação

require("dotenv").config();

const app = require("./app");

app.listen(8080, () => {
  console.log("Servidor iniciado em http://localhost:8080");
});

// // app.listen(3000, () =>  {
// //   console.log("servidor rodando na porta 3000")
// // })

app.get("/", (req, res) => {
  res.send("servidor funcionando");
});


// app.get("/sobre", (req, res) => {
//   res.send("sobre a empresa");
// });

// app.get("/contato", (req, res) => {
//   res.json({
//     email: "victorhugoar50@gmail.com",
//   });
// });

// // Transforma o json em objeto javascript
// app.use(express.json());

// // // POST
// // app.post("/usuarios", (req, res) => {
// //   console.log(req.body);

// //   // envia a resposta em json
// //   res.json({
// //     mensagem: "Recebi os dados",
// //     dados: req.body,
// //   });

// //   // // envia o status com a mensagem
// //   // res.status(201).json({
// //   //   mensagem: "Usuário criado",
// //   // });
// // });

// // /usuarios/50
// app.get("/usuarios/:id", (req, res) => {
//   res.json(req.params);
//   // {
//   //     "id":"50"
//   // }
// });

// app.get("/usuarios", (req, res) => {
//   // query
//   // /usuarios?nome=Victor&idade=23
//   res.json(req.query);
//   //   {
//   //     "nome":"Victor",
//   //     "idade":"23"
//   // }
// });

// // CRIANDO BANCO DE DADOS FALSO:
// const usuarios = [];

// app.post("/usuarios", (req, res) => {
//   usuarios.push(req.body);

//   res.status(201).json(req.body);
// });

// app.get("/usuarios", (req, res) => {
//   res.json(usuarios);
// });

// app.get("/ola/:nome", (req, res) => {
//   res.json({ mensagem: `Olá ${req.params.nome}` });
// });

// app.get("/calculadora", (req, res) => {
//   res.json({
//     resultado: Number(req.query.a) + Number(req.query.b),
//   });
// });
