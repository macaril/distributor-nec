"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById, Product } from "@/src/lib/storage";

export default function ProductDetailPage() {
  const params = useParams() as { id?: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params?.id) {
        setLoading(false);
        return;
      }

      const found = await getProductById(Number(params.id));
      setProduct(found);
      setLoading(false);
    };

    fetchProduct();
  }, [params?.id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-12">Memuat produk...</div>;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl font-semibold text-gray-700">Produk tidak ditemukan.</p>
        <Link href="/products" className="mt-4 inline-block text-blue-600 hover:underline">
          Kembali ke daftar produk
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb (Navigasi Kecil) */}
      <div className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">Home</Link> 
        {" > "}
        <Link href="/products" className="hover:text-blue-600">Produk</Link>
        {" > "}
        <span className="font-semibold text-gray-800">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow-sm border">
        {/* Kolom Kiri: Gambar */}
        <div className="relative flex items-center justify-center bg-gray-100 rounded-lg h-[400px] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition duration-500"
          />
        </div>

        {/* Kolom Kanan: Informasi Detail */}
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">{product.name}</h1>
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            {product.category}
          </span>

          <div className="mt-6 space-y-4">
            {/* Harga / Deskripsi Singkat */}
            <p className="text-gray-700 leading-relaxed text-lg">
              {product.desc}
            </p>

            {/* Tabel Spesifikasi Kecil */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="text-gray-500">Kode Produk:</div>
                <div className="font-semibold text-gray-900">{product.productCode}</div>

                <div className="text-gray-500">Stok:</div>
                <div className="font-semibold text-green-600">{product.stock} Unit (Tersedia)</div>

                <div className="text-gray-500">Berat:</div>
                <div className="font-semibold text-gray-900">{product.weight}</div>
              </div>
            </div>

            {/* Deskripsi Lengkap */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Deskripsi Lengkap</h3>
              <p className="text-gray-600 whitespace-pre-line">
                {product.fullDescription || product.desc}
              </p>
            </div>

            {/* Tombol Aksi */}
            <div className="mt-8 flex gap-4">
              <Link 
                href="/contact" // Ganti ke link WhatsApp jika mau
                className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
              >
                Minta Penawaran
              </Link>
              <Link 
                href="/products"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}