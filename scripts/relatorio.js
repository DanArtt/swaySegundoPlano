
document.addEventListener("DOMContentLoaded", () => {
  const btnRelatorio = document.getElementById("btnRelatorio");
  const btnLicoes = document.getElementById("btnLicoes");
  const saidaRelatorio = document.getElementById("saidaRelatorio");
  const saidaLicoes = document.getElementById("saidaLicoes");

  const relatorios = [
    `
      <p><strong>Relatório de Status - Sprint 1</strong></p>
      <p><strong>Sumário:</strong> O backlog encontra-se 40% concluído. 
      O frontend foi iniciado e riscos estão sob controle.</p>
      <p><strong>Próximos Passos:</strong> Implementar carrinho de compras e testes automatizados.</p>
    `,
    `
      <p><strong>Relatório de Status - Sprint 2</strong></p>
      <p><strong>Sumário:</strong> O time finalizou a integração com o banco de dados. 
      Pequeno atraso em testes de QA (SPI 0.95).</p>
      <p><strong>Próximos Passos:</strong> Concluir API de pagamento e realizar PoC de performance.</p>
    `,
    `
      <p><strong>Relatório de Status - Sprint 3</strong></p>
      <p><strong>Sumário:</strong> MVP disponível para validação. 
      O custo permanece dentro do esperado (CPI 1.0).</p>
      <p><strong>Próximos Passos:</strong> Melhorar UX e iniciar fase de homologação.</p>
    `,
    `
      <p><strong>Relatório de Status - Sprint 4</strong></p>
      <p><strong>Sumário:</strong> A fase de homologação iniciou com sucesso. 
      Foram identificados bugs de baixa prioridade.</p>
      <p><strong>Próximos Passos:</strong> Corrigir bugs e preparar ambiente de produção.</p>
    `,
    `
      <p><strong>Relatório de Status - Sprint 5</strong></p>
      <p><strong>Sumário:</strong> Entrega final realizada com sucesso. 
      Todos os critérios de aceite foram atendidos.</p>
      <p><strong>Próximos Passos:</strong> Realizar retrospectiva e documentar aprendizados.</p>
    `,
    `
      <p><strong>Relatório de Status - Pós-Projeto</strong></p>
      <p><strong>Sumário:</strong> Projeto encerrado com sucesso. Satisfação do cliente alta. 
      Indicadores de desempenho positivos (CPI 1.1, SPI 1.0).</p>
      <p><strong>Próximos Passos:</strong> Manutenção evolutiva e monitoramento pós-go-live.</p>
    `
  ];

  const licoes = [
    `
      <ul>
        <li>Melhor comunicação entre equipe e cliente.</li>
        <li>Uso de GitHub facilitou a integração de código.</li>
        <li>Reuniões diárias reduziram impedimentos.</li>
      </ul>
    `,
    `
      <ul>
        <li>Aumentar dedicação nos testes de regressão.</li>
        <li>Planejamento mais detalhado da Sprint.</li>
        <li>Definição clara de papéis ajudou na produtividade.</li>
      </ul>
    `,
    `
      <ul>
        <li>Importância do protótipo antes da codificação.</li>
        <li>Feedback rápido do cliente evitou retrabalho.</li>
        <li>Documentação facilitou a integração de novos membros.</li>
      </ul>
    `,
    `
      <ul>
        <li>Adoção de kanban ajudou no fluxo de tarefas.</li>
        <li>Automação de deploy economizou tempo de release.</li>
        <li>Pair programming aumentou a qualidade do código.</li>
      </ul>
    `,
    `
      <ul>
        <li>Feedback contínuo evitou desalinhamentos com o cliente.</li>
        <li>Treinamento técnico no início reduziu curva de aprendizado.</li>
        <li>Separação clara entre dev e QA evitou gargalos.</li>
      </ul>
    `,
    `
      <ul>
        <li>Testes unitários desde o início aceleraram o QA.</li>
        <li>Daily meetings objetivas melhoraram produtividade.</li>
        <li>Retrospectivas mais frequentes trouxeram melhorias constantes.</li>
      </ul>
    `
  ];

  function gerarComDelay(elemento, lista) {
    elemento.innerHTML = "<p class='loading'>Gerando relatório... aguarde...</p>";
    setTimeout(() => {
      const item = lista[Math.floor(Math.random() * lista.length)];
      elemento.innerHTML = item;
    }, 2000);
  }

  btnRelatorio.addEventListener("click", () => {
    gerarComDelay(saidaRelatorio, relatorios);
  });

  btnLicoes.addEventListener("click", () => {
    gerarComDelay(saidaLicoes, licoes);
  });
});