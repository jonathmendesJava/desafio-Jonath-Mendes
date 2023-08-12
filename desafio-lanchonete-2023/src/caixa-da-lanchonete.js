class CaixaDaLanchonete {
  constructor() {
    // Definição do cardápio da lanchonete com codigos, descrições e valores dos itens
    this.cardapio = {
      cafe: { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
      chantily: { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
      suco: { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
      sanduiche: { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
      queijo: { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
      salgado: { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
      combo1: { codigo: 'combo1', descricao: '1 Suco e 1 sanduiche', valor: 9.50 },
      combo2: { codigo: 'combo2', descricao: '1 Café e 1 sanduiche', valor: 7.50 }
    };
  }

  calcularValorDaCompra(metodoDePagamento, itens) {

    // Lista de formas de pagamento válidas
    const formasDePagamentoValidas = ['dinheiro', 'debito', 'credito'];
    
    // Verificação se a forma de pagamento é válida
    if (!formasDePagamentoValidas.includes(metodoDePagamento)) {
      return 'Forma de pagamento inválida!';
    }

    // Verificação se há itens no carrinho de compra
    if (!itens || itens.length === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    let total = 0;
    let hasPrincipal = false;
    let hasExtra = false;
    let descontoComboAplicado = false; // Nova variável

    // Iteração sobre os itens no carrinho de compra
    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(',');//divisor

      // Verificação se o código do item é válido
      if (!this.cardapio[codigo]) {
        return 'Item inválido!';
      }

      // Obtenção do valor do item
      const { valor } = this.cardapio[codigo];

      // Verificação se a quantidade do item é válida
      if (quantidade === '0') {
        return 'Quantidade inválida!';
      }

      // Lista de códigos de itens extras
      const codigosExtras = ['queijo', 'chantily']; 

      // Verificação se o item é um extra
      if (codigosExtras.includes(codigo)) {
        // Verificação se há um item principal no carrinho
        if (!hasPrincipal) {
          return 'Item extra não pode ser pedido sem o principal';
        }
        hasExtra = true; // Indicador de que há itens extras
        console.log('extras: ' + hasExtra)
        total += valor * parseInt(quantidade);
      } else {
        total += valor * parseInt(quantidade);
        const codigosCombo = ['combo1', 'combo2'];

        // Verificação e tratamento de combos
        if (!codigosCombo.includes(codigo) && !hasPrincipal) {
          hasPrincipal = true;
        } else if (codigosCombo.includes(codigo) && quantidade === '1' && !descontoComboAplicado) {
          total -= valor * 0.1;
          descontoComboAplicado = true;
        }
      }
    }
    
    // Verificação final de itens extras sem item principal
    if (hasExtra && !hasPrincipal) {
      return 'Item extra não pode ser pedido sem o principal';
    }

    // Verificação de pelo menos um item principal no carrinho
    if (!hasPrincipal) {
      return 'Carrinho deve conter pelo menos um item principal';
    }
    // Aplicação de descontos/acréscimos com base na forma de pagamento
    if (metodoDePagamento === 'dinheiro') {
      total *= 0.95; // Desconto de 5% para pagamento em dinheiro
    } else if (metodoDePagamento === 'credito') {
      total *= 1.03; // Acréscimo de 3% para pagamento a crédito
    }
    
    console.log(hasExtra, hasPrincipal, metodoDePagamento + 'máximo que deu pra ir :D')
    // Formatação do valor total e retorno da mensagem final
    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  }
}

export { CaixaDaLanchonete };
