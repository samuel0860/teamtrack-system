// main.js
// Script principal (entrypoint) que conecta a interface (DOM) às classes de negócio.
// Usa import/export (script type="module" no index.html).

import { Estoque } from "./estoque.js";
import * as Storage from "./storage.js";

/* ---------------------------
   Inicialização do estoque
   --------------------------- */
// Tenta carregar do localStorage; se não houver, começa vazio.
const dadosSalvos = Storage.carregar();
const estoque = new Estoque(dadosSalvos || []);

/* ---------------------------
   Seletores do DOM
   --------------------------- */
const formProduto = document.getElementById("formProduto");
const inputNome = document.getElementById("inputNome");
const inputCategoria = document.getElementById("inputCategoria");
const inputQuantidade = document.getElementById("inputQuantidade");
const inputPreco = document.getElementById("inputPreco");
const inputLimite = document.getElementById("inputLimite");
const tabelaBody = document.querySelector("#tabelaProdutos tbody");
const alertArea = document.getElementById("alertArea");
const btnLimpar = document.getElementById("btnLimpar");
const buscaInput = document.getElementById("busca");
const btnMediaPreco = document.getElementById("btnMediaPreco");
const mediaPrecoText = document.getElementById("mediaPrecoText");

/* ---------------------------
   Função para tocar beep (Web Audio API)
   --------------------------- */
function tocarBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 880;
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.value = 0.05;
    o.start();
    setTimeout(() => {
      o.stop();
      ctx.close();
    }, 150);
  } catch (err) {
    // se falhar, não impede fluxo
    console.warn("Beep não pôde ser reproduzido:", err);
  }
}

/* ---------------------------
   Renderização da tabela de produtos
   --------------------------- */
function renderTabela(lista) {
  tabelaBody.innerHTML = ""; // limpa

  // Se lista não passada, usa todos
  const produtos = Array.isArray(lista) ? lista : estoque.listar();

  produtos.forEach((p) => {
    const tr = document.createElement("tr");

    // status badge
    const status = p.estaBaixo()
      ? p.quantidade === 0
        ? "danger"
        : "warn"
      : "ok";
    const statusText = p.estaBaixo()
      ? p.quantidade === 0
        ? "Sem estoque"
        : "Baixo"
      : "OK";

    tr.innerHTML = `
      <td>${escapeHtml(p.nome)}</td>
      <td>${escapeHtml(p.categoria)}</td>
      <td>
        <button class="btn" data-action="dec" data-id="${p.id}">-</button>
        <span style="margin:0 8px;">${p.quantidade}</span>
        <button class="btn" data-action="inc" data-id="${p.id}">+</button>
      </td>
      <td>R$ ${Number(p.preco).toFixed(2)}</td>
      <td>${p.limite}</td>
      <td><span class="badge ${
        status === "ok" ? "ok" : status === "warn" ? "warn" : "danger"
      }">${statusText}</span></td>
      <td>
        <button class="btn" data-action="editar" data-id="${
          p.id
        }">Editar</button>
        <button class="btn danger" data-action="remover" data-id="${
          p.id
        }">Remover</button>
      </td>
    `;

    tabelaBody.appendChild(tr);
  });

  // delegação de eventos para botões da tabela
  tabelaBody.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      if (action === "inc") {
        // incrementar quantidade em 1
        estoque.atualizar(id, {
          quantidade: estoque.buscarPorId(id).quantidade + 1,
        });
        salvarEAtualizar();
      } else if (action === "dec") {
        // decrementar quantidade em 1
        const atual = estoque.buscarPorId(id);
        estoque.atualizar(id, {
          quantidade: Math.max(0, atual.quantidade - 1),
        });
        salvarEAtualizar();
      } else if (action === "remover") {
        if (confirm("Remover este produto?")) {
          estoque.remover(id);
          salvarEAtualizar();
        }
      } else if (action === "editar") {
        abrirEdicao(id);
      }
    });
  });
}

/* ---------------------------
   Função para salvar no storage e atualizar UI
   --------------------------- */
function salvarEAtualizar() {
  Storage.salvar(estoque.toJSON());
  renderTabela();
  verificarAlertas();
}

/* ---------------------------
   Função para verificar produtos com estoque baixo e acionar alerta
   --------------------------- */
function verificarAlertas() {
  const baixos = estoque.produtosComEstoqueBaixo(); // usa filter internamente
  alertArea.innerHTML = "";

  if (baixos.length > 0) {
    // show visual alert
    const nomes = baixos.map((p) => `${p.nome} (${p.quantidade})`).join(", ");
    const div = document.createElement("div");
    div.className = "alert low";
    div.textContent = `⚠️ Estoque baixo: ${nomes}`;
    alertArea.appendChild(div);
    tocarBeep();
  }
}

/* ---------------------------
   Manipulação do formulário (cadastrar produto)
   --------------------------- */
formProduto.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    const novo = estoque.cadastrarProduto({
      nome: inputNome.value,
      categoria: inputCategoria.value || "",
      quantidade: Number(inputQuantidade.value),
      preco: Number(inputPreco.value),
      limite: Number(inputLimite.value),
    });

    // limpar formulário e atualizar
    formProduto.reset();
    inputQuantidade.value = 0;
    inputPreco.value = "0.00";
    salvarEAtualizar();

    // mostra pequena confirmação
    alertArea.innerHTML = `<div class="alert">✅ Produto "${novo.nome}" cadastrado.</div>`;
    setTimeout(() => (alertArea.innerHTML = ""), 2200);
  } catch (err) {
    alertArea.innerHTML = `<div class="alert low">Erro: ${escapeHtml(
      err.message
    )}</div>`;
  }
});

/* ---------------------------
   Limpar todos os dados (botão)
   --------------------------- */
btnLimpar.addEventListener("click", () => {
  if (!confirm("Deseja limpar TODOS os produtos salvos?")) return;
  estoque.produtos = [];
  Storage.limparStorage();
  renderTabela();
  alertArea.innerHTML = `<div class="alert">✅ Todos os produtos foram removidos.</div>`;
});

/* ---------------------------
   Função para abrir edição rápida de um produto
   (preenche o formulário com os dados para edição imediata)
   --------------------------- */
function abrirEdicao(id) {
  const p = estoque.buscarPorId(id);
  if (!p) return;
  inputNome.value = p.nome;
  inputCategoria.value = p.categoria;
  inputQuantidade.value = p.quantidade;
  inputPreco.value = p.preco;
  inputLimite.value = p.limite;

  // Quando estiver em edição, ao submeter atualiza o mesmo id.
  // Para simplificar, a estratégia aqui é remover produto antigo e cadastrar novo mantendo id.
  // Outra opção seria criar método estoque.atualizar que já existe — vamos usar atualizar diretamente.
  formProduto.removeEventListener("submit", handlerCadastro);
  function handlerEdicao(e) {
    e.preventDefault();
    estoque.atualizar(id, {
      nome: inputNome.value,
      categoria: inputCategoria.value,
      quantidade: Number(inputQuantidade.value),
      preco: Number(inputPreco.value),
      limite: Number(inputLimite.value),
    });
    salvarEAtualizar();
    formProduto.reset();
    inputQuantidade.value = 0;
    // restaurar listener original
    formProduto.removeEventListener("submit", handlerEdicao);
    formProduto.addEventListener("submit", handlerCadastro);
    alertArea.innerHTML = `<div class="alert">✅ Produto atualizado.</div>`;
    setTimeout(() => (alertArea.innerHTML = ""), 2000);
  }
  // adiciona listener temporário de edição
  formProduto.addEventListener("submit", handlerEdicao);
}

/* ---------------------------
   Listener padrão para cadastro (mantemos referenciável para adicionar/remover)
   --------------------------- */
function handlerCadastro(e) {
  e.preventDefault();
  try {
    estoque.cadastrarProduto({
      nome: inputNome.value,
      categoria: inputCategoria.value || "",
      quantidade: Number(inputQuantidade.value),
      preco: Number(inputPreco.value),
      limite: Number(inputLimite.value),
    });
    formProduto.reset();
    inputQuantidade.value = 0;
    inputPreco.value = "0.00";
    salvarEAtualizar();
  } catch (err) {
    alertArea.innerHTML = `<div class="alert low">Erro: ${escapeHtml(
      err.message
    )}</div>`;
  }
}
formProduto.addEventListener("submit", handlerCadastro);

/* ---------------------------
   Busca dinâmica
   --------------------------- */
buscaInput.addEventListener("input", () => {
  const q = buscaInput.value.trim();
  if (q === "") renderTabela();
  else {
    const encontrados = estoque.buscarPorNome(q); // usa filter internamente
    renderTabela(encontrados);
  }
});

/* ---------------------------
   Média de preço (exemplo de reduce)
   --------------------------- */
btnMediaPreco.addEventListener("click", () => {
  const media = estoque.mediaPreco();
  mediaPrecoText.textContent = `Média de preço: R$ ${media.toFixed(2)}`;
});

/* ---------------------------
   Função utilitária: escapa HTML simples para evitar injeção ao inserir texto no innerHTML
   --------------------------- */
function escapeHtml(str) {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ---------------------------
   Inicial render e verificação de alertas
   --------------------------- */
renderTabela();
verificarAlertas();
