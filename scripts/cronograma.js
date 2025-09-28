// ===================
// CRONOGRAMA (gráfico + tabela)
// ===================
const cronograma = [
  {
    etapa: "Planejamento",
    responsavel: "Ana",
    inicio: "01/09/2025",
    fim: "14/09/2025",
    duracao: 2,
    status: "Concluído",
  },
  {
    etapa: "Design",
    responsavel: "Bruno",
    inicio: "15/09/2025",
    fim: "28/09/2025",
    duracao: 2,
    status: "Concluído",
  },
  {
    etapa: "Desenvolvimento",
    responsavel: "Daniel",
    inicio: "29/09/2025",
    fim: "23/11/2025",
    duracao: 8,
    status: "Em Andamento",
  },
  {
    etapa: "Testes",
    responsavel: "Fernanda",
    inicio: "24/11/2025",
    fim: "07/12/2025",
    duracao: 2,
    status: "Pendente",
  },
  {
    etapa: "Entrega",
    responsavel: "Carlos",
    inicio: "08/12/2025",
    fim: "21/12/2025",
    duracao: 2,
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
