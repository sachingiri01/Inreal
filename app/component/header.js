'use client';

import { useRouter } from 'next/navigation';
import { Linkedin, Github, Globe } from 'lucide-react';

export default function Header() {
  const router = useRouter();

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-slate-900 text-slate-100 shadow-md">
      <button
        onClick={() => router.push('/')}
        className="text-slate-100 hover:cursor-pointer hover:text-slate-400 transition"
      >
        Home
      </button>

      <div className="text-lg font-sans">
        Code by Sachin
      </div>

      <div className="flex space-x-4">
        <a
          href="https://www.linkedin.com/in/sachin-giri-3a776b2a3/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="https://github.com/sachingiri01"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          <Github size={20} />
        </a>
        <a
          href="https://sachin-giri.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400"
        >
          <Globe size={20} />
        </a>
      </div>
    </header>
  );
}
