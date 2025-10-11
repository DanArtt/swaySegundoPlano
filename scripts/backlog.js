document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://127.0.0.1:5000/tarefas";

  let tarefas = [];
  let tarefasOriginais = [];
  let ordemPadrao = true;
  let editIndex = null; // índice da tarefa sendo editada
  let deleteIndex = null; // índice da tarefa a ser excluída

  // ======== ELEMENTOS DO MODAL ========
  const modal = document.getElementById("confirmModal");
  const btnCancel = document.getElementById("cancelDelete");
  const btnConfirm = document.getElementById("confirmDelete");

  // ========== Toast Helper ==========
  function showToast(mensagem, tipo = "sucesso") {
    const toast = document.createElement("div");
    toast.className = `toast ${tipo}`;
    toast.innerText = mensagem;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // ========== Carregar tarefas ==========
  async function carregarTarefas() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erro ao carregar tarefas");
      tarefas = await response.json();
      tarefasOriginais = [...tarefas];
      renderizarTarefas();
    } catch (error) {
      console.error("Erro:", error);
      showToast("Erro ao carregar tarefas.", "erro");
    }
  }

  // ========== Salvar tarefas ==========
  async function salvarTarefas() {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarefas),
      });

      if (!response.ok) throw new Error("Erro no servidor");
    } catch (error) {
      console.error("Erro ao salvar tarefas:", error);
      showToast("Erro ao salvar tarefas.", "erro");
    }
  }

  // ========== Renderizar Tarefas ==========
  function renderizarTarefas() {
    const tbody = document.getElementById("backlog-detalhado");
    tbody.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${tarefa.tarefa}</td>
        <td>${tarefa.responsavel}</td>
        <td>${tarefa.status}</td>
        <td>${tarefa.risco}</td>
        <td>${tarefa.probabilidade}</td>
        <td>
          <button class="btn-editar" data-index="${index}">✏️</button>
          <button class="btn-excluir" data-index="${index}">🗑️</button>
        </td>
      `;

      tbody.appendChild(tr);
    });

    atualizarGrafico();
  }

  // ========== Atualizar Gráfico ==========
  function atualizarGrafico() {
    const ctx = document.getElementById("backlogChart").getContext("2d");
    const statusContagem = { Pendente: 0, "Em Andamento": 0, Concluída: 0 };

    tarefas.forEach((t) => statusContagem[t.status]++);

    if (window.graficoBacklog) window.graficoBacklog.destroy();

    window.graficoBacklog = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: Object.keys(statusContagem),
        datasets: [
          {
            data: Object.values(statusContagem),
            backgroundColor: ["#f1c40f", "#3498db", "#2ecc71"],
          },
        ],
      },
    });
  }

  // ========== Adicionar / Editar ==========
  const form = document.getElementById("tarefaForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // impede reload da página

    const tarefaObj = {
      tarefa: document.getElementById("tarefa").value.trim(),
      responsavel: document.getElementById("responsavel").value.trim(),
      status: document.getElementById("status").value,
      risco: document.getElementById("risco").value.trim(),
      probabilidade: document.getElementById("probabilidade").value,
    };

    if (!tarefaObj.tarefa || !tarefaObj.responsavel) {
      showToast("Preencha todos os campos obrigatórios!", "erro");
      return;
    }

    if (editIndex !== null) {
      tarefas[editIndex] = tarefaObj;
      editIndex = null;
      showToast("Tarefa atualizada com sucesso!");
    } else {
      tarefas.push(tarefaObj);
      showToast("Tarefa adicionada com sucesso!");
    }

    tarefasOriginais = [...tarefas];
    renderizarTarefas();
    await salvarTarefas();
    form.reset();
  });

  // ========== Editar Tarefa ==========
  document
    .getElementById("backlog-detalhado")
    .addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-editar")) {
        const index = e.target.dataset.index;
        const t = tarefas[index];

        document.getElementById("tarefa").value = t.tarefa;
        document.getElementById("responsavel").value = t.responsavel;
        document.getElementById("status").value = t.status;
        document.getElementById("risco").value = t.risco;
        document.getElementById("probabilidade").value = t.probabilidade;

        editIndex = index;
        showToast(
          "Modo edição ativado. Altere e clique em 'Adicionar' para salvar.",
          "info"
        );
      }

      if (e.target.classList.contains("btn-excluir")) {
        const index = e.target.dataset.index;
        confirmarExclusao(index);
      }
    });

  // ========== Confirmar Exclusão com Modal ==========
  function confirmarExclusao(index) {
    deleteIndex = index;
    modal.classList.remove("hidden");
  }

  // Cancelar exclusão
  btnCancel.addEventListener("click", () => {
    modal.classList.add("hidden");
    deleteIndex = null;
  });

  // Confirmar exclusão
  btnConfirm.addEventListener("click", async () => {
    if (deleteIndex !== null) {
      tarefas.splice(deleteIndex, 1);
      tarefasOriginais = [...tarefas];
      renderizarTarefas();
      await salvarTarefas();
      showToast("Tarefa excluída com sucesso!");
    }
    modal.classList.add("hidden");
    deleteIndex = null;
  });

  // ========== Organizar Tarefas ==========
  document.getElementById("btnOrganizar").addEventListener("click", () => {
    if (ordemPadrao) {
      tarefas.sort((a, b) => {
        const ordem = { "Em Andamento": 1, Pendente: 2, Concluída: 3 };
        return ordem[a.status] - ordem[b.status];
      });
      showToast("Tarefas organizadas por status!");
    } else {
      tarefas = [...tarefasOriginais];
      showToast("Ordem original restaurada!");
    }

    ordemPadrao = !ordemPadrao;
    renderizarTarefas();
  });

  // ========== Inicializar ==========
  carregarTarefas();
});
