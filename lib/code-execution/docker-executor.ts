import { exec } from 'child_process';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs/promises';
import { promisify } from 'util';

const execAsync = promisify(exec);

const TEMP_DIR = '/tmp/code-execution';
const DOCKER_IMAGE = 'code-runner:latest';

export interface ExecutionResult {
    output: string;
    error: string;
    success: boolean;
}

function getFileExtension(language: string): string {
    switch (language) {
        case 'cpp':
            return 'cpp';
        case 'c':
            return 'c';
        case 'python':
            return 'py';
        default:
            throw new Error(`Unsupported language: ${language}`);
    }
}

export class DockerExecutor {
    static async execute(
      code: string,
      language: string
    ): Promise<ExecutionResult> {
      const containerId = `code-runner-${uuidv4()}`;
      const fileName = `${uuidv4()}.${getFileExtension(language)}`;
      const codePath = path.join(process.cwd(), 'tmp', fileName);

      try {
        // Ensure tmp directory exists
        await fs.mkdir(path.join(process.cwd(), 'tmp'), { recursive: true });

        // Write code to file
        await fs.writeFile(codePath, code);

        // Start container
        await execAsync(
          `docker run -d --name ${containerId} --memory=512m --cpus=1 --network none -v ${codePath}:/app/code/${fileName} code-runner:latest`
        );

        // Wait for container to be ready
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Execute code
        const { stdout, stderr } = await execAsync(
          `docker exec ${containerId} /app/run.sh ${language} /app/code/${fileName}`
        );

        // Handle Python syntax errors and other errors
        if (stderr) {
          return {
            success: false,
            output: '',
            error: stderr
          };
        }

        return {
          success: true,
          output: stdout || '',
          error: ''
        };
      } catch (error: any) {
        console.error('Execution error:', error);
        
        // Extract the actual error message from stdout if available
        const errorOutput = error.stdout || error.stderr || error.message;
        
        return {
          success: false,
          output: '',
          error: errorOutput
        };
      } finally {
        // Cleanup
        try {
          await execAsync(`docker stop ${containerId}`);
          await execAsync(`docker rm ${containerId}`);
          await fs.unlink(codePath);
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      }
    }
}
