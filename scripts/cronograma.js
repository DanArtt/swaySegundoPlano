// ===================
// CRONOGRAMA (gráfico + tabela)
// ===================
const cronograma = [
  {
    etapa: "Documentação",
    responsavel: "Matheus, Daniel e Gabriel",
    inicio: "01/08/2025",
    fim: "14/08/2025",
    duracao: 2,
    status: "Concluído",
  },
  {
    etapa: "Planejamento",
    responsavel: "Gabriel",
    inicio: "15/08/2025",
    fim: "31/08/2025",
    duracao: 2.5,
    status: "Concluído",
  },
  {
    etapa: "Design",
    responsavel: "Daniel",
    inicio: "01/09/2025",
    fim: "21/09/2025",
    duracao: 3,
    status: "Concluído",
  },
  {
    etapa: "Desenvolvimento",
    responsavel: "Matheus, Daniel e Gabriel",
    inicio: "22/09/2025",
    fim: "17/11/2025",
    duracao: 8,
    status: "Em Andamento",
  },
  {
    etapa: "Testes",
    responsavel: "Matheus",
    inicio: "18/11/2025",
    fim: "30/11/2025",
    duracao: 2,
    status: "Pendente",
  },
  {
    etapa: "Entrega",
    responsavel: "Matheus, Daniel e Gabriel",
    inicio: "01/12/2025",
    fim: "05/12/2025",
    duracao: 1,
    status: "Pendente",
  },
];

// Gráfico cronograma
new Chart(document.getElementById("cronogramaChart"), {
  type: "bar",
  data: {
    labels: cronograma.map((c) => c.etapa),
    datasets: [
      {
        label: "Duração (semanas)",
        data: cronograma.map((c) => c.duracao),
        backgroundColor: ["blue", "cyan", "orange", "purple", "green"],
      },
    ],
  },
});

// Preencher tabela cronograma
const cronogramaBody = document.getElementById("cronograma-detalhado");
cronograma.forEach((c) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${c.etapa}</td>
    <td>${c.responsavel}</td>
    <td>${c.inicio}</td>
    <td>${c.fim}</td>
    <td>${c.duracao}</td>
    <td>${c.status}</td>
  `;
  cronogramaBody.appendChild(row);
});
