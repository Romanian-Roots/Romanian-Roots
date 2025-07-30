import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/capsules/[id]
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  const capsule = await prisma.cultureCapsule.findUnique({
    where: { id },
  });

  if (!capsule) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(capsule);
}

// PUT /api/capsules/[id]
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = context.params;
  const { title, description, imageUrl } = await req.json();

  const updated = await prisma.cultureCapsule.update({
    where: { id },
    data: { title, description, imageUrl },
  });

  return NextResponse.json(updated);
}

// DELETE /api/capsules/[id]
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = context.params;

  await prisma.cultureCapsule.delete({ where: { id } });

  return NextResponse.json({ message: 'Deleted' });
}
