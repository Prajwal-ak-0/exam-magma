import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'

export async function GET() {
  try {
    // Get unique combinations of semester and subject
    const exams = await prisma.exam.findMany({
      select: {
        semester: true,
        subject: true,
      },
      distinct: ['semester', 'subject'],
      orderBy: {
        semester: 'asc',
      },
    })

    // Group subjects by semester
    const semesterData = exams.reduce((acc, exam) => {
      const existingSemester = acc.find(s => s.semester === exam.semester)
      
      if (existingSemester) {
        if (!existingSemester.subjects.includes(exam.subject)) {
          existingSemester.subjects.push(exam.subject)
        }
      } else {
        acc.push({
          semester: exam.semester,
          subjects: [exam.subject]
        })
      }
      
      return acc
    }, [] as Array<{ semester: number; subjects: string[] }>)

    return NextResponse.json(semesterData)
  } catch (error) {
    console.error('Error fetching subjects:', error)
    return NextResponse.json(
      { message: 'Failed to fetch subjects' },
      { status: 500 }
    )
  }
}
