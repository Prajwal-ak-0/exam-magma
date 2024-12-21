import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const problems = await prisma.question.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        exam: {
          select: {
            id: true,
            subject: true,
            language: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(problems);
  } catch (error: any) {
    console.error('Error fetching problems:', error);
    return NextResponse.json(
      { error: 'Failed to fetch problems' },
      { status: 500 }
    );
  }
}
