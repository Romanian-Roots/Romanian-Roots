'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type Capsule = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  createdAt: string;
};

export default function SalutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' });
  const [showForm, setShowForm] = useState(false);

  /* 1️⃣ fetch on mount */
  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/capsules')
        .then(res => res.json())
        .then(setCapsules)
        .catch(console.error);
    }
  }, [status]);

  /* 2️⃣ add capsule */
  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/capsules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const created: Capsule = await res.json();
      setCapsules(prev => [created, ...prev]);
      setForm({ title: '', description: '', imageUrl: '' });
      setShowForm(false);
    }
  }

  /* 3️⃣ delete */
  async function handleDelete(id: string) {
    const res = await fetch(`/api/capsules/${id}`, { method: 'DELETE' });
    if (res.ok) setCapsules(prev => prev.filter(c => c.id !== id));
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Acces restricționat</h1>
          <p className="text-gray-600 mb-6">Pentru a accesa această pagină, trebuie să te autentifici.</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-red-400 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition-colors font-medium"
          >
            Autentifică-te
          </button>
        </div>
      </div>
    );
  }

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
          
          {/* Navigation Links and User Menu */}
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

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                Salut, {session?.user?.name || session?.user?.email}!
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors font-medium"
              >
                Deconectează-te
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bun venit, {session?.user?.name || 'Explorator'}!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gestionează-ți capsulele culturale și contribuie la păstrarea patrimoniului românesc.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-red-400 text-white px-8 py-3 rounded-lg hover:bg-red-500 transition-colors font-medium"
          >
            {showForm ? 'Anulează' : 'Adaugă Capsulă Nouă'}
          </button>
          <button
            onClick={() => router.push('/harta')}
            className="border border-red-400 text-red-500 px-8 py-3 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            Explorează Harta
          </button>
        </div>

        {/* Add Capsule Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-red-100 p-8 mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Adaugă o Capsulă Culturală</h2>
            <form onSubmit={handleAdd} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Titlul capsulei *
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Ex: Tradiția olăritului din Horezu"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-gray-900"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Descrierea *
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Descrie tradiția, obiceiul sau povestea culturală..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-gray-900 resize-none"
                />
              </div>
              
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  URL imagine (opțional)
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  placeholder="https://exemplu.com/imagine.jpg"
                  value={form.imageUrl}
                  onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-gray-900"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-red-400 text-white py-3 px-6 rounded-lg hover:bg-red-500 transition-colors font-medium text-lg"
              >
                Creează Capsula
              </button>
            </form>
          </div>
        )}

        {/* Capsules Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Capsulele tale culturale</h2>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
              {capsules.length} {capsules.length === 1 ? 'capsulă' : 'capsule'}
            </span>
          </div>

          {capsules.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nicio capsulă încă</h3>
              <p className="text-gray-500 mb-6">Adaugă prima ta capsulă culturală și începe să contribui la patrimoniul românesc!</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-red-400 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition-colors font-medium"
              >
                Adaugă prima capsulă
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capsules.map(capsule => (
                <div key={capsule.id} className="bg-white rounded-lg shadow-sm border border-red-100 overflow-hidden hover:shadow-md transition-shadow">
                  {capsule.imageUrl ? (
                    <div className="h-48 bg-gradient-to-r from-red-100 to-rose-100 flex items-center justify-center">
                      <img 
                        src={capsule.imageUrl} 
                        alt={capsule.title}
                        className="max-h-full max-w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden text-center p-8">
                        <svg className="w-12 h-12 text-red-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p className="text-gray-600 font-medium">Capsulă Culturală</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-red-100 to-rose-100 h-48 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-12 h-12 text-red-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p className="text-gray-600 font-medium">Capsulă Culturală</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{capsule.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{capsule.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(capsule.createdAt).toLocaleDateString('ro-RO')}
                      </span>
                      <button
                        onClick={() => handleDelete(capsule.id)}
                        className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Șterge capsula"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
