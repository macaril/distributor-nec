"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import { getProducts, Product } from "@/src/lib/storage";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    load();
  }, []);

  const categories = ["Semua", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = activeCategory === "Semua"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
        Katalog Produk NEC
      </h1>
      
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
              activeCategory === cat
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-600">Memuat produk...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Tidak ada produk di kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl p-4 hover:shadow-xl transition duration-300 bg-white"
            >
              <div className="bg-gray-100 h-56 rounded-lg mb-4 flex items-center justify-center text-gray-400 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-semibold">
                {product.category}
              </span>

              <h2 className="text-2xl font-bold mt-2 text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-2 line-clamp-2">{product.desc}</p>

              <Link
                href={`/products/${product.id}`}
                className="mt-4 block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
              >
                Lihat Detail & Spesifikasi
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}