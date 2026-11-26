const PIECES = {
    r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟',
    R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', P: '♙'
};

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const INITIAL_BOARD = [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R']
];

const C = { o: '#f59e0b', r: '#ef4444', g: '#22c55e', b: '#38bdf8' };

function mv(text) {
    return `<span class="chess-move">${text}</span>`;
}

function sqToCoord(sq) {
    return [8 - parseInt(sq[1], 10), sq.charCodeAt(0) - 97];
}

function arr(list) {
    return list.map(([from, to, k]) => ({ from, to, color: C[k] || C.o }));
}

function smoothScrollTo(targetEl, duration = 900, offset = 85) {
    if (!targetEl) return;
    const startY = window.pageYOffset;
    const targetY = targetEl.getBoundingClientRect().top + startY - offset;
    const distance = targetY - startY;
    let startTime = null;

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutCubic(progress));
        if (elapsed < duration) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

const PANELS = {
    brancas: {
        kicker: "Análise lance a lance • Repertório de brancas",
        title: "A lógica por trás do Sistema Viena (1.e4 e5 2.Cc3)",
        items: [
            { move: mv("1. e4"), subtitle: "O lance mais comum de todo o xadrez mundial", desc: `Ocupa imediatamente o centro, domina as casas críticas ${mv("d5")} e ${mv("f5")} e libera as diagonais da dama e do bispo.`, opening: "viena", step: 1, arrows: arr([['e4','d5','o'],['e4','f5','o'],['f1','a6','b'],['d1','h5','b']]) },
            { move: mv("1. e5"), subtitle: "A resposta simétrica das pretas", desc: "As pretas reivindicam sua parcela no centro, bloqueiam o avanço livre do peão branco e abrem linhas para suas peças.", opening: "viena", step: 2, arrows: arr([['e5','d4','r'],['e5','f4','r'],['f8','a3','b']]) },
            { move: mv("2. Cc3"), subtitle: "A essência da Abertura Viena", desc: `O cavalo da dama entra primeiro para proteger ${mv("e4")}, controlar ${mv("d5")} e deixar livre o peão de ${mv("f2")} para avançar até ${mv("f4")}.`, opening: "viena", step: 3, arrows: arr([['c3','e4','g'],['c3','d5','o'],['f2','f4','b']]) }
        ]
    },
    pretas: {
        kicker: "Análise lance a lance • Repertório de pretas",
        title: "A lógica por trás da Defesa Siciliana (1.e4 c5)",
        items: [
            { move: mv("1. e4"), subtitle: "A iniciativa central das brancas", desc: `As brancas abrem com o lance mais popular do xadrez, buscando estabelecer dois peões no centro com ${mv("d4")}.`, opening: "dragaoAcelerado", step: 1, arrows: arr([['e4','d5','o'],['e4','f5','o'],['d2','d4','b']]) },
            { move: mv("1. c5"), subtitle: `O segundo lance mais comum contra ${mv("1.e4")}`, desc: `As pretas contestam o domínio central das brancas pelos flancos (controlando ${mv("d4")} pela lateral), criando uma luta assimétrica.`, opening: "dragaoAcelerado", step: 2, arrows: arr([['c5','d4','r'],['c5','b4','b']]) },
            { move: mv("3. cxd4"), subtitle: "A troca estratégica da Siciliana", desc: `As pretas trocam seu peão lateral da coluna ${mv("c")} pelo peão central de ${mv("d4")}, assumindo controle sobre ${mv("c3")} e ${mv("e3")}.`, opening: "dragaoAcelerado", step: 6, arrows: arr([['d4','c3','r'],['d4','e3','r']]) }
        ]
    },
    classica: {
        kicker: "Desenvolvimento posicional • Abertura Viena Clássica",
        title: "Como a Abertura Viena Clássica constrói vantagem",
        items: [
            { move: mv("2. Cc3"), subtitle: `Controle flexível de ${mv("d5")} e ${mv("e4")}`, desc: `Mantém o cavalo de ${mv("g1")} livre para ir a ${mv("e2")} ou ${mv("f3")} e preserva a opção de jogar ${mv("f4")} no momento ideal.`, opening: "viena", step: 3, arrows: arr([['c3','d5','o'],['c3','e4','g'],['g1','e2','b']]) },
            { move: mv("3. Bc4"), subtitle: `Pressão direta na diagonal ${mv("a2-g8")}`, desc: `O bispo aponta para ${mv("f7")} (ponto mais vulnerável das pretas) e dificulta o avanço central ${mv("d5")}.`, opening: "viena", step: 5, arrows: arr([['c4','f7','r'],['c4','d5','o'],['c3','d5','o']]) },
            { move: `${mv("4. d3")} &amp; ${mv("5. Cge2")}`, subtitle: "Estrutura sólida pronta para atacar", desc: `Consolida ${mv("e4")} e desenvolve o cavalo por ${mv("e2")} sem bloquear o peão de ${mv("f2")}.`, opening: "viena", step: 9, arrows: arr([['d3','e4','g'],['e2','c3','g'],['f2','f4','o']]) }
        ]
    },
    gambito: {
        kicker: "Ataque direto • Gambito Viena",
        title: "Por que o Gambito Viena supera o Gambito do Rei",
        items: [
            { move: `${mv("2. Cc3")} vs ${mv("Dh4+")}`, subtitle: "Bloqueio contra o xeque cedo com a dama", desc: `No Gambito do Rei (${mv("2.f4")}), as pretas jogam ${mv("Dh4+")} — um xeque cedo com a dama que tira o roque branco. Na Viena, ${mv("2.Cc3")} neutraliza essa ameaça.`, opening: "gambitoViena", step: 3, arrows: arr([['d8','h4','r'],['h4','e1','r'],['c3','d5','g']]) },
            { move: mv("3. f4!"), subtitle: "Desafio imediato ao centro", desc: `Com o cavalo em ${mv("c3")}, as brancas oferecem ${mv("f4")} para desviar o peão de ${mv("e5")} e abrir a coluna ${mv("f")}.`, opening: "gambitoViena", step: 5, arrows: arr([['f4','e5','r'],['f1','f4','b']]) },
            { move: `${mv("4. e5!")} &amp; ${mv("6. d4")}`, subtitle: "Domínio espacial e expulsão do cavalo", desc: `Após ${mv("3.exf4")}, o avanço ${mv("4.e5")} expulsa o cavalo de ${mv("f6")} e permite ocupar todo o centro com ${mv("d4")}.`, opening: "gambitoViena", step: 11, arrows: arr([['e5','f6','r'],['e5','d6','o'],['c1','f4','g']]) }
        ]
    },
    dragao: {
        kicker: "Pressão na grande diagonal • Dragão Acelerado",
        title: "Como o Dragão Acelerado economiza tempos decisivos",
        items: [
            { move: `${mv("2. Cc6")} &amp; ${mv("4. g6!")}`, subtitle: `Fianchetto de bispo sem gastar tempo com ${mv("d6")}`, desc: `Posiciona o bispo na lateral em ${mv("g7")} para dominar a diagonal ${mv("h8-a1")} sem mover ${mv("d7")} antes, guardando o avanço ${mv("d5")} em um só lance.`, opening: "dragaoAcelerado", step: 8, arrows: arr([['f8','g7','g'],['d7','d5','b'],['c6','d4','o']]) },
            { move: mv("5. Bg7"), subtitle: "O bispo que controla todo o tabuleiro", desc: `Instalado em ${mv("g7")}, o bispo das pretas pressiona diretamente o cavalo de ${mv("d4")} e toda a ala da dama das brancas.`, opening: "dragaoAcelerado", step: 10, arrows: arr([['g7','d4','r'],['g7','b2','o'],['c6','d4','r']]) },
            { move: `${mv("7. O-O")} &amp; ${mv("d5")}`, subtitle: "Segurança rápida e ruptura no centro", desc: `Com o rei protegido e a torre em ${mv("f8")}, as pretas rompem o centro com ${mv("d5")} e assumem a iniciativa.`, opening: "dragaoAcelerado", step: 14, arrows: arr([['d7','d5','g'],['f6','e4','r'],['g7','d4','o']]) }
        ]
    },
    najdorf: {
        kicker: "Elasticidade e contra-ataque • Siciliana Najdorf",
        title: "Por que 5.a6 torna a Najdorf tão flexível",
        items: [
            { move: mv("5. a6!"), subtitle: `Controle preventivo da casa ${mv("b5")}`, desc: `Impede que cavalos e bispos brancos saltem para ${mv("b5")} e prepara a expansão na ala da dama com ${mv("b5")}.`, opening: "najdorf", step: 10, arrows: arr([['a6','b5','g'],['b7','b5','b']]) },
            { move: `${mv("6. e6")} &amp; ${mv("e5")}`, subtitle: "Adaptabilidade total no centro", desc: `Permite escolher entre uma estrutura sólida com ${mv("e6")} ou disputar o centro imediatamente com ${mv("e5")}.`, opening: "najdorf", step: 12, arrows: arr([['e6','d5','g'],['f8','e7','b'],['d6','e5','o']]) },
            { move: `${mv("b5")} &amp; ${mv("Bb7")}`, subtitle: "Contra-ataque na ala da dama", desc: `As pretas avançam ${mv("b5")}, ativam o bispo em ${mv("b7")} e pressionam pela coluna aberta ${mv("c")}.`, opening: "najdorf", step: 15, arrows: arr([['b7','b5','g'],['c8','b7','b'],['c5','c3','r']]) }
        ]
    },
    carlsen: {
        kicker: "Era moderna • Versatilidade universal",
        title: "Magnus Carlsen: Dragão Acelerado, Najdorf e Viena",
        items: [
            { move: `Dragão Acelerado (${mv("g6")} &amp; ${mv("Bg7")})`, subtitle: "Pressão posicional de longo prazo", desc: `Carlsen utiliza regularmente o Dragão Acelerado em partidas rápidas e clássicas para evitar linhas forçadas e explorar a atividade do bispo em ${mv("g7")}.`, opening: "dragaoAcelerado", step: 10, arrows: arr([['g7','d4','r'],['g7','b2','g'],['d7','d5','b']]) },
            { move: `Siciliana Najdorf (${mv("5. a6")})`, subtitle: "Luta por vitória com as peças pretas", desc: `Quando precisa desequilibrar contra jogadores de ${mv("1.e4")}, Carlsen recorre à Najdorf para criar estruturas assimétricas.`, opening: "najdorf", step: 10, arrows: arr([['a6','b5','g'],['b7','b5','b']]) },
            { move: `Sistema Viena (${mv("2. Cc3")})`, subtitle: "Fuga da teoria superpreparada", desc: "Mesmo no mais alto nível mundial, Carlsen já empregou a Abertura Viena para tirar oponentes da preparação de computador.", opening: "viena", step: 5, arrows: arr([['c3','d5','o'],['c4','f7','r']]) }
        ]
    },
    kasparov: {
        kicker: "Dinamismo e iniciativa • O rei da Siciliana",
        title: "Garry Kasparov: o maior especialista da Najdorf",
        items: [
            { move: `Variante Najdorf (${mv("5. a6")})`, subtitle: "A principal arma de toda a sua carreira", desc: `Kasparov transformou a Najdorf no sistema mais temido contra ${mv("1.e4")}, vencendo partidas históricas com contra-ataque fulminante.`, opening: "najdorf", step: 15, arrows: arr([['b7','b5','g'],['f3','a8','r']]) },
            { move: `Ruptura central (${mv("d5")} &amp; ${mv("e5")})`, subtitle: "Energia máxima das peças pretas", desc: "Sob sua condução, a Najdorf deixou de ser apenas uma defesa para se tornar um sistema de contra-ataque total.", opening: "najdorf", step: 12, arrows: arr([['e6','d5','g'],['d6','e5','o']]) },
            { move: "Dragão Acelerado", subtitle: `Domínio da grande diagonal ${mv("h8-a1")}`, desc: `Kasparov também explorava com maestria o fianchetto de bispo em ${mv("g7")} contra estruturas abertas.`, opening: "dragaoAcelerado", step: 14, arrows: arr([['g7','d4','r'],['d7','d5','g']]) }
        ]
    },
    fischer: {
        kicker: "Precisão e clareza • Revolução teórica",
        title: "Bobby Fischer: o perfeccionismo na Najdorf e na Viena",
        items: [
            { move: `Siciliana Najdorf (${mv("6. Bg5 e6")})`, subtitle: "Refinamento teórico absoluto", desc: "Fischer demonstrou como neutralizar os ataques mais agressivos das brancas na ala do rei e punir cada tempo perdido.", opening: "najdorf", step: 12, arrows: arr([['e6','d5','g'],['f8','e7','b']]) },
            { move: "Gambito e Abertura Viena", subtitle: "Ataque direto e cálculo exato", desc: "Com estilo agressivo baseado em desenvolvimento rápido, Fischer utilizou ideias da Viena para castigar erros logo na abertura.", opening: "gambitoViena", step: 7, arrows: arr([['e5','f6','r'],['c1','f4','g']]) },
            { move: "Iniciativa e tempo", subtitle: "Cada lance com propósito claro", desc: "Sua abordagem resume este repertório: lutar pelo centro, ativar todas as peças e nunca aceitar posições passivas.", opening: "viena", step: 5, arrows: arr([['c4','f7','r'],['c3','d5','o']]) }
        ]
    }
};

const OPENINGS = {
    viena: {
        title: "Abertura Viena (Linha Clássica)",
        pgn: "1. e4 e5 2. Cc3 Cf6 3. Bc4 Cc6 4. d3 Bb4 5. Cge2 d5 6. exd5 Cxd5",
        flip: false,
        steps: [
            { notation: "Início", moves: [], text: "Posição inicial. Clique em 'Próximo Lance' para iniciar a Abertura Viena.", arrows: [] },
            { notation: "1.e4", moves: [[6,4,4,4]], text: `${mv("1. e4")} — Ocupação clássica do centro e abertura das diagonais.`, arrows: arr([['e4','d5','o'],['e4','f5','o']]) },
            { notation: "1...e5", moves: [[1,4,3,4]], text: `${mv("1. e5")} — Resposta simétrica das pretas disputando o centro.`, arrows: arr([['e5','d4','r'],['e5','f4','r']]) },
            { notation: "2.Cc3", moves: [[7,1,5,2]], text: `${mv("2. Cc3")} — Protege ${mv("e4")} e mantém o peão de ${mv("f")} livre.`, arrows: arr([['c3','e4','g'],['c3','d5','o']]) },
            { notation: "2...Cf6", moves: [[0,6,2,5]], text: `${mv("2. Cf6")} — Desenvolvimento natural atacando ${mv("e4")}.`, arrows: arr([['f6','e4','r'],['f6','d5','b']]) },
            { notation: "3.Bc4", moves: [[7,5,4,2]], text: `${mv("3. Bc4")} — Mira diretamente na casa fraca ${mv("f7")}.`, arrows: arr([['c4','f7','r'],['c4','d5','o']]) },
            { notation: "3...Cc6", moves: [[0,1,2,2]], text: `${mv("3. Cc6")} — Reforça o controle de ${mv("d4")} e ${mv("e5")}.`, arrows: arr([['c6','d4','b'],['c6','e5','g']]) },
            { notation: "4.d3", moves: [[6,3,5,3]], text: `${mv("4. d3")} — Consolida o centro e abre diagonal para o bispo.`, arrows: arr([['d3','e4','g'],['c1','g5','b']]) },
            { notation: "4...Bb4", moves: [[0,5,4,1]], text: `${mv("4. Bb4")} — Crava o cavalo de ${mv("c3")} preparando ${mv("d5")}.`, arrows: arr([['b4','e1','r'],['d7','d5','b']]) },
            { notation: "5.Cge2", moves: [[7,6,6,4]], text: `${mv("5. Cge2")} — Desenvolve sem bloquear o peão de ${mv("f2")}.`, arrows: arr([['e2','c3','g'],['f2','f4','o']]) },
            { notation: "5...d5", moves: [[1,3,3,3]], text: `${mv("5. d5")} — Avanço central das pretas buscando igualdade.`, arrows: arr([['d5','e4','r'],['d5','c4','r']]) },
            { notation: "6.exd5", moves: [[4,4,3,3]], text: `${mv("6. exd5")} — Brancas abrem o centro mantendo pressão na diagonal.`, arrows: arr([['c4','g8','o']]) },
            { notation: "6...Cxd5", moves: [[2,5,3,3]], text: `${mv("6. Cxd5")} — Posição clássica da Viena com chances para ambos os lados.`, arrows: arr([['d5','c3','r'],['c4','d5','o']]) }
        ]
    },
    gambitoViena: {
        title: "Gambito Viena",
        pgn: "1. e4 e5 2. Cc3 Cf6 3. f4 exf4 4. e5 Cg8 5. Cf3 d6 6. d4 dxe5 7. De2",
        flip: false,
        steps: [
            { notation: "Início", moves: [], text: "Posição inicial. Veja como o Gambito Viena ataca o centro.", arrows: [] },
            { notation: "1.e4", moves: [[6,4,4,4]], text: `${mv("1. e4")} — Controle central imediato.`, arrows: arr([['e4','d5','o'],['e4','f5','o']]) },
            { notation: "1...e5", moves: [[1,4,3,4]], text: `${mv("1. e5")} — Pretas respondem no centro.`, arrows: arr([['e5','d4','r']]) },
            { notation: "2.Cc3", moves: [[7,1,5,2]], text: `${mv("2. Cc3")} — Impede ${mv("Dh4+")} (xeque cedo com a dama).`, arrows: arr([['c3','d5','g'],['d8','h4','r']]) },
            { notation: "2...Cf6", moves: [[0,6,2,5]], text: `${mv("2. Cf6")} — Pretas desenvolvem o cavalo do rei.`, arrows: arr([['f6','e4','r']]) },
            { notation: "3.f4!", moves: [[6,5,4,5]], text: `${mv("3. f4!")} — O Gambito Viena: desafia ${mv("e5")} para abrir a coluna ${mv("f")}.`, arrows: arr([['f4','e5','r'],['f1','f4','b']]) },
            { notation: "3...exf4", moves: [[3,4,4,5]], text: `${mv("3. exf4")} — Pretas aceitam o gambito.`, arrows: arr([['e4','e5','o']]) },
            { notation: "4.e5!", moves: [[4,4,3,4]], text: `${mv("4. e5!")} — Expulsa o cavalo de ${mv("f6")} e ganha espaço.`, arrows: arr([['e5','f6','r'],['e5','d6','o']]) },
            { notation: "4...Cg8", moves: [[2,5,0,6]], text: `${mv("4. Cg8")} — Recuo forçado do cavalo.`, arrows: arr([['g1','f3','b']]) },
            { notation: "5.Cf3", moves: [[7,6,5,5]], text: `${mv("5. Cf3")} — Desenvolve controlando ${mv("h4")}.`, arrows: arr([['f3','h4','g'],['f3','d4','o']]) },
            { notation: "5...d6", moves: [[1,3,2,3]], text: `${mv("5. d6")} — Pretas tentam minar o centro branco.`, arrows: arr([['d6','e5','r']]) },
            { notation: "6.d4", moves: [[6,3,4,3]], text: `${mv("6. d4")} — Domínio total do centro e ataque em ${mv("f4")}.`, arrows: arr([['c1','f4','r'],['d4','e5','g']]) },
            { notation: "6...dxe5", moves: [[2,3,3,4]], text: `${mv("6. dxe5")} — Pretas trocam buscando abrir linhas.`, arrows: arr([['d1','e2','b']]) },
            { notation: "7.De2!", moves: [[7,3,6,4]], text: `${mv("7. De2!")} — Crava o peão de ${mv("e5")} contra o rei preto.`, arrows: arr([['e2','e8','r'],['c1','f4','g']]) }
        ]
    },
    dragaoAcelerado: {
        title: "Defesa Siciliana: Dragão Acelerado",
        pgn: "1. e4 c5 2. Cf3 Cc6 3. d4 cxd4 4. Cxd4 g6 5. Cc3 Bg7 6. Be3 Cf6 7. Bc4 O-O",
        flip: true,
        steps: [
            { notation: "Início", moves: [], text: "Posição inicial (vista das pretas). Acompanhe o fianchetto acelerado.", arrows: [] },
            { notation: "1.e4", moves: [[6,4,4,4]], text: `${mv("1. e4")} — Peão do rei.`, arrows: arr([['e4','d5','o']]) },
            { notation: "1...c5", moves: [[1,2,3,2]], text: `${mv("1. c5")} — Defesa Siciliana: luta assimétrica por ${mv("d4")}.`, arrows: arr([['c5','d4','r']]) },
            { notation: "2.Cf3", moves: [[7,6,5,5]], text: `${mv("2. Cf3")} — Prepara ${mv("d4")}.`, arrows: arr([['f3','d4','o']]) },
            { notation: "2...Cc6", moves: [[0,1,2,2]], text: `${mv("2. Cc6")} — Desenvolve sem mover ${mv("d7")}.`, arrows: arr([['c6','d4','b'],['c6','e5','b']]) },
            { notation: "3.d4", moves: [[6,3,4,3]], text: `${mv("3. d4")} — Abertura do centro.`, arrows: arr([['c5','d4','r']]) },
            { notation: "3...cxd4", moves: [[3,2,4,3]], text: `${mv("3. cxd4")} — Captura o peão central e ganha controle sobre ${mv("c3")} e ${mv("e3")}.`, arrows: arr([['d4','c3','r'],['d4','e3','r']]) },
            { notation: "4.Cxd4", moves: [[5,5,4,3]], text: `${mv("4. Cxd4")} — Cavalo centralizado.`, arrows: arr([['d4','c6','o']]) },
            { notation: "4...g6!", moves: [[1,6,2,6]], text: `${mv("4. g6!")} — Prepara o <strong>fianchetto de bispo</strong> em ${mv("g7")} sem gastar tempo com ${mv("d6")}.`, arrows: arr([['f8','g7','g'],['d7','d5','b']]) },
            { notation: "5.Cc3", moves: [[7,1,5,2]], text: `${mv("5. Cc3")} — Desenvolvimento natural.`, arrows: arr([['c3','d5','o']]) },
            { notation: "5...Bg7", moves: [[0,5,1,6]], text: `${mv("5. Bg7")} — Bispo assume a grande diagonal ${mv("h8-a1")}.`, arrows: arr([['g7','d4','r'],['g7','b2','g'],['c6','d4','r']]) },
            { notation: "6.Be3", moves: [[7,2,5,4]], text: `${mv("6. Be3")} — Defende o cavalo de ${mv("d4")}.`, arrows: arr([['e3','d4','g']]) },
            { notation: "6...Cf6", moves: [[0,6,2,5]], text: `${mv("6. Cf6")} — Ataca ${mv("e4")} e prepara o roque.`, arrows: arr([['f6','e4','r'],['f6','g4','b']]) },
            { notation: "7.Bc4", moves: [[7,5,4,2]], text: `${mv("7. Bc4")} — Controla ${mv("d5")}.`, arrows: arr([['c4','d5','o'],['c4','f7','r']]) },
            { notation: "7...O-O", moves: [[0,4,0,6], [0,7,0,5]], text: `${mv("7. O-O")} — Roque curto concluído: rei protegido e torre ativa em ${mv("f8")}, pronto para romper com ${mv("d5")}.`, arrows: arr([['d7','d5','g'],['g7','d4','r']]) }
        ]
    },
    najdorf: {
        title: "Defesa Siciliana: Variante Najdorf",
        pgn: "1. e4 c5 2. Cf3 d6 3. d4 cxd4 4. Cxd4 Cf6 5. Cc3 a6 6. Bg5 e6 7. f4 Be7 8. Df3",
        flip: true,
        steps: [
            { notation: "Início", moves: [], text: "Posição inicial (vista das pretas). Explore a Siciliana Najdorf.", arrows: [] },
            { notation: "1.e4", moves: [[6,4,4,4]], text: `${mv("1. e4")} — Peão do rei.`, arrows: arr([['e4','d5','o']]) },
            { notation: "1...c5", moves: [[1,2,3,2]], text: `${mv("1. c5")} — Defesa Siciliana.`, arrows: arr([['c5','d4','r']]) },
            { notation: "2.Cf3", moves: [[7,6,5,5]], text: `${mv("2. Cf3")} — Desenvolvimento natural.`, arrows: arr([['f3','d4','o']]) },
            { notation: "2...d6", moves: [[1,3,2,3]], text: `${mv("2. d6")} — Controla ${mv("e5")}.`, arrows: arr([['d6','e5','g'],['c8','g4','b']]) },
            { notation: "3.d4", moves: [[6,3,4,3]], text: `${mv("3. d4")} — Abertura do centro.`, arrows: arr([['c5','d4','r']]) },
            { notation: "3...cxd4", moves: [[3,2,4,3]], text: `${mv("3. cxd4")} — Captura no centro e ganha controle sobre ${mv("c3")} e ${mv("e3")}.`, arrows: arr([['d4','c3','r'],['d4','e3','r']]) },
            { notation: "4.Cxd4", moves: [[5,5,4,3]], text: `${mv("4. Cxd4")} — Retomada de cavalo.`, arrows: arr([['d4','e6','o']]) },
            { notation: "4...Cf6", moves: [[0,6,2,5]], text: `${mv("4. Cf6")} — Ataca ${mv("e4")}.`, arrows: arr([['f6','e4','r']]) },
            { notation: "5.Cc3", moves: [[7,1,5,2]], text: `${mv("5. Cc3")} — Defende ${mv("e4")}.`, arrows: arr([['c3','b5','o'],['f1','b5','o']]) },
            { notation: "5...a6!", moves: [[1,0,2,0]], text: `${mv("5. a6!")} — A Najdorf: controla ${mv("b5")} e prepara ${mv("b5")} e ${mv("e5")}.`, arrows: arr([['a6','b5','g'],['b7','b5','b']]) },
            { notation: "6.Bg5", moves: [[7,2,3,6]], text: `${mv("6. Bg5")} — Crava o cavalo de ${mv("f6")}.`, arrows: arr([['g5','d8','r']]) },
            { notation: "6...e6", moves: [[1,4,2,4]], text: `${mv("6. e6")} — Consolida ${mv("d5")} e neutraliza o bispo branco.`, arrows: arr([['e6','d5','g'],['f8','e7','b']]) },
            { notation: "7.f4", moves: [[6,5,4,5]], text: `${mv("7. f4")} — Ganha espaço na ala do rei.`, arrows: arr([['f4','e5','o']]) },
            { notation: "7...Be7", moves: [[0,5,1,4]], text: `${mv("7. Be7")} — Descrava ${mv("f6")} e prepara roque.`, arrows: arr([['e7','g5','g']]) },
            { notation: "8.Df3", moves: [[7,3,5,5]], text: `${mv("8. Df3")} — Prepara roque grande e pressiona a diagonal.`, arrows: arr([['f3','a8','r'],['b7','b5','b']]) }
        ]
    }
};

let currentOpening = 'viena';
let currentStep = 0;
let isFlipped = false;
let customArrows = null;
let animTimer = null;
let pendingCommit = null;

document.addEventListener('DOMContentLoaded', () => {
    const boardEl = document.getElementById('chessBoard');
    const animLayerEl = document.getElementById('pieceAnimationLayer');
    const arrowLayerEl = document.getElementById('arrowLayer');
    const titleEl = document.getElementById('openingTitle');
    const pgnEl = document.getElementById('pgnDisplay');
    const commentEl = document.getElementById('moveComment');
    const stepCounterEl = document.getElementById('stepCounter');
    const progressFillEl = document.getElementById('progressFill');
    const explorerSection = document.getElementById('explorador');

    const prevBtn = document.getElementById('prevMove');
    const nextBtn = document.getElementById('nextMove');
    const flipBtn = document.getElementById('flipBoard');
    const resetBtn = document.getElementById('resetBoard');
    const opButtons = document.querySelectorAll('.op-btn');

    function flushAnimation() {
        if (animTimer) {
            clearTimeout(animTimer);
            animTimer = null;
        }
        animLayerEl.innerHTML = '';
        if (pendingCommit) {
            const fn = pendingCommit;
            pendingCommit = null;
            fn();
        }
    }

    function drawArrows(arrows) {
        arrowLayerEl.innerHTML = '';
        if (!arrows || !arrows.length) return;
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        arrows.forEach((a, i) => {
            const [fR, fC] = sqToCoord(a.from);
            const [tR, tC] = sqToCoord(a.to);
            const x1 = (isFlipped ? 7 - fC : fC) * 100 + 50;
            const y1 = (isFlipped ? 7 - fR : fR) * 100 + 50;
            const x2 = (isFlipped ? 7 - tC : tC) * 100 + 50;
            const y2 = (isFlipped ? 7 - tR : tR) * 100 + 50;
            const len = Math.hypot(x2 - x1, y2 - y1);
            if (!len) return;

            const mId = `ah-${i}`;
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            marker.setAttribute('id', mId);
            marker.setAttribute('markerWidth', '5');
            marker.setAttribute('markerHeight', '5');
            marker.setAttribute('refX', '2.5');
            marker.setAttribute('refY', '2.5');
            marker.setAttribute('orient', 'auto');

            const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            poly.setAttribute('points', '0,0 5,2.5 0,5');
            poly.setAttribute('fill', a.color);
            marker.appendChild(poly);
            defs.appendChild(marker);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2 - ((x2 - x1) / len) * 22);
            line.setAttribute('y2', y2 - ((y2 - y1) / len) * 22);
            line.setAttribute('stroke', a.color);
            line.setAttribute('stroke-width', '12');
            line.setAttribute('stroke-linecap', 'round');
            line.setAttribute('opacity', '0.88');
            line.setAttribute('marker-end', `url(#${mId})`);
            arrowLayerEl.appendChild(line);
        });

        arrowLayerEl.insertBefore(defs, arrowLayerEl.firstChild);
    }

    function getBoard(openingKey, stepIndex) {
        const board = INITIAL_BOARD.map(r => [...r]);
        const steps = OPENINGS[openingKey].steps;
        for (let i = 1; i <= stepIndex; i++) {
            const movesList = steps[i].moves || [];
            movesList.forEach(([fR, fC, tR, tC]) => {
                board[tR][tC] = board[fR][fC];
                board[fR][fC] = '';
            });
        }
        return board;
    }

    function isHighlighted(r, c, movesList) {
        if (!movesList || !movesList.length) return false;
        return movesList.some(([fR, fC, tR, tC]) => (r === fR && c === fC) || (r === tR && c === tC));
    }

    function isHiddenOrigin(r, c, movesList) {
        if (!movesList || !movesList.length) return false;
        return movesList.some(([fR, fC]) => r === fR && c === fC);
    }

    function paintSquares(board, highlightMoves, hideOrigins) {
        boardEl.innerHTML = '';
        for (let rI = 0; rI < 8; rI++) {
            for (let cI = 0; cI < 8; cI++) {
                const r = isFlipped ? 7 - rI : rI;
                const c = isFlipped ? 7 - cI : cI;
                const sq = document.createElement('div');
                sq.classList.add('square', (r + c) % 2 === 0 ? 'light' : 'dark');

                if (isHighlighted(r, c, highlightMoves)) {
                    sq.classList.add('highlight');
                }

                if (cI === 0) {
                    const rankLabel = document.createElement('span');
                    rankLabel.className = 'coord-rank';
                    rankLabel.textContent = String(8 - r);
                    sq.appendChild(rankLabel);
                }

                if (rI === 7) {
                    const fileLabel = document.createElement('span');
                    fileLabel.className = 'coord-file';
                    fileLabel.textContent = FILES[c];
                    sq.appendChild(fileLabel);
                }

                if (board[r][c] && !isHiddenOrigin(r, c, hideOrigins)) {
                    sq.appendChild(document.createTextNode(PIECES[board[r][c]]));
                }
                boardEl.appendChild(sq);
            }
        }
    }

    function render(animMoves = null, preBoard = null, overrideText = null) {
        flushAnimation();

        const data = OPENINGS[currentOpening];
        const total = data.steps.length - 1;
        const finalBoard = getBoard(currentOpening, currentStep);
        const stepObj = data.steps[currentStep];
        const highlightMoves = animMoves && animMoves.length ? animMoves : stepObj.moves;

        titleEl.textContent = data.title;
        pgnEl.textContent = data.pgn;
        commentEl.innerHTML = overrideText || stepObj.text;
        stepCounterEl.textContent = `Jogada ${currentStep} / ${total} • ${stepObj.notation}`;
        progressFillEl.style.width = `${(currentStep / total) * 100}%`;

        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === total;

        const activeArrows = customArrows !== null ? customArrows : (stepObj.arrows || []);

        if (animMoves && animMoves.length && preBoard) {
            paintSquares(preBoard, animMoves, animMoves);
            arrowLayerEl.style.opacity = '0';

            let animatedCount = 0;
            animMoves.forEach(([fromR, fromC, toR, toC]) => {
                const pieceCode = preBoard[fromR][fromC];
                if (!pieceCode) return;

                const dispFromC = isFlipped ? 7 - fromC : fromC;
                const dispFromR = isFlipped ? 7 - fromR : fromR;
                const dispToC = isFlipped ? 7 - toC : toC;
                const dispToR = isFlipped ? 7 - toR : toR;

                const flyer = document.createElement('div');
                flyer.className = 'flying-piece';
                flyer.textContent = PIECES[pieceCode];
                flyer.style.transform = `translate(${dispToC * 100}%, ${dispToR * 100}%)`;
                animLayerEl.appendChild(flyer);

                if (typeof flyer.animate === 'function') {
                    flyer.animate([
                        { transform: `translate(${dispFromC * 100}%, ${dispFromR * 100}%) scale(1.15)` },
                        { transform: `translate(${dispToC * 100}%, ${dispToR * 100}%) scale(1)` }
                    ], {
                        duration: 420,
                        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        fill: 'forwards'
                    });
                }
                animatedCount++;
            });

            if (animatedCount > 0) {
                pendingCommit = () => {
                    paintSquares(finalBoard, highlightMoves, null);
                    drawArrows(activeArrows);
                    arrowLayerEl.style.opacity = '1';
                };

                animTimer = setTimeout(() => {
                    animLayerEl.innerHTML = '';
                    animTimer = null;
                    if (pendingCommit) {
                        const fn = pendingCommit;
                        pendingCommit = null;
                        fn();
                    }
                }, 430);
                return;
            }
        }

        paintSquares(finalBoard, highlightMoves, null);
        drawArrows(activeArrows);
        arrowLayerEl.style.opacity = '1';
    }

    function jumpToBoard(openingKey, stepIndex, arrows, customText) {
        flushAnimation();
        currentOpening = openingKey;
        currentStep = stepIndex;
        isFlipped = OPENINGS[openingKey].flip;
        customArrows = arrows || null;
        opButtons.forEach(b => b.classList.toggle('active', b.dataset.opening === openingKey));

        const stepObj = OPENINGS[openingKey].steps[stepIndex];
        const stepMoves = stepObj?.moves || [];
        const prevBoard = stepIndex > 0 ? getBoard(openingKey, stepIndex - 1) : null;

        smoothScrollTo(explorerSection, 950, 80);

        if (stepMoves.length && prevBoard) {
            paintSquares(prevBoard, stepMoves, null);
            drawArrows([]);
            titleEl.textContent = OPENINGS[openingKey].title;
            pgnEl.textContent = OPENINGS[openingKey].pgn;
            const total = OPENINGS[openingKey].steps.length - 1;
            stepCounterEl.textContent = `Jogada ${stepIndex} / ${total} • ${stepObj.notation}`;
            progressFillEl.style.width = `${(stepIndex / total) * 100}%`;
            prevBtn.disabled = stepIndex === 0;
            nextBtn.disabled = stepIndex === total;
            commentEl.innerHTML = customText || stepObj.text;

            animTimer = setTimeout(() => {
                animTimer = null;
                render(stepMoves, prevBoard, customText);
            }, 650);
        } else {
            render(null, null, customText);
        }
    }

    document.querySelectorAll('.direct-board-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const opKey = btn.getAttribute('data-jump-opening');
            const st = parseInt(btn.getAttribute('data-jump-step'), 10) || 1;
            jumpToBoard(opKey, st, null, null);
        });
    });

    function renderPanel(panelEl, key) {
        const data = PANELS[key];
        if (!panelEl || !data) return;
        panelEl.innerHTML = `<div class="detail-header"><span>${data.kicker}</span><h3>${data.title}</h3></div><div class="move-breakdown-grid"></div>`;
        const grid = panelEl.querySelector('.move-breakdown-grid');

        data.items.forEach(item => {
            const box = document.createElement('article');
            box.className = 'move-step-box';
            box.setAttribute('role', 'button');
            box.setAttribute('tabindex', '0');
            box.innerHTML = `
                <div class="step-box-top">
                    <span class="move-pill">${item.move}</span>
                    <span class="board-jump-badge">Ver no tabuleiro ↗</span>
                </div>
                <h4>${item.subtitle}</h4>
                <p>${item.desc}</p>
            `;
            const go = () => jumpToBoard(item.opening, item.step, item.arrows, `${item.move} — ${item.desc}`);
            box.addEventListener('click', go);
            box.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
            grid.appendChild(box);
        });
    }

    function bindGroup(selector, panelId, attr, defaultKey) {
        const tabs = document.querySelectorAll(selector);
        const panelEl = document.getElementById(panelId);
        tabs.forEach(tab => {
            const open = () => {
                tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-pressed', 'false'); });
                tab.classList.add('active');
                tab.setAttribute('aria-pressed', 'true');
                renderPanel(panelEl, tab.getAttribute(attr));
                smoothScrollTo(panelEl, 700, 100);
            };
            tab.addEventListener('click', open);
            tab.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
        });
        renderPanel(panelEl, defaultKey);
    }

    bindGroup('.philosophy-tab', 'philosophyDetail', 'data-side', 'brancas');
    bindGroup('.white-tab', 'whiteDetail', 'data-white', 'classica');
    bindGroup('.black-tab', 'blackDetail', 'data-black', 'dragao');
    bindGroup('.gallery-tab', 'conceptDetail', 'data-concept', 'carlsen');

    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    menuToggle.addEventListener('click', () => {
        const expanded = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(expanded));
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId.length > 1) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    smoothScrollTo(targetEl, 850, 80);
                }
            }
        });
    });

    opButtons.forEach(btn => btn.addEventListener('click', () => {
        flushAnimation();
        opButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentOpening = btn.dataset.opening;
        currentStep = 0;
        customArrows = null;
        isFlipped = OPENINGS[currentOpening].flip;
        render();
    }));

    function goNext() {
        flushAnimation();
        const steps = OPENINGS[currentOpening].steps;
        if (currentStep < steps.length - 1) {
            const preBoard = getBoard(currentOpening, currentStep);
            customArrows = null;
            currentStep++;
            const moveVecs = steps[currentStep].moves;
            render(moveVecs, preBoard);
        }
    }

    function goPrev() {
        flushAnimation();
        const steps = OPENINGS[currentOpening].steps;
        if (currentStep > 0) {
            const preBoard = getBoard(currentOpening, currentStep);
            const undoneMoves = steps[currentStep].moves || [];
            const reverseVecs = undoneMoves.map(([fR, fC, tR, tC]) => [tR, tC, fR, fC]);
            customArrows = null;
            currentStep--;
            render(reverseVecs, preBoard);
        }
    }

    nextBtn.addEventListener('click', goNext);
    prevBtn.addEventListener('click', goPrev);
    flipBtn.addEventListener('click', () => { flushAnimation(); isFlipped = !isFlipped; render(); });
    resetBtn.addEventListener('click', () => { flushAnimation(); customArrows = null; currentStep = 0; render(); });

    document.addEventListener('keydown', (e) => {
        if (e.target.matches('input, textarea, select')) return;
        const rect = explorerSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (!isVisible) return;

        if (e.key === 'ArrowRight') {
            e.preventDefault();
            goNext();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goPrev();
        }
    });

    render();
});