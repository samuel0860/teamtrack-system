export class Tarefa {
  constructor(id, titulo, descricao, usuarioId, concluida = false) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.usuarioId = usuarioId;
    this.concluida = concluida;
  }

  marcarConcluida() {
    this.concluida = true;
  }
}
