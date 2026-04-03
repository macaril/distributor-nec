"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNews } from "@/src/lib/storage";

export default function AddNews() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<string>(new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }));
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      return alert("Judul dan konten berita wajib diisi.");
    }

    setLoading(true);
    try {
      await createNews({
        title,
        date,
        excerpt: excerpt || content.slice(0, 120) + "...",
        content,
      });
      alert("Berita berhasil ditambahkan!");
      router.push("/admin/news");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      alert("Gagal menyimpan berita: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Tulis Artikel Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Judul Berita</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded"
            placeholder="Contoh: Promo PABX NEC Akhir Tahun"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tanggal</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-3 rounded"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Ringkasan</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full border p-3 rounded"
            rows={3}
            placeholder="Ringkasan singkat untuk daftar berita"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Isi Artikel</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-3 rounded"
            rows={8}
            placeholder="Tulis konten artikel di sini..."
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-green-600 text-white px-6 py-3 rounded font-bold hover:bg-green-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Menyimpan..." : "Publikasikan Berita"}
        </button>
      </form>
    </div>
  );
}
