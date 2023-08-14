import { CaixaDaLanchonete, Variados, Sabores } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 2,85', ['cafe,1']],
        ['credito', 'R$ 3,09', ['cafe,1']],
        ['debito', 'R$ 3,00', ['cafe,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Item inválido!', ['1']],
        ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
        ['chantily com sanduiche', 'credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
        ['queijo com café', 'debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));
    
    /*
    test.each([
        ['dinheiro', 'R$ 15,70', ['cafe,1', 'sanduiche,1', 'suco,1']],
        ['credito', 'R$ 9,27', ['cafe,1', 'sanduiche,1', 'suco,1']],
        ['debito', 'R$ 9,00', ['cafe,1', 'sanduiche,1', 'suco,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);
        
    test.each([
        ['dinheiro', 'R$ 11,40', ['cafe,2', 'sanduiche,2']],
        ['credito', 'R$ 12,36', ['cafe,2', 'sanduiche,2']],
        ['debito', 'R$ 12,00', ['cafe,2', 'sanduiche,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);
        
     test.each([
        ['dinheiro', 'R$ 17,10', ['cafe,2', 'sanduiche,2', 'suco,2']],
        ['credito', 'R$ 18,54', ['cafe,2', 'sanduiche,2', 'suco,2']],
         ['debito', 'R$ 18,00', ['cafe,2', 'sanduiche,2', 'suco,2']],
    ])('compra de múltiplas quantidades de múltiplos itens em %p deve resultar em %p',
        validaTeste);
    */

    test('Essa forma de pagamento não está disponível', () => {
        const caixa = new CaixaDaLanchonete();
        const resultado = caixa.calcularValorDaCompra('Ouro', ['cafe,1']);
        expect(resultado).toEqual('Forma de pagamento inválida!');
        });
});

describe('Sabores', () => {
    test.each([
      ['cafe', 'doce'],
      ['chantily', 'doce'],
      ['suco', 'doce'],
      ['sanduiche', 'salgado'],
      ['queijo', 'salgado'],
      ['salgado', 'salgado'],
      ['item desconhecido', 'desconhecido']
    ])('verificarSabor deve retornar %p para o item %p', (item, saborEsperado) => {
      const verificador = new Sabores();
      const sabor = verificador.verificadorDeSabor(item);
      expect(sabor).toEqual(saborEsperado);
    });
  });

describe('Variados', () => {
    test.each([
      ['combo1', true],
      ['combo2', true],
      ['cafe', false],
      ['sanduiche', false],
      ['item desconhecido', false]
    ])('contemDoce deve retornar %p para o item %p', (item, resultadoEsperado) => {
      const verificador = new Variados();
      const resultado = verificador.contemDoce(item);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });