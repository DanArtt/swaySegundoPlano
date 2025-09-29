// ===================
// BACKLOG (gráfico + tabela)
// ===================
const backlogTarefas = [
  {
    tarefa: "Criar tela de login",
    responsavel: "Daniel",
    status: "Concluída",
    risco: "Baixa complexidade",
    probabilidade: "Baixa",
  },
  {
    tarefa: "Implementar cadastro de produtos",
    responsavel: "Gabriel",
    status: "Em Andamento",
    risco: "Possível atraso na integração com DB",
    probabilidade: "Média",
  },
  {
    tarefa: "Integrar sistema de pagamento",
    responsavel: "Matheus",
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
    responsavel: "Gabriel",
    status: "Pendente",
    risco: "Feedback negativo dos usuários",
    probabilidade: "Média",
  },
];

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

const backlogBody = document.getElementById("backlog-detalhado");
backlogTarefas.forEach((t) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${t.tarefa}</td>
    <td>${t.responsavel}</td>
    <td>${t.status}</td>
    <td>${t.risco}</td>
    <td>${t.probabilidade}</td>
  `;
  backlogBody.appendChild(row);
});
