"use client";

import React, { useState } from 'react';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password) {
            setError('Semua kolom wajib diisi.');
            return;
        }

        setIsLoading(true);

        // Simulasi proses registrasi (API call mockup)
        setTimeout(() => {
            if (email.endsWith('@tazkia.ac.id') && password.length >= 6) {
                // Registrasi berhasil
                alert('Pendaftaran Berhasil! Silakan masuk dengan akun baru Anda.');
                // Simulasi redirect ke halaman login
                window.location.href = '/Login.jsx'; 
            } else {
                // Registrasi gagal
                setError('Pendaftaran gagal. Pastikan email menggunakan @tazkia.ac.id dan kata sandi minimal 6 karakter.');
                setIsLoading(false);
            }
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-t-4 border-emerald-600">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-emerald-800">Daftar Akun Baru</h1>
                    <p className="text-sm text-gray-500 mt-2 italic">
                        "Mulai amanah baru, kelola transaksi dengan restu."
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleRegister}>
                    {error && (
                        <div className="p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center font-medium mb-2">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                            placeholder="Masukkan nama sesuai KTP"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Kampus</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                            placeholder="email@tazkia.ac.id"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kata Sandi</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                            placeholder="Buat sandi yang kuat"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full ${isLoading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg mt-4 flex justify-center items-center`}
                    >
                        {isLoading ? (
                            <span className="flex items-center space-x-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Memproses...</span>
                            </span>
                        ) : "Daftar Sekarang"}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-gray-500">
                    Sudah punya akun? <span className="text-emerald-600 font-bold cursor-pointer underline">Masuk di sini</span>
                </p>

            </div>
        </div>
    );
}