# 🚀 ConnectHub: API de Gestão Colaborativa

> **Fase 3 – Projeto 5 (Acelere sua Carreira)**
> Uma API de gestão colaborativa construída com Node.js, focada em segurança, persistência em banco de dados relacional e integração full-stack.

## 📖 Visão do Projeto

O ConnectHub é o hub central projetado para superar as limitações de aplicações isoladas no navegador. A dor solucionada é clara: permitir o uso compartilhado, sincronização entre múltiplos dispositivos e total privacidade dos dados dos usuários. Ao invés de usar `LocalStorage`, o ConnectHub oferece um backend robusto, com banco de dados em nuvem e sistema de autenticação segura, criando o alicerce fundamental de um produto viável e escalável.

## 🎯 Objetivos e Funcionalidades (Requisitos Funcionais)

- **Autenticação e Autorização:** Criação de contas e login seguro de usuários.
- **Privacidade de Dados:** Garantir que um usuário autenticado só consiga visualizar, criar, editar ou excluir (CRUD) os seus próprios registros.
- **Persistência Permanente:** Salvar todos os dados em um banco de dados relacional (SQL).
- **Integração Real-time:** Permitir que o frontend consuma os dados da API de forma dinâmica e reflita as mudanças feitas no servidor.

## 🛡️ Segurança e Qualidade (Requisitos Não Funcionais)

- **Proteção de Credenciais:** Criptografia e hashing de senhas utilizando `BCrypt` (proibido o uso de senhas em texto puro).
- **Sessões Seguras:** Controle de acesso por tokens `JWT` (JSON Web Token) em todas as rotas privadas.
- **Tratamento de Exceções:** Retorno adequado de HTTP Status Codes, como `401 Unauthorized` para acessos indevidos e `404 Not Found` para recursos ausentes.
- **Segurança de Variáveis:** Uso de arquivos `.env` para proteção de credenciais, chaves de API e segredos do banco de dados.

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js com Express.js
- **Banco de Dados:** Relacional via SQL MySQL
- **Segurança:** JSON Web Token (JWT) e BCrypt
- **Ferramentas de Teste e Gestão:** Postman, HeidiSQL
- **Desenvolvimento:** Nodemon

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- Banco de dados relacional ativo (MySQL/PostgreSQL) ou uso de SQLite.
- Gerenciador de pacotes npm ou yarn.

### Passo a Passo

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/connecthub.git
   cd connecthub/backend
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configuração de Variáveis de Ambiente (.env):**
   Crie um arquivo `.env` na raiz do projeto contendo as seguintes variáveis:

   ```env
   DATABASE_HOST=localhost
   DATABASE_USER=root
   DATABASE_PASSWORD=root
   DATABASE_NAME=connecthub
   DATABASE_PORT=3306
   ```

  JWT_SECRET
  JWT_EXPIRES_IN
  JWT_REFRESH_SECRET
  JWT_REFRESH_EXPIRES_IN
  FRONTEND_URL
  SECURE

````

4. **Inicie o servidor de desenvolvimento:**
```bash
backend:
npm run dev

frontend:
iniciar com a extensão live server
````


## 🌍 Links do Projeto (Deploy)

- **Frontend (Interface):** [https://connecthub-eight-theta.vercel.app/]
- **Backend (API):** [https://connecthub-backend-production-2f98.up.railway.app]

## 🧠 Aprendizados e Decisões Técnicas

Este projeto foi desenvolvido aplicando os princípios de **Desenvolvimento Baseado em Projetos e Problemas (PjBL)** e construído através do "Desenvolvimento em Espiral". Todo o fluxo de gerenciamento de tarefas, decisões arquiteturais e integração foram cuidadosamente registrados visando escalabilidade e clean code, preparando as bases para futuras expansões..
