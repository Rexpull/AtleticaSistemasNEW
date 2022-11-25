const itensDisponiveis = [
  {
    id: 1,
    name: "TIRANTE",
    image:
      "https://aaasiu.com/storage/produtos/kh5ihm47GINIVuHRgh2Six3ftMiLVAJ7TDBuDLHG.png",
    price: 16.9,
  },
  {
    id: 2,
    name: "BANDANA",
    image:
      "https://aaasiu.com/storage/produtos/uOa9QOTtpQxEWV79lW5dtqHKR3i2NpBJoeuClR8K.png",
    price: 29.9,
  },
  {
    id: 3,
    name: "ÓCULOS",
    image:
      "https://aaasiu.com/storage/produtos/6kjwAbNCJ4nMu2UGqipwp2ubvPGopx4X64YWG99i.png",
    price: 14.9,
  },
  {
    id: 4,
    name: "CANECA",
    image:
      "https://aaasiu.com/storage/produtos/JgbwnNAjwCMOU9DG4JRw4SqnPlL9R8NLHuvWKquz.png",
    price: 26.9,
  },
  {
    id: 5,
    name: "BONÉ",
    image:
      "https://aaasiu.com/storage/produtos/F66PmKJSKN0UsrJUslX7QiLsX1r9jXWVtiGCvLK3.png",
    price: 16.9,
  },
  {
    id: 6,
    name: "SAMBA",
    image:
      "https://aaasiu.com/storage/produtos/QDohDVwG0tqylGwMcPisySJwqbuU5zJlcmhdGtnL.png",
    price: 12.9,
  },
  {
    id: 7,
    name: "CAMISA",
    image:
      "https://aaasiu.com/storage/produtos/JuR7Ky4APt1x3ztw2I1qgYVdXMaHoXjnIe4Zc6BL.png",
    price: 13.9,
  },
  {
    id: 8,
    name: "MOLETOM",
    image:
      "https://aaasiu.com/storage/produtos/01BJAp4gdNNkcfMVh9N4JoyyElFxFQtAgnNjuy1k.png",
    price: 19.9,
  },
];

const codigoProduto = `
<div class="product">
  <div class="row">
      <div class="col-md-3">
          <img class="img-fluid mx-auto d-block image" src="[IMAGE_URL]">
      </div>
      <div class="col-md-8">
          <div class="info">
              <div class="row">
                  <div class="col-md-5 product-name">
                      <div class="product-name">
                          <a href="#">[NAME]</a>
                          <div class="product-info">
                              <p>[DESCRIPTION]</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4 quantity">
                      <label for="quantity">Quantidade:</label>
                      <input id="quantity" type="number" value="[QUANTIDADE]" class="form-control quantity-input">
                  </div>
                  <div class="col-md-3 price">
                      <span>[PRICE]</span>
                  </div>
                  <div onclick="removerDoCarrinho('[ID]')" class="col-md-1 price" style="position: absolute; right: 0; top: 10px; cursor: pointer;">
                      <span>X</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
`;

function adicionarAoCarrinho(id) {
  const carrinhoArmazenado = JSON.parse(localStorage.getItem("carrinho")) || [];
  const indexItem = carrinhoArmazenado.findIndex((item) => item.id === id);

  if (indexItem !== -1) {
    carrinhoArmazenado[indexItem].quantity += 1;
  } else {
    carrinhoArmazenado.push({
      id: id,
      quantity: 1,
    });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinhoArmazenado));
}

function fecharCarrinho() {
  $("#carrinhoModal").modal("hide");
}

function removerDoCarrinho(id) {
  const carrinhoArmazenado = JSON.parse(localStorage.getItem("carrinho")) || [];
  const novoCarrinho = carrinhoArmazenado.filter((item) => item.id !== id);

  localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  atualizarPopup();
}

function atualizarPopup() {
  const carrinhoArmazenado = JSON.parse(localStorage.getItem("carrinho")) || [];
  let subtotal = 0;
  const htmlList = carrinhoArmazenado.map((item) => {
    const subtotalProduto =
      window.produtosDisponiveis[item.id].preco * item.quantity;
    subtotal += subtotalProduto;
    return codigoProduto
      .replace("[IMAGE_URL]", window.produtosDisponiveis[item.id].imagem)
      .replace("[NAME]", window.produtosDisponiveis[item.id].nome)
      .replace("[DESCRIPTION]", window.produtosDisponiveis[item.id].nome)
      .replace("[QUANTIDADE]", item.quantity)
      .replace(
        "[PRICE]",
        subtotalProduto.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })
      )
      .replace("[ID]", item.id);
  });

  document.querySelector(".shopping-cart #subtotal").innerHTML =
    subtotal.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  document.querySelector(".shopping-cart #total").innerHTML =
    subtotal.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  document.querySelector(".shopping-cart .items").innerHTML = htmlList.join("");
}

function comprar() {
  const numeroWhats = document.getElementById("numeroWhatsapp").value;
  enviarCarrinhoAoWhatsapp(numeroWhats);
}

function enviarCarrinhoAoWhatsapp(numeroWhats) {
  const numeroWhatsFormatado = "55" + numeroWhats.replace(/\D/g, "") + "@c.us";
  const carrinhoArmazenado = JSON.parse(localStorage.getItem("carrinho")) || [];

  let total = 0;
  const mensagem = carrinhoArmazenado
    .map((item) => {
      const subtotal = (
        window.produtosDisponiveis[item.id].preco * item.quantity
      ).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
      total += window.produtosDisponiveis[item.id].preco * item.quantity;
      return `*- ${item.quantity}x ${
        window.produtosDisponiveis[item.id].nome
      }, valor ${subtotal}*`;
    })
    .join("\n");

  const mensagemFinal = `Olá! Obrigado por pedir conosco!
Abaixo está o resumo do seu pedido:
${mensagem}
Total: *${total.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  })}*
Dados de Pagamento:
PIX (34) 91234-5678
  `;

  fetch(
    "http://ec2-3-93-23-254.compute-1.amazonaws.com:3001/notificacao?" +
      new URLSearchParams({
        numeroWhatsapp: numeroWhatsFormatado,
        mensagem: mensagemFinal,
      })
  );

  localStorage.setItem("carrinho", null);
  $("#carrinhoModal").modal("hide");
}
