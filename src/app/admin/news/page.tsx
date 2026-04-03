"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { NewsArticle, getNews, deleteNews } from "@/src/lib/storage";

export default function AdminNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const items = await getNews();
    setNews(items);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus berita ini?")) return;
    await deleteNews(id);
    setNews((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Kelola Berita</h1>
          <p className="text-sm text-gray-500">Tambahkan dan hapus artikel yang akan tampil di halaman berita.</p>
        </div>
        <Link href="/admin/news/add" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          + Tambah Berita
        </Link>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.date}</p>
                <p className="mt-3 text-gray-700">{item.excerpt}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-full border border-red-600 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && <div className="mt-6 text-center text-gray-500">Memuat berita...</div>}

      {!loading && news.length === 0 && (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-blue-50 p-8 text-center text-gray-700">
          Belum ada berita. Tambahkan konten baru untuk ditampilkan.
        </div>
      )}
    </div>
  );
}
