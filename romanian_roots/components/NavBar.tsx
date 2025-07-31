'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'lucide-react';

const links = [
  { href: '/harta', label: 'Harta' },
  { href: '/despre-noi', label: 'Despre noi' },
  { href: '/contact', label: 'Contact' },
];

export default function NavBar() {
  const router = useRouter();
  const path = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-red-100 px-6 py-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => router.push('/')}
          className="text-xl font-bold text-red-600 hover:text-red-700 transition-colors"
        >
          Capsula Culturală
        </button>

        {/* Desktop links + session */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map(l => (
            <button
              key={l.href}
              onClick={() => router.push(l.href)}
              className={`${
                path === l.href ? 'text-red-500' : 'text-gray-600'
              } hover:text-red-500 transition-colors`}
            >
              {l.label}
            </button>
          ))}
          {session && (
            <>
              <span className="text-gray-700 font-medium">
                Salut, {session.user?.name || session.user?.email}!
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors font-medium"
              >
                Deconectează-te
              </button>
            </>
          )}
          {!session && (
            <>
              <button
                onClick={() => router.push('/login')}
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(v => !v)}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
        
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md border-t border-red-100">
          {links.map(l => (
            <button
              key={l.href}
              onClick={() => {
                router.push(l.href);
                setOpen(false);
              }}
              className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-red-50 transition-colors"
            >
              {l.label}
            </button>
          ))}
          {!session && (
            <>
              <button
                onClick={() => {
                  router.push('/login');
                  setOpen(false);
                }}
                className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-red-50 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  router.push('/signup');
                  setOpen(false);
                }}
                className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-red-50 transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
          {session && (
            <div className="px-6 py-3 border-t border-red-100">
              <span className="block mb-2 text-gray-700">
                Salut, {session.user?.name || session.user?.email}!
              </span>
              <button
                onClick={() => signOut()}
                className="w-full bg-red-400 text-white py-2 rounded-lg hover:bg-red-500 transition-colors font-medium"
              >
                Deconectează-te
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}