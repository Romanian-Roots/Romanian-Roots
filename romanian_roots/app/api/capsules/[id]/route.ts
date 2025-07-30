import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";


export async function GET(_: Request, { params }: { params: { id: string } }) {
  const capsule = await prisma.cultureCapsule.findUnique({
    where: { id: params.id },
  });

  if (!capsule) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(capsule);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  const { title, description, imageUrl } = data;

  const updated = await prisma.cultureCapsule.update({
    where: { id: params.id },
    data: { title, description, imageUrl },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.cultureCapsule.delete({ where: { id: params.id } });

  return NextResponse.json({ message: 'Deleted' });
}