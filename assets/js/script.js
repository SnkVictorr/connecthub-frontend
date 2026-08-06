import { apiFetch } from "./api.js";
import { obterUsuarioId } from "./auth.js";

if (obterUsuarioId() === null) {
  alert("Você não está logado. Redirecionando para a página de login.");
  window.location.href = "index.html";
}

const userNameElement = document.getElementById("user-name");
const form = document.getElementById("chamados-form");
const cardContainer = document.getElementById("chamados");
const buttonPrioridadeAlta = document.getElementById("alta");
const buttonPrioridadeMedia = document.getElementById("media");
const buttonPrioridadeBaixa = document.getElementById("baixa");
const buttonPrioridadeTodas = document.getElementById("todas-prioridades");
const buttonProgressoTodos = document.getElementById("todos");
const buttonProgressoPendente = document.getElementById("pendente");
const buttonProgressoEmAndamento = document.getElementById("em-andamento");
const buttonProgressoConcluido = document.getElementById("concluido");
const searchInput = document.getElementById("search-input");

const usuario = async () => {
  const userData = await apiFetch(`/usuarios/${obterUsuarioId()}`, {
    method: "GET",
    headers: {},
  });
  const data = await userData.json();
  console.log("Dados do usuário obtidos do backend:", data);
  return data;
};

const usuarioDados = await usuario();
userNameElement.textContent = usuarioDados.nome;

// console.log(await usuario());

let filteredData;

const filtros = {
  prioridade: "todas",
  progresso: "todos",
  pesquisa: "",
};

async function getData() {
  const response = await apiFetch("/chamados", {
    method: "GET",
  });

  const data = await response.json();

  return data;
}
aplicarFiltros();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = {
    titulo: document.getElementById("titulo").value.trim(),
    descricao: document.getElementById("descricao").value.trim(),
    prioridade: document.getElementById("prioridade").value,
    progresso: "pendente",
    id: Date.now(),
  };

  if (!formData.titulo || !formData.descricao) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  try {
    const response = async () => {
      await apiFetch("/chamados", {
        method: "POST",
        body: JSON.stringify(formData),
      });
    };

    const resultado = await response();
  } catch (error) {
    console.error("Erro ao enviar os dados:", error);
    alert("Ocorreu um erro ao enviar os dados. Por favor, tente novamente.");
  }

  aplicarFiltros();
  form.reset();
});

async function aplicarFiltros() {
  filteredData = await getData();
  console.log("Dados obtidos do backend:", filteredData);
  filteredData = filteredData.filter((item) => {
    console.log(item, item.prioridade, item.progresso, item.titulo);
    return (
      (filtros.prioridade === "todas" ||
        item.prioridade === filtros.prioridade) &&
      (filtros.progresso === "todos" || item.progresso === filtros.progresso) &&
      (filtros.pesquisa === "" ||
        item.titulo.toLowerCase().includes(filtros.pesquisa.toLowerCase()))
    );
  });
  console.log("Dados filtrados:", filteredData);
  renderCards(filteredData);
}

searchInput.addEventListener("input", () => {
  filtros.pesquisa = searchInput.value;
  aplicarFiltros();
});

function ativarBotaoStatus(botao) {
  const botoes = document.querySelectorAll(".status-button");
  botoes.forEach((b) => b.classList.remove("active"));
  botao.classList.add("active");
}

function ativarBotaoPrioridade(botao) {
  const botoes = document.querySelectorAll(".priority-button");

  botoes.forEach((b) => b.classList.remove("active"));
  botao.classList.add("active");
}

buttonPrioridadeAlta.addEventListener("click", () => {
  filtros.prioridade = "alta";
  aplicarFiltros();
  ativarBotaoPrioridade(buttonPrioridadeAlta);
});

buttonPrioridadeMedia.addEventListener("click", () => {
  filtros.prioridade = "media";
  aplicarFiltros();
  ativarBotaoPrioridade(buttonPrioridadeMedia);
});

buttonPrioridadeBaixa.addEventListener("click", () => {
  filtros.prioridade = "baixa";
  aplicarFiltros();
  ativarBotaoPrioridade(buttonPrioridadeBaixa);
});

buttonPrioridadeTodas.addEventListener("click", () => {
  filtros.prioridade = "todas";
  aplicarFiltros();
  ativarBotaoPrioridade(buttonPrioridadeTodas);
});

buttonProgressoTodos.addEventListener("click", () => {
  filtros.progresso = "todos";
  aplicarFiltros();
  ativarBotaoStatus(buttonProgressoTodos);
});

buttonProgressoPendente.addEventListener("click", () => {
  filtros.progresso = "pendente";
  aplicarFiltros();
  ativarBotaoStatus(buttonProgressoPendente);
});
buttonProgressoEmAndamento.addEventListener("click", () => {
  filtros.progresso = "em-andamento";
  aplicarFiltros();
  ativarBotaoStatus(buttonProgressoEmAndamento);
});

buttonProgressoConcluido.addEventListener("click", () => {
  filtros.progresso = "concluido";
  aplicarFiltros();
  ativarBotaoStatus(buttonProgressoConcluido);
});

async function removerChamado(id) {
  await apiFetch(`/chamados/${id}`, {
    method: "DELETE",
    headers: {},
  });
  aplicarFiltros();
}

function renderCards(data) {
  cardContainer.innerHTML = "";

  for (const item of data) {
    const card = document.createElement("article");
    card.classList.add("chamado-card");

    const id = document.createElement("h5");
    id.textContent = `#${item.id}`;
    id.classList.add("chamado-id");

    const prioridade = document.createElement("div");
    prioridade.classList.add("chamado-status");

    const removerButton = document.createElement("button");
    removerButton.textContent = "🗑️";
    removerButton.classList.add("remover-button");
    removerButton.addEventListener("click", () => {
      removerChamado(item.id);
    });

    const jBetweenDiv = document.createElement("div");
    jBetweenDiv.classList.add("justify-between");
    jBetweenDiv.appendChild(id);
    jBetweenDiv.appendChild(removerButton);
    card.appendChild(jBetweenDiv);

    // Solicitante do chamado
    const solicitante = document.createElement("h4");
    solicitante.textContent = `${usuarioDados.nome}`;
    solicitante.classList.add("chamado-solicitante");
    card.appendChild(solicitante);

    // Título do chamado
    const titulo = document.createElement("h3");
    titulo.textContent = `${item.titulo}`;
    titulo.classList.add("chamado-card-title");
    card.appendChild(titulo);

    // Descrição do chamado
    const descricao = document.createElement("p");
    descricao.textContent = `${item.descricao}`;
    descricao.classList.add("chamado-card-description");
    card.appendChild(descricao);

    // Prioridade do chamado
    const mudarStatusButton = document.createElement("button");
    mudarStatusButton.textContent = "Mudar status";
    mudarStatusButton.classList.add("mudar-status-button");
    const span = document.createElement("span");

    if (item.progresso === "concluido") {
      const progresso = document.createElement("span");
      progresso.textContent = "Concluído";
      progresso.classList.add("concluido");
      prioridade.appendChild(progresso);
      card.style.borderLeft = "0.3rem solid #4cd964";
    } else if (item.progresso === "em-andamento") {
      const progresso = document.createElement("span");
      progresso.textContent = "Em andamento";
      progresso.classList.add("progresso");
      prioridade.appendChild(progresso);
      card.style.borderLeft = "0.3rem solid  #42f2ffd6";
    } else {
      const progresso = document.createElement("span");
      progresso.textContent = "Pendente";
      progresso.classList.add("pendente", "progresso-pendente");
      prioridade.appendChild(progresso);
      card.style.borderLeft = "0.3rem solid #ff6b6b";
    }

    if (item.prioridade === "alta") {
      span.textContent = "Alta";
      span.classList.add("prioridade", "prioridade-alta");
      prioridade.appendChild(span);
    }

    if (item.prioridade === "media") {
      span.textContent = "Média";
      span.classList.add("prioridade", "prioridade-media");
      prioridade.appendChild(span);
    }

    if (item.prioridade === "baixa") {
      span.textContent = "Baixa";
      span.classList.add("prioridade", "prioridade-baixa");
      prioridade.appendChild(span);
    }

    mudarStatusButton.addEventListener("click", async () => {
      if (item.progresso === "pendente") {
        item.progresso = "em-andamento";
      } else if (item.progresso === "em-andamento") {
        item.progresso = "concluido";
      }

      const editar = await apiFetch(`/chamados/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: item.id, progresso: item.progresso }),
      });
      aplicarFiltros();
    });

    const bottomDiv = document.createElement("div");
    bottomDiv.classList.add("justify-between");
    bottomDiv.appendChild(prioridade);
    bottomDiv.appendChild(mudarStatusButton);
    card.appendChild(bottomDiv);

    cardContainer.appendChild(card);
  }
}
