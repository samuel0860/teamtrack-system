export class Produto {
  constructor(id, nome, quantidade, estoqueMinimo) {
    if(!id){
      throw new Error("ID do produto é obrigatório");
    }
    if(!nome || typeof nome !== "string" || nome.trim() === ""){
      throw new Error("Nome inválido. Deve ser uma string não vazia");
    }
    if (typeof quantidade  !== "number" || quantidade < 0) {
      throw new Error("Quantidade inválida. A quantidade não pode ser negativa.");
    }
    if (typeof estoqueMinimo !== "number" || estoqueMinimo < 0) {
      throw new Error("Estoque mínimo inválido. O estoque mínimo não pode ser negativo.");
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