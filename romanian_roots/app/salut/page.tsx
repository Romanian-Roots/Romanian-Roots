'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState, FormEvent } from 'react';

type Capsule = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  createdAt: string;
};

export default function SalutPage() {
  const { data: session, status } = useSession();
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' });

  /* 1️ fetch on mount */
  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/capsules')
        .then(res => res.json())
        .then(setCapsules)
        .catch(console.error);
    }
  }, [status]);

  /* 2️ add capsule */
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
    }
  }

  /* 3️ delete  */
  async function handleDelete(id: string) {
    const res = await fetch(`/api/capsules/${id}`, { method: 'DELETE' });
    if (res.ok) setCapsules(prev => prev.filter(c => c.id !== id));
  }

  if (status === 'loading') return <p>Loading…</p>;
  if (status === 'unauthenticated') return <p>Please log in.</p>;

  return (
    <main style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Salut, {session?.user.name || session?.user.email}!</h1>
      <button onClick={() => signOut()}>Logout</button>

      {/* ----- Add capsule form ----- */}
      <h2>Add a Capsule</h2>
      <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          placeholder="Image URL (optional)"
          value={form.imageUrl}
          onChange={e => setForm({ ...form, imageUrl: e.target.value })}
        />
        <button type="submit">Create</button>
      </form>

      {/* ----- Capsule list ----- */}
      <h2>All Capsules</h2>
      <ul>
        {capsules.map(c => (
          <li key={c.id} style={{ borderBottom: '1px solid #ccc', padding: 8 }}>
            <strong>{c.title}</strong> – {c.description}
            <button style={{ marginLeft: 8 }} onClick={() => handleDelete(c.id)}>
              🗑
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
