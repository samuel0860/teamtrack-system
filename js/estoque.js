// estoque.js
// Classe Estoque: gerencia um array de produtos e fornece operações CRUD e consultas.
// Usa métodos de array (map, filter, find, reduce) conforme exigido pelo projeto.

import { Produto } from "./produto.js";

export class Estoque {
  constructor(lista = []) {
    // lista é um array de objetos simples ou instâncias de Produto
    this.produtos = lista.map((p) => {
      // caso já seja Produto, mantemos; caso seja objeto simples, criamos instância
      if (p instanceof Produto) return p;
      return new Produto(
        p.id,
        p.nome,
        p.categoria,
        p.quantidade,
        p.preco,
        p.limite
      );
    });
  }

  // Gera um id simples (timestamp + aleatório)
  gerarId() {
    return String(Date.now()) + Math.floor(Math.random() * 1000);
  }

  // Cadastrar novo produto
  cadastrarProduto({
    nome,
    categoria = "",
    quantidade = 0,
    preco = 0,
    limite = 5,
  }) {
    // validações simples
    if (!nome || typeof nome !== "string" || nome.trim().length === 0) {
      throw new Error("Nome inválido");
    }
    if (isNaN(quantidade) || quantidade < 0) quantidade = 0;
    if (isNaN(preco) || preco < 0) preco = 0;
    if (isNaN(limite) || limite < 0) limite = 5;

    const novo = new Produto(
      this.gerarId(),
      nome.trim(),
      categoria.trim(),
      quantidade,
      preco,
      limite
    );
    this.produtos.push(novo);
    return novo;
  }

  // Listar todos os produtos
  listar() {
    return this.produtos.slice(); // retorna cópia superficial
  }

  // Buscar por id
  buscarPorId(id) {
    return this.produtos.find((p) => p.id === id) || null;
  }

  // Buscar por nome (busca parcial, case-insensitive)
  buscarPorNome(texto) {
    const q = (texto || "").toLowerCase().trim();
    return this.produtos.filter(
      (p) =>
        p.nome.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q)
    );
  }

  // Atualizar produto (por id) - campos passados em objeto
  atualizar(id, campos = {}) {
    const idx = this.produtos.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    const prod = this.produtos[idx];

    // atualiza apenas campos permitidos
    if (campos.nome !== undefined) prod.nome = String(campos.nome);
    if (campos.categoria !== undefined)
      prod.categoria = String(campos.categoria);
    if (campos.quantidade !== undefined)
      prod.quantidade = Number(campos.quantidade);
    if (campos.preco !== undefined) prod.preco = Number(campos.preco);
    if (campos.limite !== undefined) prod.limite = Number(campos.limite);

    return prod;
  }

  // Remover produto por id
  remover(id) {
    const idx = this.produtos.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    this.produtos.splice(idx, 1);
    return true;
  }

  // Retorna os produtos com estoque baixo
  produtosComEstoqueBaixo() {
    return this.produtos.filter((p) => p.estaBaixo());
  }

  // Calcula média de preço dos produtos (exemplo de reduce)
  mediaPreco() {
    if (this.produtos.length === 0) return 0;
    const soma = this.produtos.reduce(
      (acc, p) => acc + Number(p.preco || 0),
      0
    );
    return soma / this.produtos.length;
  }

  // Serializa a lista para salvar
  toJSON() {
    return this.produtos.map((p) => p.toJSON());
  }
}
