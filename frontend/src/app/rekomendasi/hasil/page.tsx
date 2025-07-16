
'use client'

import { Briefcase, Building2, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Lowongan = {
  id: number;
  nama_pekerjaan: string;
  perusahaan: string;
  tipe_pekerjaan: string;
  lokasi: string;
  deskripsi: string;
};
export default function HasilRekomendasiPage() {
  const router = useRouter();
  const [lowongan, setLowongan] = useState<Lowongan[]>([]);
  const [user, setUser] = useState<{ nama?: string; email?: string }>({});

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) return;

    const fetchHasil = async () => {
      try {
        const res = await fetch(`http://localhost:5000/rekomendasi/${user_id}`);
        if (!res.ok) throw new Error('Gagal mengambil hasil rekomendasi.');
        const data = await res.json();
        console.log('Hasil:', data);
        setLowongan(data.lowongan || []);
        setUser({ nama: data.user, email: data.email })
      } catch (err) {
        console.error(err);
        alert('Gagal memuat hasil rekomendasi. Silakan coba lagi.');
      }
    };
    fetchHasil();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-12 px-6 flex flex-col items-center">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4 flex justify-center items-center gap-2">
          <Briefcase className="w-8 h-8 text-blue-700" />
          Rekomendasi Pekerjaan
        </h1>
        <p className="text-gray-700 mb-10 max-w-2xl text-center leading-relaxed">
          Berikut adalah lowongan yang sesuai dengan profil <span className="font-semibold">{user.nama || 'Anda'}</span>.
        </p>
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lowongan && lowongan.length > 0 ? (
          lowongan.map((item) => (
            <div
              key={item.id}
              className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300"
            >
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
      ${item.tipe_pekerjaan === 'Full-time' ? 'bg-green-100 text-green-800'
                    : item.tipe_pekerjaan === 'Part-time' ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-purple-100 text-purple-800'}
    `}
              >
                {item.tipe_pekerjaan}
              </span>

              {/* Judul */}
              <h2 className="text-xl font-bold text-blue-800 mb-1">
                {item.nama_pekerjaan || 'Pekerjaan Tidak Diketahui'}
              </h2>

              {/* Perusahaan & Lokasi */}
              <p className="flex items-center text-gray-600 mb-1">
                <Building2 className="w-4 h-4 mr-1 text-blue-500" />
                {item.perusahaan || 'Perusahaan Tidak Diketahui'}
              </p>
              <p className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                {item.lokasi || 'Lokasi Tidak Diketahui'}
              </p>

              {/* Deskripsi */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                <span className="font-semibold">Deskripsi:</span> {item.deskripsi || 'Deskripsi tidak tersedia.'}
              </p>

              {/* Button */}
              <button
                onClick={() => router.push(`/rekomendasi/detail?id=${item.id}`)}
                className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Lihat Detail
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">Belum ada rekomendasi.</p>
        )}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-block px-6 py-2 rounded-md border border-blue-500 text-blue-700 font-medium hover:bg-blue-100 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
