const SHEET_ID = '1AObaZIBGZE6GaJrQygh4wpaVjo6rSTSl3AvMvO9Z6WI';
const SET_NAMES = ['AD01', 'BT25'];

// ⚠️ SELLER CONFIG
const SELLER_PHONE = '6281281854172';
const BANK_NUMBER  = '1234567890';
const BANK_NAME    = 'A.N. Nama Toko Gudang Kartu';

// Data Ongkir Manual (JNE Reguler dari Jakarta Pusat)
const dataOngkirManual = {
    "DKI Jakarta": { price: 10000, etd: "1-2 hari" },
    "Bodeta (Bogor, Depok, Tangerang)": { price: 11000, etd: "1-2 hari" },
    "Bekasi": { price: 10000, etd: "1-2 hari" },
    "Bandung (Jawa Barat)": { price: 11000, etd: "1-2 hari" },
    "Surabaya (Jawa Timur)": { price: 19000, etd: "2-3 hari" },
    "Semarang (Jawa Tengah)": { price: 18000, etd: "2-3 hari" },
    "Yogyakarta (DIY)": { price: 18000, etd: "2-3 hari" },
    "Denpasar (Bali)": { price: 28000, etd: "2-4 hari" },
    "Medan (Sumatera Utara)": { price: 35000, etd: "3-5 hari" },
    "Palembang (Sumatera Selatan)": { price: 22000, etd: "2-4 hari" },
    "Padang (Sumatera Barat)": { price: 33000, etd: "3-5 hari" },
    "Pekanbaru (Riau)": { price: 32000, etd: "3-5 hari" },
    "Batam (Kepulauan Riau)": { price: 38000, etd: "3-5 hari" },
    "Makassar (Sulawesi Selatan)": { price: 40000, etd: "3-5 hari" },
    "Manado (Sulawesi Utara)": { price: 55000, etd: "3-6 hari" },
    "Balikpapan (Kalimantan Timur)": { price: 43000, etd: "3-5 hari" },
    "Pontianak (Kalimantan Barat)": { price: 35000, etd: "3-5 hari" },
    "Banjarmasin (Kalimantan Selatan)": { price: 35000, etd: "3-5 hari" },
    "Mataram (NTB)": { price: 32000, etd: "3-5 hari" },
    "Kupang (NTT)": { price: 55000, etd: "4-6 hari" },
    "Ambon (Maluku)": { price: 70000, etd: "4-6 hari" },
    "Jayapura (Papua)": { price: 110000, etd: "4-7 hari" },
    "Lainnya (Hubungi Admin)": { price: 50000, etd: "Menyesuaikan" }
};

// Cart state
let cart = JSON.parse(localStorage.getItem('ddd_cart')) || [];
let allCards = [];
let currentRarity = 'All';

// Shipping state
let selectedLocationName = null;
let selectedOngkir = null;

// Order snapshot
let pendingOrder = null;

// ─── INIT ────────────────────────────────────────────────────

async function init() {
    document.getElementById('bank-account-number').textContent = BANK_NUMBER;
    document.getElementById('bank-account-name').textContent   = BANK_NAME;

    // Masukkan data ongkir ke dropdown
    const select = document.getElementById('shipping-location');
    Object.keys(dataOngkirManual).forEach(loc => {
        const option = document.createElement('option');
        option.value = loc;
        option.textContent = loc;
        select.appendChild(option);
    });

    const menu = document.getElementById('set-menu');
    SET_NAMES.forEach(setName => {
        const li = document.createElement('li');
        li.className = 'sidebar-link p-2 rounded';
        li.innerText = setName;
        li.onclick = () => loadSet(setName, li);
        menu.appendChild(li);
    });

    await loadAllSets(document.querySelector('.sidebar-link'));
    if (cart.length > 0) updateCartUI();
}

// ─── STORAGE ─────────────────────────────────────────────────

function saveCartToStorage() { localStorage.setItem('ddd_cart', JSON.stringify(cart)); }

function clearCart() {
    if (cart.length === 0) return;
    if (confirm('Are you sure you want to empty your cart?')) { cart = []; updateCartUI(); }
}

// ─── SHEET DATA ──────────────────────────────────────────────

async function fetchSheetData(setName) {
    const response = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${setName}`);
    const text = await response.text();
    const rows = text.split(/\r?\n/).map(row => {
        const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        return matches ? matches.map(m => m.replace(/^"|"$/g, '').trim()) : [];
    });
    return rows.slice(1).map(row => ({
        name: row[0], rarity: row[1], stock: parseInt(row[2]) || 0, price: row[3], set: setName
    })).filter(c => c.name);
}

async function loadAllSets(el) {
    updateActiveSidebar(el);
    document.getElementById('display-title').innerText = 'All Cards';
    showLoader(true);
    let combined = [];
    for (const set of SET_NAMES) combined = [...combined, ...await fetchSheetData(set)];
    allCards = combined;
    renderRarityMenu(); renderCards(); showLoader(false);
}

async function loadSet(setName, el) {
    updateActiveSidebar(el);
    document.getElementById('display-title').innerText = setName;
    showLoader(true);
    allCards = await fetchSheetData(setName);
    renderRarityMenu(); renderCards(); showLoader(false);
}

function updateActiveSidebar(el) {
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
    currentRarity = 'All';
}

function showLoader(show) {
    document.getElementById('loader').classList.toggle('hidden', !show);
    document.getElementById('card-grid').classList.toggle('hidden', show);
}

// ─── RENDER CARDS ────────────────────────────────────────────

function renderRarityMenu() {
    const rarities = [...new Set(allCards.map(c => c.rarity))].filter(Boolean);
    const menu = document.getElementById('rarity-menu');
    menu.innerHTML = `<li onclick="filterRarity('All', this)" class="sidebar-link p-2 rounded active text-xs font-bold uppercase">Show All</li>`;
    rarities.forEach(r => {
        menu.innerHTML += `<li onclick="filterRarity('${r}', this)" class="sidebar-link p-2 rounded text-xs font-bold uppercase">${r}</li>`;
    });
}

function filterRarity(r, el) {
    currentRarity = r;
    document.querySelectorAll('#rarity-menu .sidebar-link').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
    renderCards();
}

function renderCards() {
    const grid = document.getElementById('card-grid');
    grid.innerHTML = '';
    const filtered = allCards.filter(c => currentRarity === 'All' || c.rarity === currentRarity);
    filtered.forEach((c) => {
        const card = document.createElement('div');
        card.className = 'bg-[#161b22] border border-gray-800 rounded-3xl overflow-hidden card-glow group flex flex-col';
        card.innerHTML = `
            <div class="p-6 flex justify-center items-center bg-[#0d1117] min-h-[250px]">
                <img src="https://images.digimoncard.io/images/cards/${c.name.replace(/\s+/g, '_')}.jpg"
                     onerror="this.src='https://via.placeholder.com/300x420/0d1117/3b82f6?text=${encodeURIComponent(c.name)}'"
                     class="h-56 object-contain group-hover:scale-110 transition duration-500">
            </div>
            <div class="p-6 border-t border-gray-800 flex-1 flex flex-col">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-[9px] font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">${c.rarity}</span>
                    <span class="text-[10px] text-gray-500 font-bold tracking-tighter">${c.stock} IN STOCK</span>
                </div>
                <h3 class="text-lg font-bold text-white truncate mb-6">${c.name}</h3>
                <div class="flex items-center justify-between mt-auto bg-gray-900/40 p-3 rounded-2xl border border-gray-800/50">
                    <div>
                        <p class="text-[8px] text-gray-500 uppercase font-black">Price</
