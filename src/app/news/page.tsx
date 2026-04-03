export default function NewsPage() {
  const articles = [
    { title: "Manfaat Hybrid PABX untuk Efisiensi", date: "20 Jan 2024", excerpt: "Mengapa kantor modern harus beralih ke sistem hybrid..." },
    { title: "Cara Merawat Perangkat NEC Agar Awet", date: "15 Jan 2024", excerpt: "Tips maintenance sederhana yang bisa dilakukan sendiri..." },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Berita & Artikel</h1>
      <div className="space-y-6">
        {articles.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-6 border-b pb-6">
            <div className="w-full md:w-1/4 bg-gray-200 h-32 rounded"></div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-blue-900">{item.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{item.date}</p>
              <p className="text-gray-700">{item.excerpt}</p>
              <button className="text-blue-600 mt-2 text-sm font-semibold">Baca Selengkapnya &rarr;</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}