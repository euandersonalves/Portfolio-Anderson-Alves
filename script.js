/* =====================================================================
   SCRIPT DO SITE — Lucas Andrade
   Ordem do arquivo:
   1 dados (listas que você edita) · 2 foto de perfil · 3 cartões que abrem
   4 serviços · 5 projetos · 6 depoimentos · 7 modo claro/escuro
   8 menu · 9 palco 3D · 10 números · 11 iniciar tudo
   ===================================================================== */


/* ---------- 1. DADOS: edite aqui para mudar o conteúdo do site ---------- */

// Foto de perfil do topo. Cole aqui a imagem (ex.: "data:image/jpeg;base64,...").
// Se ficar vazio, aparece "LA".
var FOTO_PERFIL = "an.jpg";

// Imagem do CENTRO da cena 3D (dentro da esfera colorida).
// Opção 1: coloque o arquivo na pasta "imagens" ao lado do index.html e escreva o caminho:
//          var IMAGEM_CENTRAL = "imagens/minha-foto.png";
// Opção 2: cole a imagem embutida (ex.: "data:image/png;base64,...").
// Se ficar vazio, aparece a silhueta padrão.
var IMAGEM_CENTRAL = "an.jpg";

// SERVIÇOS — para adicionar um, copie um bloco { ... } e coloque uma vírgula entre eles.
// cor = variável de cor do estilo.css
var listaServicos = [
  { cor: "--cor-lima",    titulo: "Sites e lojas virtuais", descricao: "Páginas rápidas, otimizadas para o Google e prontas para vender." },
  { cor: "--cor-lilas",   titulo: "Aplicativos móveis",     descricao: "Apps para Android e iOS." },
  { cor: "--cor-laranja", titulo: "Sistemas sob medida",    descricao: "Painéis, integrações e automações que poupam horas do seu tempo." },
  { cor: "--cor-azul",    titulo: "Design de interfaces",   descricao: "Telas claras e bonitas, pensadas para quem vai usar todos os dias." }
];

// PROJETOS — para adicionar um, copie um bloco { ... } e coloque uma vírgula entre eles.
//   imagem = cor de fundo (imagem-lima, imagem-lilas, imagem-azul ou imagem-laranja). Aparece quando não há foto.
//   foto   = imagem do projeto. Ex.: "imagens/casa-verde.png" (coloque o arquivo na pasta "imagens"). Vazio = sem foto.
//   link   = endereço do projeto no ar. Ex.: "https://casaverde.com.br". Vazio = o botão "Ver projeto" não aparece.
var listaProjetos = [
  { imagem: "imagem-lima",    titulo: "Império Barber",     tipo: "Site", descricao: "Um site para apresentar uma barbearia e facilitar o agendamento de clientes.", foto: "imagens/imperio.png", link: "https://euandersonalves.github.io/Imperio-Barber/", tecnologias: ["HTML", "CSS", "JavaScript"] },
   { imagem: "imagem-lilas",   titulo: "Deu Pizza",       tipo: "Site",   descricao: "Um site para despertar o apetite, mostrar os sabores e tornar o pedido de pizzas uma experiência simples e rápida.",      foto: "imagens/deu-pizza.jpg", link: "https://euandersonalves.github.io/Deu-Pizza/", tecnologias: ["HTML", "CSS", "JavaScript"] },
  //{ imagem: "imagem-azul",    titulo: "Clínica Aurora", tipo: "Agendamento",  descricao: "Agendamento online com confirmação por WhatsApp.",              foto: "", link: "#", tecnologias: ["Next.js", "Node.js"] },
  //{ imagem: "imagem-laranja", titulo: "Rede Maré",      tipo: "Painel",       descricao: "Painel com as vendas de todas as lojas em tempo real.",         foto: "", link: "#", tecnologias: ["React", "PostgreSQL"] }
];

// DEPOIMENTOS — foto: coloque o caminho/imagem do cliente (se vazio, aparecem as iniciais)
var listaDepoimentos = [
  { iniciais: "MC", nome: "Mariana Costa",   empresa: "Casa Verde",     cargo: "fundadora da Casa Verde",     cor: "var(--cor-lima)",    foto: "imagens/clientes/Mariana-Costa.jpeg", texto: "A loja ficou linda e as vendas por Pix começaram já na primeira semana." },
  { iniciais: "RL", nome: "Rafael Lima",     empresa: "Rota Fit",       cargo: "fundador da Rota Fit",        cor: "var(--cor-lilas)",   foto: "imagens/clientes/Rafael-Lima.jpeg", texto: "Entregou o app antes do prazo e ainda sugeriu melhorias que nem tínhamos pensado." },
  { iniciais: "HS", nome: "Helena Souza",    empresa: "Clínica Aurora", cargo: "diretora da Clínica Aurora",  cor: "var(--cor-laranja)", foto: "imagens/clientes/Helena-Souza.jpeg", texto: "Os pacientes agendam sozinhos pelo celular e nossa recepção ganhou tempo todos os dias." },
  { iniciais: "TN", nome: "Thiago Nogueira", empresa: "Rede Maré",      cargo: "gerente da Rede Maré",        cor: "var(--cor-azul)",    foto: "imagens/clientes/Thiago-Nogueira.jpeg", texto: "O painel nos mostra as vendas de todas as lojas em tempo real. Decidimos mais rápido e com mais segurança." }
];

// Tempo entre uma troca de depoimento e outra (em milissegundos: 5000 = 5 segundos)
var TEMPO_TROCA_DEPOIMENTO = 5000;

// Verdadeiro se a pessoa pediu "reduzir animações" no aparelho
var reduzirAnimacoes = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* ---------- 2. FOTO DE PERFIL ---------- */
function mostrarFotoPerfil() {
  if (FOTO_PERFIL === "") return;                 // sem foto: fica o "LA"
  var fotoPerfil = document.getElementById("fotoPerfil");
  var imagem = document.createElement("img");
  imagem.src = FOTO_PERFIL;
  imagem.alt = "";
  fotoPerfil.appendChild(imagem);
}


/* ---------- 2.1 IMAGEM DO CENTRO DA CENA 3D ---------- */
function mostrarImagemCentral() {
  if (IMAGEM_CENTRAL === "") return;              // sem imagem: fica a silhueta padrão
  var esfera = document.getElementById("esfera");
  var imagem = document.createElement("img");
  imagem.className = "imagem-central";
  imagem.src = IMAGEM_CENTRAL;
  imagem.alt = "";
  esfera.appendChild(imagem);
  document.getElementById("silhuetaPadrao").style.display = "none";   // esconde a silhueta
}


/* ---------- 3. CARTÕES QUE ABREM (serviços e projetos usam a mesma função) ---------- */
// Seta que aparece no canto dos cartões
var SETA = '<svg class="seta" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

// Abre o cartão se estiver fechado e fecha se estiver aberto
function alternarCartao(botao) {
  var cartao = botao.parentNode;
  var vaiAbrir = !cartao.classList.contains("aberto");
  cartao.classList.toggle("aberto", vaiAbrir);
  botao.setAttribute("aria-expanded", vaiAbrir);  // avisa o leitor de tela
}


/* ---------- 4. SERVIÇOS ---------- */
function montarServicos() {
  var caixa = document.getElementById("listaServicos");

  listaServicos.forEach(function (servico, numero) {
    var cartao = document.createElement("div");
    cartao.className = "cartao";
    cartao.innerHTML =
      '<button class="cabecalho-cartao" aria-expanded="false" aria-controls="servico' + numero + '">' +
        '<span class="quadrado-cor" style="background: var(' + servico.cor + ')"></span>' +
        '<h3>' + servico.titulo + '</h3>' + SETA +
      '</button>' +
      '<div class="conteudo-expansivel" id="servico' + numero + '"><div><p>' + servico.descricao + '</p></div></div>';

    cartao.querySelector(".cabecalho-cartao").onclick = function () { alternarCartao(this); };
    caixa.appendChild(cartao);
  });
}


/* ---------- 5. PROJETOS ---------- */
function montarProjetos() {
  var caixa = document.getElementById("listaProjetos");

  listaProjetos.forEach(function (projeto, numero) {
    // Se o projeto tem foto, mostra a foto dentro da imagem do cartão
    var classeFoto = projeto.foto ? " com-foto" : "";
    var imagemHtml = projeto.foto ? '<img src="' + projeto.foto + '" alt="Imagem do projeto ' + projeto.titulo + '">' : "";

    // Se o projeto tem link, cria o botão "Ver projeto" (abre em outra aba)
    var botaoVer = projeto.link
      ? '<a class="botao-ver-projeto" href="' + projeto.link + '" target="_blank" rel="noopener" aria-label="Ver projeto ' + projeto.titulo + ' (abre em nova aba)">Ver projeto ↗</a>'
      : "";

    // Monta as etiquetas de tecnologia (uma <span> para cada)
    var etiquetas = "";
    projeto.tecnologias.forEach(function (tecnologia) {
      etiquetas += "<span>" + tecnologia + "</span>";
    });

    var cartao = document.createElement("div");
    cartao.className = "cartao cartao-projeto";
    cartao.innerHTML =
      '<div class="imagem-projeto ' + projeto.imagem + classeFoto + '">' + imagemHtml + '</div>' +
      '<button class="cabecalho-cartao" aria-expanded="false" aria-controls="projeto' + numero + '">' +
        '<span style="flex:1"><h3>' + projeto.titulo + '</h3><small>' + projeto.tipo + '</small></span>' + SETA +
      '</button>' +
      '<div class="conteudo-expansivel" id="projeto' + numero + '"><div>' +
        '<p>' + projeto.descricao + '</p><div class="etiquetas-projeto">' + etiquetas + '</div>' + botaoVer +
      '</div></div>';

    cartao.querySelector(".cabecalho-cartao").onclick = function () { alternarCartao(this); };
    caixa.appendChild(cartao);
  });

  deixarOutrosProjetosDesfocados(caixa);
}

// Com o mouse em cima de um projeto, os outros ficam levemente desfocados
function deixarOutrosProjetosDesfocados(caixa) {
  Array.prototype.forEach.call(caixa.children, function (cartao) {
    cartao.addEventListener("pointerenter", function (evento) {
      if (evento.pointerType !== "mouse") return;   // no celular não faz nada
      caixa.classList.add("com-desfoque");
      cartao.classList.add("em-destaque");
    });
    cartao.addEventListener("pointerleave", function () {
      caixa.classList.remove("com-desfoque");
      cartao.classList.remove("em-destaque");
    });
  });
}


/* ---------- 6. DEPOIMENTOS (troca sozinho, sem barra de progresso) ---------- */
var listaClientes = document.getElementById("listaClientes");
var depoimentoAtual = 0;          // posição do depoimento que está na tela
var cronometroTroca;              // guarda o relógio da troca automática
var mouseEmCimaDoDepoimento = false;

function montarDepoimentos() {
  // Cria um botão (só com a foto) para cada cliente
  listaDepoimentos.forEach(function (cliente, numero) {
    var botao = document.createElement("button");
    botao.className = "botao-cliente";
    botao.id = "cliente" + numero;
    botao.setAttribute("role", "tab");
    botao.setAttribute("aria-controls", "cartaoDepoimento");
    botao.setAttribute("aria-label", cliente.nome + ", " + cliente.empresa);   // o nome é lido pelo leitor de tela
    botao.innerHTML = '<span class="avatar" style="background:' + cliente.cor + '" aria-hidden="true">' +
      (cliente.foto ? '<img src="' + cliente.foto + '" alt="">' : cliente.iniciais) + '</span>';

    botao.onclick = function () { mostrarDepoimento(numero); reiniciarTroca(); };

    // Setas do teclado trocam de cliente
    botao.onkeydown = function (evento) {
      var passo = 0;
      if (evento.key === "ArrowDown" || evento.key === "ArrowRight") passo = 1;
      if (evento.key === "ArrowUp" || evento.key === "ArrowLeft") passo = -1;
      if (passo === 0) return;
      evento.preventDefault();
      var novo = (numero + passo + listaDepoimentos.length) % listaDepoimentos.length;
      mostrarDepoimento(novo);
      listaClientes.children[novo].focus();
      reiniciarTroca();
    };

    listaClientes.appendChild(botao);
  });

  // Pausa a troca enquanto o mouse ou o foco do teclado estiver nos depoimentos
  var area = document.querySelector(".depoimentos");
  ["mouseenter", "focusin"].forEach(function (nome) { area.addEventListener(nome, function () { mouseEmCimaDoDepoimento = true; }); });
  ["mouseleave", "focusout"].forEach(function (nome) { area.addEventListener(nome, function () { mouseEmCimaDoDepoimento = false; }); });

  mostrarDepoimento(0);
  reiniciarTroca();
}

// Mostra o depoimento de um cliente (numero = posição na lista)
function mostrarDepoimento(numero) {
  depoimentoAtual = numero;
  var cliente = listaDepoimentos[numero];
  var cartao = document.getElementById("cartaoDepoimento");

  document.getElementById("textoDepoimento").textContent = "“" + cliente.texto + "”";
  document.getElementById("autorDepoimento").innerHTML = "<strong>" + cliente.nome + "</strong>" + cliente.cargo;
  cartao.setAttribute("aria-labelledby", "cliente" + numero);

  // Marca o botão do cliente escolhido
  Array.prototype.forEach.call(listaClientes.children, function (botao, posicao) {
    botao.setAttribute("aria-selected", posicao === numero);
    botao.tabIndex = (posicao === numero) ? 0 : -1;
  });

  // Reinicia a animação de troca
  cartao.classList.remove("trocando");
  void cartao.offsetWidth;
  cartao.classList.add("trocando");
}

// Liga a troca automática (zera o relógio e começa de novo)
function reiniciarTroca() {
  clearInterval(cronometroTroca);
  if (reduzirAnimacoes) return;   // quem pediu menos movimento não tem troca automática
  cronometroTroca = setInterval(function () {
    if (mouseEmCimaDoDepoimento) return;
    mostrarDepoimento((depoimentoAtual + 1) % listaDepoimentos.length);
  }, TEMPO_TROCA_DEPOIMENTO);
}


/* ---------- 7. MODO CLARO / ESCURO ---------- */
var paginaRaiz = document.documentElement;
var botaoTema = document.getElementById("botaoTema");

// Responde: o site está no modo escuro agora?
function estaNoModoEscuro() {
  var escolhido = paginaRaiz.getAttribute("data-tema");   // "claro", "escuro" ou nada
  if (escolhido) return escolhido === "escuro";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;   // segue o aparelho
}

// Atualiza o botão (ícone e texto de acessibilidade)
function atualizarBotaoTema() {
  var escuro = estaNoModoEscuro();
  botaoTema.setAttribute("aria-pressed", escuro);
  botaoTema.setAttribute("aria-label", escuro ? "Ativar modo claro" : "Ativar modo escuro");
}

function iniciarTema() {
  // Lembra a escolha da última visita
  try {
    var salvo = localStorage.getItem("tema");
    if (salvo) paginaRaiz.setAttribute("data-tema", salvo);
  } catch (erro) { /* navegador sem permissão para salvar: segue sem lembrar */ }

  atualizarBotaoTema();

  botaoTema.onclick = function () {
    var novo = estaNoModoEscuro() ? "claro" : "escuro";
    paginaRaiz.setAttribute("data-tema", novo);
    try { localStorage.setItem("tema", novo); } catch (erro) { }
    atualizarBotaoTema();
  };
}


/* ---------- 8. MENU: marca a aba da seção que está na tela ---------- */
function iniciarMenu() {
  var linksDoMenu = document.querySelectorAll("#menu a");

  // Observa cada seção que tem data-aba. Quando ela passa pelo meio da tela, marca a aba.
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      var abaDaSecao = entrada.target.dataset.aba;
      Array.prototype.forEach.call(linksDoMenu, function (link) {
        link.setAttribute("aria-current", link.dataset.aba === abaDaSecao);
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  document.querySelectorAll("section[data-aba]").forEach(function (secao) { observador.observe(secao); });
}


/* ---------- 9. PALCO 3D (inclina com mouse/dedo e balança sozinho) ---------- */
function iniciarPalco() {
  var palco = document.getElementById("palco");
  var cena = document.getElementById("cena");
  var inclinacaoX = 0, inclinacaoY = 0;   // inclinação atual
  var alvoX = 0, alvoY = 0;               // inclinação que queremos alcançar
  var usuarioMexendo = false;

  // Calcula o alvo conforme a posição do mouse/dedo dentro do palco
  function acompanharPonteiro(evento) {
    var caixa = palco.getBoundingClientRect();
    var x = (evento.clientX - caixa.left) / caixa.width - 0.5;    // de -0.5 a 0.5
    var y = (evento.clientY - caixa.top) / caixa.height - 0.5;
    alvoY = x * 24;
    alvoX = -y * 18;
    usuarioMexendo = true;
    cena.style.setProperty("--brilho-x", (x + 0.5) * 100 + "%");
    cena.style.setProperty("--brilho-y", (y + 0.5) * 100 + "%");
  }
  palco.addEventListener("pointermove", acompanharPonteiro);
  palco.addEventListener("pointerdown", acompanharPonteiro);
  ["pointerup", "pointerleave", "pointercancel"].forEach(function (nome) {
    palco.addEventListener(nome, function () { usuarioMexendo = false; });
  });

  // Animação contínua: suaviza o movimento e balança sozinho quando ninguém mexe
  function animar(tempo) {
    if (!usuarioMexendo && !reduzirAnimacoes) {
      alvoX = Math.sin(tempo / 1800) * 5;
      alvoY = Math.cos(tempo / 2300) * 10;
    }
    inclinacaoX += (alvoX - inclinacaoX) * 0.08;
    inclinacaoY += (alvoY - inclinacaoY) * 0.08;
    cena.style.transform = "rotateX(" + inclinacaoX.toFixed(2) + "deg) rotateY(" + inclinacaoY.toFixed(2) + "deg)";
    requestAnimationFrame(animar);
  }
  requestAnimationFrame(animar);

  // Clicar em um cartão flutuante leva até a seção (data-destino)
  document.querySelectorAll(".cartao-flutuante").forEach(function (cartao) {
    cartao.onclick = function () {
      document.querySelector(cartao.dataset.destino).scrollIntoView({ behavior: "smooth" });
    };
  });
}


/* ---------- 10. NÚMEROS QUE CONTAM (6+, 40+, 100%, 24h) ---------- */
function contarNumero(elemento) {
  var partes = /^(\d+)(.*)$/.exec(elemento.textContent);   // separa "40" e "+"
  if (!partes) return;
  var valorFinal = Number(partes[1]);
  var sufixo = partes[2];
  var inicio = performance.now();

  function passo(agora) {
    var progresso = Math.min(1, (agora - inicio) / 1100);                   // 0 até 1 em 1,1 segundo
    var suavizado = 1 - Math.pow(1 - progresso, 3);                         // começa rápido e desacelera
    elemento.textContent = Math.round(valorFinal * suavizado) + sufixo;
    if (progresso < 1) requestAnimationFrame(passo);
  }
  passo(inicio);
}

function iniciarContagem() {
  if (reduzirAnimacoes) return;
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      contarNumero(entrada.target);
      observador.unobserve(entrada.target);   // conta só uma vez
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".numero-valor").forEach(function (numero) { observador.observe(numero); });
}


/* ---------- 11. INICIAR TUDO (a ordem não importa muito) ---------- */
mostrarFotoPerfil();
mostrarImagemCentral();
montarServicos();
montarProjetos();
montarDepoimentos();
iniciarTema();
iniciarMenu();
iniciarPalco();
iniciarContagem();
