/* ==========================
   Configuração de Datas
   ========================== */
const DATA_INICIO = new Date("2025-08-01T00:00:00");
const DATA_FIM = new Date("2025-12-05T23:59:59");
const HOJE = new Date();

/* --------------------------
   Parâmetros de simulação
   -------------------------- */
// Cada sprint dura 7 dias reais
const DURACAO_SPRINT_MS = 7 * 24 * 60 * 60 * 1000;

// Para simulação do monitoramento (gráfico de "tempo real")
const SIMULACAO_MS = 10000;

/* --------------------------
   Chart.js - KPIs e monitoramento
   -------------------------- */
const kpisCtx = document.getElementById("kpisChart").getContext("2d");
const kpisChart = new Chart(kpisCtx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      { label: "Velocity", data: [], borderColor: "#8b5cf6", fill: false },
      { label: "CPI", data: [], borderColor: "#38bdf8", fill: false },
      { label: "SPI", data: [], borderColor: "#22c55e", fill: false },
    ],
  },
  options: { maintainAspectRatio: false },
});

const monitoramentoChart = new Chart(
  document.getElementById("monitoramentoChart").getContext("2d"),
  {
    type: "line",
    data: {
      labels: ["t0"],
      datasets: [
        {
          label: "Estoque Total",
          data: [100],
          borderColor: "#8b5cf6",
          fill: false,
        },
        {
          label: "Vendas do Dia",
          data: [2],
          borderColor: "#ef4444",
          fill: false,
        },
        {
          label: "Clientes Ativos",
          data: [5],
          borderColor: "#22c55e",
          fill: false,
        },
      ],
    },
    options: { maintainAspectRatio: false },
  }
);

/* ==========================
   Estado local
   ========================== */
let historiaSprints = [];

/* ==========================
   Utilitárias
   ========================== */
function formatDateISO(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR");
}

function statusFromDates(startIso, endIso) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (end < HOJE) return "✅ Concluída";
  if (start <= HOJE && HOJE <= end) return "⚙️ Em andamento";
  return "⏳ Pendente";
}
function average(arr) {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}

/* ==========================
   Geração de sprints (quando não há arquivo no backend)
   ========================== */
function gerarSprintsEntreDatas() {
  const sprints = [];
  let index = 1;
  let inicio = new Date(DATA_INICIO.getTime());

  while (inicio <= DATA_FIM) {
    const fim = new Date(inicio.getTime() + DURACAO_SPRINT_MS - 1);
    if (fim > DATA_FIM) {
      // ajusta o fim da última sprint para DATA_FIM
      fim.setTime(DATA_FIM.getTime());
    }

    // gerar KPIs simulados (valores plausíveis)
    const velocity = parseFloat((12 + Math.random() * 8).toFixed(2)); // 12..20
    const cpi = parseFloat((0.9 + Math.random() * 0.3).toFixed(2)); // 0.9..1.2
    const spi = parseFloat((0.85 + Math.random() * 0.35).toFixed(2)); // 0.85..1.2

    const sprint = {
      nome: `Sprint ${index}`,
      dataInicio: inicio.toISOString(),
      dataFim: fim.toISOString(),
      velocity,
      cpi,
      spi,
      status: statusFromDates(inicio.toISOString(), fim.toISOString()),
    };

    sprints.push(sprint);

    // próxima sprint
    inicio = new Date(inicio.getTime() + DURACAO_SPRINT_MS);
    index++;
  }

  return sprints;
}

/* ==========================
   Integração com backend Flask
   Endpoints esperados:
     GET  /api/sprints  -> retorna array de sprints
     POST /api/sprints  -> recebe array JSON e salva
   ========================== */
async function fetchSprintsFromServer() {
  try {
    const res = await fetch("/api/sprints");
    if (!res.ok) {
      console.warn("GET /api/sprints retornou não ok:", res.status);
      return null;
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    // atualiza status baseado na data atual (por segurança)
    data.forEach((s) => {
      s.status = statusFromDates(s.dataInicio, s.dataFim);
    });
    return data;
  } catch (err) {
    console.error("Erro ao buscar sprints do servidor:", err);
    return null;
  }
}

async function saveSprintsToServer(sprints) {
  try {
    const res = await fetch("/api/sprints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sprints),
    });
    if (!res.ok) {
      console.warn("POST /api/sprints retornou não ok:", res.status);
    } else {
      console.log("Sprints salvas no servidor com sucesso.");
    }
  } catch (err) {
    console.error("Erro ao salvar sprints no servidor:", err);
  }
}

/* ==========================
   Atualização da UI
   ========================== */
function atualizarCardsFromHistory() {
  // usa média das últimas 5 sprints para mostrar KPIs
  const velocities = historiaSprints.map((s) => s.velocity);
  const cpis = historiaSprints.map((s) => s.cpi);
  const spis = historiaSprints.map((s) => s.spi);

  const velAvg = average(velocities.slice(-5));
  const cpiAvg = average(cpis.slice(-5));
  const spiAvg = average(spis.slice(-5));

  document.getElementById("velocity").textContent = velAvg
    ? velAvg.toFixed(2)
    : "0";
  document.getElementById("cpi").textContent = cpiAvg ? cpiAvg.toFixed(2) : "0";
  document.getElementById("spi").textContent = spiAvg ? spiAvg.toFixed(2) : "0";
}

function rebuildKpisChart() {
  kpisChart.data.labels = historiaSprints.map((s) => s.nome);
  kpisChart.data.datasets[0].data = historiaSprints.map((s) => s.velocity);
  kpisChart.data.datasets[1].data = historiaSprints.map((s) => s.cpi);
  kpisChart.data.datasets[2].data = historiaSprints.map((s) => s.spi);
  kpisChart.update();
}

function rebuildSprintsTable() {
  const tbody = document.querySelector("#tabelaSprints tbody");
  tbody.innerHTML = "";
  // mostra as sprints em ordem decrescente (mais recentes em cima)
  const rows = [...historiaSprints].reverse();
  rows.forEach((s) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.nome}</td>
      <td>${formatDateISO(s.dataInicio)}</td>
      <td>${formatDateISO(s.dataFim)}</td>
      <td>${s.velocity.toFixed(2)}</td>
      <td>${s.cpi.toFixed(2)}</td>
      <td>${s.spi.toFixed(2)}</td>
      <td>${s.status}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ==========================
   Simulação do gráfico em tempo real
   ========================== */
function simularEvolucaoRealTime() {
  const labels = monitoramentoChart.data.labels;
  const estoque = monitoramentoChart.data.datasets[0].data;
  const vendas = monitoramentoChart.data.datasets[1].data;
  const clientes = monitoramentoChart.data.datasets[2].data;
  labels.push("t" + labels.length);
  estoque.push(Math.max(0, estoque.at(-1) - Math.random() * 3));
  vendas.push(Math.max(0, vendas.at(-1) + (Math.random() * 4 - 1)));
  clientes.push(Math.max(0, clientes.at(-1) + (Math.random() * 10 - 5)));
  monitoramentoChart.update();
}

/* ==========================
   Inicialização principal
   ========================== */
(async function init() {
  // Tenta carregar do servidor
  let sprintsServer = await fetchSprintsFromServer();

  if (sprintsServer && sprintsServer.length) {
    historiaSprints = sprintsServer;
  } else {
    // gera sprints localmente e salva no servidor
    historiaSprints = gerarSprintsEntreDatas();
    await saveSprintsToServer(historiaSprints);
  }

  // garantir que os status estejam atualizados (caso o arquivo exista mas esteja desatualizado)
  historiaSprints.forEach((s) => {
    s.status = statusFromDates(s.dataInicio, s.dataFim);
  });

  // atualiza UI
  rebuildKpisChart();
  rebuildSprintsTable();
  atualizarCardsFromHistory();

  // Atualiza o gráfico de monitoramento em tempo real
  setInterval(simularEvolucaoRealTime, 3000);

  // Se você quiser regenerar e re-salvar sprints (por exemplo para testes), descomente:
  // const novo = gerarSprintsEntreDatas();
  // await saveSprintsToServer(novo);
})();
