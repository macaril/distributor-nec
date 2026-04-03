const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-xl font-bold mb-4">PT. Tunas Harapan Solusindo</h3>
          <p className="text-sm">
            Distributor Resmi PABX NEC di Indonesia. Memberikan solusi komunikasi bisnis terpadu sejak 2010.
          </p>
        </div>
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Navigasi</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/products" className="hover:text-white">Produk NEC</a></li>
            <li><a href="/news" className="hover:text-white">Artikel & Tips</a></li>
            <li><a href="/about" className="hover:text-white">Profil Perusahaan</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Kontak</h3>
          <p className="text-sm mb-2">📍 Jl. BB NO. 409 Kemayoran, DKI Jakarta Indonesia 10680</p>
          <p className="text-sm mb-2">📞 081511229999</p>
          <p className="text-sm">✉️ sales@tunaspbx.com</p>
        </div>
      </div>
      <div className="text-center text-xs mt-10 pt-4 border-t border-slate-700">
        &copy; {new Date().getFullYear()} PT. Tunas Harapan Solusindo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;