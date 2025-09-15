let biblioteca = [];

// Função para adicionar livros
function adicionarLivro(titulo, autor, anoLancamento) {
  const livro = { titulo, autor, anoLancamento };
  biblioteca.push(livro);
}

// Adicionando livros
adicionarLivro("O Hobbit", "J.R.R Tolkien", 1937);
adicionarLivro("O Senhor dos Anéis", "J.R.R Tolkien", 1954);
adicionarLivro("O Silmarillion", "J.R.R Tolkien", 1977);

// Função para encontrar livros por autor
function encontrarLivro(autorDesejado) {
  const livrosEncontrados = biblioteca.filter(
    (livro) => livro.autor.toLowerCase() === autorDesejado.toLowerCase()
  );
  return livrosEncontrados;
}

// Função para deletar livro pelo título
function deletarLivro(titulo) {
  const indice = biblioteca.findIndex(
    (livro) => livro.titulo.toLowerCase() === titulo.toLowerCase()
  );
  if (indice === -1) {
    console.log(`Livro "${titulo}" não encontrado.`);
  } else {
    biblioteca.splice(indice, 1);
    console.log(`Livro "${titulo}" removido com sucesso!`);
  }
}

// Função para contar livros de determinado autor
function contarLivrosPorAutor(autorDesejado) {
  const quantidade = biblioteca.filter(
    (livro) => livro.autor.toLowerCase() === autorDesejado.toLowerCase()
  ).length;
  console.log(`O autor ${autorDesejado} tem ${quantidade} livro(s) na biblioteca.`);
}
