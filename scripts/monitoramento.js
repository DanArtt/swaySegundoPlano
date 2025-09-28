// ===================
// KPIs (tempo real)
// ===================
const kpisCtx = document.getElementById("kpisChart");
const kpisChart = new Chart(kpisCtx, {
  type: "line",
  data: {
    labels: ["Sprint 1"],
    datasets: [
      {
        label: "Velocity",
        data: [5],
        borderColor: "blue",
        fill: false,
      },
      {
        label: "CPI",
        data: [1.0],
        borderColor: "orange",
        fill: false,
      },
      {
        label: "SPI",
        data: [1.0],
        borderColor: "green",
        fill: false,
      },
    ],
  },
});

let sprint = 2;
setInterval(() => {
  kpisChart.data.labels.push("Sprint " + sprint);
  kpisChart.data.datasets[0].data.push(Math.floor(Math.random() * 10) + 5);
  kpisChart.data.datasets[1].data.push((Math.random() * 0.4 + 0.8).toFixed(2));
  kpisChart.data.datasets[2].data.push((Math.random() * 0.2 + 0.9).toFixed(2));
  sprint++;
  kpisChart.update();
}, 2000);

// ===================
// MONITORAMENTO (tempo real)
// ===================
const monitoramentoChart = new Chart(
  document.getElementById("monitoramentoChart"),
  {
    type: "line",
    data: {
      labels: ["t0"],
      datasets: [
        {
          label: "Estoque Total",
          data: [100],
          borderColor: "purple",
          fill: false,
        },
        {
          label: "Vendas do Dia",
          data: [0],
          borderColor: "red",
          fill: false,
        },
        {
          label: "Clientes Ativos",
          data: [2],
          borderColor: "green",
          fill: false,
        },
      ],
    },
  }
);

let t = 1;
setInterval(() => {
  monitoramentoChart.data.labels.push("t" + t);
  monitoramentoChart.data.datasets[0].data.push(
    100 - Math.floor(Math.random() * t)
  );
  monitoramentoChart.data.datasets[1].data.push(Math.floor(Math.random() * 10));
  monitoramentoChart.data.datasets[2].data.push(
    Math.floor(Math.random() * 20) + 1
  );
  t++;
  monitoramentoChart.update();
}, 3000);
