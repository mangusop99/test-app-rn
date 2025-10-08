📱 React Native Technical Test - Project Summary

Halo, ini adalah submission untuk technical test Frontend Engineer. Aplikasi mobile ini dibangun dengan **React Native** dan **TypeScript**, menunjukkan skill dalam state management, API integration, navigasi, dan pembuatan UI yang modern dan reusable.

Aplikasi ini memiliki alur autentikasi lengkap dan product browsing yang mengambil data dari public API (DummyJSON). Strukturnya dirancang untuk skalabilitas dan maintainability, mengikuti best practice industri.

---

🚀 **Fitur Utama:**

1.  **Halaman Login**

    - Validasi input email & password.
    - Token JWT (berdasarkan email, expired 1 jam) disimpan aman di `AsyncStorage`.
    - State autentikasi dikelola secara global menggunakan `Context API`.

2.  **Halaman Home**

    - Menampilkan email user yang sedang login.
    - Integrasi API ke **DummyJSON** endpoint `/products`.
    - Data ditampilkan di `FlatList` dengan fitur:
      - **Pull-to-refresh**
      - **Loading state** yang jelas.
      - **Error state** dengan tombol "Coba Lagi".
    - Menavigasi ke halaman detail saat item produk diklik.

3.  **Halaman Detail**
    - Header halaman menggunakan komponen `ProductListItem` yang sama dengan di Home (membuktikan konsep **reusability**).
    - Menampilkan detail produk lengkap dari API (gambar, deskripsi, kategori, stok).
    - Menangani kondisi **loading**, **error**, dan **data kosong** dengan baik.

---

⚙️ **Implementasi Teknis:**

- **React Native + TypeScript**: Untuk aplikasi cross-platform dengan keamanan tipe data.
- **Expo**: Untuk mempercepat pengembangan dan menyederhanakan build.
- **React Navigation**: Untuk mengelola navigasi stack (Autentikasi & Aplikasi).
- **Axios**: Sebagai HTTP client untuk REST API.
- **AsyncStorage**: Untuk penyimpanan token autentikasi.
- **Context API**: Untuk state global (Autentikasi & Tema).
- **Theming System**: Sistem tema terpusat untuk UI yang konsisten.
- **Constants**: File terpisah untuk string teks dan endpoint API (no magic strings).

---

📁 **Struktur Proyek:**

```
test-app/
├── app/
│   ├── api/              # Konfigurasi Axios & logika API
│   ├── components/       # Komponen reusable (ErrorState, ProductListItem, dll)
│   ├── constants/        # Konstanta (endpoints, strings)
│   ├── contexts/         # React Context (AuthContext, ThemeContext)
│   ├── navigation/       # Konfigurasi navigator
│   ├── screens/          # Layar aplikasi (Home, Detail, Login)
│   ├── theme/            # Definisi tema (warna, tipografi)
│   ├── types/            # Definisi tipe TypeScript
<<<<<<< HEAD
│   ├── utis/             # Untuk
=======
│   ├── utis/             # Berisi fungsi-fungsi pembantu (helpers) untuk logika umum.
│   └── _layout.tsx       # Root layout dengan provider
>>>>>>> latest_branch
│   └── _layout.tsx       # Root layout dengan provider
└── ...
```

---

📊 **Pemenuhan Kriteria Penilaian:**

1.  **Struktur & Keterbacaan Kode:**

    - ✅ **TypeScript** di seluruh aplikasi untuk type safety.
    - ✅ Struktur folder logis dan terpisah berdasarkan tanggung jawab.
    - ✅ **Theming & Constants** untuk kode yang bersih dan mudah disesuaikan.
    - ✅ UI dibangun dari komponen kecil yang reusable.

2.  **Penerapan Best Practice:**

    - ✅ **Context API** untuk state global (auth) daripada prop drilling.
    - ✅ **Custom Hooks** (`useAuth`, `useTheme`) untuk kapsulasi logika.
    - ✅ **Separation of Concerns** (API, state, UI terpisah jelas).
    - ✅ Error handling di setiap level (API call, screen).

3.  **Penanganan Error & Edge Cases:**

    - ✅ Semua API call menggunakan `try...catch`.
    - ✅ Pesan error yang user-friendly (`Alert` atau komponen `ErrorState`).
    - ✅ **Retry mechanism** pada komponen `ErrorState`.
    - ✅ Handle **empty state** saat data tidak ada.

4.  **UX/UI:**

    - ✅ **Loading states** yang konsisten (`LoadingIndicator`).
    - ✅ **Error states** yang modern dan informatif.
    - ✅ **Pull-to-refresh** untuk UX yang lebih baik.
    - ✅ Desain UI modern & konsisten berkat sistem tema.
    - ✅ **Dark mode ready**: arsitektur tema gelap dan terang.

5.  **Optimasi Performa:**
    - ✅ `useCallback` untuk mencegah re-render yang tidak perlu.
    - ✅ `FlatList` untuk rendering daftar yang efisien (virtualization).
    - ✅ **Lazy Navigation** (React Navigation) untuk mengurangi waktu mulai.
    - ✅ **Image Caching** otomatis dari komponen `Image` React Native.

---

🛠️ **Cara Menjalankan:**

1.  Clone repository: `git clone https://github.com/abibinyun/test-app-rn.git`
2.  Install dependencies: `npm install`
3.  Start development server: `npm start`
4.  Buka di device/simulator (scan QR code atau tekan 'a'/'i').

---

🔑 **Detail Akses dan Autentikasi**

Gunakan kredensial berikut untuk menguji alur autentikasi dan fungsionalitas aplikasi:
| Kunci | Nilai | Catatan |
| :--- | :--- | :--- |
| **Email Pengguna** | Format email yang valid (e.g., `tester@example.com`) | Aplikasi mengizinkan login dengan email format apapun yang valid secara struktur. |
| **Kata Sandi** | Input bebas (non-kosong) | Cukup masukkan string non-kosong; validasi fungsionalitas utama menggunakan pengecekan token. |

---

Terima kasih!
