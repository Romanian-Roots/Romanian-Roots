'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect} from 'react';
import NavBar from '@/components/NavBar';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [userCount, setUserCount] = useState<number | null>(null);
  const [capsuleCount, setCapsuleCount] = useState<number | null>(null);

  useEffect(() => {
    // fetch the fuzzed user‐count
    fetch('/api/users/count')
      .then(r => r.json())
      .then(data => setUserCount(data.count))
      .catch(console.error);

    // fetch the exact capsule count
    fetch('/api/capsules/count')
      .then(r => r.json())
      .then(data => setCapsuleCount(data.count))
      .catch(console.error);
  }, []);


  return (
    <div className="min-h-screen bg-stone-50">
      <NavBar />
           {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Logo Section */}
          <div className="flex justify-center">
            <Image 
              src="/logo.jpg" 
              alt="Capsula Culturală Logo" 
              width={400}
              height={400}
              className="max-w-md w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Content Section */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Capsula Culturală
            </h1>
            <p className="text-xl text-gray-600 mb-4 italic">
              Fiecare loc are ceva de spus.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Ești pregătit să explorezi România altfel? Pornește în căutarea capsulelor culturale și descoperă comori locale, 
              povești uitate și tradiții vii, toate ascunse în locuri reale din țară!
            </p>
            
            {/* Statistics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg border border-red-100">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-red-500">{userCount !== null ? userCount.toLocaleString() : '–––'}</div>
              <div className="text-sm text-gray-600">Utilizatori activi</div>
            </div>

            <div className="flex flex-col items-center p-4 bg-rose-50 rounded-lg border border-rose-100">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0
                      0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064
                      M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-rose-500">238,311</div>
              <div className="text-sm text-gray-600">km² teritoriu</div>
            </div>

            <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg border border-red-100">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0
                      01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2
                      0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-red-500">{capsuleCount !== null ? capsuleCount.toLocaleString() : '–––'}</div>
              <div className="text-2sm text-gray-600">Capsule</div>
            </div>
          </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => router.push('/login')}
                className="bg-red-400 text-white px-8 py-3 rounded-lg hover:bg-red-500 transition-colors font-medium"
              >
                Începe Explorarea
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="border border-red-400 text-red-500 px-8 py-3 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                Creează Cont
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
