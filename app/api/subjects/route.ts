import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'

export async function GET() {
  try {
    const subjects = await prisma.exam.findMany({
      select: {
        subject: true
      },
      distinct: ['subject']
    })

    return NextResponse.json(subjects.map(s => s.subject))
  } catch (error) {
    console.error('Failed to fetch subjects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    )
  }
}
