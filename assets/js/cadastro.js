import { API_URL } from "./config.js";

const form = document.getElementById("cadastro-form");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
form.addEventListener(
  "submit",

  async (event) => {
    event.preventDefault();
    const formData = {
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim().toLowerCase(),
      senha: document.getElementById("senha").value.trim(),
    };

    if (!formData.nome || !formData.email || !formData.senha) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validação de comprimento dos campos
    if (formData.nome.length < 3 || formData.nome.length > 100) {
      alert("O nome deve ter entre 3 e 100 caracteres.");
      return;
    }

    if (formData.email.length < 5 || formData.email.length > 50) {
      alert("O email deve ter entre 5 e 50 caracteres.");
      return;
    }

    if (formData.senha.length < 6 || formData.senha.length > 20) {
      alert("A senha deve ter entre 6 e 20 caracteres.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      alert("O email é inválido.");
      return;
    }

    try {
      const resultado = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await resultado.json();
      console.log("Resultado do fetch:", responseData);
      if (resultado.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "index.html";
      } else {
        alert(`Erro ao cadastrar: ${responseData.message}`);
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Ocorreu um erro ao enviar os dados. Por favor, tente novamente.");
    }
  },
);
