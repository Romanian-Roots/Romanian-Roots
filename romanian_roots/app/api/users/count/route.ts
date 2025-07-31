import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const real = await prisma.user.count()
  const fuzz  = Math.floor(Math.random() * 4) + 2
  return NextResponse.json({ count: real + fuzz })
}
