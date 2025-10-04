export class Produto {
  constructor(id, nome, quantidade, estoqueMinimo) {
    if (quantidade < 0) {
      throw new Error("A quantidade não pode ser negativa.");
    }
    if (estoqueMinimo < 0) {
      throw new Error("O estoque mínimo não pode ser negativo.");
    }
    this.id = id;
    this.nome = nome;
    this.quantidade = quantidade;
    this.estoqueMinimo = estoqueMinimo;
  }

  emAlerta() {
    return this.quantidade < this.estoqueMinimo;
  }
}