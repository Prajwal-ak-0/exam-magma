import { NextResponse } from 'next/server';
import { generateProblemStatement } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const formattedProblem = await generateProblemStatement(title, description);
    return NextResponse.json(formattedProblem);
  } catch (error) {
    console.error('Error formatting problem:', error);
    return NextResponse.json(
      { error: 'Failed to format problem' },
      { status: 500 }
    );
  }
}
