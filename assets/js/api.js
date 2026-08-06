import { logout } from "./logout.js";
import {
  removerAccessToken,
  salvarAccessToken,
  obterAccessToken,
} from "./auth.js";
import { API_URL } from "./config.js";
export async function apiFetch(url, options = {}) {
  const BaseUrl = API_URL;
  console.log("Opções da requisição:", options);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${obterAccessToken()}`,
    ...(options.headers || {}),
  };
  let response = await fetch(BaseUrl + url, {
    ...options,
    credentials: "include",
    headers,
  });

  if (response.status === 401) {
    console.log("Token expirado. Tentando atualizar o token...");
    const refresh = await fetch(`${BaseUrl}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    console.log("Resposta da requisição de refresh:", refresh);
    if (refresh.ok) {
      const data = await refresh.json();
      if (data.accessToken) {
        headers["Authorization"] = `Bearer ${data.accessToken}`;
        salvarAccessToken(data.accessToken, data.usuarioId);
      }

      response = await fetch(`${BaseUrl}${url}`, {
        ...options,
        credentials: "include",
        headers,
      });
      console.log("Resposta final da requisição:", response);
    } else {
      console.log("Falha ao atualizar o token. Redirecionando para login...");
      removerAccessToken();
      window.location.href = "/frontend/index.html";
    }
  }

  return response;
}
