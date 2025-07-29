'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SalutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Salut, Romanian Roots!</h1>
      <p>Welcome, {session?.user.name}!</p>
      <p>Your email: {session?.user.email}</p>
      <p>Status: {session?.user.isPremium ? 'Premium User' : 'Free User'}</p>
    </div>
  );
}
