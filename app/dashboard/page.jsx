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

// Registrasi ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Inisialisasi Supabase
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function DashboardHema() {
    const [activePage, setActivePage] = useState('overview');
    const [saldoKas, setSaldoKas] = useState(150000000); // Modal Awal
    const [omzetTotal, setOmzetTotal] = useState(0);
    const [hppTotal, setHppTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    // Efek untuk mengambil data dari Supabase (Modul 3)
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

    // Komponen Sidebar (Deskto)
    const Sidebar = () => (
        <aside className="hidden md:flex w-72 bg-[#064e3b] text-white p-6 flex-col shadow-2xl z-50 h-screen">
            <div className="flex items-center space-x-3 mb-10">
                <div className="w-10 h-10 bg-emerald-400 rounded-lg flex i justify-center text-emerald-900 shadow-lg font-bold">H</div>
                <h2 className="text-2xl font-black tracking-tighter italic uppercase">HEMAT</h2>
            </div>
            <nav className="space-y-3 flex-1">
                {['overview', 'pos', 'hpp-page', 'inventaris', 'keuangan'].map((page) => (
                    <button
                        key={page}
                        onClick={() => setActivePage(page)}
                        className={`w-full text-left p-4 rounded-xl flex items-center transition-all ${activePage === page ? 'bg-[#065f46] border-right-4 border-emerald-400' : 'hover:bg-emerald-800'}`}
                    >
                        <span className="capitalize">{page.replace('-', ' ')}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );

    return (
        <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-900">
            <Sidebar />

            <main className="flex-1 p-4 md:p-10 overflow-y-auto">
                {/* HALAMAN OVERVIEW */}
                {activePage === 'overview' && (
                    <div className="animate-in fade-in duration-500">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-slate-800 uppercase">Dashboard Performa</h1>
                                <p className="text-emerald-700 font-bold font-mono text-sm">Update Real-time</p>
                            </div>
                            <div className="bg-white p-3 rounded-2xl shadow-sm border text-right">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Zakat Mal Estimasi (2.5%)</p>
                                <h2 className="text-emerald-600 font-black">
                                    Rp {((saldoKas + omzetTotal) * 0.025).toLocaleString('id-ID')}
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <StatCard title="Total Kas" value={saldoKas + omzetTotal} color="border-emerald-500" />
                            <StatCard title="Omzet" value={omzetTotal} color="border-blue-500" textColor="text-blue-700" />
                            <StatCard title="Total HPP" value={hppTotal} color="border-orange-500" textColor="text-orange-600" />
                            <StatCard title="Laba Bersih" value={omzetTotal - hppTotal} color="border-purple-500" textColor="text-purple-700" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm">
                                <Line
                                    data={{
                                        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                                        datasets: [{ label: 'Tren Omzet', data: [10, 25, 15, omzetTotal / 1000000], borderColor: '#10b981', tension: 0.4 }]
                                    }}
                                />
                            </div>
                            <div className="p-6 rounded-3xl border-2 border-emerald-500 bg-emerald-50/50">
                                <h3 className="font-black text-xs uppercase mb-4 text-emerald-900">Audit Kilat AI</h3>
                                <div className="space-y-3 text-xs leading-relaxed text-emerald-800 italic">
                                    <p>✅ Status: Amanah</p>
                                    <p>🕌 Zakat Terhitung Otomatis</p>
                                    <p>Sistem siap memantau keuangan cafe Anda.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* HALAMAN POS (PLACEHOLDER) */}
                {activePage === 'pos' && (
                    <div className="p-10 text-center">
                        <h2 className="text-2xl font-bold">Halaman POS Kasir</h2>
                        <p>Silahkan integrasikan input produk di sini sesuai Modul 2.</p>
                        <button
                            onClick={() => setActivePage('overview')}
                            className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-full"
                        >
                            Kembali ke Dashboard
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

// Sub-komponen untuk Card agar kode bersih
function StatCard({ title, value, color, textColor = "text-slate-800" }) {
    return (
        <div className={`bg-white/80 backdrop-blur-md p-5 rounded-2xl border-t-4 shadow-sm ${color}`}>
            <p className="text-[10px] font-black text-slate-400 uppercase">{title}</p>
            <h2 className={`text-lg font-black ${textColor}`}>
                Rp {value.toLocaleString('id-ID')}
            </h2>
        </div>
    );
}