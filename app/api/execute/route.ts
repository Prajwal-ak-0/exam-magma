import { NextResponse } from 'next/server';
import { DockerExecutor } from '@/lib/code-execution/docker-executor';

export async function POST(request: Request) {
    try {
        const { code, language } = await request.json();

        if (!code || !language) {
            return NextResponse.json(
                { error: 'Code and language are required' },
                { status: 400 }
            );
        }

        const result = await DockerExecutor.execute(code, language);

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
