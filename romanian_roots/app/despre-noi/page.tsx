'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import NavBar from '@/components/NavBar';

export default function DespreNoiPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-stone-50">
      <NavBar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Despre noi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Suntem pasionați de cultura română și ne dedicăm să descoperim și să împărtășim comorile ascunse ale patrimoniului nostru cultural.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Misiunea noastră</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Capsula Culturală își propune să redefinească modul în care explorăm și înțelegem România. 
              Credem că fiecare loc are o poveste de spus, o tradiție de păstrat și o lecție de învățat.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Prin intermediul platformei noastre interactive, conectăm oamenii cu locurile autentice, 
              cu comunitățile locale și cu experiențele care definesc adevărata esență a culturii românești.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push('/harta')}
                className="bg-red-400 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition-colors font-medium"
              >
                Explorează Harta
              </button>
              <button
                onClick={() => router.push('/contact')}
                className="border border-red-400 text-red-500 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                Contactează-ne
              </button>
            </div>
          </div>
          <div className="rounded-lg h-96 overflow-hidden">
            <Image
              src="/map.png"
              alt="Harta României"
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Valorile noastre</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-red-100 text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasiune</h3>
              <p className="text-gray-600 leading-relaxed">
                Iubim cultura română și ne dedicăm să o promovăm cu entuziasm și respect pentru tradițiile ancestrale.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm border border-red-100 text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Autenticitate</h3>
              <p className="text-gray-600 leading-relaxed">
                Promovăm doar experiențe autentice și locuri reale, păstrând integritatea culturală a fiecărei povești.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm border border-red-100 text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comunitate</h3>
              <p className="text-gray-600 leading-relaxed">
                Creăm legături între oameni și comunități, încurajând schimbul cultural și educația reciprocă.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-gradient-to-br from-rose-100 to-red-100 rounded-lg p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-24 h-24 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-gray-600 font-medium">Imaginea cu echipa noastră</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Povestea noastră</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Totul a început dintr-o dorință simplă: să redescoperim România prin ochii localnicilor. 
              În călătoriile noastre, am realizat că cele mai frumoase experiențe nu se găseau în ghidurile turistice, 
              ci în poveștile oamenilor obișnuiți.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Astfel s-a născut ideea Capsulei Culturale - o platformă care să conecteze călătorii cu experiențele autentice, 
              cu mesterele locale, cu tradițiile păstrate de generații și cu locurile care au o poveste de spus.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Suntem o echipă dedicată care lucrează împreună 
              pentru a face România mai accesibilă pentru toți cei care doresc să o exploreze autentic.
            </p>
          </div>
        </div>

        {/* Platform Explanation Section */}
        <div className="mb-20">
          <div className="bg-white rounded-lg shadow-sm border border-red-100 p-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Cum funcționează platforma</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Capsula Culturală este un proiect românesc care combină aventura cu patrimoniul cultural. Credem că fiecare loc din țară are o poveste de spus — fie că e o legendă locală, un obicei uitat sau un obiect cu valoare simbolică.
              </p>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Prin acest proiect, ascundem în toată România capsule culturale reale — mici recipiente ce conțin:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-red-50 rounded-lg p-6 text-center border border-red-100">
                  <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">Un jurnal de călătorie cu mesaje și povești scrise de alți exploratori</p>
                </div>
                <div className="bg-rose-50 rounded-lg p-6 text-center border border-rose-100">
                  <div className="bg-rose-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">Obiecte simbolice care se pot schimba între cei care le găsesc</p>
                </div>
                <div className="bg-red-50 rounded-lg p-6 text-center border border-red-100">
                  <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h2a1 1 0 001-1V6a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h2" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">Un cod QR care duce la platforma noastră online</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Pe site poți adăuga locațiile capsulelor găsite, primi indicii pentru cele necunoscute, sau chiar începe propria capsulă dacă vrei să transmiți ceva din cultura locului tău.
              </p>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Proiectul este despre oameni, despre locuri, despre legături. Este un mod diferit de a redescoperi România — împreună.
              </p>
              
              <p className="text-lg text-red-600 leading-relaxed font-medium">
                Fie că ești turist, elev, student sau doar curios, te invităm să pornești în căutarea capsulelor culturale și să faci parte din cea mai frumoasă aventură românească.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Echipa noastră</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Beudean Carmen", role: "Planning Expert", description: "Dornică să călătoresc", image: "carmen.jpg" },
              { name: "Asandei Georgiana", role: "Frontend developer", description: "Mereu curioasă", image: "georgi.jpg" },
              { name: "Zsigmond Arthur", role: "Backend developer", description: "Încântat să ajut cultura românească", image: "arthur.jpg" },
              { name: "Jakab Mihaly", role: "Graphic Designer", description: "Absorbit de viața de urbană", image: "misi.jpg" }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-red-100 text-center">
                <div className="bg-gradient-to-br from-red-100 to-rose-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  {member.image ? (
                    <Image
                      src={`/${member.image}`}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-red-500 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-red-400 to-rose-400 rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Alătură-te aventurii!</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Descoperă România autentică și fă parte din comunitatea celor care apreciază cultura și tradițiile noastre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/signup')}
              className="bg-white text-red-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Creează Cont
            </button>
            <button
              onClick={() => router.push('/harta')}
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors font-medium"
            >
              Explorează Acum
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
