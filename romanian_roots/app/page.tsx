'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to Romanian Roots</h1>
      <p>Connect through culture. Start exploring.</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => router.push('/login')} style={{ marginRight: '10px' }}>
          Log In
        </button>
        <button onClick={() => router.push('/signup')}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
