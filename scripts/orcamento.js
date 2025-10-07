// ======================
// ORÇAMENTO DO PROJETO
// ======================

// Data de início do projeto
const dataInicio = new Date("2025-09-01");
const hoje = new Date();
const diasPassados = Math.floor((hoje - dataInicio) / (1000 * 60 * 60 * 24));

// Orçamento total estimado
const orcamentoTotal = 50000;

// Custos simulados
const custos = [
  {
    categoria: "👨‍💻 Funcionário",
    descricao: "Salário - Daniel",
    valorDiario: 180,
  },
  {
    categoria: "👨‍💻 Funcionário",
    descricao: "Salário - Matheus",
    valorDiario: 180,
  },
  {
    categoria: "👨‍💻 Funcionário",
    descricao: "Salário - Gabriel",
    valorDiario: 180,
  },
  {
    categoria: "⚡ Energia",
    descricao: "Consumo elétrico do escritório",
    valorDiario: 40,
  },
  {
    categoria: "🧰 Ferramentas",
    descricao: "Figma, GitHub, VS Code, Hosting",
    valorDiario: 50,
  },
];

// Cálculo total
let gastoTotal = 0;
const corpoTabela = document.getElementById("tabela-custos");

custos.forEach((item) => {
  const gasto = item.valorDiario * diasPassados;
  gastoTotal += gasto;

  const linha = `
    <tr>
      <td>${item.categoria}</td>
      <td>${item.descricao}</td>
      <td>R$ ${item.valorDiario.toLocaleString("pt-BR")}</td>
      <td>R$ ${gasto.toLocaleString("pt-BR")}</td>
    </tr>
  `;
  corpoTabela.innerHTML += linha;
});

// Atualiza totais
const gastoAtual = Math.min(orcamentoTotal, gastoTotal);
const saldoRestante = Math.max(orcamentoTotal - gastoAtual, 0);
const porcentagem = ((gastoAtual / orcamentoTotal) * 100).toFixed(2);

// Mostra nos cards
document.getElementById(
  "orcamento-total"
).textContent = `R$ ${orcamentoTotal.toLocaleString("pt-BR")}`;
document.getElementById(
  "orcamento-gasto"
).textContent = `R$ ${gastoAtual.toLocaleString("pt-BR")}`;
document.getElementById(
  "orcamento-restante"
).textContent = `R$ ${saldoRestante.toLocaleString("pt-BR")}`;

// Barra de progresso
const barra = document.getElementById("orcamento-progresso");
barra.style.width = `${porcentagem}%`;
barra.textContent = `${porcentagem}% usado`;
barra.style.background =
  porcentagem > 80 ? "#ef4444" : porcentagem > 60 ? "#facc15" : "#22c55e";
