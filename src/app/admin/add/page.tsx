"use client";

import Link from "next/link";

export default function AdminAddPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Admin - Tambah Data</h1>
      <p className="text-gray-600">Halaman ini belum terisi. Silakan tambahkan form atau konten yang diinginkan.</p>
      <Link href="/admin" className="text-blue-600 underline">
        Kembali ke Dashboard Admin
      </Link>
    </div>
  );
}
