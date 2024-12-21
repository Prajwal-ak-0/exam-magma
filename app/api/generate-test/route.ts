import { NextResponse } from 'next/server';
import { generateTestCases } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const { problemStatement, studentCode } = await request.json();

    if (!problemStatement || !studentCode) {
      return NextResponse.json(
        { error: 'Problem statement and student code are required' },
        { status: 400 }
      );
    }

    const testCases = await generateTestCases(problemStatement, studentCode);

    // console.log("IN ROUTE FILE ", testCases);
    return NextResponse.json(testCases);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
