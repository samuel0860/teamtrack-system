// produto.js
// Classe que representa um produto.
// Exportamos a classe para ser usada por outros módulos (usamos import/export com module).
export class Produto {
  constructor(id, nome, categoria, quantidade, preco, limite) {
    this.id = id; // identificador único (string ou número)
    this.nome = nome;
    this.categoria = categoria;
    this.quantidade = Number(quantidade);
    this.preco = Number(preco);
    this.limite = Number(limite); // limite para alerta de estoque
  }

  // Retorna true se o estoque estiver abaixo do limite
  estaBaixo() {
    return this.quantidade < this.limite;
  }

  // Atualiza quantidade (pode ser positiva ou negativa)
  atualizarQuantidade(delta) {
    this.quantidade = Number(this.quantidade) + Number(delta);
    if (this.quantidade < 0) this.quantidade = 0;
  }

  // Retorna uma cópia simples do objeto (útil para salvar/serializar)
  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      categoria: this.categoria,
      quantidade: this.quantidade,
      preco: this.preco,
      limite: this.limite,
    };
  }
}
