import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

/* ───────────────────────────── GET /api/capsules ────────────────────── */
export async function GET(req: NextRequest) {
  const mine = req.nextUrl.searchParams.get('mine') === 'true'

  if (mine) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const capsules = await prisma.cultureCapsule.findMany({
      where: { userId: user.id },
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
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(capsules)
  }

  // fallback: return all capsules
  const capsules = await prisma.cultureCapsule.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      imageUrl: true,
      latitude: true,
      longitude: true,
      status: true,   // ← enum: FOUND | SPONSOR | CLUE
      createdAt: true,
      user: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(capsules)
}

/* ───────────────────────────── POST /api/capsules ───────────────────── */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const {
    name,
    description,
    imageUrl,
    latitude,
    longitude,
  }: {
    name: string
    description: string
    imageUrl?: string
    latitude: number
    longitude: number
  } = await req.json()

  if (
    !name ||
    !description ||
    latitude === undefined ||
    longitude === undefined
  ) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const rawCode = String(Math.floor(1000 + Math.random() * 9000))
    const codeHash = await bcrypt.hash(rawCode, 10)

    const capsule = await prisma.cultureCapsule.create({
      data: {
        name,
        description,
        imageUrl,
        latitude,
        longitude,
        status: 'SPONSOR',
        userId: user.id,
        codeHash,
      },
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
    })

    return NextResponse.json(
      { capsule, code: rawCode, expiresIn: 300 },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating capsule:', error)
    return NextResponse.json(
      { error: 'Failed to create capsule' },
      { status: 500 }
    )
  }
}
