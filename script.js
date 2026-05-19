const SHEET_ID = '1AObaZIBGZE6GaJrQygh4wpaVjo6rSTSl3AvMvO9Z6WI';
const SET_NAMES = ['AD01', 'BT25'];

// ⚠️ RAJAONGKIR CONFIG — ganti URL setelah deploy Worker
const RAJAONGKIR_PROXY = 'https://rajaongkir-proxy.YOUR_SUBDOMAIN.workers.dev';
const ORIGIN_CITY_ID = '152'; // Jakarta Pusat

// ⚠️ SELLER CONFIG — ganti sesuai data toko
const SELLER_PHONE  = '6281281854172'; // format internasional tanpa +
const BANK_NUMBER   = '1234567890';    // nomor rekening BCA
const BANK_NAME     = 'A.N. Nama Toko Gudang Kartu';

// Cart state
let cart = JSON.parse(localStorage.getItem('ddd_cart')) || [];
let allCards = [];
let currentRarity = 'All';

// Shipping state
let selectedCityId    = null;
let selectedCityName  = '';
let selectedProvinceName = '';
let selectedOngkir    = null; // { service, cost, etd }

// Order snapshot (filled when modal opens)
let pendingOrder = null;

// ─── INIT ────────────────────────────────────────────────────

async function init() {
    // Inject seller config into HTML elements
    document.getElementById('bank-account-number').textContent = BANK_NUMBER;
    document.getElementById('bank-account-name').textContent   = BANK_NAME;

    const menu = document.getElementById('set-menu');
    SET_NAMES.forEach(setName => {
        const li = document.createElement('li');
        li.className = 'sidebar-link p-2 rounded';
        li.innerText = setName;
        li.onclick = () => loadSet(setName, li);
        menu.appendChild(li);
    });

    await loadAllSets(document.querySelector('.sidebar-link'));
    await loadProvinces();
    if (cart.length > 0) updateCartUI();
}

// ─── STORAGE ─────────────────────────────────────────────────

function saveCartToStorage() {
    localStorage.setItem('ddd_cart', JSON.stringify(cart));
}

function clearCart() {
    if (cart.length === 0) return;
    if (confirm('Are you sure you want to empty your cart?')) {
        cart = [];
        updateCartUI();
    }
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
        name:  row[0],
        rarity: row[1],
        stock: parseInt(row[2]) || 0,
        price: row[3],
        set:   setName
    })).filter(c => c.name);
}

async function loadAllSets(el) {
    updateActiveSidebar(el);
    document.getElementById('display-title').innerText = 'All Cards';
    showLoader(true);
    let combined = [];
    for (const set of SET_NAMES) {
        const data = await fetchSheetData(set);
        combined = [...combined, ...data];
    }
    allCards = combined;
    renderRarityMenu();
    renderCards();
    showLoader(false);
}

async function loadSet(setName, el) {
    updateActiveSidebar(el);
    document.getElementById('display-title').innerText = setName;
    showLoader(true);
    allCards = await fetchSheetData(setName);
    renderRarityMenu();
    renderCards();
    showLoader(false);
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

function toggleCart() {
    document.getElementById('cart-panel').classList.toggle('cart-open');
}

function addToCart(name, price, stock) {
    const numericPrice = parseInt(price.replace(/,/g, ''));
    const existing = cart.find(item => item.name === name);
    if (existing) {
        if (existing.qty < stock) {
            existing.qty++;
        } else {
            alert(`Stok hanya tersedia ${stock} pcs.`);
        }
    } else {
        if (stock > 0) {
            cart.push({ name, price: numericPrice, qty: 1, maxStock: stock });
        } else {
            alert('Out of stock!');
        }
    }
    updateCartUI();
    if (!document.getElementById('cart-panel').classList.contains('cart-open')) toggleCart();
}

function updateQuantity(name, change) {
    const item = cart.find(i => i.name === name);
    if (!item) return;
    const newQty = item.qty + change;
    if (newQty > item.maxStock) {
        alert(`Maksimal stok adalah ${item.maxStock}.`);
        return;
    }
    if (newQty <= 0) {
        removeFromCart(name);
    } else {
        item.qty = newQty;
    }
    updateCartUI();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

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

    const deliveryFee = selectedOngkir ? selectedOngkir.cost : 0;
    const grandTotal  = subtotal + deliveryFee;

    subtotalEl.innerText = `Rp ${subtotal.toLocaleString()}`;
    deliveryEl.innerText = selectedOngkir
        ? `Rp ${deliveryFee.toLocaleString()} (JNE ${selectedOngkir.service})`
        : 'Belum dipilih';
    totalEl.innerText = `Rp ${grandTotal.toLocaleString()}`;
    countEl.innerText = count;

    saveCartToStorage();
}

// ─── RAJAONGKIR ──────────────────────────────────────────────

async function loadProvinces() {
    try {
        const res  = await fetch(`${RAJAONGKIR_PROXY}/province`);
        const data = await res.json();
        const select = document.getElementById('shipping-province');
        data.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.province_id;
            opt.textContent = p.province;
            select.appendChild(opt);
        });
    } catch (e) {
        console.error('Gagal load provinsi:', e);
    }
}

async function onProvinceChange() {
    const el = document.getElementById('shipping-province');
    const provinceId = el.value;
    selectedProvinceName = el.selectedOptions[0]?.text || '';

    selectedCityId = null; selectedCityName = ''; selectedOngkir = null;
    resetOngkirResult(); updateCartUI();

    const citySelect = document.getElementById('shipping-city');
    citySelect.innerHTML = '<option value="">Pilih Kota/Kabupaten...</option>';
    citySelect.disabled = true;
    document.getElementById('shipping-address').disabled = true;
    document.getElementById('shipping-address').value = '';
    document.getElementById('btn-cek-ongkir').disabled = true;

    if (!provinceId) return;

    try {
        const res  = await fetch(`${RAJAONGKIR_PROXY}/city?province=${provinceId}`);
        const data = await res.json();
        data.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.city_id;
            opt.textContent = `${c.type} ${c.city_name}`;
            citySelect.appendChild(opt);
        });
        citySelect.disabled = false;
    } catch (e) {
        console.error('Gagal load kota:', e);
    }
}

function onCityChange() {
    const el = document.getElementById('shipping-city');
    selectedCityId   = el.value || null;
    selectedCityName = el.selectedOptions[0]?.text || '';
    selectedOngkir   = null;
    resetOngkirResult(); updateCartUI();

    const addr = document.getElementById('shipping-address');
    const btn  = document.getElementById('btn-cek-ongkir');
    if (selectedCityId) {
        addr.disabled = false;
        btn.disabled  = false;
    } else {
        addr.disabled = true; addr.value = '';
        btn.disabled  = true;
    }
}

function resetOngkirResult() {
    const el = document.getElementById('ongkir-result');
    el.classList.add('hidden');
    el.innerHTML = '';
}

async function checkOngkir() {
    if (!selectedCityId) return;
    const btn     = document.getElementById('btn-cek-ongkir');
    const btnText = document.getElementById('ongkir-btn-text');
    const resultEl = document.getElementById('ongkir-result');

    btnText.textContent = 'Mengecek...';
    btn.disabled = true;
    resetOngkirResult();

    try {
        const res   = await fetch(`${RAJAONGKIR_PROXY}/cost`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ origin: ORIGIN_CITY_ID, destination: selectedCityId, weight: 50, courier: 'jne' })
        });
        const costs = await res.json();

        resultEl.classList.remove('hidden');
        if (!costs.length) {
            resultEl.innerHTML = '<p class="text-yellow-400 text-xs text-center">Tidak ada layanan JNE tersedia.</p>';
            return;
        }

        costs.forEach(item => {
            const cost = item.cost[0];
            const div  = document.createElement('div');
            div.className = 'flex justify-between items-center p-2 rounded-lg cursor-pointer border border-gray-700 hover:border-blue-400 transition';
            div.dataset.service = item.service;
            div.onclick = () => selectOngkir(item.service, cost.value, cost.etd);
            div.innerHTML = `
                <div>
                    <p class="text-xs font-black text-white uppercase">JNE ${item.service}</p>
                    <p class="text-[10px] text-gray-500">${item.description} · ${cost.etd} hari</p>
                </div>
                <p class="text-sm font-black text-green-400">Rp ${cost.value.toLocaleString()}</p>
            `;
            resultEl.appendChild(div);
        });

        const reg = costs.find(c => c.service === 'REG');
        if (reg) selectOngkir(reg.service, reg.cost[0].value, reg.cost[0].etd);

    } catch (e) {
        resultEl.classList.remove('hidden');
        resultEl.innerHTML = '<p class="text-red-400 text-xs text-center">Gagal cek ongkir. Pastikan proxy Worker sudah di-deploy.</p>';
        console.error(e);
    }

    btnText.textContent = 'Cek Ongkos Kirim';
    btn.disabled = false;
}

function selectOngkir(service, cost, etd) {
    selectedOngkir = { service, cost, etd };
    updateCartUI();
    document.querySelectorAll('#ongkir-result > div[data-service]').forEach(el => {
        const sel = el.dataset.service === service;
        el.classList.toggle('border-blue-500', sel);
        el.classList.toggle('bg-blue-500/10', sel);
        el.classList.toggle('border-gray-700', !sel);
    });
}

// ─── CHECKOUT VALIDATION ─────────────────────────────────────

function processCheckout() {
    const buyerName  = document.getElementById('buyer-name').value.trim();
    const buyerPhone = document.getElementById('buyer-phone').value.trim();
    const address    = document.getElementById('shipping-address').value.trim();

    if (cart.length === 0)       { alert('Keranjang belanja masih kosong!'); return; }
    if (!buyerName)              { document.getElementById('buyer-name').focus(); alert('Mohon masukkan nama pemesan!'); return; }
    if (!buyerPhone)             { document.getElementById('buyer-phone').focus(); alert('Mohon masukkan nomor HP/WhatsApp!'); return; }
    if (!selectedCityId)         { alert('Mohon pilih kota tujuan pengiriman!'); return; }
    if (!address)                { document.getElementById('shipping-address').focus(); alert('Mohon masukkan alamat lengkap!'); return; }
    if (!selectedOngkir)         { alert('Mohon cek dan pilih layanan ongkos kirim!'); return; }

    // Build order snapshot
    const subtotal    = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const grandTotal  = subtotal + selectedOngkir.cost;
    const alamat      = `${address}, ${selectedCityName}, ${selectedProvinceName}`;

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
    const modal = document.getElementById('payment-modal');

    // Populate order summary
    const summaryEl = document.getElementById('pay-order-summary');
    summaryEl.innerHTML = o.items.map(i =>
        `<div class="flex justify-between"><span>${i.name} x${i.qty}</span><span>Rp ${(i.price * i.qty).toLocaleString()}</span></div>`
    ).join('') +
    `<div class="flex justify-between text-gray-500 mt-1"><span>Ongkir JNE ${o.ongkir.service}</span><span>Rp ${o.ongkir.cost.toLocaleString()}</span></div>`;

    document.getElementById('pay-total').textContent = `Rp ${o.grandTotal.toLocaleString()}`;

    // Populate recap
    document.getElementById('recap-name').textContent    = o.buyerName;
    document.getElementById('recap-phone').textContent   = o.buyerPhone;
    document.getElementById('recap-address').textContent = o.alamat;
    document.getElementById('recap-ongkir').textContent  = `JNE ${o.ongkir.service} — Rp ${o.ongkir.cost.toLocaleString()} (${o.ongkir.etd} hari)`;

    // Reset to step 1
    showStep('transfer');
    document.getElementById('proof-upload').value = '';
    document.getElementById('proof-preview').classList.add('hidden');
    document.getElementById('upload-placeholder').classList.remove('hidden');
    document.getElementById('btn-submit-order').disabled = true;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closePaymentModal() {
    const modal = document.getElementById('payment-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function showStep(step) {
    ['transfer', 'upload', 'done'].forEach(s => {
        document.getElementById(`step-${s}`).classList.toggle('hidden', s !== step);
    });
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
    if (file.size > 5 * 1024 * 1024) {
        alert('File terlalu besar. Maksimal 5MB.');
        input.value = '';
        return;
    }
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

    const itemLines = o.items.map(i =>
        `- ${i.name} (${i.qty}x) = Rp ${(i.price * i.qty).toLocaleString()}`
    ).join('\n');

    // ── WA to SELLER ──────────────────────────────────────────
    const sellerMsg =
`🛎️ *ORDER MASUK — ${o.orderId}*

👤 *Nama:* ${o.buyerName}
📱 *No. HP:* ${o.buyerPhone}
📍 *Alamat:* ${o.alamat}

🛒 *Pesanan:*
${itemLines}

💰 Subtotal     : Rp ${o.subtotal.toLocaleString()}
🚚 JNE ${o.ongkir.service} (${o.ongkir.etd}hr): Rp ${o.ongkir.cost.toLocaleString()}
━━━━━━━━━━━━━━━━━━
💵 *TOTAL BAYAR : Rp ${o.grandTotal.toLocaleString()}*

✅ Buyer telah upload bukti transfer.
📎 _Foto bukti bayar dikirim bersamaan._`;

    // ── WA to BUYER ───────────────────────────────────────────
    // Format buyer phone: strip leading 0, add 62
    const buyerWA = o.buyerPhone.replace(/^0/, '62').replace(/\D/g, '');

    const buyerMsg =
`Halo *${o.buyerName}* 👋

Terima kasih sudah berbelanja di *Gudang Kartu*!

📋 *Konfirmasi Pesanan — ${o.orderId}*

🛒 *Detail Pesanan:*
${itemLines}

💰 Subtotal     : Rp ${o.subtotal.toLocaleString()}
🚚 JNE ${o.ongkir.service} (${o.ongkir.etd} hari): Rp ${o.ongkir.cost.toLocaleString()}
━━━━━━━━━━━━━━━━━━
💵 *TOTAL         : Rp ${o.grandTotal.toLocaleString()}*

📍 *Dikirim ke:*
${o.alamat}

Pesanan kamu sedang kami proses. Kami akan menghubungi kamu jika ada info lebih lanjut 🙏`;

    // Open both WA tabs
    window.open(`https://wa.me/${SELLER_PHONE}?text=${encodeURIComponent(sellerMsg)}`);
    setTimeout(() => {
        window.open(`https://wa.me/${buyerWA}?text=${encodeURIComponent(buyerMsg)}`);
    }, 800); // slight delay so browser doesn't block both popups

    // Reset cart & form
    cart = [];
    saveCartToStorage();
    updateCartUI();

    ['buyer-name', 'buyer-phone', 'shipping-address'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('shipping-province').value = '';
    const citySelect = document.getElementById('shipping-city');
    citySelect.innerHTML = '<option value="">Pilih Kota/Kabupaten...</option>';
    citySelect.disabled = true;
    document.getElementById('shipping-address').disabled = true;
    document.getElementById('btn-cek-ongkir').disabled = true;
    resetOngkirResult();

    selectedCityId = null; selectedCityName = ''; selectedProvinceName = ''; selectedOngkir = null;
    pendingOrder   = null;

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