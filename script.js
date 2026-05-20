const SHEET_ID = '1AObaZIBGZE6GaJrQygh4wpaVjo6rSTSl3AvMvO9Z6WI';
const SET_NAMES = ['AD01', 'BT25'];

// ⚠️ Ganti URL setelah deploy Worker Biteship
const BITESHIP_PROXY = 'https://misty-unit-83a0.thomasrnd02.workers.dev';

// Origin toko: Jakarta Pusat (Biteship area_id)
const ORIGIN_AREA_ID = 'IDNP11IDNC149IDND1490';

// ⚠️ SELLER CONFIG
const SELLER_PHONE = '6281281854172';
const BANK_NUMBER  = '1234567890';
const BANK_NAME    = 'A.N. Nama Toko Gudang Kartu';

// ─── STATIC LOCATION DATA ────────────────────────────────────
// area_id dari Biteship Maps API (kota-kota utama per provinsi)
const LOCATIONS = {
    "Aceh":                  [["Banda Aceh","IDNP1IDNC1IDND10"],["Lhokseumawe","IDNP1IDNC9IDND90"],["Langsa","IDNP1IDNC8IDND80"],["Sabang","IDNP1IDNC15IDND150"]],
    "Sumatera Utara":        [["Medan","IDNP2IDNC18IDND180"],["Binjai","IDNP2IDNC19IDND190"],["Pematangsiantar","IDNP2IDNC20IDND200"],["Tebing Tinggi","IDNP2IDNC21IDND210"],["Sibolga","IDNP2IDNC22IDND220"]],
    "Sumatera Barat":        [["Padang","IDNP3IDNC30IDND300"],["Bukittinggi","IDNP3IDNC31IDND310"],["Payakumbuh","IDNP3IDNC32IDND320"],["Solok","IDNP3IDNC33IDND330"]],
    "Riau":                  [["Pekanbaru","IDNP4IDNC40IDND400"],["Dumai","IDNP4IDNC41IDND410"]],
    "Kepulauan Riau":        [["Batam","IDNP5IDNC50IDND500"],["Tanjungpinang","IDNP5IDNC51IDND510"]],
    "Jambi":                 [["Jambi","IDNP6IDNC60IDND600"],["Sungai Penuh","IDNP6IDNC61IDND610"]],
    "Sumatera Selatan":      [["Palembang","IDNP7IDNC70IDND700"],["Lubuklinggau","IDNP7IDNC71IDND710"],["Prabumulih","IDNP7IDNC72IDND720"],["Pagar Alam","IDNP7IDNC73IDND730"]],
    "Bangka Belitung":       [["Pangkalpinang","IDNP8IDNC80IDND800"]],
    "Bengkulu":              [["Bengkulu","IDNP9IDNC90IDND900"]],
    "Lampung":               [["Bandar Lampung","IDNP10IDNC100IDND1000"],["Metro","IDNP10IDNC101IDND1010"]],
    "DKI Jakarta":           [["Jakarta Pusat","IDNP11IDNC149IDND1490"],["Jakarta Utara","IDNP11IDNC150IDND1500"],["Jakarta Barat","IDNP11IDNC151IDND1510"],["Jakarta Selatan","IDNP11IDNC152IDND1520"],["Jakarta Timur","IDNP11IDNC153IDND1530"]],
    "Banten":                [["Serang","IDNP12IDNC120IDND1200"],["Tangerang","IDNP12IDNC121IDND1210"],["Tangerang Selatan","IDNP12IDNC122IDND1220"],["Cilegon","IDNP12IDNC123IDND1230"]],
    "Jawa Barat":            [["Bandung","IDNP13IDNC130IDND1300"],["Bekasi","IDNP13IDNC131IDND1310"],["Bogor","IDNP13IDNC132IDND1320"],["Depok","IDNP13IDNC133IDND1330"],["Cimahi","IDNP13IDNC134IDND1340"],["Cirebon","IDNP13IDNC135IDND1350"],["Sukabumi","IDNP13IDNC136IDND1360"],["Tasikmalaya","IDNP13IDNC137IDND1370"],["Banjar","IDNP13IDNC138IDND1380"]],
    "Jawa Tengah":           [["Semarang","IDNP14IDNC140IDND1400"],["Solo","IDNP14IDNC141IDND1410"],["Magelang","IDNP14IDNC142IDND1420"],["Salatiga","IDNP14IDNC143IDND1430"],["Pekalongan","IDNP14IDNC144IDND1440"],["Tegal","IDNP14IDNC145IDND1450"],["Purwokerto","IDNP14IDNC146IDND1460"]],
    "DI Yogyakarta":         [["Yogyakarta","IDNP15IDNC155IDND1550"],["Sleman","IDNP15IDNC156IDND1560"],["Bantul","IDNP15IDNC157IDND1570"]],
    "Jawa Timur":            [["Surabaya","IDNP16IDNC160IDND1600"],["Malang","IDNP16IDNC161IDND1610"],["Kediri","IDNP16IDNC162IDND1620"],["Blitar","IDNP16IDNC163IDND1630"],["Madiun","IDNP16IDNC164IDND1640"],["Mojokerto","IDNP16IDNC165IDND1650"],["Pasuruan","IDNP16IDNC166IDND1660"],["Probolinggo","IDNP16IDNC167IDND1670"],["Batu","IDNP16IDNC168IDND1680"]],
    "Bali":                  [["Denpasar","IDNP17IDNC170IDND1700"],["Badung","IDNP17IDNC171IDND1710"],["Gianyar","IDNP17IDNC172IDND1720"],["Tabanan","IDNP17IDNC173IDND1730"]],
    "Nusa Tenggara Barat":   [["Mataram","IDNP18IDNC180IDND1800"],["Bima","IDNP18IDNC181IDND1810"]],
    "Nusa Tenggara Timur":   [["Kupang","IDNP19IDNC190IDND1900"]],
    "Kalimantan Barat":      [["Pontianak","IDNP20IDNC200IDND2000"],["Singkawang","IDNP20IDNC201IDND2010"]],
    "Kalimantan Tengah":     [["Palangka Raya","IDNP21IDNC210IDND2100"]],
    "Kalimantan Selatan":    [["Banjarmasin","IDNP22IDNC220IDND2200"],["Banjarbaru","IDNP22IDNC221IDND2210"]],
    "Kalimantan Timur":      [["Samarinda","IDNP23IDNC230IDND2300"],["Balikpapan","IDNP23IDNC231IDND2310"],["Bontang","IDNP23IDNC232IDND2320"]],
    "Kalimantan Utara":      [["Tarakan","IDNP24IDNC240IDND2400"]],
    "Sulawesi Utara":        [["Manado","IDNP25IDNC250IDND2500"],["Bitung","IDNP25IDNC251IDND2510"],["Tomohon","IDNP25IDNC252IDND2520"]],
    "Gorontalo":             [["Gorontalo","IDNP26IDNC260IDND2600"]],
    "Sulawesi Tengah":       [["Palu","IDNP27IDNC270IDND2700"]],
    "Sulawesi Barat":        [["Mamuju","IDNP28IDNC280IDND2800"]],
    "Sulawesi Selatan":      [["Makassar","IDNP29IDNC290IDND2900"],["Parepare","IDNP29IDNC291IDND2910"],["Palopo","IDNP29IDNC292IDND2920"]],
    "Sulawesi Tenggara":     [["Kendari","IDNP30IDNC300IDND3000"],["Baubau","IDNP30IDNC301IDND3010"]],
    "Maluku":                [["Ambon","IDNP31IDNC310IDND3100"],["Tual","IDNP31IDNC311IDND3110"]],
    "Maluku Utara":          [["Ternate","IDNP32IDNC320IDND3200"],["Tidore","IDNP32IDNC321IDND3210"]],
    "Papua Barat":           [["Manokwari","IDNP33IDNC330IDND3300"],["Sorong","IDNP33IDNC331IDND3310"]],
    "Papua":                 [["Jayapura","IDNP34IDNC340IDND3400"]],
};

// Cart state
let cart = JSON.parse(localStorage.getItem('ddd_cart')) || [];
let allCards = [];
let currentRarity = 'All';

// Shipping state
let selectedAreaId   = null;
let selectedCityName = '';
let selectedProvName = '';
let selectedOngkir   = null;

// Order snapshot
let pendingOrder = null;

// ─── INIT ────────────────────────────────────────────────────

async function init() {
    document.getElementById('bank-account-number').textContent = BANK_NUMBER;
    document.getElementById('bank-account-name').textContent   = BANK_NAME;

    // Populate province dropdown
    const provSelect = document.getElementById('shipping-province');
    Object.keys(LOCATIONS).sort().forEach(prov => {
        const opt = document.createElement('option');
        opt.value = prov;
        opt.textContent = prov;
        provSelect.appendChild(opt);
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
                        <p class="text-[8px] text-gray-500 uppercase font-black">Price</p>
                        <p class="text-xl font-black text-green-400 leading-none mt-1">Rp ${c.price}</p>
                    </div>
                    <button onclick="addToCart('${c.name}', '${c.price}', ${c.stock})" class="bg-white text-black font-black text-[10px] px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition uppercase shadow-sm">Add</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ─── CART ────────────────────────────────────────────────────

function toggleCart() { document.getElementById('cart-panel').classList.toggle('cart-open'); }

function addToCart(name, price, stock) {
    const numericPrice = parseInt(price.replace(/,/g, ''));
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty < stock ? existing.qty++ : alert(`Stok hanya tersedia ${stock} pcs.`);
    } else {
        stock > 0 ? cart.push({ name, price: numericPrice, qty: 1, maxStock: stock }) : alert('Out of stock!');
    }
    updateCartUI();
    if (!document.getElementById('cart-panel').classList.contains('cart-open')) toggleCart();
}

function updateQuantity(name, change) {
    const item = cart.find(i => i.name === name);
    if (!item) return;
    const newQty = item.qty + change;
    if (newQty > item.maxStock) { alert(`Maksimal stok adalah ${item.maxStock}.`); return; }
    newQty <= 0 ? removeFromCart(name) : (item.qty = newQty);
    updateCartUI();
}

function removeFromCart(name) { cart = cart.filter(item => item.name !== name); updateCartUI(); }

function updateCartUI() {
    const container  = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal-price');
    const deliveryEl = document.getElementById('delivery-fee');
    const totalEl    = document.getElementById('cart-total');
    const countEl    = document.getElementById('cart-count');

    container.innerHTML = '';
    let subtotal = 0, count = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        count    += item.qty;
        container.innerHTML += `
            <div class="bg-gray-900/50 p-4 rounded-2xl border border-gray-800 space-y-3">
                <div class="flex justify-between items-start">
                    <p class="text-sm font-bold truncate pr-4">${item.name}</p>
                    <i onclick="removeFromCart('${item.name}')" class="fa fa-trash text-gray-600 hover:text-red-500 cursor-pointer text-xs transition"></i>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-sm font-black text-blue-400">Rp ${(item.price * item.qty).toLocaleString()}</p>
                    <div class="flex items-center bg-[#0d1117] rounded-lg border border-gray-700 px-2 py-1 gap-3">
                        <button onclick="updateQuantity('${item.name}', -1)" class="text-gray-400 hover:text-white transition px-1"><i class="fa fa-minus text-[10px]"></i></button>
                        <span class="text-xs font-bold w-4 text-center">${item.qty}</span>
                        <button onclick="updateQuantity('${item.name}', 1)" class="text-gray-400 hover:text-white transition px-1"><i class="fa fa-plus text-[10px]"></i></button>
                    </div>
                </div>
            </div>
        `;
    });

    if (cart.length === 0) {
        container.innerHTML = '<div class="flex flex-col items-center justify-center py-20"><i class="fa fa-shopping-basket text-gray-800 text-4xl mb-4"></i><p class="text-gray-500 text-sm font-medium">Cart is empty</p></div>';
    }

    const deliveryFee = selectedOngkir ? selectedOngkir.price : 0;
    const grandTotal  = subtotal + deliveryFee;

    subtotalEl.innerText = `Rp ${subtotal.toLocaleString()}`;
    deliveryEl.innerText = selectedOngkir
        ? `Rp ${deliveryFee.toLocaleString()} (${selectedOngkir.courier_name} ${selectedOngkir.service})`
        : 'Belum dipilih';
    totalEl.innerText = `Rp ${grandTotal.toLocaleString()}`;
    countEl.innerText = count;

    saveCartToStorage();
}

// ─── SHIPPING DROPDOWNS ──────────────────────────────────────

function onProvinceChange() {
    const prov       = document.getElementById('shipping-province').value;
    selectedProvName = prov;
    selectedAreaId   = null;
    selectedCityName = '';
    selectedOngkir   = null;
    resetOngkirResult();
    updateCartUI();

    const citySelect = document.getElementById('shipping-city');
    citySelect.innerHTML = '<option value="">Pilih Kota/Kabupaten...</option>';
    citySelect.disabled = !prov;
    document.getElementById('shipping-address').disabled = true;
    document.getElementById('shipping-address').value = '';
    document.getElementById('btn-cek-ongkir').disabled = true;

    if (!prov) return;
    (LOCATIONS[prov] || []).forEach(([cityName, areaId]) => {
        const opt = document.createElement('option');
        opt.value = areaId;
        opt.textContent = cityName;
        citySelect.appendChild(opt);
    });
}

function onCityChange() {
    const citySelect = document.getElementById('shipping-city');
    selectedAreaId   = citySelect.value || null;
    selectedCityName = citySelect.selectedOptions[0]?.text || '';
    selectedOngkir   = null;
    resetOngkirResult();
    updateCartUI();

    document.getElementById('shipping-address').disabled = !selectedAreaId;
    if (!selectedAreaId) document.getElementById('shipping-address').value = '';
    document.getElementById('btn-cek-ongkir').disabled = !selectedAreaId;
}

function resetOngkirResult() {
    const el = document.getElementById('ongkir-result');
    el.classList.add('hidden');
    el.innerHTML = '';
}

async function checkOngkir() {
    if (!selectedAreaId) return;

    const btn      = document.getElementById('btn-cek-ongkir');
    const btnText  = document.getElementById('ongkir-btn-text');
    const resultEl = document.getElementById('ongkir-result');

    btnText.textContent = 'Mengecek...';
    btn.disabled = true;
    resetOngkirResult();

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const qty      = cart.reduce((s, i) => s + i.qty, 0);

    try {
        const res      = await fetch(`${BITESHIP_PROXY}/rates`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                origin_area_id:      ORIGIN_AREA_ID,
                destination_area_id: selectedAreaId,
                quantity: qty  || 1,
                value:    subtotal || 10000,
                weight:   50 * (qty || 1)
            })
        });
        const pricings = await res.json();

        resultEl.classList.remove('hidden');
        if (!pricings.length) {
            resultEl.innerHTML = '<p class="text-yellow-400 text-xs text-center p-2">Tidak ada layanan kurir tersedia untuk kota ini.</p>';
            return;
        }

        pricings.sort((a, b) => a.price - b.price);
        pricings.forEach(p => {
            const etd = p.min_day === p.max_day ? `${p.min_day} hari` : `${p.min_day}-${p.max_day} hari`;
            const div = document.createElement('div');
            div.className = 'flex justify-between items-center p-2 rounded-lg cursor-pointer border border-gray-700 hover:border-blue-400 transition';
            div.dataset.key = p.courier_code + p.service_type;
            div.onclick = () => selectOngkir(p, etd);
            div.innerHTML = `
                <div>
                    <p class="text-xs font-black text-white uppercase">${p.courier_name} ${p.courier_service_name}</p>
                    <p class="text-[10px] text-gray-500">${etd}</p>
                </div>
                <p class="text-sm font-black text-green-400">Rp ${p.price.toLocaleString()}</p>
            `;
            resultEl.appendChild(div);
        });

        // Auto-pilih termurah
        const cheapest = pricings[0];
        const etd0 = cheapest.min_day === cheapest.max_day
            ? `${cheapest.min_day} hari` : `${cheapest.min_day}-${cheapest.max_day} hari`;
        selectOngkir(cheapest, etd0);

    } catch (e) {
        resultEl.classList.remove('hidden');
        resultEl.innerHTML = '<p class="text-red-400 text-xs text-center p-2">Gagal cek ongkir. Pastikan proxy Worker sudah di-deploy.</p>';
        console.error(e);
    }

    btnText.textContent = 'Cek Ongkos Kirim';
    btn.disabled = false;
}

function selectOngkir(p, etd) {
    selectedOngkir = { courier_name: p.courier_name, courier_code: p.courier_code, service: p.courier_service_name, price: p.price, etd };
    updateCartUI();
    const key = p.courier_code + p.service_type;
    document.querySelectorAll('#ongkir-result > div[data-key]').forEach(el => {
        const sel = el.dataset.key === key;
        el.classList.toggle('border-blue-500', sel);
        el.classList.toggle('bg-blue-500/10', sel);
        el.classList.toggle('border-gray-700', !sel);
    });
}

// ─── CHECKOUT ────────────────────────────────────────────────

function processCheckout() {
    const buyerName  = document.getElementById('buyer-name').value.trim();
    const buyerPhone = document.getElementById('buyer-phone').value.trim();
    const address    = document.getElementById('shipping-address').value.trim();

    if (cart.length === 0)   { alert('Keranjang belanja masih kosong!'); return; }
    if (!buyerName)          { document.getElementById('buyer-name').focus(); alert('Mohon masukkan nama pemesan!'); return; }
    if (!buyerPhone)         { document.getElementById('buyer-phone').focus(); alert('Mohon masukkan nomor HP/WhatsApp!'); return; }
    if (!selectedAreaId)     { alert('Mohon pilih kota tujuan pengiriman!'); return; }
    if (!address)            { document.getElementById('shipping-address').focus(); alert('Mohon masukkan alamat lengkap!'); return; }
    if (!selectedOngkir)     { alert('Mohon cek dan pilih layanan ongkos kirim!'); return; }

    const subtotal   = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const grandTotal = subtotal + selectedOngkir.price;
    const alamat     = `${address}, ${selectedCityName}, ${selectedProvName}`;

    pendingOrder = {
        buyerName, buyerPhone, alamat,
        items: cart.map(i => ({ ...i })),
        subtotal, ongkir: { ...selectedOngkir }, grandTotal,
        orderId: 'GK-' + Date.now().toString(36).toUpperCase()
    };

    openPaymentModal();
}

// ─── PAYMENT MODAL ───────────────────────────────────────────

function openPaymentModal() {
    const o = pendingOrder;
    document.getElementById('pay-order-summary').innerHTML =
        o.items.map(i => `<div class="flex justify-between"><span>${i.name} x${i.qty}</span><span>Rp ${(i.price * i.qty).toLocaleString()}</span></div>`).join('') +
        `<div class="flex justify-between text-gray-500 mt-1"><span>${o.ongkir.courier_name} ${o.ongkir.service}</span><span>Rp ${o.ongkir.price.toLocaleString()}</span></div>`;

    document.getElementById('pay-total').textContent     = `Rp ${o.grandTotal.toLocaleString()}`;
    document.getElementById('recap-name').textContent    = o.buyerName;
    document.getElementById('recap-phone').textContent   = o.buyerPhone;
    document.getElementById('recap-address').textContent = o.alamat;
    document.getElementById('recap-ongkir').textContent  = `${o.ongkir.courier_name} ${o.ongkir.service} — Rp ${o.ongkir.price.toLocaleString()} (${o.ongkir.etd})`;

    showStep('transfer');
    document.getElementById('proof-upload').value = '';
    document.getElementById('proof-preview').classList.add('hidden');
    document.getElementById('upload-placeholder').classList.remove('hidden');
    document.getElementById('btn-submit-order').disabled = true;

    const modal = document.getElementById('payment-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closePaymentModal() {
    document.getElementById('payment-modal').classList.add('hidden');
    document.getElementById('payment-modal').classList.remove('flex');
}

function showStep(step) {
    ['transfer','upload','done'].forEach(s =>
        document.getElementById(`step-${s}`).classList.toggle('hidden', s !== step)
    );
}

function goToUploadStep() { showStep('upload'); }
function backToTransfer()  { showStep('transfer'); }

function copyAccountNumber() {
    navigator.clipboard.writeText(BANK_NUMBER).then(() => {
        const btn = document.querySelector('[onclick="copyAccountNumber()"]');
        btn.innerHTML = '<i class="fa fa-check text-green-400"></i>';
        setTimeout(() => btn.innerHTML = '<i class="fa fa-copy"></i>', 2000);
    });
}

function previewProof(input) {
    const file = input.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('File terlalu besar. Maksimal 5MB.'); input.value = ''; return; }
    const reader = new FileReader();
    reader.onload = e => {
        document.getElementById('proof-preview').src = e.target.result;
        document.getElementById('proof-preview').classList.remove('hidden');
        document.getElementById('upload-placeholder').classList.add('hidden');
        document.getElementById('btn-submit-order').disabled = false;
    };
    reader.readAsDataURL(file);
}

function submitOrder() {
    const o = pendingOrder;
    if (!o) return;

    const itemLines = o.items.map(i => `- ${i.name} (${i.qty}x) = Rp ${(i.price * i.qty).toLocaleString()}`).join('\n');

    const sellerMsg =
`🛎️ *ORDER MASUK — ${o.orderId}*

👤 *Nama:* ${o.buyerName}
📱 *No. HP:* ${o.buyerPhone}
📍 *Alamat:* ${o.alamat}

🛒 *Pesanan:*
${itemLines}

💰 Subtotal : Rp ${o.subtotal.toLocaleString()}
🚚 ${o.ongkir.courier_name} ${o.ongkir.service} (${o.ongkir.etd}): Rp ${o.ongkir.price.toLocaleString()}
━━━━━━━━━━━━━━━━━━
💵 *TOTAL: Rp ${o.grandTotal.toLocaleString()}*

✅ Buyer telah upload bukti transfer.
📎 _Attach foto bukti bayar dari buyer._`;

    const buyerWA  = o.buyerPhone.replace(/^0/, '62').replace(/\D/g, '');
    const buyerMsg =
`Halo *${o.buyerName}* 👋

Terima kasih sudah berbelanja di *Gudang Kartu*!

📋 *Konfirmasi Pesanan — ${o.orderId}*

🛒 *Detail Pesanan:*
${itemLines}

💰 Subtotal : Rp ${o.subtotal.toLocaleString()}
🚚 ${o.ongkir.courier_name} ${o.ongkir.service} (${o.ongkir.etd}): Rp ${o.ongkir.price.toLocaleString()}
━━━━━━━━━━━━━━━━━━
💵 *TOTAL: Rp ${o.grandTotal.toLocaleString()}*

📍 *Dikirim ke:*
${o.alamat}

Pesanan kamu sedang kami proses 🙏`;

    window.open(`https://wa.me/${SELLER_PHONE}?text=${encodeURIComponent(sellerMsg)}`);
    setTimeout(() => window.open(`https://wa.me/${buyerWA}?text=${encodeURIComponent(buyerMsg)}`), 800);

    // Reset
    cart = [];
    saveCartToStorage();
    updateCartUI();
    ['buyer-name','buyer-phone','shipping-address'].forEach(id => { document.getElementById(id).value = ''; });
    document.getElementById('shipping-province').value = '';
    const citySelect = document.getElementById('shipping-city');
    citySelect.innerHTML = '<option value="">Pilih Kota/Kabupaten...</option>';
    citySelect.disabled = true;
    document.getElementById('shipping-address').disabled = true;
    document.getElementById('btn-cek-ongkir').disabled = true;
    resetOngkirResult();
    selectedAreaId = null; selectedCityName = ''; selectedProvName = ''; selectedOngkir = null; pendingOrder = null;

    showStep('done');
}

// ─── SEARCH ──────────────────────────────────────────────────

function searchCards() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    document.querySelectorAll('#card-grid > div').forEach(card => {
        const name = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = name.includes(query) ? 'flex' : 'none';
    });
}

init();
