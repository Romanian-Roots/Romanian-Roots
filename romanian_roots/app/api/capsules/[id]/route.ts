import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/** helper – extract the `[id]` segment from the URL */
function getId(req: NextRequest): string {
  // pathname like “…/api/capsules/<id>”
  return req.nextUrl.pathname.split('/').pop() as string;
}

/* GET /api/capsules/[id] --------------------------------------------------- */
export async function GET(req: NextRequest) {
  const id = getId(req);

  const capsule = await prisma.cultureCapsule.findUnique({ where: { id } });
  if (!capsule)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(capsule);
}

/* PUT /api/capsules/[id] --------------------------------------------------- */
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = getId(req);
  const { title, description, imageUrl } = await req.json();

  const updated = await prisma.cultureCapsule.update({
    where: { id },
    data: { title, description, imageUrl },
  });

  return NextResponse.json(updated);
}

/* DELETE /api/capsules/[id] ----------------------------------------------- */
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = getId(req);
  await prisma.cultureCapsule.delete({ where: { id } });

  return NextResponse.json({ message: 'Deleted' });
}
