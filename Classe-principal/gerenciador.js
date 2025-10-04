
import { Produto } from "../Classe-produto/produto.js";

export class Gerenciador {
  constructor() {
    this.produtos = [];
    // Métodos de manipulação serão implementados futuramente por outra pessoa
  }

  adicionarProduto(nome, quantidade, estoqueMinimo) {
    const id = this.produtos.length + 1; // Gerando id 
    const produto = new Produto(id, nome, quantidade, estoqueMinimo);
    this.produtos.push(produto);
    return produto;
  }

  listarProdutos() {
    return this.produtos;
  }

  atualizarProdutoPorId(id, novosDados){
    const produto = this.produtos.find((p) => p.id === id);
    if (!produto) {
      throw new Error(`Produto com id ${id} não encontrado`);
    }

    if(novosDados.nome !== undefined) produto.nome  = novosDados.nome;
    if(novosDados.quantidade !== undefined) produto.quantidade = novosDados.quantidade;
    if(novosDados.estoqueMinimo !== undefined) produto.estoqueMinimo = novosDados.estoqueMinimo;

    return produto;
  }

  deletarProdutoPorId(id){
    const index = this.produtos.findIndex(p => p.id === id);
    if(index === -1){
      throw new Error (`Produtos com id ${id} não encontrado`);
    }
    const [removido] = this.produtos.splice(index, 1);
    return removido;
  }
}
 // Para testar via terminal:
 // const gerenciador = new Gerenciador();

