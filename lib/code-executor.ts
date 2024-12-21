import { exec } from 'child_process';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface TestResult {
  test_case: {
    preorder: number[];
    inorder: number[];
  };
  actual: {
    height: number;
    diameter: number;
    spiral_order: number[][];
    is_balanced: boolean;
    lca_result: number;
    paths: number[][];
  };
  expected: {
    height: number;
    diameter: number;
    spiral_order: number[][];
    is_balanced: boolean;
    lca_result: number;
    paths: number[][];
  };
  passed: boolean;
}

interface ExecuteCodeResponse {
  results?: TestResult[];
  error?: string;
  output?: string;
}

export async function executeCode(code: string, language: string = 'python'): Promise<ExecuteCodeResponse> {
  try {
    // Create a temporary file
    const tempFile = join(process.cwd(), 'temp', `test_${Date.now()}.py`);
    await writeFile(tempFile, code);

    // Execute the code in Docker
    const { stdout, stderr } = await execAsync(`docker run --rm -v ${tempFile}:/app/test.py python:3.9-slim python /app/test.py`);

    console.log('stdout:', stdout);
    // Return the raw output without parsing
    return { output: stdout };
  } catch (error) {
    console.error('Error executing code:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
}
