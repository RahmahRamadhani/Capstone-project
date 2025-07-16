'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BadgeDollarSign, Briefcase, Building, Building2, CheckCircle, Gift, MapPin, Rocket } from 'lucide-react';

type Pekerjaan = {
  id: number;
  nama_pekerjaan: string;
  perusahaan: string;
  tipe_pekerjaan: string;
  lokasi: string;
  gaji: string;
  deskripsi: string;
  syarat: string;
  benefit: string;
  link_apply: string;
};

export default function DetailPekerjaan() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [pekerjaan, setPekerjaan] = useState<Pekerjaan | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/pekerjaan/${id}`)
        .then((res) => res.json())
        .then((pekerjaan) => setPekerjaan(pekerjaan))
        .catch((err) => console.error(err));
    }
  }, [id]);
  const getBadgeColor = (tipe: string) => {
    switch (tipe.toLowerCase()) {
      case 'full-time':
        return 'bg-green-100 text-green-700'
      case 'part-time':
        return 'bg-yellow-100 text-yellow-800'
      case 'contract':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }
  if (!pekerjaan) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Memuat detail lowongan...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-12 px-4 md:px-10 flex flex-col items-center">
      {/* Hero Section */}
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-4xl relative">

        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="text-blue-700 w-6 h-6" />
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">{pekerjaan.nama_pekerjaan}</h1>
        </div>

        <p className="text-gray-700 flex items-center gap-2 mb-1">
          <Building2 className="w-4 h-4 text-gray-500" /> {pekerjaan.perusahaan}
        </p>
        <p className="text-gray-700 flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-gray-500" /> {pekerjaan.lokasi}
        </p>
        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <BadgeDollarSign className="w-5 h-5 text-gray-500" />
          <p>{pekerjaan.gaji || 'Gaji tidak disebutkan'}</p>
        </div>
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(
            pekerjaan.tipe_pekerjaan
          )} mb-2`}
        >
          {pekerjaan.tipe_pekerjaan}
        </span>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" /> Deskripsi Pekerjaan
            </h3>
            <p className="text-gray-700 mt-1 leading-relaxed">
              {pekerjaan.deskripsi || 'Deskripsi tidak tersedia'}
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" /> Syarat
            </h3>
            <p className="text-gray-700 mt-1 leading-relaxed">
              {pekerjaan.syarat || 'Syarat tidak tersedia'}
            </p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-4">
            <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2">
              <Gift className="w-5 h-5 text-blue-600" /> Benefit
            </h3>
            <p className="text-gray-700 mt-1 leading-relaxed">
              {pekerjaan.benefit || 'Benefit tidak tersedia'}
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a
              href={pekerjaan.link_apply || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 justify-center"
            >
              <Rocket className="w-5 h-5" /> Apply Sekarang
            </a>
            <button
              onClick={() => router.back()}
              className="text-blue-700 underline hover:text-blue-900"
            >
              Kembali ke Rekomendasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
