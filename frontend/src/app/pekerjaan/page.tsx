'use client'

import { Briefcase, Building2, MapPin } from 'lucide-react';
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

export default function PekerjaanPage() {
  const router = useRouter();
  const [lowongan, setLowongan] = useState<Lowongan[]>([]);

  useEffect(() => {
    const fetchLowongan = async () => {
      try {
        const res = await fetch('http://localhost:5000/pekerjaan');
        if (!res.ok) throw new Error('Gagal mengambil data lowongan.');
        
        const data = await res.json();
        console.log('Data dari backend:', data); // 👈 log data backend
  
        setLowongan(data); // langsung set data, karena data = array
      } catch (err) {
        console.error('Error saat fetch lowongan:', err);
        alert('Gagal memuat data pekerjaan. Silakan coba lagi.');
      }
    };
  
    fetchLowongan();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4 flex justify-center items-center gap-2">
          <Briefcase className="w-8 h-8 text-blue-700" />
          Semua Lowongan Pekerjaan
        </h1>
        <p className="text-gray-700 mb-10 max-w-3xl mx-auto">
          Jelajahi semua peluang karier yang tersedia dan temukan pekerjaan yang sesuai dengan minat serta keahlian Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {lowongan.length > 0 ? (
          lowongan.map((item) => (
            <div
              key={item.id}
              className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300"
            >
              {/* Badge Tipe Pekerjaan */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
                  ${item.tipe_pekerjaan === 'Full-time' ? 'bg-green-100 text-green-800'
                    : item.tipe_pekerjaan === 'Part-time' ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-purple-100 text-purple-800'}`}
              >
                {item.tipe_pekerjaan}
              </span>

              {/* Nama Pekerjaan */}
              <h2 className="text-xl font-bold text-blue-800 mb-1">
                {item.nama_pekerjaan}
              </h2>

              {/* Perusahaan & Lokasi */}
              <p className="flex items-center text-gray-600 mb-1">
                <Building2 className="w-4 h-4 mr-1 text-blue-500" />
                {item.perusahaan}
              </p>
              <p className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                {item.lokasi}
              </p>

              {/* Deskripsi singkat */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {item.deskripsi || 'Deskripsi tidak tersedia.'}
              </p>

              {/* Tombol Lihat Detail */}
              <button
                onClick={() => router.push(`/rekomendasi/detail?id=${item.id}`)}
                className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Lihat Detail
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">Tidak ada lowongan tersedia saat ini.</p>
        )}
      </div>
    </div>
  );
}
