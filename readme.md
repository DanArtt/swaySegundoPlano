# 🧠 Projeto de Gestão de Projetos — E-commerce Smart

Este projeto foi desenvolvido como parte da disciplina de **Gestão de Projetos** no curso de **Análise e Desenvolvimento de Sistemas**, com o objetivo de aplicar na prática os conceitos de **planejamento, monitoramento, controle e encerramento de projetos**, utilizando um **dashboard interativo e automatizado**.

O trabalho foi realizado por **Daniel Andrade**, **Gabriel Leite** e **Matheus Campos**, e tem como foco o desenvolvimento de um **E-commerce Inteligente (E-commerce Smart)** — um sistema voltado à simulação do ciclo de vida completo de um projeto de software, desde o backlog até o monitoramento de desempenho e custos.

---

## 📊 Estrutura do Sistema

O sistema foi dividido em **módulos integrados**, cada um representando uma área de conhecimento da Gestão de Projetos.

### 🗂️ Backlog
- CRUD completo de tarefas (criação, edição, exclusão e listagem).
- Armazenamento das tarefas em arquivo `.txt` via **API Flask**.
- Gráfico dinâmico mostrando a distribuição dos status: **Pendente**, **Em Andamento** e **Concluída**.

### 📆 Cronograma
- Exibição das etapas do projeto com responsáveis, datas e status.
- Gráfico de barras representando a **duração de cada fase**.
- Estrutura baseada em fases reais: **Documentação**, **Planejamento**, **Design**, **Desenvolvimento**, **Testes** e **Entrega**.

### 🚀 Monitoramento de Sprints
- Consome dados de uma **API Flask** para exibir informações sobre as sprints.
- Cálculo automático dos indicadores:
  - **Velocity** – produtividade média das sprints.
  - **CPI (Cost Performance Index)** – índice de desempenho de custo.
  - **SPI (Schedule Performance Index)** – índice de desempenho de prazo.
- Exibição em **cards interativos** e **gráficos de desempenho**.

### 💰 Orçamento
- Simula **custos diários fixos** da equipe e ferramentas utilizadas.  
- Calcula automaticamente:
  - **Gasto acumulado** desde o início do projeto.  
  - **Saldo restante** e **porcentagem do orçamento utilizado**.  
  - **CPI (Cost Performance Index)** com base no progresso físico das sprints.  
- Exibe dois **gráficos dinâmicos**:
  - **Projeção de Gastos Futuros** – mostra quando o orçamento será atingido com base no ritmo atual.  
  - **Histórico de Gastos Diários e Semanais** – compara a evolução dos custos ao longo do tempo.  
- Inclui **textos explicativos automáticos** abaixo dos gráficos, interpretando os resultados e tendências financeiras.  

Esse módulo conecta dados em tempo real com a **API Flask**, oferecendo uma visão clara da **saúde financeira do projeto** e auxiliando na tomada de decisão quanto à **alocação de recursos e controle de custos**.

### 🤖 Relatórios e Lições Aprendidas (IA)
- Integração com API Flask que utiliza **inteligência artificial** para gerar:
  - **Relatórios automáticos** sobre o progresso do projeto.
  - **Lições aprendidas** com base nas etapas já concluídas.
- Renderização dos textos em **Markdown** diretamente no navegador.

### ⚠️ Riscos
- Tabela com os principais riscos identificados no projeto.
- Exibição de **probabilidade**, **impacto**, **status** e **plano de mitigação**.

---

## 🧩 Tecnologias Utilizadas

**Frontend:**
- HTML5  
- CSS3  
- JavaScript (ES6+)  
- Chart.js (gráficos interativos)

**Backend:**
- Python  
- Flask (API REST local)

**Armazenamento:**
- Arquivos `.txt` (para tarefas)
- Arquivo `sprint.json` (para dados de sprints)

**Integração:**
- Fetch API (consumo de endpoints)

---

## 🎯 Objetivo do Projeto

O objetivo do **E-commerce Smart** é demonstrar de forma prática a **aplicação dos conceitos de Gestão de Projetos**, integrando planejamento, execução, monitoramento e controle.

O sistema simula um cenário real de acompanhamento de um projeto de software, permitindo:
- Análise de desempenho das sprints.
- Controle de custos e prazos.
- Visualização de indicadores-chave (KPIs).
- Geração automática de relatórios gerenciais.

---

## 🧾 Licença

Este projeto foi desenvolvido exclusivamente para fins **acadêmicos** no âmbito da disciplina de **Gestão de Projetos** e **não possui fins comerciais**.

---

📅 **Faculdade:** Análise e Desenvolvimento de Sistemas  
📘 **Disciplina:** Gestão de Projetos  
👨‍🏫 **Período:** 2025/2  
👥 **Integrantes:** Daniel Andrade, Gabriel Leite e Matheus Campos
