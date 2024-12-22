import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

export const ProblemSchema = z.object({
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
          content: `Generate a  coding problem with the following:
          Title: ${title}
          Description: ${description}
          <IMPORTANT> 1. DO NOT MODIFY THE PROBLEM STATEMENT \n 2. Keep it short and Simple <IMPORTANT>
          `
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

export const test_embeded_code = z.object({
  test_embeded_code: z.string(),
});

type TestEmbeddedCode = z.infer<typeof test_embeded_code>;

export async function generateTestCases(problemStatement: string, studentCode: string): Promise<TestEmbeddedCode> {
  try {
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `You are a test case generator. Your task is to:
          1. Analyze the given student code
          2. Generate appropriate test case, But way of generating will slightly different
          3. So, Embed test case into the student's code WITHOUT modifying their logic

          RULES:
          1. DO NOT modify any logic/algorithms in the student's code
          2. DO NOT fix any bugs or logical errors
          3. DO NOT add new functions or change existing functions
          4. ONLY modify:
             - Input values if code takes user input
             - Hard-coded test values if they exist
          5. Keep all original code structure intact
          6. Preserve all function signatures
          7. Maintain original variable names

          <IMPORTANT> REPLACE ORIGINAL VALUES WITH A SINGLE SET OF TEST VALUES <IMPORTANT>
          <IMPORTANT> MAKE SURE THE FINAL CODE HAS A SINGLE SET OF NEWLY EMBEDDED TEST VALUES </IMPORTANT>
          <IMPORTANT> MAKE SURE YOU DO NOT RETURN SAME ORINGIAL VALUES <IMPORTANT>

          Problem Statement:
          ${problemStatement}

          Student Code:
          ${studentCode}`
        },
      ],
      response_format: zodResponseFormat(test_embeded_code, "test_embeded_code"),
    });

    if (!completion || !completion.choices || !completion.choices[0] || !completion.choices[0].message) {
      throw new Error('Failed to parse response from OpenAI');
    }

    const parsed = completion.choices[0].message.parsed;

    // console.log('Generated test cases:', parsed);
    
    if (!parsed) {
      throw new Error('Failed to parse test case response from OpenAI');
    }
    
    console.log('Generated test cases:', parsed);
    return parsed;
  } catch (error) {
    console.error('Error generating test cases:', error);
    throw error;
  }
}

export async function executeTestCases(testEmbeddedCode: string): Promise<string> {
  try {
    const { executeCode } = await import('./code-executor');
    const result = await executeCode(testEmbeddedCode, 'python');
    
    if (result.error) {
      throw new Error(result.error);
    }
    
    return JSON.stringify(result.results) || 'No results received';
  } catch (error) {
    console.error('Error executing test cases:', error);
    throw error;
  }
}
