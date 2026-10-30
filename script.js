/* MediFind – Logic Legends, LPU. ALL DATA BELOW IS FICTIONAL DEMO DATA (prices, stock, pharmacies). */

// ---------- Demo data ----------
const CATEGORIES = [
  { name: "Pain Relief", icon: "🩹" }, { name: "Fever", icon: "🌡️" }, { name: "Cold & Cough", icon: "🤧" },
  { name: "Allergy", icon: "🌼" }, { name: "Digestive Health", icon: "🫧" },
  { name: "Vitamins & Supplements", icon: "💊" }, { name: "First Aid", icon: "🧴" }
];
const ICONS = Object.fromEntries(CATEGORIES.map(c => [c.name, c.icon]));

// genericAlternative keeps the same active ingredient, strength and form (checked by hand for this demo).
const MEDICINES = [
  { id: 1, name: "Crocin 500", brand: "Crocin", manufacturer: "GSK Consumer", activeIngredient: "Paracetamol", strength: "500 mg", form: "Tablet", packSize: "Strip of 15 tablets", category: "Fever", mrp: 32, demoPrice: 29, genericAlternative: { name: "Paracetamol 500 mg (generic)", price: 14 }, stockStatus: "In stock" },
  { id: 2, name: "Dolo 650", brand: "Dolo", manufacturer: "Micro Labs", activeIngredient: "Paracetamol", strength: "650 mg", form: "Tablet", packSize: "Strip of 15 tablets", category: "Fever", mrp: 34, demoPrice: 31, genericAlternative: { name: "Paracetamol 650 mg (generic)", price: 16 }, stockStatus: "In stock" },
  { id: 3, name: "Brufen 400", brand: "Brufen", manufacturer: "Abbott", activeIngredient: "Ibuprofen", strength: "400 mg", form: "Tablet", packSize: "Strip of 15 tablets", category: "Pain Relief", mrp: 42, demoPrice: 38, genericAlternative: { name: "Ibuprofen 400 mg (generic)", price: 21 }, stockStatus: "Low stock" },
  { id: 4, name: "Disprin", brand: "Disprin", manufacturer: "Reckitt", activeIngredient: "Aspirin", strength: "350 mg", form: "Dispersible tablet", packSize: "Strip of 10 tablets", category: "Pain Relief", mrp: 20, demoPrice: 18, genericAlternative: { name: "Aspirin 350 mg dispersible (generic)", price: 11 }, stockStatus: "In stock" },
  { id: 5, name: "Okacet", brand: "Okacet", manufacturer: "Cipla", activeIngredient: "Cetirizine", strength: "10 mg", form: "Tablet", packSize: "Strip of 10 tablets", category: "Allergy", mrp: 27, demoPrice: 24, genericAlternative: { name: "Cetirizine 10 mg (generic)", price: 12 }, stockStatus: "In stock" },
  { id: 6, name: "Benadryl Cough Formula", brand: "Benadryl", manufacturer: "Kenvue", activeIngredient: "Diphenhydramine", strength: "14.08 mg per 5 ml", form: "Syrup", packSize: "Bottle of 150 ml", category: "Cold & Cough", mrp: 118, demoPrice: 110, genericAlternative: null, stockStatus: "In stock" },
  { id: 7, name: "Digene", brand: "Digene", manufacturer: "Abbott", activeIngredient: "Magnesium hydroxide + aluminium hydroxide", strength: "Combination tablet", form: "Chewable tablet", packSize: "Strip of 15 tablets", category: "Digestive Health", mrp: 30, demoPrice: 27, genericAlternative: null, stockStatus: "Low stock" },
  { id: 8, name: "Electral ORS", brand: "Electral", manufacturer: "FDC", activeIngredient: "Oral rehydration salts", strength: "21.8 g per sachet", form: "Powder", packSize: "Pack of 1 sachet", category: "Digestive Health", mrp: 21, demoPrice: 19, genericAlternative: null, stockStatus: "In stock" },
  { id: 9, name: "Limcee", brand: "Limcee", manufacturer: "Abbott", activeIngredient: "Vitamin C (ascorbic acid)", strength: "500 mg", form: "Chewable tablet", packSize: "Strip of 15 tablets", category: "Vitamins & Supplements", mrp: 25, demoPrice: 23, genericAlternative: { name: "Vitamin C 500 mg chewable (generic)", price: 15 }, stockStatus: "In stock" },
  { id: 10, name: "Shelcal 500", brand: "Shelcal", manufacturer: "Torrent", activeIngredient: "Calcium + Vitamin D3", strength: "500 mg calcium", form: "Tablet", packSize: "Strip of 15 tablets", category: "Vitamins & Supplements", mrp: 128, demoPrice: 118, genericAlternative: { name: "Calcium 500 mg + D3 (generic)", price: 82 }, stockStatus: "Out of stock" },
  { id: 11, name: "Betadine Ointment", brand: "Betadine", manufacturer: "Win-Medicare", activeIngredient: "Povidone-iodine", strength: "5% w/w", form: "Ointment", packSize: "Tube of 20 g", category: "First Aid", mrp: 85, demoPrice: 78, genericAlternative: { name: "Povidone-iodine 5% ointment (generic)", price: 52 }, stockStatus: "In stock" },
  { id: 12, name: "Dettol Antiseptic Liquid", brand: "Dettol", manufacturer: "Reckitt", activeIngredient: "Chloroxylenol", strength: "4.8% w/v", form: "Liquid", packSize: "Bottle of 100 ml", category: "First Aid", mrp: 62, demoPrice: 57, genericAlternative: null, stockStatus: "In stock" }
];

// factor scales demoPrice per pharmacy; stock overrides a medicine's default stockStatus there.
const PHARMACIES = [
  { id: 0, name: "GreenCross Demo Pharmacy", locality: "Phagwara Road", address: "12 Sample Lane, Fictional Nagar", distance: 0.8, hours: "8 AM – 10 PM (sample)", phone: "+91 00000 00001", factor: 1.0, stock: {} },
  { id: 1, name: "CarePlus Demo Chemist", locality: "Model Town", address: "45 Example Street, Demo Colony", distance: 1.6, hours: "9 AM – 9 PM (sample)", phone: "+91 00000 00002", factor: 0.95, stock: { 3: "In stock", 7: "Out of stock" } },
  { id: 2, name: "Sunrise Sample Medicos", locality: "Civil Lines", address: "7 Placeholder Road, Test Enclave", distance: 2.4, hours: "24 hours (sample)", phone: "+91 00000 00003", factor: 1.05, stock: { 10: "Low stock", 1: "Low stock" } },
  { id: 3, name: "Health Hub Demo Store", locality: "Model Town", address: "88 Mock Market, Sample Chowk", distance: 3.1, hours: "10 AM – 8 PM (sample)", phone: "+91 00000 00004", factor: 0.92, stock: { 2: "Out of stock", 5: "Low stock", 10: "In stock" } }
];

// ---------- Helpers ----------
const $ = id => document.getElementById(id);
const money = n => "₹" + n.toFixed(2);
const badgeClass = s => s === "In stock" ? "in" : s === "Low stock" ? "low" : "out";
const stockAt = (m, p) => PHARMACIES[p].stock[m.id] || m.stockStatus;
// Listed price at a pharmacy: scaled demo price, never above MRP.
const priceAt = (m, p) => Math.min(m.mrp, Math.round(m.demoPrice * PHARMACIES[p].factor * 100) / 100);
// Formulas from the brief: savings = MRP - price; percentage = savings / MRP * 100
const savings = (mrp, price) => ({ amt: mrp - price, pct: ((mrp - price) / mrp) * 100 });
const bestSaving = m => m.genericAlternative ? m.mrp - m.genericAlternative.price : m.mrp - m.demoPrice;
const badge = s => `<span class="badge ${badgeClass(s)}">${s}</span>`;

// ---------- Cards ----------
function medCard(m) {
  const p = +$("fPharm").value || 0;
  return `<article class="card">
    <div class="icon" aria-hidden="true">${ICONS[m.category]}</div>
    <h3>${m.name}</h3>
    <div class="row">${m.brand} · ${m.manufacturer}</div>
    <div class="row">Active ingredient: ${m.activeIngredient}</div>
    <div class="row">${m.strength} · ${m.form} · ${m.packSize}</div>
    <div class="price">${money(priceAt(m, p))}<s>MRP ${money(m.mrp)}</s></div>
    <div class="row">Generic alternative: ${m.genericAlternative ? m.genericAlternative.name : "None listed"}</div>
    ${badge(stockAt(m, p))}
    <button class="btn" data-detail="${m.id}">View Details</button>
  </article>`;
}

// ---------- Modal ----------
function openModal(html) { $("mBody").innerHTML = html; $("overlay").hidden = false; document.body.style.overflow = "hidden"; $("mClose").focus(); }
function closeModal() { $("overlay").hidden = true; document.body.style.overflow = ""; }
const DISCLAIMER = `<p class="warn">Sample data, not verified in real time. This is not medical advice. Consult a qualified pharmacist or doctor before changing medicines.</p>`;

function priceTable(m) {
  const rows = PHARMACIES.map((ph, i) => {
    const price = priceAt(m, i), s = savings(m.mrp, price);
    return `<tr><td>${ph.name}</td><td>${m.name}<br><small>${m.packSize}</small></td><td>${money(price)}</td><td>${money(m.mrp)}</td><td>${badge(stockAt(m, i))}</td><td class="save">${money(s.amt)}</td><td class="save">${s.pct.toFixed(1)}%</td></tr>`;
  });
  return `<table><tr><th>Pharmacy</th><th>Medicine</th><th>Listed price</th><th>MRP</th><th>Availability</th><th>Savings</th><th>Savings %</th></tr>${rows.join("")}</table>`;
}

function showDetails(id) {
  const m = MEDICINES.find(x => x.id === id);
  openModal(`<div class="icon" aria-hidden="true">${ICONS[m.category]}</div>
    <h2 id="mTitle">${m.name}</h2>
    <p>Manufacturer: <b>${m.manufacturer}</b><br>Active ingredient: <b>${m.activeIngredient}</b><br>Strength: <b>${m.strength}</b> · Form: <b>${m.form}</b><br>Pack size: <b>${m.packSize}</b><br>MRP: <b>${money(m.mrp)}</b> · Category: <b>${m.category}</b><br>Generic equivalent: <b>${m.genericAlternative ? m.genericAlternative.name : "None listed"}</b></p>
    <h3>Sample price comparison and stock</h3><div class="tablewrap">${priceTable(m)}</div>${DISCLAIMER}`);
}

function showCompareAlt(id) {
  const m = MEDICINES.find(x => x.id === id), g = m.genericAlternative, s = savings(m.demoPrice, g.price);
  const col = (title, name, price) => `<div class="card"><h3>${title}</h3><b>${name}</b>
    <div class="row">Active ingredient: ${m.activeIngredient}</div><div class="row">Strength: ${m.strength}</div>
    <div class="row">Form: ${m.form}</div><div class="row">Pack: ${m.packSize}</div><div class="price">${money(price)}</div></div>`;
  openModal(`<h2 id="mTitle">Compare alternatives</h2>
    <div class="side">${col("Original", m.name, m.demoPrice)}${col("Alternative", g.name, g.price)}</div>
    <p class="save">Estimated savings: ${money(s.amt)} (${s.pct.toFixed(1)}%)</p>${DISCLAIMER}`);
}

// ---------- Find Medicines ----------
function renderResults() {
  const q = $("q").value.trim().toLowerCase(), cat = $("fCat").value, stock = $("fStock").value, sort = $("fSort").value;
  const [lo, hi] = $("fPrice").value ? $("fPrice").value.split("-").map(Number) : [0, Infinity];
  const p = +$("fPharm").value || 0;
  let list = MEDICINES.filter(m =>
    (!q || [m.name, m.brand, m.activeIngredient].some(t => t.toLowerCase().includes(q))) &&
    (!cat || m.category === cat) && (!stock || stockAt(m, p) === stock) &&
    priceAt(m, p) >= lo && priceAt(m, p) < hi);
  list.sort((a, b) => sort === "price" ? priceAt(a, p) - priceAt(b, p) : sort === "savings" ? bestSaving(b) - bestSaving(a) : a.name.localeCompare(b.name));
  $("count").textContent = `${list.length} medicine${list.length === 1 ? "" : "s"} found (demo pharmacy: ${PHARMACIES[p].name})`;
  $("results").innerHTML = list.length ? list.map(medCard).join("") :
    `<div class="empty"><b>No medicines match your search.</b><br>Check the spelling, try an active ingredient, or clear the filters.</div>`;
}

function clearFilters() { $("q").value = ""; $("heroSearch").value = ""; ["fCat", "fPrice", "fStock"].forEach(i => $(i).selectedIndex = 0); $("fSort").value = "name"; renderResults(); }

function goCategory(name) { clearFilters(); $("fCat").value = name; renderResults(); $("find").scrollIntoView(); }

// ---------- Compare Prices ----------
function renderCompare() { $("cmpOut").innerHTML = priceTable(MEDICINES.find(m => m.id === +$("cmpSel").value)); }

// ---------- Generic alternatives ----------
function renderAlts() {
  $("alts").innerHTML = MEDICINES.filter(m => m.genericAlternative).map(m => {
    const g = m.genericAlternative, s = savings(m.demoPrice, g.price);
    return `<article class="card"><h3>${m.name} → ${g.name}</h3>
      <div class="row">Active ingredient: ${m.activeIngredient}</div><div class="row">${m.strength} · ${m.form} · ${m.packSize}</div>
      <div class="row">Original ${money(m.demoPrice)} · Alternative ${money(g.price)}</div>
      <div class="save">Estimated savings ${money(s.amt)} (${s.pct.toFixed(1)}%)</div>
      <button class="btn ghost" data-alt="${m.id}">Compare Alternatives</button></article>`;
  }).join("");
}

// ---------- Pharmacies ----------
function renderPharms() {
  const q = $("pq").value.trim().toLowerCase();
  const list = PHARMACIES.filter(p => !q || p.name.toLowerCase().includes(q) || p.locality.toLowerCase().includes(q));
  $("pharms").innerHTML = list.length ? list.map(p => {
    const out = MEDICINES.filter(m => stockAt(m, p.id) === "Out of stock").length;
    return `<article class="card"><h3>${p.name}</h3><div class="row">${p.address} (${p.locality})</div>
      <div class="row">Distance: ${p.distance} km (sample)</div><div class="row">Hours: ${p.hours}</div>
      <div class="row">Demo phone: ${p.phone}</div>
      <div class="row">Stock: ${MEDICINES.length - out} of ${MEDICINES.length} demo medicines listed in stock</div>
      <button class="btn ghost" data-loc="${p.id}">View Location</button></article>`;
  }).join("") : `<div class="empty"><b>No pharmacies match.</b><br>Try a different name or locality, such as “Model Town”.</div>`;
}

function showLocation(id) {
  const p = PHARMACIES[id];
  openModal(`<h2 id="mTitle">${p.name}</h2><p>${p.address}<br>Locality: ${p.locality}</p>
    <p class="warn">This is a fictional demo entry. No live map or location service is configured, so no real directions are shown.</p>`);
}

// ---------- Setup ----------
function init() {
  const catOpts = `<option value="">All categories</option>` + CATEGORIES.map(c => `<option>${c.name}</option>`).join("");
  $("fCat").innerHTML = catOpts;
  $("fPharm").innerHTML = PHARMACIES.map(p => `<option value="${p.id}">Stock at: ${p.name}</option>`).join("");
  $("cmpSel").innerHTML = MEDICINES.map(m => `<option value="${m.id}">${m.name} (${m.packSize})</option>`).join("");
  $("cats").innerHTML = CATEGORIES.map(c => `<button class="card cat" data-cat="${c.name}"><span class="icon" aria-hidden="true">${c.icon}</span>${c.name}</button>`).join("");
  $("chips").innerHTML = CATEGORIES.slice(0, 6).map(c => `<button class="chip" data-cat="${c.name}">${c.name}</button>`).join("");
  $("featured").innerHTML = MEDICINES.slice(0, 3).map(medCard).join("");
  renderResults(); renderCompare(); renderAlts(); renderPharms();

  // One click handler covers all dynamic buttons (event delegation)
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-detail],[data-alt],[data-loc],[data-cat]");
    if (!t) return;
    if (t.dataset.detail) showDetails(+t.dataset.detail);
    else if (t.dataset.alt) showCompareAlt(+t.dataset.alt);
    else if (t.dataset.loc) showLocation(+t.dataset.loc);
    else goCategory(t.dataset.cat);
  });

  ["q", "fCat", "fPrice", "fStock", "fSort", "fPharm"].forEach(i => $(i).addEventListener("input", () => { renderResults(); $("featured").innerHTML = MEDICINES.slice(0, 3).map(medCard).join(""); }));
  $("cmpSel").addEventListener("change", renderCompare);
  $("pq").addEventListener("input", renderPharms);
  $("clear").addEventListener("click", clearFilters);
  $("heroForm").addEventListener("submit", e => { e.preventDefault(); $("q").value = $("heroSearch").value; renderResults(); $("find").scrollIntoView(); });

  // Optional geolocation: ask permission, handle denial, never fake nearby results
  $("geoBtn").addEventListener("click", () => {
    const msg = $("geoMsg");
    if (!navigator.geolocation) { msg.textContent = "Your browser does not support location. You can still search pharmacies by locality."; return; }
    msg.textContent = "Waiting for location permission…";
    navigator.geolocation.getCurrentPosition(
      () => { msg.textContent = "Location received, but no map or location API is connected. Distances shown remain sample values."; },
      () => { msg.textContent = "Location access was not granted. No problem – search by pharmacy name or locality instead."; }
    );
  });

  // Mobile menu and modal closing
  $("menuBtn").addEventListener("click", () => { const o = $("menu").classList.toggle("open"); $("menuBtn").setAttribute("aria-expanded", o); });
  $("menu").addEventListener("click", () => $("menu").classList.remove("open"));
  $("mClose").addEventListener("click", closeModal);
  $("overlay").addEventListener("click", e => { if (e.target === $("overlay")) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}
document.addEventListener("DOMContentLoaded", init);
