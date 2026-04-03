"use client";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="mt-4 text-gray-600">Kelola produk dan berita website dari sini. Akses /admin/products untuk produk dan /admin/news untuk konten berita.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/admin/products" className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:border-blue-300 hover:shadow-md">
          <div className="text-4xl">📦</div>
          <h2 className="mt-4 text-2xl font-bold text-slate-900">Kelola Produk</h2>
          <p className="mt-2 text-gray-600">Tambah, edit, dan hapus barang yang ditampilkan di katalog.</p>
          <div className="mt-4 inline-flex items-center text-blue-600 group-hover:underline">Buka halaman produk &rarr;</div>
        </Link>

        <Link href="/admin/news" className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:border-blue-300 hover:shadow-md">
          <div className="text-4xl">📰</div>
          <h2 className="mt-4 text-2xl font-bold text-slate-900">Kelola Berita</h2>
          <p className="mt-2 text-gray-600">Tambahkan artikel baru dan atur konten berita di halaman publik.</p>
          <div className="mt-4 inline-flex items-center text-blue-600 group-hover:underline">Buka halaman berita &rarr;</div>
        </Link>
      </div>
    </div>
  );
}
