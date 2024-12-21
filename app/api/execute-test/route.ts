import { NextResponse } from 'next/server';
import { executeCode } from '@/lib/code-executor';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);

    const { test_embeded_code } = body;
    console.log('Extracted test code:', test_embeded_code ? 'present' : 'missing');

    if (!test_embeded_code) {
      console.log('Missing test code, keys in body:', Object.keys(body));
      return NextResponse.json(
        { error: 'Test code is required', received: body },
        { status: 400 }
      );
    }

    const result = await executeCode(test_embeded_code, 'python');
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
