'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ContactPage() {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    alert('Mesajul a fost trimis! Vă vom contacta în curând.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-red-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo/Brand */}
          <button 
            onClick={() => router.push('/')}
            className="text-xl font-bold text-red-600 hover:text-red-700 transition-colors"
          >
            Capsula Culturală
          </button>
          
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
                className="text-red-500 font-medium transition-colors"
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
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Avem întrebări? Vrei să ne propui o capsulă culturală? Sau poate dorești să colaborezi cu noi? 
            Suntem aici să te ascultăm!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm border border-red-100 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Trimite-ne un mesaj</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Numele complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-gray-900"
                  placeholder="Introdu numele tău complet"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresa de email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-gray-900"
                  placeholder="exemplu@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subiectul mesajului *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-gray-900"
                >
                  <option value="">Alege un subiect</option>
                  <option value="intrebare-generala">Întrebare generală</option>
                  <option value="propunere-capsula">Propunere capsulă culturală</option>
                  <option value="colaborare">Colaborare</option>
                  <option value="problema-tehnica">Problemă tehnică</option>
                  <option value="feedback">Feedback</option>
                  <option value="altceva">Altceva</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mesajul tău *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-gray-900 resize-none"
                  placeholder="Scrie-ne mesajul tău aici..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-400 text-white py-3 px-6 rounded-lg hover:bg-red-500 transition-colors font-medium text-lg"
              >
                Trimite mesajul
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-lg shadow-sm border border-red-100 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Informații de contact</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">contact@capsulacrurala.ro</p>
                    <p className="text-gray-600">info@capsulacrurala.ro</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Telefon</h3>
                    <p className="text-gray-600">+40 722 123 456</p>
                    <p className="text-sm text-gray-500">Luni - Vineri, 09:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Adresa</h3>
                    <p className="text-gray-600">Strada Culturii nr. 15</p>
                    <p className="text-gray-600">Cluj-Napoca, România</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media & Quick Links */}
            <div className="bg-white rounded-lg shadow-sm border border-red-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Urmărește-ne</h3>
              <div className="flex space-x-4 mb-8">
                <button className="bg-red-100 hover:bg-red-200 p-3 rounded-lg transition-colors">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="bg-red-100 hover:bg-red-200 p-3 rounded-lg transition-colors">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017 0z"/>
                  </svg>
                </button>
                <button className="bg-red-100 hover:bg-red-200 p-3 rounded-lg transition-colors">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Link-uri utile</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => router.push('/harta')}
                      className="block text-red-500 hover:text-red-600 transition-colors"
                    >
                      Explorează Harta
                    </button>
                    <button
                      onClick={() => router.push('/despre-noi')}
                      className="block text-red-500 hover:text-red-600 transition-colors"
                    >
                      Despre Noi
                    </button>
                    <button
                      onClick={() => router.push('/signup')}
                      className="block text-red-500 hover:text-red-600 transition-colors"
                    >
                      Creează Cont
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Întrebări frecvente</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-red-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Cum pot propune o capsulă culturală?</h3>
              <p className="text-gray-600">
                Poți să ne scrii prin formularul de mai sus selectând &ldquo;Propunere capsulă culturală&rdquo; sau să ne contactezi direct prin email cu detaliile locației și povestea ei.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-red-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Cum funcționează colaborarea?</h3>
              <p className="text-gray-600">
                Căutăm parteneri locali, muzee, comunități și persoane pasionate de cultură. Contactează-ne pentru a discuta modalitățile de colaborare.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-red-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Costă ceva să particip?</h3>
              <p className="text-gray-600">
                Nu! Participarea la aventura Capsulei Culturale este complet gratuită. Vrem ca toată lumea să aibă acces la patrimoniul cultural românesc.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-red-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Cât timp durează să primesc un răspuns?</h3>
              <p className="text-gray-600">
                De obicei răspundem în 24-48 de ore în zilele lucrătoare. Pentru colaborări și propuneri speciale, timpul poate fi ușor mai lung.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
