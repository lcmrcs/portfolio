// JavaScript do portfólio.

document.addEventListener('DOMContentLoaded', () => {
  const botaoMenu = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu-principal');

  if (!botaoMenu || !menu) return;

  const telaGrande = window.matchMedia('(min-width: 1024px)');

  function abrirMenu() {
    menu.inert = false;
    menu.classList.add('aberto');
    botaoMenu.setAttribute('aria-expanded', 'true');
    botaoMenu.setAttribute('aria-label', 'Fechar menu');
  }

  function fecharMenu() {
    if (!telaGrande.matches && menu.contains(document.activeElement)) {
      botaoMenu.focus();
    }
    menu.inert = !telaGrande.matches;
    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
  }

  function alternarMenu() {
    const estaAberto = menu.classList.contains('aberto');
    estaAberto ? fecharMenu() : abrirMenu();
  }

  // Sincroniza teclado e menu ao alternar entre celular e computador.
  function ajustarTela() {
    const botaoEstavaFocado = document.activeElement === botaoMenu;
    fecharMenu();
    if (telaGrande.matches && botaoEstavaFocado) {
      menu.querySelector('a')?.focus();
    }
  }

  ajustarTela();
  telaGrande.addEventListener('change', ajustarTela);

  botaoMenu.addEventListener('click', alternarMenu);

  // Fecha o menu ao clicar em um link (útil no celular).
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', fecharMenu);
  });

  // Fecha ao clicar fora do menu.
  document.addEventListener('click', (evento) => {
    const cliqueForaDoMenu = !menu.contains(evento.target) && !botaoMenu.contains(evento.target);
    if (cliqueForaDoMenu) fecharMenu();
  });

  // Fecha com a tecla Esc.
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') fecharMenu();
  });
});
