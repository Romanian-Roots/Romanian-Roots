import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  if (!code || typeof code !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  // 1) load all capsules not yet FOUND
  const candidates = await prisma.cultureCapsule.findMany({
    where: { status: { not: 'FOUND' } },
    select: { id: true, codeHash: true, status: true },
  });

  // 2) find matching hash
  for (const c of candidates) {
    if (await bcrypt.compare(code, c.codeHash)) {
      // 3a) if it was SPONSOR or CLUE, mark FOUND
      let wasNewFind = false;
      if (c.status !== 'FOUND') {
        await prisma.cultureCapsule.update({
          where: { id: c.id },
          data: { status: 'FOUND' },
        });
        wasNewFind = true;
      }
      return NextResponse.json({
        id: c.id,
        status: 'FOUND',
        wasNewFind,
      });
    }
  }

  // no match
  return NextResponse.json({ error: 'Cod nevalid' }, { status: 404 });
}
