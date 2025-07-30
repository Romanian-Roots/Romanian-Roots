import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/capsules
export async function GET() {
  const capsules = await prisma.cultureCapsule.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(capsules)
}

// POST /api/capsules
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, description, imageUrl } = await req.json()

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const capsule = await prisma.cultureCapsule.create({
      data: {
        title,
        description,
        imageUrl,
        userId: user.id,
      },
    })

    return NextResponse.json(capsule, { status: 201 })
  } catch (error) {
    console.error('Error creating capsule:', error)
    return NextResponse.json({ error: 'Failed to create capsule' }, { status: 500 })
  }
}
