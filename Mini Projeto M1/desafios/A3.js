// Banco de dados Mocado
let biblioteca = [];

// OBJETO LITERAL
const livro1 = {
  titulo: "O Hobbit",
  autor: "J.R.R Tolkien",
  anoLancamento: 1937,
};

// Função para adicionar livros
function adicionarLivro(titulo, autor, anoLancamento) {
  const livro = {
    titulo: titulo,
    autor: autor,
    anoLancamento: anoLancamento,
  };
  biblioteca.push(livro);
}

// Adicionando livros
adicionarLivro("O Hobbit", "J.R.R Tolkien", 1937);
adicionarLivro("O Senhor dos Anéis", "J.R.R Tolkien", 1954);
adicionarLivro("O Silmarillion", "J.R.R Tolkien", 1977);

// Função para encontrar livros por autor
function encontrarLivro(autorDesejado) {
  const livrosEncontrados = biblioteca.filter(
    (livro) => livro.autor === autorDesejado
  );
  return livrosEncontrados;
}

// ✅ Passo 6: Função para deletar livro pelo nome
function deletarLivro(titulo) {
  const indice = biblioteca.findIndex(
    (livro) => livro.titulo === titulo
  );
  if (indice === -1) {
    console.log(`Livro "${titulo}" não encontrado.`);
  } else {
    biblioteca.splice(indice, 1);
    console.log(`Livro "${titulo}" removido com sucesso!`);
  }
}

// ✅ Passo 7: Função para contar livros de determinado autor
function contarLivrosPorAutor(autorDesejado) {
  const quantidade = biblioteca.filter(
    (livro) => livro.autor === autorDesejado
  ).length;
  console.log(`O autor ${autorDesejado} tem ${quantidade} livro(s) na biblioteca.`);
}
