// ===================
// Cronograma (fixo)
// ===================
new Chart(document.getElementById("cronogramaChart"), {
  type: "bar",
  data: {
    labels: ["Planejamento", "Design", "Desenvolvimento", "Testes", "Entrega"],
    datasets: [
      {
        label: "Duração em Semanas",
        data: [2, 2, 8, 2, 2],
        backgroundColor: "blue",
      },
    ],
  },
});

// ===================
// Backlog (tarefas + gráfico + tabela)
// ===================
const backlogTarefas = [
  {
    tarefa: "Criar tela de login",
    responsavel: "Ana",
    status: "Concluída",
    risco: "Baixa complexidade",
    probabilidade: "Baixa",
  },
  {
    tarefa: "Implementar cadastro de produtos",
    responsavel: "Bruno",
    status: "Em Andamento",
    risco: "Possível atraso na integração com DB",
    probabilidade: "Média",
  },
  {
    tarefa: "Integrar sistema de pagamento",
    responsavel: "Carlos",
    status: "Pendente",
    risco: "Falha na API de pagamento",
    probabilidade: "Alta",
  },
  {
    tarefa: "Criar dashboard administrativo",
    responsavel: "Daniel",
    status: "Em Andamento",
    risco: "Baixa performance em gráficos",
    probabilidade: "Média",
  },
  {
    tarefa: "Testes de usabilidade",
    responsavel: "Fernanda",
    status: "Pendente",
    risco: "Feedback negativo dos usuários",
    probabilidade: "Média",
  },
];

// Gráfico resumo backlog
new Chart(document.getElementById("backlogChart"), {
  type: "doughnut",
  data: {
    labels: ["Pendente", "Em Andamento", "Concluída"],
    datasets: [
      {
        data: [
          backlogTarefas.filter((t) => t.status === "Pendente").length,
          backlogTarefas.filter((t) => t.status === "Em Andamento").length,
          backlogTarefas.filter((t) => t.status === "Concluída").length,
        ],
        backgroundColor: ["red", "orange", "green"],
      },
    ],
  },
});

// Preencher tabela backlog
const tbody = document.getElementById("backlog-detalhado");
backlogTarefas.forEach((t) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${t.tarefa}</td>
    <td>${t.responsavel}</td>
    <td>${t.status}</td>
    <td>${t.risco}</td>
    <td>${t.probabilidade}</td>
  `;
  tbody.appendChild(row);
});

// ===================
// Riscos (gráfico + tabela)
// ===================
const riscos = [
  {
    descricao: "Falha na integração com API de pagamento",
    responsavel: "Carlos",
    probabilidade: "Alta",
    impacto: "Crítico",
    status: "Pendente",
    mitigacao: "Testar integração desde o início e ter gateway alternativo",
  },
  {
    descricao: "Atraso na entrega de funcionalidades",
    responsavel: "Ana",
    probabilidade: "Média",
    impacto: "Alto",
    status: "Em Monitoramento",
    mitigacao: "Definir sprints curtos e checkpoints semanais",
  },
  {
    descricao: "Problemas de performance no dashboard",
    responsavel: "Daniel",
    probabilidade: "Média",
    impacto: "Médio",
    status: "Em Andamento",
    mitigacao: "Realizar testes de carga e otimizar consultas",
  },
  {
    descricao: "Equipe indisponível em período crítico",
    responsavel: "Fernanda",
    probabilidade: "Baixa",
    impacto: "Alto",
    status: "Mitigado",
    mitigacao: "Ter backup de colaboradores para suporte",
  },
];

// Gráfico resumo riscos
new Chart(document.getElementById("riscosChart"), {
  type: "pie",
  data: {
    labels: ["Baixo", "Médio", "Alto"],
    datasets: [
      {
        data: [
          riscos.filter((r) => r.probabilidade === "Baixa").length,
          riscos.filter((r) => r.probabilidade === "Média").length,
          riscos.filter((r) => r.probabilidade === "Alta").length,
        ],
        backgroundColor: ["green", "yellow", "red"],
      },
    ],
  },
});

// Preencher tabela riscos
const riscosBody = document.getElementById("riscos-detalhados");
riscos.forEach((r) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${r.descricao}</td>
    <td>${r.responsavel}</td>
    <td>${r.probabilidade}</td>
    <td>${r.impacto}</td>
    <td>${r.status}</td>
    <td>${r.mitigacao}</td>
  `;
  riscosBody.appendChild(row);
});

// ===================
// KPIs (tempo real)
// ===================
const kpisCtx = document.getElementById("kpisChart");
const kpisChart = new Chart(kpisCtx, {
  type: "line",
  data: {
    labels: ["Sprint 1"],
    datasets: [
      {
        label: "Velocity",
        data: [5],
        borderColor: "blue",
        fill: false,
      },
      {
        label: "CPI",
        data: [1.0],
        borderColor: "orange",
        fill: false,
      },
      {
        label: "SPI",
        data: [1.0],
        borderColor: "green",
        fill: false,
      },
    ],
  },
});

let sprint = 2;
setInterval(() => {
  kpisChart.data.labels.push("Sprint " + sprint);
  kpisChart.data.datasets[0].data.push(Math.floor(Math.random() * 10) + 5); // Velocity
  kpisChart.data.datasets[1].data.push((Math.random() * 0.4 + 0.8).toFixed(2)); // CPI
  kpisChart.data.datasets[2].data.push((Math.random() * 0.2 + 0.9).toFixed(2)); // SPI
  sprint++;
  kpisChart.update();
}, 2000);

// ===================
// Monitoramento (tempo real)
// ===================
const monitoramentoChart = new Chart(
  document.getElementById("monitoramentoChart"),
  {
    type: "line",
    data: {
      labels: ["t0"],
      datasets: [
        {
          label: "Estoque Total",
          data: [100],
          borderColor: "purple",
          fill: false,
        },
        {
          label: "Vendas do Dia",
          data: [0],
          borderColor: "red",
          fill: false,
        },
        {
          label: "Clientes Ativos",
          data: [2],
          borderColor: "green",
          fill: false,
        },
      ],
    },
  }
);

let t = 1;
setInterval(() => {
  monitoramentoChart.data.labels.push("t" + t);
  monitoramentoChart.data.datasets[0].data.push(
    100 - Math.floor(Math.random() * t)
  ); // estoque
  monitoramentoChart.data.datasets[1].data.push(Math.floor(Math.random() * 10)); // vendas
  monitoramentoChart.data.datasets[2].data.push(
    Math.floor(Math.random() * 20) + 1
  ); // clientes
  t++;
  monitoramentoChart.update();
}, 3000);
