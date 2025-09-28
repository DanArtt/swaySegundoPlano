// ===================
// RISCOS (gráfico + tabela)
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
