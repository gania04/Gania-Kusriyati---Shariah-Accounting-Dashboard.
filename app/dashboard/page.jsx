'use client'; // Wajib ada karena kodinganmu pakai interaksi klik & chart

import { useEffect, useState } from 'react';

export default function DashboardPage() {
    // Ini adalah fungsi "Bungkus" utamanya
    return (
        <div className="bg-natural-cream font-sans text-slate-900 mb-20 md:mb-0">
            <div className="flex h-screen overflow-hidden relative">

                {/* Sidebar */}
                <aside className="hidden md:flex w-72 bg-emerald-900 text-white p-6 flex-col shadow-2xl z-50">
                    <div className="flex items-center space-x-3 mb-10">
                        <div className="w-10 h-10 bg-emerald-400 rounded-lg flex items-center justify-center text-emerald-900 shadow-lg">
                            <i className="fas fa-gem text-xl"></i>
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter italic uppercase">HEMAT</h2>
                    </div>
                    <nav className="space-y-3 flex-1">
                        <button className="w-full text-left p-4 rounded-xl flex items-center bg-emerald-800 border-r-4 border-emerald-400">
                            <i className="fas fa-th-large mr-4 opacity-70"></i> Dashboard
                        </button>
                        {/* ... Tombol lainnya ... */}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-10 overflow-y-auto">
                    <div id="overview">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-slate-800 uppercase">Dashboard Performa</h1>
                                <p className="text-emerald-700 font-bold font-mono text-sm">Update Real-time</p>
                            </div>
                            <div className="bg-white p-3 rounded-2xl shadow-sm border text-right">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Zakat Mal Estimasi (2.5%)</p>
                                <h2 className="text-emerald-600 font-black">Rp 0</h2>
                            </div>
                        </div>

                        {/* Grid Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border-t-4 border-emerald-500 shadow-sm">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Total Kas</p>
                                <h2 className="text-lg font-black text-slate-800">Rp 150.000.000</h2>
                            </div>
                            {/* Tambahkan card lainnya di sini */}
                        </div>

                        <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-500">
                            <h3 className="font-black text-xs uppercase mb-2">Status Audit AI</h3>
                            <p className="italic text-emerald-800 text-sm">Sistem siap memantau keuangan cafe Anda.</p>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
}