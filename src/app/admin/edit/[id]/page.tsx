"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById, Product, updateProduct, deleteProduct, uploadToCloudinary } from "@/src/lib/storage";

export default function EditProductPage() {
  const params = useParams() as { id: string };
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
    desc: "",
    productCode: "",
    stock: 0,
  });

  useEffect(() => {
    if (!params?.id) return;

    const loadProduct = async () => {
      const found = await getProductById(Number(params.id));
      if (found) {
        setProduct(found);
        setFormData({
          name: found.name,
          category: found.category,
          image: found.image,
          desc: found.desc,
          productCode: found.productCode || "",
          stock: found.stock,
        });
      }
    };

    loadProduct();
  }, [params?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setLoading(true);

    try {
      let image = formData.image;
      if (file) {
        setUploading(true);
        image = await uploadToCloudinary(file);
        setUploading(false);
      }

      await updateProduct(product.id, {
        name: formData.name,
        category: formData.category,
        image,
        desc: formData.desc,
        productCode: formData.productCode || "-",
        stock: Number(formData.stock),
      });
      router.push("/admin/products");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      alert("Gagal menyimpan perubahan: " + message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!product || !confirm("Hapus produk ini?")) return;
    await deleteProduct(product.id);
    router.push("/admin/products");
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-gray-700">
        <h1 className="text-2xl font-bold">Produk tidak ditemukan</h1>
        <p className="mt-3">Pastikan ID produk benar atau tambahkan produk baru.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Produk</h1>
          <p className="text-gray-600">Perbarui informasi produk dan simpan perubahan.</p>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-full bg-red-600 px-5 py-3 text-white hover:bg-red-700 transition"
        >
          Hapus Produk
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
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
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">URL Gambar</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full border p-3 rounded"
            required
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-2">Masukkan URL Cloudinary atau unggah file baru untuk mengganti gambar.</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Unggah File Baru</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full"
            disabled={loading}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
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
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Deskripsi Singkat</label>
          <textarea
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            className="w-full border p-3 rounded"
            rows={5}
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || uploading}
          className="inline-flex rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
        >
          {loading || uploading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
