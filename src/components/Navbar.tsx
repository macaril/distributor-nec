'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* BAGIAN LOGO */}
        <Link href="/" onClick={closeMenu}>
          <Image 
            src="/logo.png"
            alt="Logo Distributor NEC"
            width={180}
            height={50}
            className="object-contain"
            priority
          />
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-8 font-medium">
          <Link href="/" className="hover:text-blue-300 transition">Home</Link>
          <Link href="/products" className="hover:text-blue-300 transition">Produk</Link>
          <Link href="/news" className="hover:text-blue-300 transition">Berita</Link>
          <Link href="/activities" className="hover:text-blue-300 transition">Kegiatan</Link>
          <Link href="/about" className="hover:text-blue-300 transition">About Us</Link>
        </div>
        
        {/* Button Contact Desktop */}
        <Link href="/about" className="hidden md:block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-bold transition">
          Hubungi Kami
        </Link>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col space-y-1.5 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 border-t border-blue-700">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link 
              href="/" 
              className="block hover:text-blue-300 transition py-2"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="block hover:text-blue-300 transition py-2"
              onClick={closeMenu}
            >
              Produk
            </Link>
            <Link 
              href="/news" 
              className="block hover:text-blue-300 transition py-2"
              onClick={closeMenu}
            >
              Berita
            </Link>
            <Link 
              href="/activities" 
              className="block hover:text-blue-300 transition py-2"
              onClick={closeMenu}
            >
              Kegiatan
            </Link>
            <Link 
              href="/about" 
              className="block hover:text-blue-300 transition py-2"
              onClick={closeMenu}
            >
              About Us
            </Link>
            <Link 
              href="/about" 
              className="block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-bold transition text-center mt-2"
              onClick={closeMenu}
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;