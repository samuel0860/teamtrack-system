// storage.js
// Funções utilitárias para persistência no localStorage.
// Exportamos funções load/save com uma chave fixa.

const STORAGE_KEY = "teamtrack_estoque_v1";

// Salva o estado (array de produtos serializados)
export function salvar(estanque) {
  try {
    const json = JSON.stringify(estanque);
    localStorage.setItem(STORAGE_KEY, json);
  } catch (err) {
    console.error("Erro ao salvar no localStorage:", err);
  }
}

// Carrega o estado salvo (retorna array ou null)
export function carregar() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error("Erro ao carregar do localStorage:", err);
    return null;
  }
}

// Limpa o storage (útil para "limpar todos")
export function limparStorage() {
  localStorage.removeItem(STORAGE_KEY);
}
