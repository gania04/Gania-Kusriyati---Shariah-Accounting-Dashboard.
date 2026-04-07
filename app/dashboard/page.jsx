<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HEMAT - Cafe All-in-One System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .bg-emerald-primary { background-color: #064e3b; }
        .bg-natural-cream { background-color: #f8fafc; }
        .sidebar-link.active { background-color: #065f46; border-right: 4px solid #34d399; }
        .mobile-link.active { color: #34d399; }
        .page-content { display: none; animation: slideIn 0.3s ease-out; }
        .page-content.active { display: block; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .glass { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
    </style>
</head>
<body class="bg-natural-cream font-sans text-slate-900 mb-20 md:mb-0">

    <div class="flex h-screen overflow-hidden relative">
        <aside class="hidden md:flex w-72 bg-emerald-primary text-white p-6 flex-col shadow-2xl z-50">
            <div class="flex items-center space-x-3 mb-10">
                <div class="w-10 h-10 bg-emerald-400 rounded-lg flex items-center justify-center text-emerald-900 shadow-lg"><i class="fas fa-gem text-xl"></i></div>
                <h2 class="text-2xl font-black tracking-tighter italic uppercase">HEMAT</h2>
            </div>
            <nav class="space-y-3 flex-1">
                <button onclick="showPage('overview', this)" class="sidebar-link active w-full text-left p-4 rounded-xl flex items-center hover:bg-emerald-800 transition-all"><i class="fas fa-th-large mr-4 opacity-70"></i> Dashboard</button>
                <button onclick="showPage('pos', this)" class="sidebar-link w-full text-left p-4 rounded-xl flex items-center hover:bg-emerald-800 transition-all"><i class="fas fa-cash-register mr-4 opacity-70"></i> POS Kasir</button>
                <button onclick="showPage('hpp-page', this)" class="sidebar-link w-full text-left p-4 rounded-xl flex items-center hover:bg-emerald-800 transition-all"><i class="fas fa-plus-circle mr-4 opacity-70"></i> Tambah Menu (HPP)</button>
                <button onclick="showPage('inventaris', this)" class="sidebar-link w-full text-left p-4 rounded-xl flex items-center hover:bg-emerald-800 transition-all"><i class="fas fa-boxes mr-4 opacity-70"></i> Inventaris Stok</button>
                <button onclick="showPage('keuangan', this)" class="sidebar-link w-full text-left p-4 rounded-xl flex items-center hover:bg-emerald-800 transition-all"><i class="fas fa-file-invoice-dollar mr-4 opacity-70"></i> Riwayat & Audit</button>
            </nav>
        </aside>

        <main class="flex-1 p-4 md:p-10 overflow-y-auto no-scrollbar">
            
            <div id="overview" class="page-content active">
                <div class="flex justify-between items-end mb-8">
                    <div>
                        <h1 class="text-3xl font-black text-slate-800 uppercase">Dashboard Performa</h1>
                        <p id="clock" class="text-emerald-700 font-bold font-mono text-sm"></p>
                    </div>
                    <div class="bg-white p-3 rounded-2xl shadow-sm border text-right">
                        <p class="text-[10px] font-bold text-slate-400 uppercase">Zakat Mal Estimasi (2.5%)</p>
                        <h2 id="kpiZakat" class="text-emerald-600 font-black">Rp 0</h2>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div class="glass p-5 rounded-2xl border-t-4 border-emerald-500"><p class="text-[10px] font-black text-slate-400 uppercase">Total Kas</p><h2 id="kpiAset" class="text-lg font-black text-slate-800">Rp 150.000.000</h2></div>
                    <div class="glass p-5 rounded-2xl border-t-4 border-blue-500"><p class="text-[10px] font-black text-slate-400 uppercase">Omzet</p><h2 id="kpiJual" class="text-lg font-black text-blue-700">Rp 0</h2></div>
                    <div class="glass p-5 rounded-2xl border-t-4 border-orange-500"><p class="text-[10px] font-black text-slate-400 uppercase">Total HPP</p><h2 id="kpiHPP" class="text-lg font-black text-orange-600">Rp 0</h2></div>
                    <div class="glass p-5 rounded-2xl border-t-4 border-purple-500"><p class="text-[10px] font-black text-slate-400 uppercase">Laba Bersih</p><h2 id="kpiLaba" class="text-lg font-black text-purple-700">Rp 0</h2></div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-2 glass p-6 rounded-3xl shadow-sm border border-white">
                        <canvas id="chartOmzet" height="150"></canvas>
                    </div>
                    <div class="glass p-6 rounded-3xl border-2 border-emerald-500 bg-emerald-50/50">
                        <h3 class="font-black text-xs uppercase mb-4 text-emerald-900">Audit Kilat AI</h3>
                        <div id="auditBox" class="space-y-3 text-xs leading-relaxed text-emerald-800 italic">
                            <p>Menunggu data transaksi untuk diaudit...</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="pos" class="page-content">
                <h1 class="text-2xl font-black text-emerald-900 mb-8 uppercase italic">Kasir HEMAT</h1>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2">
                        <div id="menuContainer" class="grid grid-cols-2 md:grid-cols-3 gap-4">
                            </div>
                    </div>
                    <div class="lg:col-span-1">
                        <div class="glass rounded-3xl shadow-xl flex flex-col border-2 border-emerald-500 overflow-hidden">
                            <div id="logTransaksi" class="h-80 p-4 space-y-2 overflow-y-auto bg-white/50 font-mono text-[11px]"></div>
                            <div class="p-4 border-t bg-white">
                                <div class="flex justify-between font-black text-lg mb-4 text-emerald-900"><span>TOTAL</span><span id="totalBayar">Rp 0</span></div>
                                <button onclick="checkout()" class="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold uppercase italic shadow-lg active:scale-95 transition-all">Proses Bayar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="hpp-page" class="page-content">
                <h1 class="text-2xl font-black mb-8 text-emerald-900 uppercase italic">Kalkulator HPP Akuntansi</h1>
                <div class="glass p-8 rounded-3xl border-2 border-emerald-100">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="space-y-4">
                            <div><label class="text-[10px] font-bold text-slate-500 uppercase">Nama Menu Baru</label>
                                <input id="hppName" type="text" placeholder="Contoh: Es Kopi Susu" class="w-full p-3 rounded-xl border font-bold shadow-inner"></div>
                            <div><label class="text-[10px] font-bold text-slate-500 uppercase">Target Food Cost (%)</label>
                                <input id="hppTarget" type="number" value="30" oninput="hitungHPPDetail()" class="w-full p-3 rounded-xl border font-bold"></div>
                        </div>
                        <div class="space-y-4">
                            <div><label class="text-[10px] font-bold text-slate-500 uppercase">Modal Bahan Baku (Rp)</label>
                                <input id="modalBahan" type="number" oninput="hitungHPPDetail()" class="w-full p-3 rounded-xl border font-bold"></div>
                            <div><label class="text-[10px] font-bold text-slate-500 uppercase">Modal Ops / Kemasan (Rp)</label>
                                <input id="modalOps" type="number" oninput="hitungHPPDetail()" class="w-full p-3 rounded-xl border font-bold"></div>
                        </div>
                        <div class="bg-emerald-900 text-white p-6 rounded-3xl flex flex-col justify-center shadow-xl">
                            <p class="text-xs opacity-60 uppercase mb-1 text-center">Saran Harga Jual (Akuntansi)</p>
                            <h2 id="hasilJual" class="text-3xl font-black text-emerald-400 mb-4 text-center">Rp 0</h2>
                            <button onclick="simpanHPP()" class="w-full bg-emerald-400 text-emerald-900 py-4 rounded-xl font-black uppercase text-sm hover:bg-white transition-all shadow-lg">
                                <i class="fas fa-plus-circle mr-2"></i> Tambahkan ke POS
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="inventaris" class="page-content">
                <h1 class="text-2xl font-black mb-8 text-slate-800 uppercase italic">Inventaris Stok Bahan</h1>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-1 glass p-6 rounded-3xl border-2 border-slate-100 h-fit">
                        <h3 class="font-black text-xs uppercase mb-4 text-slate-400">Update Stok</h3>
                        <div class="space-y-4">
                            <input id="invNama" type="text" placeholder="Nama Bahan" class="w-full p-3 rounded-xl border text-sm font-bold">
                            <input id="invStok" type="number" placeholder="Jumlah" class="w-full p-3 rounded-xl border text-sm font-bold">
                            <button onclick="tambahInventaris()" class="w-full bg-slate-800 text-white py-3 rounded-xl font-bold uppercase shadow-lg hover:bg-black transition-all">Simpan Stok</button>
                        </div>
                    </div>
                    <div class="lg:col-span-2 glass rounded-3xl overflow-hidden border">
                        <table class="w-full text-left" id="tabelInv">
                            <thead class="bg-slate-50 text-[10px] uppercase font-bold text-slate-400">
                                <tr><th class="p-4">Nama Bahan</th><th class="p-4">Stok Tersedia</th><th class="p-4">Status</th></tr>
                            </thead>
                            <tbody class="divide-y text-xs bg-white">
                                <tr><td class="p-4 font-bold">Biji Kopi Arabica</td><td class="p-4">5.000 gr</td><td class="p-4"><span class="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg">Aman</span></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="keuangan" class="page-content">
                <h1 class="text-2xl font-black mb-8 text-slate-800 uppercase italic">Laporan Audit & Riwayat</h1>
                <div class="glass rounded-3xl overflow-hidden border">
                    <table class="w-full text-left" id="tabelRiwayat">
                        <thead class="bg-slate-800 text-white text-[10px] uppercase font-mono">
                            <tr><th class="p-4">Waktu</th><th class="p-4">Item</th><th class="p-4">Omzet</th><th class="p-4">HPP</th><th class="p-4 text-right">Laba Bersih</th></tr>
                        </thead>
                        <tbody class="divide-y text-xs font-medium bg-white"></tbody>
                    </table>
                </div>
            </div>
        </main>

        <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-emerald-primary text-white flex justify-around items-center p-3 z-[60] rounded-t-3xl shadow-2xl">
            <button onclick="showPage('overview', this)" class="mobile-link active flex flex-col items-center gap-1"><i class="fas fa-th-large"></i><span class="text-[8px]">Home</span></button>
            <button onclick="showPage('pos', this)" class="mobile-link flex flex-col items-center gap-1"><i class="fas fa-cash-register"></i><span class="text-[8px]">POS</span></button>
            <button onclick="showPage('hpp-page', this)" class="mobile-link flex flex-col items-center gap-1"><i class="fas fa-plus"></i><span class="text-[8px]">Menu</span></button>
            <button onclick="showPage('inventaris', this)" class="mobile-link flex flex-col items-center gap-1"><i class="fas fa-boxes"></i><span class="text-[8px]">Stok</span></button>
            <button onclick="showPage('keuangan', this)" class="mobile-link flex flex-col items-center gap-1"><i class="fas fa-file-invoice-dollar"></i><span class="text-[8px]">Logs</span></button>
        </nav>

        <div id="toast" class="fixed top-5 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full text-xs font-bold shadow-2xl opacity-0 transition-all z-[100]"><span id="toastMsg"></span></div>
    </div>

    <script>
        // STATE UTAMA
        let saldoKas = 150000000;
        let omzetTotal = 0;
        let hppTotal = 0;
        let keranjang = [];
        let historyData = [];

        // DATABASE MENU AWAL
        let daftarMenu = [
            { nama: "Kopi Anekdot", harga: 22000, hpp: 8500 },
            { nama: "Kopi Amanah", harga: 18000, hpp: 7000 }
        ];

        // LOGIKA POS
        function initMenu() {
            const container = document.getElementById('menuContainer');
            container.innerHTML = '';
            daftarMenu.forEach(item => {
                const btn = document.createElement('button');
                btn.onclick = () => buatPesanan(item.nama, item.harga);
                btn.className = "glass p-6 rounded-3xl hover:bg-emerald-600 hover:text-white transition-all text-left group";
                btn.innerHTML = `
                    <i class="fas fa-coffee text-2xl mb-3 text-emerald-600 group-hover:text-white"></i>
                    <p class="font-black">${item.nama}</p>
                    <p class="text-xs opacity-70">Rp ${item.harga.toLocaleString()}</p>
                `;
                container.appendChild(btn);
            });
        }

        function buatPesanan(nama, harga) {
            keranjang.push({ nama, harga });
            updateLog();
        }

        function updateLog() {
            const log = document.getElementById('logTransaksi');
            let total = 0;
            log.innerHTML = keranjang.map((i, idx) => {
                total += i.harga;
                return `<div class="flex justify-between border-b border-emerald-50 pb-1">
                            <span>${i.nama}</span>
                            <div class="flex gap-2">
                                <b>${i.harga.toLocaleString()}</b>
                                <button onclick="hapusItem(${idx})" class="text-red-500 hover:scale-110"><i class="fas fa-times"></i></button>
                            </div>
                        </div>`;
            }).join('');
            document.getElementById('totalBayar').innerText = "Rp " + total.toLocaleString();
        }

        function hapusItem(index) {
            keranjang.splice(index, 1);
            updateLog();
        }

        function checkout() {
            if(keranjang.length === 0) return;
            let subtotal = 0, subHPP = 0, itemsList = [];
            
            keranjang.forEach(k => {
                subtotal += k.harga;
                let menuData = daftarMenu.find(m => m.nama === k.nama);
                subHPP += menuData ? menuData.hpp : 0;
                itemsList.push(k.nama);
            });

            saldoKas += subtotal; 
            omzetTotal += subtotal; 
            hppTotal += subHPP;

            const trx = {
                waktu: new Date().toLocaleTimeString(),
                items: itemsList.join(", "),
                omzet: subtotal,
                hpp: subHPP,
                laba: subtotal - subHPP
            };

            historyData.push(trx);
            updateDashboard();
            updateRiwayatTable(trx);
            runAuditAI();
            
            keranjang = []; 
            updateLog(); 
            showToast("Transaksi Berhasil!");
        }

        // LOGIKA HPP (FIX AKUNTANSI)
        function hitungHPPDetail() {
            const bahan = parseInt(document.getElementById('modalBahan').value) || 0;
            const ops = parseInt(document.getElementById('modalOps').value) || 0;
            const target = parseInt(document.getElementById('hppTarget').value) || 1;

            // Logika Akuntansi: Total HPP = Bahan + Ops
            const totalHPPPerPorsi = bahan + ops;
            
            // Rumus: Harga Jual = Total HPP / (Target % / 100)
            const hargaJualRaw = totalHPPPerPorsi / (target / 100);
            
            // Pembulatan ke ribuan terdekat (Komersial)
            const hargaJualFinal = Math.ceil(hargaJualRaw / 1000) * 1000;
            
            document.getElementById('hasilJual').innerText = "Rp " + (totalHPPPerPorsi > 0 ? hargaJualFinal.toLocaleString() : "0");
        }

        function simpanHPP() {
            const n = document.getElementById('hppName').value;
            const b = parseInt(document.getElementById('modalBahan').value) || 0;
            const o = parseInt(document.getElementById('modalOps').value) || 0;
            const j = parseInt(document.getElementById('hasilJual').innerText.replace(/\D/g,''));
            
            if(!n || j <= 0) return alert("Lengkapi data menu!");
            
            daftarMenu.push({ nama: n, harga: j, hpp: (b+o) });
            initMenu();
            showToast(`Menu ${n} disimpan!`);
            showPage('pos');
            
            // Reset
            document.getElementById('hppName').value = "";
            document.getElementById('modalBahan').value = "";
            document.getElementById('modalOps').value = "";
        }

        // UTILS & UI
        function showPage(pageId, btn) {
            document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');
            document.querySelectorAll('.sidebar-link, .mobile-link').forEach(l => l.classList.remove('active'));
            if(btn) btn.classList.add('active');
        }

        function updateDashboard() {
            document.getElementById('kpiAset').innerText = "Rp " + saldoKas.toLocaleString();
            document.getElementById('kpiJual').innerText = "Rp " + omzetTotal.toLocaleString();
            document.getElementById('kpiHPP').innerText = "Rp " + hppTotal.toLocaleString();
            document.getElementById('kpiLaba').innerText = "Rp " + (omzetTotal - hppTotal).toLocaleString();
            document.getElementById('kpiZakat').innerText = "Rp " + (saldoKas * 0.025).toLocaleString();
        }

        function updateRiwayatTable(t) {
            const b = document.getElementById('tabelRiwayat').querySelector('tbody');
            b.innerHTML = `<tr>
                <td class="p-4 font-mono text-[10px]">${t.waktu}</td>
                <td class="p-4">${t.items}</td>
                <td class="p-4 font-bold">Rp ${t.omzet.toLocaleString()}</td>
                <td class="p-4 text-red-500">Rp ${t.hpp.toLocaleString()}</td>
                <td class="p-4 text-right text-emerald-600 font-black">Rp ${t.laba.toLocaleString()}</td>
            </tr>` + b.innerHTML;
        }

        function runAuditAI() {
            const laba = omzetTotal - hppTotal;
            const fc = omzetTotal > 0 ? ((hppTotal / omzetTotal) * 100).toFixed(1) : 0;
            document.getElementById('auditBox').innerHTML = `
                <p>✅ Margin: Rp ${laba.toLocaleString()}</p>
                <p>📉 Real Food Cost: ${fc}% ${fc > 35 ? '(Hati-hati, tinggi!)' : '(Sehat)'}</p>
                <p>🕌 Zakat Mal: Rp ${(saldoKas * 0.025).toLocaleString()}</p>
            `;
        }

        function tambahInventaris() {
            const n = document.getElementById('invNama').value;
            const s = document.getElementById('invStok').value;
            if(!n || !s) return;
            const table = document.getElementById('tabelInv').querySelector('tbody');
            const row = `<tr><td class="p-4 font-bold">${n}</td><td class="p-4">${s}</td><td class="p-4"><span class="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg">Updated</span></td></tr>`;
            table.innerHTML = row + table.innerHTML;
            document.getElementById('invNama').value = ""; document.getElementById('invStok').value = "";
            showToast("Stok Diperbarui!");
        }

        function showToast(m) {
            const t = document.getElementById('toast'); document.getElementById('toastMsg').innerText = m;
            t.style.opacity = "1"; setTimeout(() => t.style.opacity = "0", 3000);
        }

        window.onload = () => {
            initMenu();
            updateDashboard();
            const ctx = document.getElementById('chartOmzet').getContext('2d');
            new Chart(ctx, { type: 'line', data: { labels: ['01', '02', '03', '04', '05'], datasets: [{ label: 'Tren Omzet', data: [12, 19, 15, 25, 30], borderColor: '#10b981', tension: 0.4 }] } });
            setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleString('id-ID'); }, 1000);
        };
    </script>
</body>
</html>
