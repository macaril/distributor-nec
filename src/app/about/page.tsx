export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Tentang Kami</h1>
        <div className="prose lg:prose-xl text-gray-600">
          <p className="mb-4">
            <strong>PT. Solusi Komunikasi</strong> didirikan pada tahun 2010 dengan visi menjadi mitra teknologi terdepan bagi bisnis di Indonesia. Sebagai distributor resmi NEC, kami berdedikasi untuk menyediakan solusi telekomunikasi yang handal.
          </p>
          
          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">Visi & Misi</h3>
          <ul className="list-disc pl-5 mb-6">
            <li>Menyediakan produk original dan berkualitas tinggi.</li>
            <li>Memberikan layanan purna jual yang cepat dan solutif.</li>
            <li>Mengedukasi pasar mengenai teknologi komunikasi terbaru.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">Hubungi Kami</h3>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p><strong>Alamat:</strong> Jl. BB NO. 409 Kemayoran, DKI Jakarta Indonesia 10680</p>
            <p><strong>Email:</strong> sales@tunaspbx.com</p>
            <p><strong>Telepon:</strong> 021-4216339 ( Hunting ), 021 42803610</p>
            <p><strong>Faximile:</strong> 021-42803610</p>
            <p><strong>Hotline:</strong> 081511229999</p>
          </div>
        </div>
      </div>
    </div>
  );
}