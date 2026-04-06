graph TD
    A[Barang Dipilih Kasir] --> B{Cek Stok Supabase}
    B -- Stok Habis --> C[Notifikasi Stok Kosong]
    B -- Stok Ada --> D[Input Harga & Jumlah]
    D --> E[AI Agent: Audit Transaksi]
    E -- Fraud Terdeteksi --> F[Blokir & Notifikasi Manager]
    E -- Valid --> G[Simpan ke Tabel Sales Supabase]
    G --> H[Cetak Struk & Selesai]
    Manipulasi Harga: Kasir mengubah harga jual secara manual untuk keuntungan pribadi atau teman.

Pencegahan: AI Audit memvalidasi setiap harga input terhadap master data di Supabase.

Transaksi "Ghaib": Kasir menerima uang tunai tapi tidak mencatat transaksi di sistem agar stok fisik dan data tetap sinkron secara curang.

Pencegahan: AI memantau pola waktu transaksi; jika ada jeda stok berkurang tanpa transaksi, sistem memberi peringatan.

Double Discount: Memberikan diskon ganda yang tidak sah.

Pencegahan: Logic di Antigravity membatasi input diskon hanya melalui verifikasi AI.