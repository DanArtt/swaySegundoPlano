// ======================
// MONITORAMENTO DE SPRINTS
// ======================

const API_URL = "http://localhost:5003/api/sprints";

// ---------- instâncias globais de gráficos ----------
let kpisChartInstance = null;
let fasesChartInstance = null;

// ---------- utilitário ----------
function formatDateISO(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR");
}

// ---------- carregamento ----------
async function carregarSprints() {
  try {
    const response = await fetch(API_URL);
    const sprints = await response.json();
    if (!Array.isArray(sprints)) throw new Error("Formato inválido");

    atualizarTabela(sprints);
    atualizarKPIs(sprints);
    atualizarGraficoKPIs(sprints);
    atualizarGraficoFases(sprints);
  } catch (error) {
    console.error("Erro ao carregar sprints:", error);
  }
}

// ---------- tabela ----------
function atualizarTabela(sprints) {
  const tbody = document.querySelector("#tabelaSprints tbody");
  tbody.innerHTML = "";
  sprints.forEach((sprint) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sprint.nome}</td>
      <td>${sprint.descricao || "-"}</td>
      <td>${formatDateISO(sprint.dataInicio)}</td>
      <td>${formatDateISO(sprint.dataFim)}</td>
      <td>${sprint.velocity?.toFixed(2) ?? "-"}</td>
      <td>${sprint.cpi?.toFixed(2) ?? "-"}</td>
      <td>${sprint.spi?.toFixed(2) ?? "-"}</td>
      <td>${sprint.status}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ---------- KPIs ----------
function atualizarKPIs(sprints) {
  const concluidas = sprints.filter((s) => s.status === "✅ Concluída");
  const emAndamento = sprints.filter((s) => s.status === "⚙️ Em andamento");

  const velocity =
    concluidas.length > 0
      ? concluidas.reduce((acc, s) => acc + (s.velocity || 0), 0) /
      concluidas.length
      : 0;

  const cpi =
    concluidas.length > 0
      ? concluidas.reduce((acc, s) => acc + (s.cpi || 0), 0) / concluidas.length
      : 0;

  const spi =
    concluidas.length + emAndamento.length > 0
      ? [...concluidas, ...emAndamento].reduce(
        (acc, s) => acc + (s.spi || 0),
        0
      ) /
      (concluidas.length + emAndamento.length)
      : 0;

  document.getElementById("velocity").textContent = velocity.toFixed(2);
  document.getElementById("cpi").textContent = cpi.toFixed(2);
  document.getElementById("spi").textContent = spi.toFixed(2);
}

// ---------- gráfico de KPIs ----------
function atualizarGraficoKPIs(sprints) {
  const ctx = document.getElementById("kpisChart").getContext("2d");
  const concluidas = sprints.filter((s) => s.status === "✅ Concluída");

  const labels = concluidas.map((s) => s.nome);
  const velocityData = concluidas.map((s) => s.velocity);
  const cpiData = concluidas.map((s) => s.cpi);
  const spiData = concluidas.map((s) => s.spi);

  // destrói instância anterior (se existir)
  if (kpisChartInstance) {
    kpisChartInstance.destroy();
    kpisChartInstance = null;
  }

  kpisChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Velocity", data: velocityData, backgroundColor: "#8b5cf681" },
        { label: "CPI", data: cpiData, backgroundColor: "#3b82f681" },
        { label: "SPI", data: spiData, backgroundColor: "#10b98181" },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: { color: "#ffffff" },   // ✅ textos brancos no eixo X
          grid: { color: "rgba(255,255,255,0.2)" } // ✅ linhas brancas suaves
        },
        y: {
          beginAtZero: true,
          ticks: { color: "#ffffff" },   // ✅ textos brancos no eixo Y
          grid: { color: "rgba(255,255,255,0.2)" } // ✅ linhas brancas suaves
        }
      },
      plugins: {
        legend: { labels: { color: "#ffffff" } }, // ✅ legenda branca
        tooltip: { mode: "nearest", intersect: false },

      }
    }

  });
}

// ---------- gráfico de distribuição por fase ----------
function atualizarGraficoFases(sprints) {
  const ctx = document.getElementById("fasesChart").getContext("2d");

  // Considera apenas concluídas e em andamento
  const sprintsValidas = sprints.filter(
    (s) => s.status === "✅ Concluída" || s.status === "⚙️ Em andamento"
  );

  const tempoPorFase = {};

  sprintsValidas.forEach((s) => {
    const fase = s.categoria || "Outros";
    const inicio = new Date(s.dataInicio);
    const fim = new Date(s.dataFim);
    const dias = (fim - inicio) / (1000 * 60 * 60 * 24) + 1;
    tempoPorFase[fase] = (tempoPorFase[fase] || 0) + dias;
  });

  const labels = Object.keys(tempoPorFase);
  const data = Object.values(tempoPorFase);

  // destrói instância anterior (se existir)
  if (fasesChartInstance) {
    fasesChartInstance.destroy();
    fasesChartInstance = null;
  }

  fasesChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Tempo total por fase (dias)",
          data,
          backgroundColor: [
            "#facc1581", // Documentação
            "#3b82f681", // Planejamento
            "#8b5cf681", // Design
            "#10b98181", // Desenvolvimento
            "#f9731681", // Testes
            "#ef444481", // Entrega
          ],
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#ffffff" } 
        },
        tooltip: { mode: "nearest", intersect: false },

      },
      scales: {
        x: {
          ticks: { color: "#ffffff" },              
          grid: { color: "rgba(255,255,255,0.2)" }  
        },
        y: {
          ticks: { color: "#ffffff" },              
          grid: { color: "rgba(255,255,255,0.2)" }  
        }
      }
    }

  });
}

// ---------- inicialização ----------
document.addEventListener("DOMContentLoaded", carregarSprints);
