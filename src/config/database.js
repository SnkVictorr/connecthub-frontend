// mysql2/promise é uma biblioteca que permite usar o mysql com promises, facilitando o uso de async/await e deixando codigo mais legivel
const mysql = require('mysql2/promise');

// Cria uma conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  // serve para manter a conexão ativa, mesmo que não esteja sendo usada, evitando que a conexão seja fechada
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;