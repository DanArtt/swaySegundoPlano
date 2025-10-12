// ======================
// ORÇAMENTO DO PROJETO (versão integrada)
// ======================

// Endereço da API Flask
const API_URL = "http://localhost:5003";

// Datas principais
const dataInicio = new Date("2025-09-01");
const hoje = new Date();
const diasPassados = Math.max(0, Math.floor((hoje - dataInicio) / (1000 * 60 * 60 * 24)));

// Orçamento total estimado
const orcamentoTotal = 50000;

// Custos fixos diários (simulação baseada na equipe e ferramentas)
const custos = [
  { categoria: "👨‍💻 Funcionário", descricao: "Salário - Daniel", valorDiario: 180 },
  { categoria: "👨‍💻 Funcionário", descricao: "Salário - Matheus", valorDiario: 180 },
  { categoria: "👨‍💻 Funcionário", descricao: "Salário - Gabriel", valorDiario: 180 },
  { categoria: "⚡ Energia", descricao: "Consumo elétrico do escritório", valorDiario: 40 },
  { categoria: "🧰 Ferramentas", descricao: "Figma, GitHub, VS Code, Hosting", valorDiario: 50 }
];

// ======================
// Funções auxiliares
// ======================

function calcularGastos() {
  let gastoTotal = 0;
  custos.forEach((item) => {
    gastoTotal += item.valorDiario * diasPassados;
  });

  return Math.min(orcamentoTotal, gastoTotal);
}

function calcularCPI(gastoAtual, progressoFisico) {
  const valorAgregado = progressoFisico * orcamentoTotal;
  if (gastoAtual === 0) return 1;
  return (valorAgregado / gastoAtual).toFixed(2);
}

async function obterProgressoFisico() {
  try {
    const res = await fetch(`${API_URL}/api/sprints`);
    const sprints = await res.json();
    const total = sprints.length;
    const concluidas = sprints.filter(s => s.status === "✅ Concluída").length;
    return concluidas / total;
  } catch (e) {
    console.warn("Erro ao buscar sprints:", e);
    return 0;
  }
}

// ======================
// Renderização da tabela e cards
// ======================

async function atualizarOrcamento() {
  const corpoTabela = document.getElementById("tabela-custos");
  corpoTabela.innerHTML = "";

  // Cálculo de custos
  const gastoAtual = calcularGastos();
  const progressoFisico = await obterProgressoFisico();
  const saldoRestante = Math.max(orcamentoTotal - gastoAtual, 0);
  const porcentagem = ((gastoAtual / orcamentoTotal) * 100).toFixed(2);
  const cpi = calcularCPI(gastoAtual, progressoFisico);

  // Atualiza tabela
  custos.forEach((item) => {
    const gasto = item.valorDiario * diasPassados;
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

  // Atualiza cards de totais
  document.getElementById("orcamento-total").textContent = `R$ ${orcamentoTotal.toLocaleString("pt-BR")}`;
  document.getElementById("orcamento-gasto").textContent = `R$ ${gastoAtual.toLocaleString("pt-BR")}`;
  document.getElementById("orcamento-restante").textContent = `R$ ${saldoRestante.toLocaleString("pt-BR")}`;

  // Barra de progresso
  const barra = document.getElementById("orcamento-progresso");
  barra.style.width = `${porcentagem}%`;
  barra.textContent = `${porcentagem}% usado`;
  barra.style.background = porcentagem > 80 ? "#ef4444" : porcentagem > 60 ? "#facc15" : "#22c55e";

  // Mostra CPI no console (ou pode exibir em card se quiser)
  console.log(`CPI Atual: ${cpi}`);
}

atualizarOrcamento();
