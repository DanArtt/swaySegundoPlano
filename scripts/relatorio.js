document.addEventListener("DOMContentLoaded", () => {
  const btnRelatorio = document.getElementById("btnRelatorio");
  const btnLicoes = document.getElementById("btnLicoes");
  const saidaRelatorio = document.getElementById("saidaRelatorio");
  const saidaLicoes = document.getElementById("saidaLicoes");

  function renderMarkdown(md) {
    return md
      .replace(/^### (.*$)/gim, "<h3>✨ $1</h3>")
      .replace(/^## (.*$)/gim, "<h2>📘 $1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      .replace(/\n\n/gim, "<br>")
      .replace(/\n/gim, "<br>");
  }

  async function gerar(endpoint, saida, tipo) {
    saida.innerHTML = `
      <p>🔄 Gerando ${tipo}, aguarde alguns instantes...</p>
      <div class="loader"></div>
    `;

    const dadosProjeto = {
      nome: "E-commerce Smart",
      status: "Em andamento",
      progresso: "Qualquer porcentagem",
      equipe: ["Daniel Andrade", "Gabriel Leite", "Matheus Campos"],
      metas: [
        "Finalizar integração com o back-end",
        "Publicar versão beta",
        "Testes de performance",
      ],
      concluidos: [
        "Configuração do ambiente de desenvolvimento",
        "Design da interface do usuário",
        "Implementação do carrinho de compras",
      ],
      dificuldades: [
        "Integração com API de pagamentos",
        "Ajustes de responsividade",
      ],
    };

    try {
      const resposta = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosProjeto),
      });

      if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);

      const data = await resposta.json();

      const texto = data.relatorio || data.licoes;
      if (texto) {
        const html = renderMarkdown(texto);
        saida.innerHTML = `
          <h3>📄 ${tipo} Gerado com Sucesso</h3>
          <div class="relatorio-box">${html}</div>
        `;
      } else {
        saida.innerHTML = `<p>❌ Erro: ${
          data.erro || "Erro desconhecido."
        }</p>`;
      }
    } catch (erro) {
      console.error(erro);
      saida.innerHTML = `<p>❌ Falha ao gerar ${tipo}: ${erro.message}</p>`;
    }
  }

  btnRelatorio.addEventListener("click", () =>
    gerar("gerar_relatorio", saidaRelatorio, "Relatório")
  );

  btnLicoes.addEventListener("click", () =>
    gerar("gerar_licoes", saidaLicoes, "Lições Aprendidas")
  );
});
