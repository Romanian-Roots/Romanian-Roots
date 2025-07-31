'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false
    });

    if (result?.error) {
      setError('Invalid email or password.');
    } else {
      router.push('/salut'); // ✅ go to authenticated page
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      {/* Navigation Bar */}
      <div className="absolute top-0 left-0 right-0">
        <nav className="bg-white shadow-sm border-b border-red-100 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <button 
              onClick={() => router.push('/')}
              className="text-xl font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              Capsula Culturală
            </button>
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-red-500 transition-colors"
            >
              Înapoi acasă
            </button>
          </div>
        </nav>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg border border-red-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bun venit înapoi!</h1>
            <p className="text-gray-600">- Conectează-te pentru a continua experiența -</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresa de email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="exemplu@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Parola
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors text-gray-900"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-red-400 text-white py-3 px-4 rounded-lg hover:bg-red-500 transition-colors font-medium"
            >
              Conectează-te
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Nu ai cont încă?{' '}
              <button
                onClick={() => router.push('/signup')}
                className="text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                Creează un cont
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
