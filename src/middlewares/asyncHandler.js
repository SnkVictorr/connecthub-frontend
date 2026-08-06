// Usado para lidar com erros em funções assíncronas no Express. Ele permite que você escreva funções assíncronas sem precisar usar blocos try/catch em cada rota. Se uma função assíncrona lançar um erro, o asyncHandler captura esse erro e o passa para o middleware de tratamento de erros do Express.
const asyncHandler = require("express-async-handler");

module.exports = asyncHandler;