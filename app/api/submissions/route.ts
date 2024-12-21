import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { usn, status, code, examId, questionId, subject } = body

    // Validate required fields
    if (!usn || !status || !examId || !questionId || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create submission
    const submission = await prisma.submission.create({
      data: {
        usn,
        status,
        code: code || '',
        examId,
        questionId,
        subject
      } as Prisma.SubmissionUncheckedCreateInput
    })

    return NextResponse.json(submission)
  } catch (error) {
    console.error('Failed to create submission:', error)
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    )
  }
}
