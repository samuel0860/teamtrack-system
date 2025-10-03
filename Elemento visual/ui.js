import { Gerenciador } from "..Classe principal que orquestra o sistema.js";

export class UI {
  constructor() {
    this.gerenciador = new Gerenciador();
  }

  iniciar() {
    // Loader
    window.addEventListener("load", () => {
      const loader = document.getElementById("loader");
      const container = document.querySelector(".container");
      setTimeout(() => {
        loader.style.display = "none";
        container.classList.remove("hidden");
      }, 1500);
    });

    // Usuários
    document.getElementById("formUsuario").addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nomeUsuario").value;
      const email = document.getElementById("emailUsuario").value;
      this.gerenciador.adicionarUsuario(nome, email);
      this.atualizarUsuarios();
      e.target.reset();
    });

    // Tarefas
    document.getElementById("formTarefa").addEventListener("submit", (e) => {
      e.preventDefault();
      const titulo = document.getElementById("tituloTarefa").value;
      const descricao = document.getElementById("descricaoTarefa").value;
      const usuarioId = document.getElementById("usuarioIdTarefa").value;

      try {
        this.gerenciador.adicionarTarefa(titulo, descricao, usuarioId);
        this.atualizarTarefas();
        e.target.reset();
      } catch (err) {
        alert(err.message);
      }
    });
  }

  atualizarUsuarios() {
    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "";
    this.gerenciador.listarUsuarios().forEach((u) => {
      const li = document.createElement("li");
      li.textContent = `${u.id}. ${u.nome} (${u.email})`;
      lista.appendChild(li);
    });
  }

  atualizarTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";
    this.gerenciador.listarTarefas().forEach((t) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${t.id}. ${t.titulo} - ${t.descricao} (User: ${t.usuarioId})
        <button onclick="window.ui.concluir(${t.id})">✔</button>
      `;
      if (t.concluida) li.classList.add("done");
      lista.appendChild(li);
    });
  }

  concluir(id) {
    this.gerenciador.concluirTarefa(id);
    this.atualizarTarefas();
  }
}
