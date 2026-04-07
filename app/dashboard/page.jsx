"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function DashboardHema() {
    const [activePage, setActivePage] = useState('overview');
    const [saldoKas, setSaldoKas] = useState(150000000);
    const [omzetTotal, setOmzetTotal] = useState(0);
    const [hppTotal, setHppTotal] = useState(0);
    const [keranjang, setKeranjang] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    const [daftarMenu, setDaftarMenu] = useState([
        { nama: "Kopi Anekdot", harga: 22000, hpp: 8500 },
        { nama: "Kopi Amanah", harga: 18000, hpp: 7000 }
    ]);

    useEffect(() => {
        fetchRealtimeData();
    }, []);

    async function fetchRealtimeData() {
        const { data: sales } = await supabase.from('sales').select('*');
        if (sales) {
            const total = sales.reduce((acc, curr) => acc + Number(curr.total_price || 0), 0);
            setOmzetTotal(total);
        }
    }

    const tambahKeKeranjang = (menu) => {
        setKeranjang([...keranjang, menu]);
    };

    const checkout = () => {
        if (keranjang.length === 0) return;
        const subtotal = keranjang.reduce((acc, curr) => acc + curr.harga, 0);
        const subHPP = keranjang.reduce((acc, curr) => acc + curr.hpp, 0);

        setOmzetTotal(prev => prev + subtotal);
        setHppTotal(prev => prev + subHPP);
        setHistoryData([{
            waktu: new Date().toLocaleTimeString(),
            items: keranjang.map(i => i.nama).join(", "),
            omzet: subtotal,
            laba: subtotal - subHPP
        }, ...historyData]);

        setKeranjang([]);
        alert("Transaksi Berhasil!");
    };

    return (
        <div className="flex h-screen bg-[#f8fafc] text-slate-900 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-[#064e3b] text-white p-6 flex flex-col shadow-2xl">
                <div className="flex items-center space-x-3 mb-10">
                    <div className="w-10 h-10 bg-emerald-400 rounded-lg flex items-center justify-center text-emerald-900 font-bold shadow-lg">H</div>
                    <h2 className="text-2xl font-black tracking-tighter italic uppercase">HEMAT</h2>
                </div>
                <nav className="space-y-3 flex-1">
                    {['overview', 'pos', 'keuangan'].map((page) => (
                        <button
                            key={page}
                            onClick={() => setActivePage(page)}
                            className={`w-full text-left p-4 rounded-xl transition-all ${activePage === page ? 'bg-[#065f46] border-r-4 border-emerald-400' : 'hover:bg-emerald-800'}`}
                        >
                            <span className="capitalize">{page}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
                {activePage === 'overview' && (
                    <div className="animate-in fade-in duration-500">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-slate-800 uppercase">Dashboard Performa</h1>
                                <p className="text-emerald-700 font-bold font-mono text-sm">Real-time Accounting</p>
                            </div>
                            <div className="bg-white p-3 rounded-2xl shadow-sm border text-right">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Zakat Mal (2.5%)</p>
                                <h2 className="text-emerald-600 font-black">
                                    Rp {((saldoKas + omzetTotal) * 0.025).toLocaleString('id-ID')}
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-8">
                            <StatCard title="Total Kas" value={saldoKas + omzetTotal} color="border-emerald-500" />
                            <StatCard title="Omzet" value={omzetTotal} color="border-blue-500" textColor="text-blue-700" />
                            <StatCard title="Total HPP" value={hppTotal} color="border-orange-500" textColor="text-orange-600" />
                            <StatCard title="Laba Bersih" value={omzetTotal - hppTotal} color="border-purple-500" textColor="text-purple-700" />
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2 bg-white p-6 rounded-3xl border shadow-sm">
                                <Line
                                    data={{
                                        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                                        datasets: [{ label: 'Tren Omzet', data: [12, 19, 15, omzetTotal / 1000000], borderColor: '#10b981', tension: 0.4 }]
                                    }}
                                />
                            </div>
                            <div className="p-6 rounded-3xl border-2 border-emerald-500 bg-emerald-50/50 italic text-xs text-emerald-800">
                                <h3 className="font-black uppercase mb-4">Audit Kilat AI</h3>
                                <p>✅ Status: Amanah</p>
                                <p>📉 Food Cost: {omzetTotal > 0 ? ((hppTotal / omzetTotal) * 100).toFixed(1) : 0}%</p>
                                <p>Sistem siap memantau keuangan anda.</p>
                            </div>
                        </div>
                    </div>
                )}

                {activePage === 'pos' && (
                    <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-2 grid grid-cols-2 gap-4">
                            {daftarMenu.map((menu, idx) => (
                                <button key={idx} onClick={() => tambahKeKeranjang(menu)} className="bg-white p-6 rounded-3xl border-2 hover:border-emerald-500 transition-all text-left shadow-sm">
                                    <p className="font-black">{menu.nama}</p>
                                    <p className="text-emerald-600 font-bold">Rp {menu.harga.toLocaleString()}</p>
                                </button>
                            ))}
                        </div>
                        <div className="bg-white p-6 rounded-3xl border-2 border-emerald-500 shadow-xl h-fit">
                            <h3 className="font-black mb-4 uppercase">Keranjang</h3>
                            <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
                                {keranjang.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm border-b pb-1">
                                        <span>{item.nama}</span>
                                        <span>{item.harga.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between font-black text-xl mb-4">
                                <span>TOTAL</span>
                                <span>Rp {keranjang.reduce((a, b) => a + b.harga, 0).toLocaleString()}</span>
                            </div>
                            <button onClick={checkout} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold uppercase hover:bg-emerald-700">Bayar Sekarang</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

function StatCard({ title, value, color, textColor = "text-slate-800" }) {
    return (
        <div className={`bg-white p-5 rounded-2xl border-t-4 shadow-sm ${color}`}>
            <p className="text-[10px] font-black text-slate-400 uppercase">{title}</p>
            <h2 className={`text-lg font-black ${textColor}`}>Rp {value.toLocaleString('id-ID')}</h2>
        </div>
    );
}