"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// Import ini sering bikin error kalau belum npm install, jadi kita amankan
import { createClient } from '@supabase/supabase-js';

// Kredensial Supabase milikmu
const supabaseUrl = "https://siimjndxthtblqgaseff.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpaW1qbmR4dGh0YmxxZ2FzZWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDkzODAsImV4cCI6MjA5MDYyNTM4MH0.otIG6S117I8dJUA47JtM9GtKI51b01Hznp2qi_G48KI";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const supabase = createClient(supabaseUrl, supabaseAnonKey);
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                alert(`Gagal: ${error.message}`);
            } else {
                alert("Login Berhasil!");
                router.push('/dashboard');
            }
        } catch (err) {
            alert("Sistem belum siap. Pastikan sudah jalankan 'npm install @supabase/supabase-js'");
        } finally {
            setIsLoading(false);
        }
    };

    // Fitur Baru: Lupa Password
    const handleForgotPassword = async () => {
        if (!email) {
            alert("Silakan masukkan email staff Anda terlebih dahulu di kolom email.");
            return;
        }

        try {
            const supabase = createClient(supabaseUrl, supabaseAnonKey);
            const { error } = await supabase.auth.resetPasswordForEmail(email);
            if (error) {
                alert("Gagal mengirim email reset: " + error.message);
            } else {
                alert("Link reset password telah dikirim ke " + email + ". Silakan cek kotak masuk Anda.");
            }
        } catch (err) {
            alert("Terjadi kesalahan sistem saat mencoba reset password.");
        }
    };

    // Gaya CSS tetap sama, ditambahkan sedikit untuk ikon & AI Audit
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#ecfdf5',
            fontFamily: 'sans-serif',
            margin: '0',
            padding: '20px'
        },
        card: {
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '30px',
            boxShadow: '0 20px 40px rgba(5, 150, 105, 0.1)',
            width: '100%',
            maxWidth: '360px',
            textAlign: 'center',
            border: '1px solid #d1fae5'
        },
        header: {
            color: '#064e3b',
            margin: '0 0 5px 0',
            fontSize: '36px',
            fontWeight: '900',
            letterSpacing: '-1px'
        },
        slogan: {
            color: '#059669',
            fontSize: '11px',
            marginBottom: '30px',
            fontWeight: '700',
            textTransform: 'uppercase'
        },
        inputWrapper: {
            position: 'relative',
            marginBottom: '15px',
            width: '100%'
        },
        icon: {
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '16px',
            color: '#059669'
        },
        input: {
            width: '100%',
            padding: '15px 15px 15px 45px',
            borderRadius: '15px',
            border: '1px solid #a7f3d0',
            backgroundColor: '#f9fafb',
            boxSizing: 'border-box',
            fontSize: '14px',
            outline: 'none'
        },
        button: {
            width: '100%',
            padding: '16px',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 10px 20px rgba(5, 150, 105, 0.2)',
            marginTop: '10px'
        },
        forgotLink: {
            display: 'block',
            marginTop: '15px',
            fontSize: '12px',
            color: '#059669',
            textDecoration: 'none',
            cursor: 'pointer',
            fontWeight: '600'
        },
        // CSS Baru untuk AI Audit Placeholder
        aiContainer: {
            marginTop: '25px',
            padding: '15px',
            backgroundColor: '#f0f9ff',
            borderRadius: '15px',
            border: '2px dashed #3b82f6',
            textAlign: 'left'
        },
        aiTitle: {
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#1e40af',
            margin: '0 0 5px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        },
        aiText: {
            fontSize: '11px',
            color: '#1e3a8a',
            margin: '0',
            fontStyle: 'italic'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>☕</div>
                <h1 style={styles.header}>HEMAT</h1>
                <p style={styles.slogan}>Help Manage Anything About the Cafe</p>

                <form onSubmit={handleLogin}>
                    <div style={styles.inputWrapper}>
                        <span style={styles.icon}>✉️</span>
                        <input
                            type="email"
                            placeholder="Email Staff"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.inputWrapper}>
                        <span style={styles.icon}>🔒</span>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" style={styles.button} disabled={isLoading}>
                        {isLoading ? 'MENGHUBUNGKAN...' : 'MASUK SEKARANG'}
                    </button>
                </form>

                <span onClick={handleForgotPassword} style={styles.forgotLink}>
                    Lupa Password? Klik di sini
                </span>

                {/* --- BAGIAN TUGAS OBE: AI AUDIT PLACEHOLDER --- */}
                <div style={styles.aiContainer}>
                    <h3 style={styles.aiTitle}>🤖 AI Audit Result</h3>
                    <p style={styles.aiText}>
                        "Ready to monitor. AI Agent will validate your transaction data via Supabase once you are logged in."
                    </p>
                </div>
                {/* ---------------------------------------------- */}

                <p style={{ marginTop: '25px', fontSize: '11px', color: '#9ca3af' }}>
                    SIA SYARIAH - OBE PERTEMUAN 2
                </p>
            </div>
        </div>
    );
}