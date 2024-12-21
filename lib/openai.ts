import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const ProblemSchema = z.object({
  title: z.string(),
  description: z.string(),
  example: z.object({
    input: z.string(),
    output: z.string(),
  }),
});

type Problem = z.infer<typeof ProblemSchema>;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateProblemStatement(title: string, description: string): Promise<Problem> {
  try {
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Generate a coding problem with the following:
          Title: ${title}
          Description: ${description}`
        },
      ],
      response_format: zodResponseFormat(ProblemSchema, "problem"),
    });

    if (!completion || !completion.choices || !completion.choices[0] || !completion.choices[0].message) {
      throw new Error('Failed to parse response from OpenAI');
    }

    const parsed = completion.choices[0].message.parsed;
    if (!parsed) {
      throw new Error('Failed to parse response from OpenAI');
    }
    
    console.log('Generated problem statement:', parsed);
    return parsed;
  } catch (error) {
    console.error('Error generating problem statement:', error);
    throw error;
  }
}
