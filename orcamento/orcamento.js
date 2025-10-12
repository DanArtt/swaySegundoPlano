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
const orcamentoTotal = 60000;

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

// ======================
// GRÁFICO DE PROJEÇÃO DE GASTOS FUTUROS
// ======================

function gerarProjecaoGastos() {
  const gastoAtual = calcularGastos();
  const mediaDiaria = gastoAtual / (diasPassados || 1);
  const diasRestantes = Math.max(0, (orcamentoTotal - gastoAtual) / mediaDiaria);
  const dataEstouro = new Date(hoje);
  dataEstouro.setDate(hoje.getDate() + diasRestantes);

  // Dados para o gráfico
  const dias = [];
  const gastos = [];
  const projecao = [];
  const totalDias = diasPassados + diasRestantes;

  for (let i = 0; i <= totalDias; i++) {
    dias.push(i);
    if (i <= diasPassados) {
      gastos.push(mediaDiaria * i);
      projecao.push(null);
    } else {
      gastos.push(null);
      projecao.push(mediaDiaria * i);
    }
  }

  const ctx = document.getElementById("graficoProjecao").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: dias.map(d => `Dia ${d}`),
      datasets: [
        {
          label: "Gasto Real (R$)",
          data: gastos,
          borderColor: "#38bdf8",
          tension: 0.3,
          fill: false,
        },
        {
          label: "Projeção Futura (R$)",
          data: projecao,
          borderColor: "#facc15",
          borderDash: [5, 5],
          tension: 0.3,
          fill: false,
        },
        {
          label: "Orçamento Total",
          data: Array(dias.length).fill(orcamentoTotal),
          borderColor: "#ef4444",
          borderWidth: 1,
          borderDash: [3, 3],
          pointRadius: 0,
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: "#94a3b8" },
          grid: { color: "#1e293b" }
        },
        x: {
          ticks: { color: "#94a3b8" },
          grid: { color: "#1e293b" }
        }
      },
      plugins: {
        legend: {
          labels: { color: "#f1f5f9" }
        }
      }
    }
  });

  // Atualiza texto resumo
  const texto = document.getElementById("textoProjecao");
  texto.innerHTML = `
    No ritmo atual de gastos (<strong>R$ ${mediaDiaria.toFixed(2)}/dia</strong>),
    o orçamento será atingido em aproximadamente <strong>${Math.ceil(diasRestantes)} dias</strong> 
    (<strong>${dataEstouro.toLocaleDateString("pt-BR")}</strong>).
  `;
}

gerarProjecaoGastos();

// ======================
// GRÁFICO DE GASTOS DIÁRIOS E SEMANAIS
// ======================

function gerarHistoricoGastos() {
  const ctx = document.getElementById("grafico-historico").getContext("2d");

  // Cria arrays de dias desde o início do projeto
  const dias = Array.from({ length: diasPassados }, (_, i) => i + 1);

  // Calcula o gasto diário e semanal (simulação simples)
  const gastoDiario = dias.map(() => {
    let total = 0;
    custos.forEach((item) => total += item.valorDiario);
    return total;
  });

  // Agrupa por semana (7 dias)
  const gastoSemanal = [];
  for (let i = 0; i < dias.length; i += 7) {
    const soma = gastoDiario.slice(i, i + 7).reduce((a, b) => a + b, 0);
    gastoSemanal.push(soma);
  }

  // Cria o gráfico
  new Chart(ctx, {
    type: "line",
    data: {
      labels: dias.map(d => `Dia ${d}`),
      datasets: [
        {
          label: "Gasto Diário (R$)",
          data: gastoDiario,
          borderColor: "#38bdf8",
          backgroundColor: "rgba(56, 189, 248, 0.1)",
          borderWidth: 2,
          fill: false,
          tension: 0.3,
        },
        {
          label: "Gasto Semanal (R$)",
          data: dias.map((_, i) => {
            const semanaIndex = Math.floor(i / 7);
            return gastoSemanal[semanaIndex];
          }),
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          borderWidth: 2,
          fill: false,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, labels: { color: "#f1f5f9" } },
        tooltip: {
          callbacks: {
            label: (context) => `R$ ${context.parsed.y.toLocaleString("pt-BR")}`,
          },
        },
      },
      scales: {
        x: {
          ticks: { color: "#94a3b8" },
          grid: { color: "#1e293b" },
        },
        y: {
          ticks: {
            color: "#94a3b8",
            callback: (value) => `R$ ${value.toLocaleString("pt-BR")}`,
          },
          grid: { color: "#1e293b" },
        },
      },
    },
  });

  // ======================
  // Adiciona texto abaixo do gráfico (fora do canvas)
  // ======================
  const totalGasto = gastoDiario.reduce((a, b) => a + b, 0);
  const mediaDiaria = (totalGasto / dias.length).toFixed(2);
  const mediaSemanal = gastoSemanal.reduce((a, b) => a + b, 0) / gastoSemanal.length;

  const texto = document.getElementById("textoHistorico");
  texto.innerHTML = `
    Até o momento, o total gasto foi de <strong>R$ ${totalGasto.toLocaleString("pt-BR")}</strong>, 
    com uma média diária de <strong>R$ ${Number(mediaDiaria).toLocaleString("pt-BR")}</strong> 
    e uma média semanal de <strong>R$ ${Number(mediaSemanal.toFixed(2)).toLocaleString("pt-BR")}</strong>.
  `;
}

gerarHistoricoGastos();
