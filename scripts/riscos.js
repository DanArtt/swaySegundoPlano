// ===================
// RISCOS (somente tabela)
// ===================
const riscos = [
  {
    descricao: "Falha na integração com API de pagamento",
    responsavel: "Matheus",
    probabilidade: "Alta",
    impacto: "Crítico",
    status: "Pendente",
    mitigacao: "Testar integração desde o início e ter gateway alternativo",
  },
  {
    descricao: "Atraso na entrega de funcionalidades",
    responsavel: "Daniel",
    probabilidade: "Média",
    impacto: "Alto",
    status: "Em Monitoramento",
    mitigacao: "Definir sprints curtos e checkpoints semanais",
  },
  {
    descricao: "Problemas de performance no dashboard",
    responsavel: "Gabriel",
    probabilidade: "Média",
    impacto: "Médio",
    status: "Em Andamento",
    mitigacao: "Realizar testes de carga e otimizar consultas",
  },
  {
    descricao: "Equipe indisponível em período crítico",
    responsavel: "Gestor",
    probabilidade: "Baixa",
    impacto: "Alto",
    status: "Mitigado",
    mitigacao: "Ter backup de colaboradores para suporte",
  },
];

// Montar tabela de riscos
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
