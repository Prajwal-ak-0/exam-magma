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

    const problem = await generateProblemStatement(title, description);
    console.log('Formatted problem:', problem);
    
    return NextResponse.json(problem);
  } catch (error: any) {
    console.error('Error formatting problem:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
