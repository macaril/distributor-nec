"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Product, getProducts, deleteProduct } from "@/src/lib/storage";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await getProducts();
      setProducts(products);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus produk ini dari daftar?")) return;
    await deleteProduct(id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Daftar Produk</h1>
          <p className="text-sm text-gray-500">Kelola produk yang tampil di website.</p>
        </div>
        <Link href="/admin/products/add" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          + Tambah Produk
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
              <th className="p-4 border-b">Nama Produk</th>
              <th className="p-4 border-b">Kategori</th>
              <th className="p-4 border-b">Stok</th>
              <th className="p-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  Memuat produk...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  Belum ada produk. Tambahkan produk baru untuk mulai mengisi katalog.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b font-medium">{product.name}</td>
                  <td className="p-4 border-b">{product.category}</td>
                  <td className="p-4 border-b">{product.stock}</td>
                  <td className="p-4 border-b space-x-3 text-sm">
                    <Link
                      href={`/admin/edit/${product.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}