import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  try {
    const { testEmbeddedCode, actualProblem, testOutput } = await request.json();

    if (!testEmbeddedCode || !actualProblem || !testOutput) {
      return NextResponse.json(
        { error: 'All parameters are required' },
        { status: 400 }
      );
    }

    const prompt = `
You are a code validation assistant. Please analyze the following:

Test Embedded Code:
\`\`\`
${testEmbeddedCode}
\`\`\`

Actual Problem:
${actualProblem}

Test Output:
\`\`\`
${testOutput}
\`\`\`

Based on the above information, determine if the test case passed or failed.
Respond with EXACTLY one of these two words: "SUCCESS" or "FAILED"
If there are only minor discrepancies that don't affect the core functionality, respond with "SUCCESS".
<important> ONLY RESPOND WITH "SUCCESS" OR "FAILED" <important>
`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      temperature: 0,
      max_tokens: 10
    });

    const result = completion.choices[0].message.content?.trim().toUpperCase();
    
    if (result !== "SUCCESS" && result !== "FAILED") {
      throw new Error("Invalid LLM response");
    }

    return NextResponse.json({
      success: result === "SUCCESS",
      testCase: result === "FAILED" ? testOutput : undefined
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
