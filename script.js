document.addEventListener("DOMContentLoaded", function() {
  // Lista de produtos disponíveis
  const produtos = [
    { id: 1, nome: "Cerveja Heineken", preco: 50.00, imagem: "IMAGENS/CervejaHeineken.jpg" },
    { id: 2, nome: "Energético Monster", preco: 30.00, imagem: "IMAGENS/Energético Monster.jpg" },
    { id: 3, nome: "Red Bull", preco: 20.00, imagem: "IMAGENS/RedBull.jpg" },
    { id: 4, nome: "Água com Gás", preco: 40.00, imagem: "IMAGENS/AguaGas.jpg" },
    { id: 5, nome: "Dollynho", preco: 60.00, imagem: "IMAGENS/Dolly.jpg" }
  ];

  // Array que armazena os itens adicionados ao carrinho
  const carrinho = [];
  
  // Seleciona o tbody da tabela onde os itens do carrinho serão exibidos
  const tbody = document.querySelector(".itens-carrinho tbody");
  
  // Seleciona o elemento que mostra o valor total do carrinho
  const totalValorEl = document.getElementById("total-valor");

  // Função que exibe os produtos disponíveis
  function exibirProdutos() {
    const produtosEl = document.querySelector(".produtos");

    produtos.forEach(produto => {
      // Cria uma div para cada produto
      const produtoDiv = document.createElement("div");
      produtoDiv.classList.add("produto");
      produtoDiv.dataset.id = produto.id;

      // Define o conteúdo HTML da div do produto
      produtoDiv.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>Preço: R$${produto.preco.toFixed(2)}</p>
        <button class="adicionar">Adicionar ao Carrinho</button>
      `;

      // Adiciona um evento de clique ao botão de adicionar ao carrinho
      const adicionarBtn = produtoDiv.querySelector(".adicionar");
      adicionarBtn.addEventListener("click", () => adicionarAoCarrinho(produto));

      // Adiciona a div do produto à lista de produtos
      produtosEl.appendChild(produtoDiv);
    });
  }

  // Função que adiciona um produto ao carrinho
  function adicionarAoCarrinho(produto) {
    carrinho.push(produto);
    exibirCarrinho();
  }

  // Função que remove um produto do carrinho
  function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    exibirCarrinho();
  }

  // Função que exibe os itens do carrinho
  function exibirCarrinho() {
    tbody.innerHTML = ""; // Limpa os itens anteriores
    let totalValor = 0;

    carrinho.forEach((item, index) => {
      // Cria uma linha para cada item no carrinho
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.nome}</td>
        <td>R$${item.preco.toFixed(2)}</td>
        <td><button class="remover">Remover</button></td>
      `;

      // Adiciona um evento de clique ao botão de remover
      const removerBtn = row.querySelector(".remover");
      removerBtn.addEventListener("click", () => removerDoCarrinho(index));

      // Adiciona a linha à tabela do carrinho
      tbody.appendChild(row);

      // Atualiza o valor total
      totalValor += item.preco;
    });

    // Atualiza o valor total no HTML
    totalValorEl.textContent = `R$${totalValor.toFixed(2)}`;
  }

  // Função que alterna a visibilidade da janela do carrinho
  function toggleCarrinho() {
    const carrinhoJanela = document.getElementById("CarrinhoJanela");
    carrinhoJanela.classList.toggle("hidden");
  }

  // Seleciona o botão de abrir o carrinho e adiciona um evento de clique
  const botaoCarrinho = document.getElementById("BotaoCarrinho");
  botaoCarrinho.addEventListener("click", toggleCarrinho);

  // Seleciona o botão de fechar o carrinho e adiciona um evento de clique
  const fecharCarrinho = document.getElementById("fecharCarrinho");
  fecharCarrinho.addEventListener("click", toggleCarrinho);

  // Inicializa a exibição dos produtos
  exibirProdutos();
});
