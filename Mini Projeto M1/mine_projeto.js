const estudantes = [
  {
    nome: "João Victor Homero",
    idade: 15,
    notas: [10, 8, 9.5],
  },
];

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function mostrarMenu() {
  console.log("\n=== MENU ===");
  console.log("1 - Cadastrar estudante");
  console.log("2 - Listar estudantes");
  console.log("3 - Buscar estudante");
  console.log("4 - Calcular médias");
  console.log("5 - Relatórios");
  console.log("0 - Sair");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1":
        cadastrarEstudante();
        break;
      case "2":
        listarEstudantes();
        break;
      case "3":
        buscarEstudante();
        break;
      case "4":
        calcularMedias();
        break;
      case "5":
        relatorios();
        break;
      case "0":
        console.log("Saindo do programa...");
        rl.close();
        return;
      default:
        console.log("Opção inválida, tente novamente!");
        mostrarMenu();
    }
  });
}

// Função para cadastrar estudante
function cadastrarEstudante() {
  rl.question("Nome do estudante: ", (nome) => {
    rl.question("Idade do estudante: ", (idade) => {
      rl.question("Notas separadas por vírgula (ex: 8,7,10): ", (entradaNotas) => {
        const notas = entradaNotas.split(",").map(Number);
        estudantes.push({
          nome,
          idade: parseInt(idade),
          notas,
        });
        console.log("✅ Estudante cadastrado com sucesso!");
        mostrarMenu();
      });
    });
  });
}

// Função para listar estudantes
function listarEstudantes() {
  console.log("\n=== LISTA DE ESTUDANTES ===");
  estudantes.forEach((estudante, index) => {
    console.log(`${index + 1}. ${estudante.nome} - Idade: ${estudante.idade}`);
  });
  mostrarMenu();
}

// Função para buscar estudante
function buscarEstudante() {
  rl.question("Digite o nome do estudante que deseja buscar: ", (nomeBusca) => {
    const encontrado = estudantes.find(
      (estudante) => estudante.nome.toLowerCase() === nomeBusca.toLowerCase()
    );
    if (encontrado) {
      console.log("✅ Estudante encontrado:");
      console.log(encontrado);
    } else {
      console.log("❌ Estudante não encontrado.");
    }
    mostrarMenu();
  });
}

// Função para calcular médias
function calcularMedias() {
  console.log("\n=== MÉDIAS DOS ESTUDANTES ===");
  estudantes.forEach((estudante) => {
    const soma = estudante.notas.reduce((acc, nota) => acc + nota, 0);
    const media = soma / estudante.notas.length;
    console.log(`${estudante.nome} → Média: ${media.toFixed(2)}`);
  });
  mostrarMenu();
}

// Função para relatórios
function relatorios() {
  console.log("\n=== RELATÓRIOS ===");
  console.log("Quantidade de estudantes:", estudantes.length);
  mostrarMenu();
}

mostrarMenu();
