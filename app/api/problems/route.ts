import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const semester = searchParams.get('semester');

    if (!subject || !semester) {
      return NextResponse.json(
        { message: 'Subject and semester are required' },
        { status: 400 }
      );
    }

    const problems = await prisma.question.findMany({
      where: {
        exam: {
          subject: subject,
          semester: parseInt(semester)
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        exam: {
          select: {
            id: true,
            subject: true,
            language: true,
            semester: true
          }
        }
      }
    });

    return NextResponse.json(problems);
  } catch (error: any) {
    console.error('Error fetching problems:', error);
    return NextResponse.json(
      { message: 'Failed to fetch problems' },
      { status: 500 }
    );
  }
}
