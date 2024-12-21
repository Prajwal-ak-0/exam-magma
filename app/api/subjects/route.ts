import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'

export async function GET() {
  try {
    const exams = await prisma.exam.findMany({
      select: {
        subject: true,
        semester: true
      },
      orderBy: [
        { semester: 'asc' },
        { subject: 'asc' }
      ]
    })

    // Group exams by semester
    const groupedExams = exams.reduce((acc, exam) => {
      if (!acc[exam.semester]) {
        acc[exam.semester] = new Set();
      }
      acc[exam.semester].add(exam.subject);
      return acc;
    }, {} as Record<number, Set<string>>);

    // Convert to array format
    const result = Object.entries(groupedExams).map(([semester, subjects]) => ({
      semester: parseInt(semester),
      subjects: Array.from(subjects)
    }));

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to fetch subjects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    )
  }
}
