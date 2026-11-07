/* =========================================================
   1) SOLUTION DU JEU  — à compléter avec TON contenu !
   ========================================================= */
const solution = [
  {
    title: "Début de l'aventure",
    html: `
      <h3>Premiers pas</h3>
      <p>Tu commences l'aventure avec ton premier partenaire Digimon. Parle aux habitants du village pour comprendre les bases.</p>
      <ul>
        <li>Récupère les objets autour de ta maison.</li>
        <li>Parle à tout le monde pour débloquer les premières quêtes.</li>
        <li>Équipe ton Digimon avant de sortir.</li>
      </ul>
      <div class="tip">💡 <strong>Astuce :</strong> sauvegarde souvent avant les donjons !</div>`
  },
  {
    title: "Donjon 1",
    html: `
      <h3>Premier donjon</h3>
      <p>Explore chaque salle, évite les pièges et gagne de l'expérience.</p>
      <ul>
        <li>Ramasse tous les coffres.</li>
        <li>Utilise tes attaques à distance contre les ennemis résistants.</li>
      </ul>
      <p><strong>Boss :</strong> à compléter (stratégie, faiblesses…)</p>`
  },
  {
    title: "Donjon 2",
    html: `<h3>Deuxième donjon</h3><p>✏️ Ajoute ici ton guide pour ce donjon.</p>`
  },
  {
    title: "Boss & Secrets",
    html: `
      <h3>Boss & secrets</h3>
      <p>✏️ Liste ici les boss, leurs faiblesses, les objets cachés et les astuces.</p>`
  }
];

const tabsEl = document.getElementById("solutionTabs");
const contentEl = document.getElementById("solutionContent");

function showSolution(i) {
  [...tabsEl.children].forEach((t, idx) => t.classList.toggle("active", idx === i));
  contentEl.innerHTML = solution[i].html;
}
solution.forEach((s, i) => {
  const b = document.createElement("button");
  b.className = "tab";
  b.textContent = s.title;
  b.onclick = () => showSolution(i);
  tabsEl.appendChild(b);
});
showSolution(0);

/* =========================================================
   2) DIGIVOLUTIONS — à compléter avec TES données
   ========================================================= */
const evolutions = [
  {
    line: "Lignée Agumon",
    stages: [
      { name: "Agumon",       level: "Rookie",   emoji: "🦖", cond: "Départ" },
      { name: "Greymon",      level: "Champion", emoji: "🔥", cond: "Niv. 20 + stats ATK" },
      { name: "MetalGreymon", level: "Ultimate", emoji: "🤖", cond: "Niv. 40 + Dig. Core" }
    ]
  },
  {
    line: "Lignée Gabumon",
    stages: [
      { name: "Gabumon",   level: "Rookie",   emoji: "🐺", cond: "Départ" },
      { name: "Garurumon", level: "Champion", emoji: "🐺", cond: "Niv. 20" },
      { name: "WereGarurumon", level: "Ultimate", emoji: "🌕", cond: "Niv. 40" }
    ]
  },
  {
    line: "Lignée Patamon",
    stages: [
      { name: "Patamon", level: "Rookie",   emoji: "🦇", cond: "Départ" },
      { name: "Angemon", level: "Champion", emoji: "👼", cond: "Niv. 20" },
      { name: "MagnaAngemon", level: "Ultimate", emoji: "⚔️", cond: "Niv. 40" }
    ]
  },
  {
    line: "Lignée Guilmon",
    stages: [
      { name: "Guilmon",  level: "Rookie",   emoji: "🐉", cond: "Départ" },
      { name: "Growlmon", level: "Champion", emoji: "🔥", cond: "Niv. 20" },
      { name: "WarGrowlmon", level: "Ultimate", emoji: "🚀", cond: "Niv. 40" }
    ]
  }
];

const evoList = document.getElementById("evoList");
const digiSearch = document.getElementById("digiSearch");
const digiFilters = document.getElementById("digiFilters");
let evoFilter = "Tous";

["Tous", "Rookie", "Champion", "Ultimate"].forEach(f => {
  const b = document.createElement("button");
  b.className = "filter" + (f === "Tous" ? " active" : "");
  b.textContent = f;
  b.onclick = () => {
    evoFilter = f;
    [...digiFilters.children].forEach(c => c.classList.remove("active"));
    b.classList.add("active");
    renderEvolutions();
  };
  digiFilters.appendChild(b);
});

function renderEvolutions() {
  const q = digiSearch.value.trim().toLowerCase();
  evoList.innerHTML = "";
  let count = 0;

  evolutions.forEach(line => {
    const match = line.stages.some(s => s.name.toLowerCase().includes(q)) || line.line.toLowerCase().includes(q);
    const levelMatch = evoFilter === "Tous" || line.stages.some(s => s.level === evoFilter);
    if (!match || !levelMatch) return;
    count++;

    const div = document.createElement("div");
    div.className = "evo-line";
    div.innerHTML = `<h3>${line.line}</h3><div class="evo-chain"></div>`;
    const chain = div.querySelector(".evo-chain");

    line.stages.forEach((s, i) => {
      if (i > 0) chain.insertAdjacentHTML("beforeend", `<span class="evo-arrow">▶</span>`);
      chain.insertAdjacentHTML("beforeend", `
        <div class="evo-step stage-${s.level.toLowerCase()}">
          <div class="emoji">${s.emoji}</div>
          <div class="name">${s.name}</div>
          <div class="lvl">[ ${s.level} ]</div>
          <div class="cond">${s.cond}</div>
        </div>`);
    });
    evoList.appendChild(div);
  });

  if (!count) evoList.innerHTML = `<p class="empty">Aucun Digimon trouvé...</p>`;
}
digiSearch.addEventListener("input", renderEvolutions);
renderEvolutions();

/* =========================================================
   3) CARTES — à compléter avec TES données
   ========================================================= */
const cards = [
  { no: "001", name: "Petit Soin",   type: "Soin",    emoji: "💚", fx: "Restaure un peu de PV." },
  { no: "002", name: "Méga Soin",    type: "Soin",    emoji: "💖", fx: "Restaure beaucoup de PV." },
  { no: "003", name: "Flamme",       type: "Attaque", emoji: "🔥", fx: "Inflige des dégâts de feu." },
  { no: "004", name: "Foudre",       type: "Attaque", emoji: "⚡", fx: "Inflige des dégâts électriques." },
  { no: "005", name: "Bouclier",     type: "Soutien", emoji: "🛡️", fx: "Augmente la défense." },
  { no: "006", name: "Boost ATK",    type: "Soutien", emoji: "💪", fx: "Augmente l'attaque." },
  { no: "007", name: "Digivolution", type: "Spécial", emoji: "🧬", fx: "Force l'évolution temporaire." },
  { no: "008", name: "Téléport",     type: "Spécial", emoji: "🌀", fx: "Quitte le donjon instantanément." }
];

const cardsGrid = document.getElementById("cardsGrid");
const cardSearch = document.getElementById("cardSearch");
const cardFilters = document.getElementById("cardFilters");
let cardFilter = "Tous";

["Tous", "Attaque", "Soin", "Soutien", "Spécial"].forEach(f => {
  const b = document.createElement("button");
  b.className = "filter" + (f === "Tous" ? " active" : "");
  b.textContent = f;
  b.onclick = () => {
    cardFilter = f;
    [...cardFilters.children].forEach(c => c.classList.remove("active"));
    b.classList.add("active");
    renderCards();
  };
  cardFilters.appendChild(b);
});

function renderCards() {
  const q = cardSearch.value.trim().toLowerCase();
  const list = cards.filter(c =>
    (cardFilter === "Tous" || c.type === cardFilter) &&
    (c.name.toLowerCase().includes(q) || c.fx.toLowerCase().includes(q))
  );

  cardsGrid.innerHTML = list.length ? "" : `<p class="empty">Aucune carte trouvée...</p>`;
  list.forEach(c => {
    const typeClass = "type-" + c.type.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    cardsGrid.insertAdjacentHTML("beforeend", `
      <div class="card ${typeClass}">
        <div class="card-no">N° ${c.no}</div>
        <div class="card-art">${c.emoji}</div>
        <div class="card-name">${c.name}</div>
        <div class="card-type">[ ${c.type} ]</div>
        <div class="card-fx">${c.fx}</div>
      </div>`);
  });
}
cardSearch.addEventListener("input", renderCards);
renderCards();

/* =========================================================
   4) BOUTON RETOUR EN HAUT
   ========================================================= */
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 500));
toTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
