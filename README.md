# 🚀 Aplikasi Web Kompresi Berkas

<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjhqZXJqamdxeWwya3B3ZmdxeHFmb2NndHJ2Z282ZnBzejdkdWozdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPsx2VAYAgEHC12/giphy.gif" width="450px">
  
  ### ✨ Aplikasi Kompresi Modern dengan React dan Flask ✨
</div>

## 📋 Struktur Proyek

```
project/
├── frontend/             # Aplikasi React
│   ├── public/           # Aset statis
│   ├── src/              # Kode sumber
│   ├── build/            # Build produksi
│   └── package.json      # Dependensi dan skrip
│
└── backend/              # Server API Flask
    ├── app.py            # File aplikasi utama
    ├── venv/             # Lingkungan virtual Python
    └── requirements.txt  # Dependensi Python
```

## 💻 Frontend

### 🛠️ Teknologi

- **Framework**: React 19
- **UI**: Styled Components 
- **Pemrosesan Berkas**: JSZip untuk menangani file zip
- **Pengujian**: Jest dan React Testing Library

### 🔧 Pengaturan dan Instalasi

1. Buka direktori frontend:
   ```bash
   cd frontend
   ```

2. Instal dependensi:
   ```bash
   npm install
   ```

3. Jalankan server pengembangan:
   ```bash
   npm start
   ```

   Aplikasi akan tersedia di `http://localhost:3000`

4. Build untuk produksi:
   ```bash
   npm run build
   ```

### ✅ Fitur Utama

- React modern menggunakan versi terbaru (19.1.0)
- Desain UI responsif dengan Styled Components
- Penanganan unggah dan kompresi berkas
- Visualisasi kemajuan untuk hasil kompresi
- Dukungan untuk unggahan multi-berkas

## ⚙️ Backend

### 🛠️ Teknologi

- **Framework**: Flask
- **Pemrosesan Berkas**:
  - PDF: pikepdf
  - Gambar: Pillow (PIL)
  - Kompresi: zlib
- **API**: RESTful dengan dukungan CORS
- **Deployment**: Server WSGI Gunicorn

### 🔧 Pengaturan dan Instalasi

1. Buka direktori backend:
   ```bash
   cd backend
   ```

2. Siapkan lingkungan virtual:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python -m venv venv
   source venv/bin/activate
   ```

3. Instal dependensi:
   ```bash
   pip install -r requirements.txt
   ```

4. Jalankan server pengembangan:
   ```bash
   flask run
   ```

   API akan tersedia di `http://localhost:5000`

5. Untuk deployment produksi:
   ```bash
   gunicorn app:app
   ```

### 🔌 Endpoint API

#### POST /compress

Mengompres berkas yang diunggah dan mengembalikan arsip zip.

- **Request**: Data form multipart dengan field `files` yang berisi satu atau lebih berkas
- **Response**: File ZIP berisi versi terkompresi dari berkas yang diunggah
- **Headers**:
  - `compression-results`: String JSON berisi informasi tentang hasil kompresi untuk setiap berkas

### 🗜️ Fitur Kompresi

Backend mendukung kompresi berbagai jenis berkas:

1. **Berkas PDF**:
   - Kompresi stream
   - Penghapusan metadata
   - Optimasi stream konten

2. **Dokumen Word** (.docx, .doc):
   - Kompresi zlib tingkat lanjut
   - Rekompresi struktur ZIP yang ada

3. **Gambar** (.jpg, .jpeg, .png, .webp, .bmp, .gif):
   - Konversi format ketika menguntungkan
   - Pengurangan kualitas dengan dampak visual minimal
   - Pengubahan ukuran gambar yang terlalu besar
   - Optimasi khusus format

4. **Jenis Berkas Lainnya**:
   - Kompresi ZIP standar

## 🔨 Pengembangan

### 👩‍💻 Pengembangan Frontend

- Gunakan `npm start` untuk server pengembangan dengan hot reloading
- Perbarui dependensi melalui `npm update`
- Jalankan pengujian dengan `npm test`

### 👨‍💻 Pengembangan Backend

- Gunakan server pengembangan Flask dengan `flask run --debug`
- Instal paket baru dengan `pip install [paket]` dan perbarui requirements.txt
- Aplikasi menangani CORS untuk pengembangan lokal

## 🚀 Deployment Produksi

### 🌐 Deployment Frontend

1. Build aplikasi React:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy isi direktori `build` ke layanan hosting file statis Anda

### ☁️ Deployment Backend

1. Siapkan server produksi dengan:
   ```bash
   cd backend
   gunicorn app:app
   ```

2. Pertimbangkan untuk menggunakan nginx sebagai reverse proxy untuk deployment produksi

<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNW9xenY0ZjRjaDl2N2RvY2ZhbzExZWZtbXZnOWc2eG1nZzNxYTZqbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0BKCQJDzoTaeQyA0/giphy.gif" width="450px">
</div>

## 📝 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.

---

<div align="center">
  <p>⭐ Jangan lupa beri bintang jika Anda menyukai proyek ini! ⭐</p>
  
  <img src="https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react" alt="React Badge">
  <img src="https://img.shields.io/badge/Flask-Latest-green?style=for-the-badge&logo=flask" alt="Flask Badge">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" alt="Status Badge">
</div>
