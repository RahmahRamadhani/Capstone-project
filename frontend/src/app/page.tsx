'use client'

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/rekomendasi');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col justify-center items-center px-4">
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl w-full">
        
        {/* LEFT: Text & CTA */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center justify-center md:justify-start mb-4">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <Sparkles size={40} className="text-blue-600" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            Temukan Karier Impian Anda
          </h1>

          <p className="text-gray-700 text-base sm:text-lg mb-6 max-w-md md:max-w-lg">
            Sistem rekomendasi ini membantu Anda memilih jalur karier terbaik
            berdasarkan minat, keterampilan, dan profil LinkedIn.
          </p>

          <button
            onClick={handleClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-lg"
          >
            Mulai Rekomendasi
          </button>
        </div>

        {/* RIGHT: Illustration */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/undraw_multitasking_5lw1.svg" // letakkan gambar di public/images
            alt="Ilustrasi Rekomendasi Karier"
            width={400}
            height={400}
            className="drop-shadow-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
}
