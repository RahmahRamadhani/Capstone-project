import Link from 'next/link';
import "./globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sistem Rekomendasi Karier',
  description: 'Temukan karier impian Anda berdasarkan profil LinkedIn',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
        <header className="bg-blue-400 text-white px-6 py-4 shadow">
          <div className="max-w-6l mx-auto flex justify-between items-center">
            <h1 className="text-lg font-semibold">Rekomendasikan Karier Anda</h1>
            <nav className="space-x-4 text-sm">
              <Link href="/" className="hover:underline">Beranda</Link>
              <Link href="/pekerjaan" className="hover:underline">Pekerjaan</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-gray-200 text-center py-4 text-sm">
          © {new Date().getFullYear()} Sistem Rekomendasi Karier. Seluruh hak cipta dilindungi.
        </footer>
      </body>
    </html>
  );
}