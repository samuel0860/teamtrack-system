document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const app = document.getElementById("app");

  // Se quiser, substitua o setTimeout por uma inicialização real
  setTimeout(() => {
    loader.classList.add("hidden");
    app.classList.remove("hidden");
  }, 1500);

  // restante da inicialização: carregar dados, bind de eventos etc.
});
