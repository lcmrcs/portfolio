// MENU: abre e fecha a navegação somente nas telas menores.
const botaoMenu = document.querySelector('.botao-menu');
const menu = document.querySelector('.menu');

botaoMenu.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  botaoMenu.setAttribute('aria-expanded', String(aberto));
  botaoMenu.textContent = aberto ? 'Fechar' : 'Menu';
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.textContent = 'Menu';
  });
});

// CASES: somente um case aberto por vez, para a leitura ficar organizada.
const botoesCase = document.querySelectorAll('.botao-case');

botoesCase.forEach((botao) => {
  botao.addEventListener('click', () => {
    const detalhes = document.getElementById(botao.getAttribute('aria-controls'));
    const aberto = botao.getAttribute('aria-expanded') === 'true';

    botoesCase.forEach((outroBotao) => {
      if (outroBotao !== botao) {
        const outroDetalhe = document.getElementById(outroBotao.getAttribute('aria-controls'));
        outroBotao.setAttribute('aria-expanded', 'false');
        outroBotao.querySelector('.acao-case').textContent = 'Ver detalhes';
        outroDetalhe.hidden = true;
      }
    });

    botao.setAttribute('aria-expanded', String(!aberto));
    botao.querySelector('.acao-case').textContent = aberto ? 'Ver detalhes' : 'Fechar detalhes';
    detalhes.hidden = aberto;
  });
});

// TEMA: troca as cores e grava a escolha para a próxima visita ao site.
const botaoTema = document.querySelector('.botao-tema');

function aplicarTema(temaEscuro) {
  document.body.classList.toggle('tema-escuro', temaEscuro);
  botaoTema.setAttribute('aria-pressed', String(temaEscuro));
  botaoTema.textContent = temaEscuro ? 'Modo claro' : 'Modo escuro';
}

let temaSalvo = null;

try {
  temaSalvo = localStorage.getItem('tema');
} catch (erro) {
  // O site continua funcionando caso o navegador bloqueie o armazenamento.
}

aplicarTema(temaSalvo === 'escuro');

botaoTema.addEventListener('click', () => {
  const novoTemaEscuro = !document.body.classList.contains('tema-escuro');
  aplicarTema(novoTemaEscuro);

  try {
    localStorage.setItem('tema', novoTemaEscuro ? 'escuro' : 'claro');
  } catch (erro) {
    // Não é necessário mostrar erro: o tema ainda muda nesta visita.
  }
});

// ANIMAÇÕES: os cartões aparecem ao entrar na área visível da tela.
const preferePoucoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const itensAnimados = document.querySelectorAll(
  '.marco, .card-area, .case-estudo, .canal-contato'
);

if (preferePoucoMovimento || !('IntersectionObserver' in window)) {
  itensAnimados.forEach((item) => item.classList.add('visivel'));
} else {
  document.body.classList.add('preparado-para-animar');
  itensAnimados.forEach((item) => item.classList.add('animar'));

  const observador = new IntersectionObserver((entradas, observer) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  itensAnimados.forEach((item) => observador.observe(item));
}
