function salvarAccessToken(token, usuarioId) {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("usuarioId", usuarioId);
}
function obterAccessToken() {
  return localStorage.getItem("accessToken");
}
function obterUsuarioId() {
  return localStorage.getItem("usuarioId");
}
function removerAccessToken() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("usuarioId");
}

export {
  salvarAccessToken,
  obterAccessToken,
  obterUsuarioId,
  removerAccessToken,
};
