import {
  obterAccessToken,
  salvarAccessToken,
  removerAccessToken,
} from "./auth.js";

import { API_URL } from "./config.js";

addEventListener("DOMContentLoaded", () => {
  console.log("Verificando se o usuário já está logado...");
  if (obterAccessToken()) {
    alert("Você já está logado. Redirecionando para a página de chamados.");
    window.location.href = "chamados.html";
  }
});

// if (obterAccessToken() !== null) {
//   alert("Você já está logado. Redirecionando para a página de chamados.");
//   window.location.href = "chamados.html";
// }

const loginForm = document.getElementById("form-login");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = {
    email: document.getElementById("email").value.trim().toLowerCase(),
    senha: document.getElementById("senha").value,
  };

  if (!formData.email || !formData.senha) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  try {
    const resultado = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const resultadoData = await resultado.json();

    if (resultado.ok) {
      salvarAccessToken(resultadoData.accessToken, resultadoData.usuarioId);
      alert("Login realizado com sucesso!");
      // Redirecionar para a página de chamados
      window.location.href = "chamados.html";
    } else {
      alert(`Erro ao fazer login: ${resultadoData.message}`);
    }
  } catch (error) {
    console.error("Erro ao enviar os dados:", error);
    alert("Ocorreu um erro ao enviar os dados. Por favor, tente novamente.");
  }
});
