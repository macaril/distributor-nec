"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, uploadToCloudinary } from "@/src/lib/storage";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "PABX NEC",
    image: "",
    desc: "",
    productCode: "",
    stock: 1,
  });

  const handleUpload = async () => {
    if (!selectedFile) {
      return alert("Pilih file gambar terlebih dahulu.");
    }

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(selectedFile);
      setFormData({ ...formData, image: imageUrl });
      alert("Gambar berhasil diunggah ke Cloudinary.");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      alert("Gagal mengunggah gambar: " + message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.image || !formData.desc) {
      return alert("Silakan lengkapi semua data produk terlebih dahulu.");
    }

    setLoading(true);
    try {
      await createProduct({
        name: formData.name,
        category: formData.category,
        image: formData.image,
        desc: formData.desc,
        productCode: formData.productCode || "-",
        stock: Number(formData.stock),
      });
      alert("Produk berhasil ditambahkan!");
      router.push("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      alert("Gagal menyimpan produk: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Tambah Produk Baru</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nama Produk</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-3 rounded"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Kategori</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border p-3 rounded"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Upload Gambar Cloudinary</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            className="w-full border p-3 rounded"
            disabled={loading || uploading}
          />
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || uploading || loading}
            className="mt-3 inline-flex items-center justify-center rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? "Mengunggah..." : "Unggah ke Cloudinary"}
          </button>
          <p className="mt-2 text-sm text-gray-500">
            Atau masukkan URL gambar langsung jika sudah punya link eksternal.
            Jika menggunakan URL langsung, Cloudinary tidak akan digunakan.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">URL Gambar</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="Contoh: https://pbxnec.com/userfiles/uploads/produk.jpg"
            className="w-full border p-3 rounded"
            required
            disabled={loading || uploading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Kode Produk</label>
          <input
            type="text"
            value={formData.productCode}
            onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
            className="w-full border p-3 rounded"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Stok</label>
          <input
            type="number"
            min={0}
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
            className="w-full border p-3 rounded"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Deskripsi Singkat</label>
          <textarea
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            className="w-full border p-3 rounded"
            rows={4}
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </form>
    </div>
  );
}