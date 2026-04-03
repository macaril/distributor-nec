import Link from 'next/link';
import Image from 'next/image'; // 1. Jangan lupa import ini

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* BAGIAN LOGO (Diedit) */}
        <Link href="/">
          {/* Penjelasan SRC:
             Cukup tulis "/nama-file.png". 
             Tidak perlu pakai "public/" atau "../../public/".
             Next.js otomatis tahu itu ada di folder public.
          */}
          <Image 
            src="/logo.png"      // Sesuaikan dengan nama file Anda di folder public
            alt="Logo Distributor NEC"
            width={180}              // Atur lebar gambar (dalam pixel)
            height={50}              // Atur tinggi gambar
            className="object-contain" // Agar gambar tidak gepeng/terpotong
            priority                 // Agar logo diload paling duluan (penting untuk LCP)
          />
        </Link>

        {/* Menu Desktop (Tetap sama) */}
        <div className="hidden md:flex space-x-8 font-medium">
          <Link href="/" className="hover:text-blue-300 transition">Home</Link>
          <Link href="/products" className="hover:text-blue-300 transition">Produk</Link>
          <Link href="/news" className="hover:text-blue-300 transition">Berita</Link>
          <Link href="/activities" className="hover:text-blue-300 transition">Kegiatan</Link>
          <Link href="/about" className="hover:text-blue-300 transition">About Us</Link>
        </div>
        
        {/* Button Contact (Tetap sama) */}
        <Link href="/about" className="hidden md:block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-bold transition">
          Hubungi Kami
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;