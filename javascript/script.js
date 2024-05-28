const items = [
    {
        id: 0,
        nome: "Kit Garrafa De Água",
        img: "./img/kit_garrafa.jpeg",
        quantidade: 0,
        preco: 15.99 // Adicione o preço aqui
    },
    {
        id: 1,
        nome: "Boia Inflável",
        img: "./img/boia_inflavel.webp",
        quantidade: 0,
        preco: 29.99 // Adicione o preço aqui
    },
    {
        id: 2,
        nome: "Kit Canetas Coloridas",
        img: "./img/kit_canetas.webp",
        quantidade: 0,
        preco: 9.99 // Adicione o preço aqui
    },
]

inicializarLoja = () => {
    var containerProdutos = document.getElementById("produtos");
    items.map((val) => {
        containerProdutos.innerHTML += `
        <div class="produto-single">
            <img src="`+ val.img + `">
            <p>`+ val.nome + `</p>
            <p style="color: green; font-weight: bold;font-Size: 18px;">R$ ` + val.preco.toFixed(2) + `</p> <!-- Adicionar estilo para o preço -->
            <a key="`+ val.id + `" href="#carrinho">Adicionar ao carrinho</a>
        </div>
        `;
    })
}

inicializarLoja();

atualizarCarrinho = () => {
    var containerCarrinho = document.getElementById("carrinho");
    containerCarrinho.innerHTML = "";
    var totalCompra = 0;
    items.map((val, index) => {
        if (val.quantidade > 0) {
            var valorProduto = val.preco * val.quantidade;
            totalCompra += valorProduto;
            containerCarrinho.innerHTML += `
        <div class="info-single-checkout">
            <img src="` + val.img + `" style="max-width: 200px;">
            <p>Produto: `+ val.nome + `</p>
            <p>Valor: R$ ` + val.preco.toFixed(2) + `</p>
            <p>Quantidade: <button class="diminuir" onclick="diminuirQuantidade(` + index + `)">-</button> ` + val.quantidade + ` <button class="aumentar" onclick="aumentarQuantidade(` + index + `)">+</button></p>
            <button class="remover" onclick="removerProduto(` + index + `)">Remover do carrinho</button> <!-- Adicionar botão de remoção -->
            <button class="comprar" onclick="comprarProduto(` + index + `)">Comprar</button> <!-- Adicionar botão de compra -->
            <p class="val-total">Valor do produto: R$ ` + valorProduto.toFixed(2) + `</p>
            <div style="clear:both;"></div>
        </div>
        `;
        }
    });
    // Exibir valor total da compra
    containerCarrinho.innerHTML += `<p class="totalCarrinho" >Total da Compra: R$ ${totalCompra.toFixed(2)}</p>`;
    // Adicionar botão "Comprar todos os itens do carrinho"
    containerCarrinho.innerHTML += `<button class="comprar-todos" onclick="comprarTodosItens()">Comprar todos os itens do carrinho</button>`;
}

diminuirQuantidade = (index) => {
    if (items[index].quantidade > 0) {
        items[index].quantidade--;
        atualizarCarrinho();
    }
}

aumentarQuantidade = (index) => {
    items[index].quantidade++;
    atualizarCarrinho();
}

removerProduto = (index) => {
    items[index].quantidade = 0;
    atualizarCarrinho();
}

comprarProduto = (index) => {
    // Aqui você pode adicionar a lógica para a compra do produto
    console.log("Produto comprado:", items[index]);
}

comprarTodosItens = () => {
    // Aqui você pode adicionar a lógica para comprar todos os itens do carrinho
    console.log("Todos os itens do carrinho foram comprados!");
}

var links = document.getElementsByTagName("a");

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
        let key = this.getAttribute("key");
        items[key].quantidade++;
        atualizarCarrinho();
        return false;
    })
}

// Adicionar estilos CSS
const style = document.createElement('style');
style.innerHTML = `
    .produto-single button.diminuir,
    .produto-single button.aumentar,
    .info-single-checkout button.remover {
        background-color: red;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 16px;
        margin: 0 5px;
        padding: 10px;
    }
    .info-single-checkout button.comprar,
    .comprar-todos {
        background-color: #5fb382;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 16px;
        margin: 0 5px;
        padding: 10px;
        margin-bottom:20px;
        
    }

    .produto-single button.aumentar {
        background-color: green;
    }

    .info-single-checkout button.remover {
        margin-top: 10px;
    }

    .info-single-checkout button.remover:hover {
        background-color: darkred;
    }
    .val-total{
        font-size:20px;
       text-align:center;
       margin:15px;
    }
    .totalCarrinho{
        font-size:20px;
        margin:15px;
     }
    
`;
document.head.appendChild(style);
