const money = value => new Intl.NumberFormat("pt-BR", {style:"currency",currency:"BRL"}).format(Number.isFinite(value) ? value : 0);

document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }));
}

// Destaque o link da seção visível
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      }
    });
  }, {rootMargin:"-25% 0px -60% 0px"});
  sections.forEach(section => observer.observe(section));
}

// Simulador de juros compostos com aportes mensais
const initialInput = document.getElementById("initial");
const monthlyInput = document.getElementById("monthly");
const rateInput = document.getElementById("rate");
const yearsInput = document.getElementById("years");

function calculateInvestment() {
  const initial = Math.max(0, Number(initialInput.value) || 0);
  const monthly = Math.max(0, Number(monthlyInput.value) || 0);
  const annualRate = Math.min(100, Math.max(0, Number(rateInput.value) || 0)) / 100;
  const years = Math.min(50, Math.max(1, Math.floor(Number(yearsInput.value) || 1)));
  const monthlyRate = Math.pow(1 + annualRate, 1/12) - 1;
  const months = years * 12;
  let balance = initial;
  for (let month = 0; month < months; month++) {
    balance *= 1 + monthlyRate;
    balance += monthly;
  }
  const invested = initial + monthly * months;
  document.getElementById("result").textContent = money(balance);
  document.getElementById("invested").textContent = money(invested);
  document.getElementById("earnings").textContent = money(Math.max(0, balance - invested));
}
document.getElementById("calculate").addEventListener("click", calculateInvestment);
[initialInput, monthlyInput, rateInput, yearsInput].forEach(input => input.addEventListener("change", calculateInvestment));
calculateInvestment();

// Conteúdo didático dos módulos
const lessons = {
  organizar: {
    kicker:"MÓDULO 01 · FUNDAMENTOS",
    title:"Fundamentos e economia básica",
    body:`<p>Entender conceitos básicos da economia ajuda a interpretar como os preços, os juros e as decisões do Banco Central afetam o seu dia a dia.</p><ul><li><strong>Inflação:</strong> aumento generalizado dos preços, que reduz o poder de compra ao longo do tempo.</li><li><strong>Juros:</strong> custo do dinheiro ao longo do tempo, presente em empréstimos e investimentos.</li><li><strong>Taxa Selic:</strong> taxa básica de juros da economia brasileira, definida pelo Banco Central.</li><li><strong>Na prática:</strong> compare informações e considere seus objetivos antes de tomar decisões financeiras.</li></ul><p>Este conteúdo é educativo e não constitui recomendação de investimento.</p>`
  },
  rendafixa: {
    kicker:"MÓDULO 02 · INVESTIMENTOS",
    title:"Conheça a renda fixa",
    body:`<p>Na renda fixa, as regras de remuneração são definidas no momento da aplicação, embora o resultado e a possibilidade de resgate dependam do produto escolhido.</p><ul><li><strong>Tesouro Direto:</strong> títulos públicos federais com diferentes formas de remuneração e prazos.</li><li><strong>CDB:</strong> título emitido por banco; verifique prazo, liquidez e condições.</li><li><strong>LCI e LCA:</strong> títulos ligados aos setores imobiliário e do agronegócio, sujeitos a regras próprias.</li><li><strong>Antes de escolher:</strong> compare risco, liquidez, custos, impostos e objetivo.</li></ul><p>Rentabilidade passada ou estimada não garante resultados futuros.</p>`
  },
  protecao: {
    kicker:"MÓDULO 03 · PROTEÇÃO",
    title:"Proteção patrimonial e IPCA+",
    body:`<p>Alguns investimentos têm sua remuneração ligada à inflação. Entender como funcionam ajuda a avaliar se fazem sentido para objetivos de longo prazo.</p><ul><li><strong>IPCA:</strong> índice oficial que acompanha a variação de preços ao consumidor.</li><li><strong>Títulos indexados:</strong> podem combinar uma taxa prefixada com a variação do IPCA.</li><li><strong>Prazo:</strong> oscilações de preço podem ocorrer antes do vencimento.</li><li><strong>Avalie:</strong> considere liquidez, prazo, riscos e adequação aos seus objetivos.</li></ul><p>Rentabilidade não é garantida e pode variar conforme as condições do mercado.</p>`
  },
  acoes: {
    kicker:"MÓDULO 04 · RENDA VARIÁVEL",
    title:"Renda variável e empresas",
    body:`<p>Ao comprar uma ação, você adquire uma pequena participação em uma empresa. O preço pode subir ou cair, e não há garantia de retorno.</p><ul><li><strong>Pesquise a empresa:</strong> conheça seu negócio, resultados e setor de atuação.</li><li><strong>Dividendos:</strong> são distribuições que podem ocorrer, sem garantia de frequência ou valor.</li><li><strong>Volatilidade:</strong> preços variam e podem resultar em perdas, inclusive do valor investido.</li><li><strong>Planeje:</strong> avalie seu horizonte, objetivos e tolerância a riscos.</li></ul>`
  },
  fiis: {
    kicker:"MÓDULO 05 · FUNDOS IMOBILIÁRIOS",
    title:"Fundos imobiliários (FIIs)",
    body:`<p>Fundos imobiliários reúnem recursos de investidores para aplicações relacionadas ao mercado imobiliário. As cotas são negociadas em bolsa e podem oscilar.</p><ul><li><strong>Tipos:</strong> há fundos de imóveis, recebíveis e estratégias mistas.</li><li><strong>Rendimentos:</strong> distribuições podem variar e não são garantidas.</li><li><strong>Riscos:</strong> vacância, crédito, mercado e liquidez podem afetar o fundo.</li><li><strong>Pesquise:</strong> leia documentos, custos e informações do fundo antes de decidir.</li></ul>`
  },
  estrategia: {
    kicker:"MÓDULO 06 · ESTRATÉGIA",
    title:"Metodologias de investimento",
    body:`<p>Uma estratégia deve partir dos seus objetivos e da sua realidade financeira, não de promessas de ganhos rápidos.</p><ul><li><strong>Defina objetivos:</strong> considere finalidade, prazo e necessidade de acesso ao dinheiro.</li><li><strong>Conheça seu perfil:</strong> avalie como você lida com oscilações e possíveis perdas.</li><li><strong>Diversifique:</strong> distribuir recursos pode ajudar a reduzir concentração, mas não elimina riscos.</li><li><strong>Acompanhe:</strong> revise a estratégia quando seus objetivos ou condições mudarem.</li></ul><p>Considere buscar orientação profissional adequada às suas necessidades.</p>`
  }
};
document.querySelectorAll("[data-lesson]").forEach(button => {
  button.addEventListener("click", () => {
    const lesson = lessons[button.dataset.lesson];
    document.getElementById("lesson-kicker").textContent = lesson.kicker;
    document.getElementById("lesson-title").textContent = lesson.title;
    document.getElementById("lesson-body").innerHTML = lesson.body;
    const panel = document.getElementById("lesson-panel");
    panel.classList.remove("hidden");
    panel.scrollIntoView({behavior:"smooth",block:"nearest"});
  });
});
document.getElementById("close-lesson").addEventListener("click", () => document.getElementById("lesson-panel").classList.add("hidden"));

// Pesquisa e filtros do glossário
let activeFilter = "todos";
const termCards = [...document.querySelectorAll(".term-card")];
const emptyState = document.getElementById("empty-state");
function filterGlossary() {
  let visible = 0;
  termCards.forEach(card => {
    const matchesCategory = activeFilter === "todos" || card.dataset.category === activeFilter;
    const show = matchesCategory;
    card.classList.toggle("hidden", !show);
    if (show) visible++;
  });
  emptyState.classList.toggle("hidden", visible !== 0);
}
document.querySelectorAll(".filter-pill").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-pill").forEach(pill => pill.classList.toggle("selected", pill === button));
    filterGlossary();
  });
});
