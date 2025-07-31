import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/* helper – extract <id> from /api/capsules/[id] */
const getId = (req: NextRequest) =>
  req.nextUrl.pathname.split('/').pop() as string;

/* ───────────────────────────── GET /api/capsules/[id] ─────────────── */
export async function GET(req: NextRequest) {
  const id = getId(req);

  const capsule = await prisma.cultureCapsule.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      imageUrl: true,
      latitude: true,
      longitude: true,
      status: true,            
      createdAt: true,
      user: { select: { id: true, name: true } },
    }, // codeHash intentionally omitted
  });

  if (!capsule)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(capsule);
}

/* ───────────────────────────── PUT /api/capsules/[id] ─────────────── */
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = getId(req);
  const {
    name,
    description,
    imageUrl,
    latitude,
    longitude,
    status,               // allow changing status if you want
  }: Partial<{
    name: string;
    description: string;
    imageUrl: string;
    latitude: number;
    longitude: number;
    status: 'FOUND' | 'SPONSOR' | 'CLUE';
  }> = await req.json();

  const updated = await prisma.cultureCapsule.update({
    where: { id },
    data: { name, description, imageUrl, latitude, longitude, status },
    select: {
      id: true,
      name: true,
      description: true,
      imageUrl: true,
      latitude: true,
      longitude: true,
      status: true,
      createdAt: true,
    },
  });

  return NextResponse.json(updated);
}

/* ─────────────────────────── DELETE /api/capsules/[id] ────────────── */
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = getId(req);
  await prisma.cultureCapsule.delete({ where: { id } });

  return NextResponse.json({ message: 'Deleted' });
}
