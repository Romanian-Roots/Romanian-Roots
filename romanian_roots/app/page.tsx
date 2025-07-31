'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-red-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="text-xl font-bold text-red-600">
            Capsula Culturală
          </div>
          
          {/* Navigation Links and Profile Menu */}
          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => router.push('/harta')}
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                Harta
              </button>
              <button 
                onClick={() => router.push('/despre-noi')}
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                Despre noi
              </button>
              <button 
                onClick={() => router.push('/contact')}
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <button
                    onClick={() => router.push('/login')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => router.push('/signup')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

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
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex justify-center mb-2">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-red-500">2,547</div>
                <div className="text-sm text-gray-600">Utilizatori activi</div>
              </div>
              <div className="text-center p-4 bg-rose-50 rounded-lg border border-rose-100">
                <div className="flex justify-center mb-2">
                  <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-rose-500">238,397</div>
                <div className="text-sm text-gray-600">km² teritoriu</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex justify-center mb-2">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-red-500">156</div>
                <div className="text-sm text-gray-600">Capsule culturale</div>
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
