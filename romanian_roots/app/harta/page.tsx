'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import dynamic from 'next/dynamic';
import type L from 'leaflet';
import NavBar from '@/components/NavBar';

type Capsule = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  createdAt: string;
  latitude: number;
  longitude: number;
  status: 'FOUND' | 'SPONSOR' | 'CLUE';
};

const LeafletMap = dynamic(
  async () => {
    const leaflet = await import('leaflet');

    const LeafletInner = ({ pins }: { pins: Capsule[] }) => (
      <Map pins={pins} L={leaflet} />
    );
    LeafletInner.displayName = 'LeafletMap';
    return LeafletInner;
  },
  { ssr: false }
);

export default function HartaPage() {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
const [filterStatus, setFilterStatus] = useState<'ALL' | Capsule['status']>('ALL');
  const [capsules, setCapsules] = useState<Capsule[]>([]);

useEffect(() => {
  fetch('/api/capsules')
    .then(r => r.json())
    .then(setCapsules)
    .catch(console.error);
}, []);

const filtered = capsules.filter(c =>
  filterStatus === 'ALL' || c.status === filterStatus
);

  return (
    <div className="min-h-screen bg-stone-50">
      <NavBar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Harta Capsulelor Culturale</h1>
          <p className="text-lg text-gray-600">
            Descoperă locurile unice din România și capsulele culturale ascunse în fiecare colț al țării.
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-red-100 p-6 mb-8">
  <h2 className="text-xl font-semibold text-gray-900 mb-4">Filtrează după stare</h2>
  <div className="flex items-center gap-4">
    <select
value={filterStatus}
 onChange={(e: ChangeEvent<HTMLSelectElement>) => {
   const v = e.target.value as 'ALL' | 'FOUND' | 'SPONSOR' | 'CLUE';
   setFilterStatus(v);
 }}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 text-gray-900"
    >
      <option value="ALL">Toate</option>
      <option value="FOUND">🔴 Găsite</option>
      <option value="SPONSOR">🔵 Parteneri</option>
      <option value="CLUE">🟡 Cu indicii</option>
    </select>
    <button
      onClick={() => {}}
      className="bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition-colors"
    >
      Aplică filtrele
    </button>
  </div>
</div>


{/* Map */}
<section className="bg-white rounded-lg shadow-sm border border-red-100 p-0 mb-10">
  <LeafletMap pins={filtered} />
</section>


        {/* Results Grid */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Capsule culturale populare</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capsules.map(capsule => (
              <div
                key={capsule.id}
                className="bg-white rounded-lg shadow-sm border border-red-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {capsule.imageUrl ? (
                  <img
                    src={capsule.imageUrl}                    alt={capsule.name}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="bg-gradient-to-r from-red-100 to-rose-100 h-48 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {capsule.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {capsule.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    {new Date(capsule.createdAt).toLocaleDateString('ro-RO')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function Map({
  pins,
  L,
}: {
  pins: Capsule[];
  L: typeof import('leaflet');
}) {
  const mapRef = useRef<L.Map | null>(null);

  const statusColor: Record<Capsule['status'], string> = {
    FOUND: 'red',    // 🔴 found
    SPONSOR: 'blue', // 🔵 sponsor
    CLUE: 'gold',    // 🟡 clue
  };

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = L.map('map', {
      center: [45.9432, 24.9668],
      zoom: 6,
      maxBounds: L.latLngBounds(L.latLng(43.5, 20.0), L.latLng(48.5, 30.0)),
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);
  }, [L]);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.eachLayer(layer => {
      if (layer instanceof L.Marker) mapRef.current!.removeLayer(layer);
    });

    pins.forEach(pin => {
      const icon = L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${statusColor[pin.status]}.png`,
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      L.marker([pin.latitude, pin.longitude], { icon })
        .addTo(mapRef.current!)
        .bindPopup(`<b>${pin.name}</b><br>Status: ${pin.status}`);
    });
  }, [pins, L]);

  return <div id="map" className="h-96 w-full rounded-lg" />;
}