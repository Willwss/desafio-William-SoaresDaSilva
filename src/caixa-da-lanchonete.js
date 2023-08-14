class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };
        this.formasDePagamento = [ 'dinheiro', 'debito', 'credito' ];
       
        this.descontos = {
            dinheiro: 0.95,
            debito: 1.00,
            credito: 1.03
        };
        
        this.itensExtras = {
            chantily: 'cafe',
            queijo: 'sanduiche'
        };
    }
    
    calcularValorDaCompra( formaDePagamento, itens ) {
        if ( itens.length === 0 ) {
            return "Não há itens no carrinho de compra!";
        }
        
        if ( !this.formasDePagamento.includes ( formaDePagamento )) {
            return "Forma de pagamento inválida!";
        }
        
        let total = 0;
        for ( let item of itens ) {
            let [ codigo, quantidade ] = item.split(',');
            quantidade = parseInt( quantidade );
            
            if ( quantidade === 0 ) {
                return "Quantidade inválida!";
            }
            
            if ( !this.cardapio.hasOwnProperty( codigo )) {
                return "Item inválido!";
            }
            
            if ( this.itensExtras.hasOwnProperty( codigo ) && !itens.some(i => i.startsWith(this.itensExtras[codigo]))) {
                return "Item extra não pode ser pedido sem o principal";
            }
            
            total += this.cardapio[ codigo ] * quantidade;
        }
        
        total *= this.descontos[formaDePagamento];
        
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

class Sabores{
    constructor(){

        this.itensDoces = [ 'cafe', 'chantily', 'suco' ];
        this.itensSalgados = [ 'sanduiche', 'queijo', 'salgado', ];
        
    }

    verificadorDeSabor(item){

        if(this.itensDoces.includes(item)){

            return 'doce';

        } else if (this.itensSalgados.includes(item)){
            
            return 'salgado';

        }else{

            return 'desconhecido';
        }
    }
}

class Variados {
    constructor() {

        this.itensComDoce = ['combo1', 'combo2'];

    }

    contemDoce(item) {

        return this.itensComDoce.includes(item);

    }
}


const caixa1 = new CaixaDaLanchonete();
const resultado1 = caixa1.calcularValorDaCompra( 'debito', [ 'chantily,1' ]);
console.log( resultado1 ); 

const caixa2 = new CaixaDaLanchonete();
const resultado2 = caixa2.calcularValorDaCompra( 'credito', [ 'cafe,1','chantily,1' ]);
console.log( resultado2 );

const caixa3 = new CaixaDaLanchonete();
const resultado3 = caixa3.calcularValorDaCompra( 'credito', [ "combo1, 1", 'cafe,2' ]);
console.log( resultado3 );

export { CaixaDaLanchonete };
export { Sabores };
export { Variados };