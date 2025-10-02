export class Produto {
  constructor(id, nome, quantidade, estoqueMinimo) {
    this.id = id;
    this.nome = nome;
    this.quantidade = quantidade;
    this.estoqueMinimo = estoqueMinimo;
  }

  emAlerta() {
    return this.quantidade < this.estoqueMinimo;
  }
}