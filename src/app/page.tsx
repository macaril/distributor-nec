"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts, Product } from "@/src/lib/storage";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section with Swiper Carousel */}
      <section className="relative h-[300px] md:h-[400px] w-full">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full w-full"
        >
          {/* Slide 1: Welcome */}
          <SwiperSlide>
            <div className="relative h-full w-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <Image
                  src="/nec-0002-pabx-nec-sl1000-kav-6line---16extension.jpg"
                  alt="Background NEC"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative z-10 text-center px-4 text-white">
                <span className="inline-flex items-center rounded-full bg-blue-200/15 px-4 py-2 text-sm uppercase tracking-[0.3em] text-blue-100 mb-6">
                  Authorized Distributor NEC</span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-xl">
                  Solusi Komunikasi Perusahaan yang Andal dan Terintegrasi
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-slate-200 leading-relaxed">
                  Kami menyediakan sistem PABX NEC, instalasi profesional, dan layanan after-sales untuk memastikan bisnis Anda selalu terkoneksi dengan lancar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/products"
                    className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-base hover:bg-slate-100 transition shadow-xl"
                  >
                    Jelajahi Produk
                  </Link>
                  <Link
                    href="/about"
                    className="border border-white text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white hover:text-slate-900 transition"
                  >
                    Tentang Kami
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2: PABX NEC SL1000 */}
          <SwiperSlide>
            <div className="relative h-full w-full bg-slate-800 flex items-center justify-center">
              <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10 text-white">
                <div className="md:w-1/2 text-left">
                  <h2 className="text-4xl font-bold mb-4">PABX NEC SL1000</h2>
                  <p className="text-lg mb-6 text-gray-300">
                    Sistem komunikasi hemat biaya yang dapat dikembangkan hingga 128 Extension. 
                    Ideal untuk kantor, hotel, dan rumah.
                  </p>
                  <Link
                    href="/products/1"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition"
                  >
                    Detail Spesifikasi
                  </Link>
                </div>
                <div className="md:w-1/2 hidden md:block relative h-[400px]">
                  <Image
                    src="/nec-0002-pabx-nec-sl1000-kav-6line---16extension.jpg"
                    alt="NEC SL1000"
                    fill
                    className="rounded-lg shadow-2xl object-contain"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3: Service & Support */}
          <SwiperSlide>
            <div className="relative h-full w-full bg-white flex items-center justify-center p-4">
              <Image
                src="/pabx_slider.png"
                alt="PABX NEC Products"
                fill
                className="object-contain"
              />
            </div>
          </SwiperSlide>
          

          {/* Slide 4: PABX Products */}
          <SwiperSlide>
            <div className="relative h-full w-full bg-blue-800 flex items-center justify-center">
              <div className="text-center px-4 text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Teknisi Bersertifikat</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                  Kami menjamin instalasi dan maintenance dilakukan oleh tim ahli 
                  yang telah lulus sertifikasi resmi NEC.
                </p>
                <Link
                  href="/about"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-800 transition"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Keunggulan Section */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Mengapa Memilih Kami?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-5xl mb-6">🛡️</div>
            <h3 className="text-xl font-bold mb-3">Resmi & Bergaransi</h3>
            <p className="text-gray-600 leading-relaxed">
              Produk 100% Original dengan garansi resmi dari NEC Principal.
            </p>
          </div>
          <div className="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-5xl mb-6">🛠️</div>
            <h3 className="text-xl font-bold mb-3">Teknisi Bersertifikat</h3>
            <p className="text-gray-600 leading-relaxed">
              Tim teknis kami telah lulus sertifikasi instalasi dan maintenance
              NEC.
            </p>
          </div>
          <div className="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-5xl mb-6">📞</div>
            <h3 className="text-xl font-bold mb-3">After Sales Support</h3>
            <p className="text-gray-600 leading-relaxed">
              Layanan purna jual yang responsif untuk kelancaran bisnis Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Layanan Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Layanan Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Penjualan */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition p-8 border-l-4 border-blue-600">
              <div className="text-5xl mb-6">💼</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Penjualan PABX & IP PBX NEC</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kami adalah Agen, Dealer dan Supplier resmi PABX NEC di Indonesia. Menyediakan sistem PABX dan IP PBX dengan berbagai tipe dari yang kecil hingga besar untuk kebutuhan kantor, pabrik, hotel, apartemen dan lebih banyak lagi.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Harga PABX NEC Terjangkau dan Kompetitif</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Teknologi Canggih dan Berkualitas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Spare Part Terjamin dan Mudah Didapat</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Konsultasi Gratis via Telepon atau Kunjungan Langsung</span>
                </li>
              </ul>
              <Link
                href="/products"
                className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Lihat Produk
              </Link>
            </div>

            {/* Service */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition p-8 border-l-4 border-green-600">
              <div className="text-5xl mb-6">🔧</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Service PABX & IP PBX NEC</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Melayani service PABX NEC dengan sistem jemput bola. Kami menyediakan mesin atau spare part pengganti selama PABX Anda dalam perbaikan agar tidak mengganggu aktivitas bisnis Anda.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Sistem Jemput Bola Profesional</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Spare Part Pengganti Tersedia</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Teknisi Berpengalaman & Terpercaya</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Garansi Perbaikan</span>
                </li>
              </ul>
              <Link
                href="/about"
                className="inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Hubungi Kami
              </Link>
            </div>

            {/* Pemasangan */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition p-8 border-l-4 border-orange-600">
              <div className="text-5xl mb-6">⚙️</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Pemasangan PABX & IP PBX NEC</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Melayani pemasangan dalam kota maupun luar kota dengan teknisi handal dan berpengalaman. Kami melayani instalasi baru, pemindahan, interkoneksi antar cabang, dan konfigurasi program.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  <span>Instalasi PABX Baru & Bekas Pakai</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  <span>Bongkar Pasang & Pemindahan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  <span>Interkoneksi Antar Cabang</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  <span>Setting & Konfigurasi Program</span>
                </li>
              </ul>
              <Link
                href="/about"
                className="inline-block w-full text-center bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Maps Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Lokasi Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Maps */}
            <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5662748656833!2d106.8276!3d-6.1577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5f5c8c8c8c8%3A0x8c8c8c8c8c8c8c8c!2sJl.%20BB%20No.503%2012%2C%20RT.15%2FRW.2%2C%20Utan%20Panjang%2C%20Kec.%20Kemayoran%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2010650!5e0!3m2!1sid!2sid!4v1234567890"
              />
            </div>

            {/* Address Info */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Hubungi Kami</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="text-3xl text-blue-600 mr-4">📍</span>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Alamat</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Jl. BB No.503 12, RT.15/RW.2, Utan Panjang, Kec. Kemayoran, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10650
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-3xl text-green-600 mr-4">📱</span>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Hubungi Kami</h4>
                    <p className="text-gray-600">
                      Hubungi tim kami untuk konsultasi gratis mengenai kebutuhan PABX dan IP PBX Anda. Kami siap membantu baik melalui telepon maupun kunjungan langsung ke lokasi Anda.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-3xl text-orange-600 mr-4">⏰</span>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Jam Operasional</h4>
                    <p className="text-gray-600">
                      Senin - Jumat: 08:00 - 17:00 WIB<br/>
                      Sabtu: 08:00 - 13:00 WIB<br/>
                      Minggu: Tutup
                    </p>
                  </div>
                </div>

                <Link
                  href="/about"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition mt-4"
                >
                  Hubungi Kami Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Produk Unggulan</h2>
              <p className="text-gray-600 mt-2">Solusi terbaik untuk kebutuhan komunikasi Anda</p>
            </div>
            <Link href="/products" className="text-blue-600 font-bold hover:underline hidden md:block">
              Lihat Semua Produk &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300 group"
              >
                <div className="h-64 bg-white relative overflow-hidden p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-8">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-3 text-gray-900 group-hover:text-blue-800 transition">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-2 text-sm">
                    {product.desc}
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-block w-full text-center bg-gray-100 hover:bg-blue-600 hover:text-white py-3 rounded-lg font-semibold transition"
                  >
                    Detail Spesifikasi
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/products" className="text-blue-600 font-bold hover:underline">
              Lihat Semua Produk &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}