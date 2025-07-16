'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Upload, ArrowLeftCircle, Sparkles, User, Mail, Book, Heart, Code } from 'lucide-react';

export default function RekomendasiPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama: '',
    email: '',
    jenis_kelamin: '',
    prodi: '',
    jurusan: '',
    minat: '',
    skill: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.nama || !form.email || !form.jenis_kelamin || !form.prodi || !form.jurusan) {
      alert('Mohon lengkapi semua data wajib.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/rekomendasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Gagal mendapatkan rekomendasi.');

      const data = await res.json();
      localStorage.setItem('user_id', data.user_id);
      router.push('/rekomendasi/hasil');
    }
    catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat memproses rekomendasi.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section: Illustration & Text */}
      <div className="md:w-1/2 bg-gradient-to-br from-blue-200 to-blue-400 flex flex-col justify-center items-center text-center px-6 py-12">
        <Sparkles className="w-12 h-12 text-white mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug">
          Rekomendasi Karier <br /> Berdasarkan Profil Anda
        </h1>
        <p className="text-blue-50 max-w-md">
          Masukkan data diri Anda dan biarkan sistem kami membantu menemukan pekerjaan impian yang sesuai dengan minat, jurusan, dan keahlian Anda.
        </p>
        <img
          src="/images/undraw_career-progress_vfq5.svg" // ganti dengan ilustrasi yang kamu punya
          alt="Career Recommendation"
          className="mt-6 w-80"
        />
      </div>

      {/* Right Section: Form */}
      <div className="md:w-1/2 flex justify-center items-center py-10 px-4 bg-blue-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl space-y-5"
        >
          <Input
            icon={<User className="w-5 h-5 text-blue-500" />}
            label="Nama Lengkap"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            required
          />
          <Input
            icon={<Mail className="w-5 h-5 text-blue-500" />}
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block mb-1 font-medium text-gray-700">Jenis Kelamin</label>
            <select
              name="jenis_kelamin"
              value={form.jenis_kelamin}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Pilih...</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <Input
            icon={<Book className="w-5 h-5 text-blue-500" />}
            label="Program Studi"
            name="prodi"
            value={form.prodi}
            onChange={handleChange}
            required
          />
          <Input
            icon={<Book className="w-5 h-5 text-blue-500" />}
            label="Jurusan"
            name="jurusan"
            value={form.jurusan}
            onChange={handleChange}
            required
          />
          <Input
            icon={<Heart className="w-5 h-5 text-pink-500" />}
            label="Minat"
            name="minat"
            value={form.minat}
            onChange={handleChange}
            placeholder="Contoh: UI/UX, Data Science, Cyber Security"
          />

          <div>
            <label className="block mb-1 font-medium text-gray-700 flex items-center gap-2">
              <Code className="w-5 h-5 text-green-500" /> Kemampuan / Skill
            </label>
            <textarea
              name="skill"
              value={form.skill}
              onChange={handleChange}
              rows={3}
              placeholder="Contoh: Python, SQL, Figma, ReactJS"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              <ArrowLeftCircle className="w-4 h-4" />
              Kembali
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition transform hover:-translate-y-1"
            >
              Lihat Rekomendasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  icon
}: {
  label: string;
  name: string;
  value: string;
  onChange: any;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
        {icon && <div className="mr-2">{icon}</div>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full outline-none"
        />
      </div>
    </div>
  );
}
