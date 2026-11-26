# repertorio-xadrez
Estudo teórico e explorador interativo de aberturas de xadrez (Abertura Viena &amp; Defesa Siciliana) desenvolvido em HTML5, CSS3 e JavaScript puro.
# Meu Repertório Teórico — Abertura Viena & Defesa Siciliana

Aplicação web interativa dedicada ao estudo teórico de aberturas de xadrez focadas em **1.e4**, reunindo análise posicional, referências históricas de Grandes Mestres e um explorador de lances de livro construído em **JavaScript puro (Vanilla JS)** sem dependências externas.

**Acesse o projeto online:** `https://bruventurelli.github.io/repertorio-xadrez/`

---

## Funcionalidades

- **Explorador Interativo de Aberturas:**
  - **De Brancas:** Abertura Viena Clássica (`1.e4 e5 2.Cc3`) e Gambito Viena (`3.f4`).
  - **De Pretas:** Defesa Siciliana — Dragão Acelerado (`4...g6`) e Variante Najdorf (`5...a6`).
- **Animação Fluida das Peças:** Movimentação suave casa a casa utilizando a *Web Animations API*, incluindo roque simultâneo (`7...O-O`).
- **Camada Vetorial de Setas Táticas (SVG):** Setas dinâmicas com código de cores para controle central, ameaça/pressão, proteção/ruptura e planos estratégicos, recalculadas automaticamente ao inverter o tabuleiro.
- **Painéis Analíticos Interativos:** Cards clicáveis que detalham ideias-chave e saltam diretamente para a posição correspondente no tabuleiro.
- **Navegação Acessível:** Suporte completo a teclado (setas `←` e `→` para navegar pelos lances), coordenadas algébricas dinâmicas (`a–h`, `1–8`), *skip link* e layout responsivo.

---

## Tecnologias Utilizadas

- **HTML5 Semântico:** Estrutura acessível com regiões `aria-live`, figuras legendadas e navegação por teclado.
- **CSS3 Moderno:** Design system baseado em variáveis CSS (`:root`), CSS Grid, Flexbox e paleta inspirada em plataformas enxadrísticas.
- **JavaScript (ES6+):** Motor próprio de reconstrução de estado do tabuleiro, renderização SVG dinâmica e rolagem suave personalizada.

---

## Estrutura do Projeto

```text
repertorio-xadrez/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── img/
        ├── hero-chess.jpg
        ├── karlsen.jpg
        ├── kasparov.jpg
        └── fischer.jpg
