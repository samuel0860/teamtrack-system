/*import { Usuario } from "..Classe Usuário.js";
import { Tarefa } from "..Classe Tarefa";

export class Gerenciador {
  constructor() {
    this.usuarios = [];
    this.tarefas = [];
  }

  adicionarUsuario(nome, email) {
    const id = this.usuarios.length + 1;
    const usuario = new Usuario(id, nome, email);
    this.usuarios.push(usuario);
    return usuario;
  }

  listarUsuarios() {
    return this.usuarios;
  }

  adicionarTarefa(titulo, descricao, usuarioId) {
    const usuario = this.usuarios.find((u) => u.id == usuarioId);
    if (!usuario) throw new Error("Usuário não encontrado!");

    const id = this.tarefas.length + 1;
    const tarefa = new Tarefa(id, titulo, descricao, usuarioId);
    this.tarefas.push(tarefa);
    return tarefa;
  }

  listarTarefas() {
    return this.tarefas;
  }

  concluirTarefa(id) {
    const tarefa = this.tarefas.find((t) => t.id == id);
    if (tarefa) {
      tarefa.marcarConcluida();
    }
  }
}*/

import { Produto } from "../Classe Produto/produto.js";

export class Gerenciador {
  constructor() {
    this.produtos = [];
    // Métodos de manipulação serão implementados futuramente por outra pessoa
  }
}