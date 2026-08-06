import { removerAccessToken, obterAccessToken } from "./auth.js";
import { apiFetch } from "./api.js";

const logoutButton = document.getElementById("logout-button");

export async function logout() {
  try {
    const response = await apiFetch("/auth/logout", {
      method: "POST",
      headers: {
        authorization: `Bearer ${obterAccessToken()}`,
      },
    });

    if (response.ok) {
      removerAccessToken();
      alert("Logout realizado com sucesso!");
      window.location.href = "index.html";
    } else {
      const errorData = await response.json();
      console.log(`Erro ao fazer logout: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Erro ao enviar os dados:", error);
    alert("Ocorreu um erro ao enviar os dados. Por favor, tente novamente.");
  }
}

logoutButton.addEventListener("click", async () => {
  await logout();
});
