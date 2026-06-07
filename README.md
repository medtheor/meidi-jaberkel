# Jaberkel Supabase + Vercel

Project ini sudah memakai Supabase Database untuk data pembayaran dan Supabase Storage untuk file bukti transfer.

## 1. Setup Supabase

Buka Supabase SQL Editor, lalu jalankan isi file:

```text
supabase.sql
```

Setelah itu buat bucket Storage bernama:

```text
bukti-pembayaran
```

Agar gambar bisa dibuka dari tabel, jadikan bucket tersebut public.

## 2. Environment variable

Buat file `.env` saat menjalankan lokal:

```text
SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=isi_service_role_key_dari_supabase
SUPABASE_BUCKET=bukti-pembayaran
PORT=3000
```

Di Vercel, isi variable yang sama melalui:

```text
Project Settings > Environment Variables
```

## 3. Jalankan lokal

```bash
npm install
npm start
```

Buka:

```text
http://localhost:3000
```

## 4. Deploy ke Vercel

Push project ke GitHub, lalu import repository ke Vercel. Pastikan Environment Variables sudah diisi.

## Catatan penting

Jangan pernah memasukkan `SUPABASE_SERVICE_ROLE_KEY` ke file HTML atau JS frontend. Key ini hanya boleh dipakai di backend.
