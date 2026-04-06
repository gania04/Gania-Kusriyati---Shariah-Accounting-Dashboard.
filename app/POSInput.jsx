"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://siimjndxthtblqgaseff.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpaW1qbmR4dGh0YmxxZ2FzZWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDkzODAsImV4cCI6MjA5MDYyNTM4MH0.otIG6S117I8dJUA47JtM9GtKI51b01Hznp2qi_G48KI";

export default function POSInput() {
    // State autentikasi
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // State POS
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    // Simulasi data produk
    const products = [
        { id: 1, name: "Buku Akuntansi Syariah", price: 85000 },
        { id: 2, name: "Al-Qur'an Terjemah", price: 125000 },
        { id: 3, name: "Sajadah Travel", price: 45000 },
    ];

    const addToCart = (product) => {
        setCart([...cart, product]);
        setTotal(total + product.price);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Silakan masukkan email dan kata sandi.');
            return;
        }

        setIsLoading(true);

        try {
            const supabase = createClient(supabaseUrl, supabaseAnonKey);
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (authError) {
                setError(`Gagal: ${authError.message}`);
            } else {
                setIsAuthenticated(true);
            }
        } catch (err) {
            setError("Sistem belum siap. Pastikan sudah jalankan 'npm install @supabase/supabase-js'");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Silakan masukkan email staf Anda terlebih dahulu di kolom email.");
            return;
        }

        try {
            const supabase = createClient(supabaseUrl, supabaseAnonKey);
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
            if (resetError) {
                setError("Gagal mengirim email reset: " + resetError.message);
            } else {
                alert("Link reset password telah dikirim ke " + email + ". Silakan cek kotak masuk Anda.");
            }
        } catch (err) {
            setError("Terjadi kesalahan sistem saat mencoba reset password.");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-t-4 border-emerald-600">

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-emerald-800">SIA-Tazkia POS</h1>
                        <p className="text-sm text-gray-500 mt-2 italic">
                            "Mencari rezeki yang berkah, menjalankan amanah dengan indah."
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center font-medium">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Kasir</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                placeholder="nama@tazkia.ac.id"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kata Sandi</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full ${isLoading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg flex justify-center items-center`}
                        >
                            {isLoading ? (
                                <span className="flex items-center space-x-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Memproses...</span>
                                </span>
                            ) : "Masuk & Mulai Amanah"}
                        </button>
                    </form>

                    <p 
                        className="mt-6 text-center text-xs text-gray-400 cursor-pointer hover:underline transition"
                        onClick={handleForgotPassword}
                    >
                        Lupa password? Hubungi Admin IT Tazkia (atau klik di sini untuk reset).
                    </p>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Kolom Kiri: Daftar Produk */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
                        <h2 className="text-xl font-bold text-emerald-800 mb-4">Pilih Produk</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {products.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => addToCart(p)}
                                    className="flex justify-between items-center p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition"
                                >
                                    <span className="font-medium text-gray-700">{p.name}</span>
                                    <span className="text-emerald-600 font-bold">Rp {p.price.toLocaleString()}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Kolom Kanan: Ringkasan Belanja */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-emerald-600 h-fit">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Pesanan</h2>

                    <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                        {cart.length === 0 ? (
                            <p className="text-gray-400 text-center py-4">Belum ada barang dipilih</p>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm border-b pb-2">
                                    <span>{item.name}</span>
                                    <span className="font-semibold">Rp {item.price.toLocaleString()}</span>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold text-emerald-800 mb-6">
                            <span>Total Akhir</span>
                            <span>Rp {total.toLocaleString()}</span>
                        </div>

                        <button
                            disabled={cart.length === 0}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow-md disabled:bg-gray-300 disabled:shadow-none transition"
                        >
                            Proses Pembayaran
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}