import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/src/lib/adminAuth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin-login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-400">Admin Panel</h2>
        <nav className="space-y-4">
          <Link href="/admin/products" className="block hover:text-blue-300 transition">📦 Kelola Produk</Link>
          <Link href="/admin/news" className="block hover:text-blue-300 transition">📰 Kelola Berita</Link>
          <div className="pt-10 border-t border-slate-700">
            <Link href="/" className="block text-sm text-gray-400 hover:text-white">← Kembali ke Web</Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-sm p-6 min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
}