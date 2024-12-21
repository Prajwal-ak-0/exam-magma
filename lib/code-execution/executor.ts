import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const TEMP_DIR = '/tmp/code-execution';

// Ensure temp directory exists
async function ensureTempDir() {
    try {
        await fs.access(TEMP_DIR);
    } catch {
        await fs.mkdir(TEMP_DIR, { recursive: true });
    }
}

interface ExecutionResult {
    output: string;
    error: string | null;
}

export class CodeExecutor {
    private static async createTempFile(extension: string, content: string): Promise<string> {
        await ensureTempDir();
        const filename = `${uuidv4()}${extension}`;
        const filepath = path.join(TEMP_DIR, filename);
        await fs.writeFile(filepath, content);
        return filepath;
    }

    private static async executeCommand(command: string): Promise<ExecutionResult> {
        return new Promise((resolve) => {
            exec(command, {
                timeout: 10000, // 10 second timeout for compilation
                maxBuffer: 1024 * 1024, // 1MB buffer
            }, (error, stdout, stderr) => {
                resolve({
                    output: stdout,
                    error: error ? `${error.message}\n${stderr}` : null
                });
            });
        });
    }

    static async executePython(code: string): Promise<ExecutionResult> {
        const filepath = await this.createTempFile('.py', code);
        try {
            return await this.executeCommand(`python3 ${filepath}`);
        } finally {
            await fs.unlink(filepath).catch(() => {});
        }
    }

    static async executeCpp(code: string): Promise<ExecutionResult> {
        const cppCode = `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

${code}

int main() {
    return 0;
}`;
        const sourceFile = await this.createTempFile('.cpp', cppCode);
        const outputFile = sourceFile.replace('.cpp', '');
        try {
            // Compile
            const compilation = await this.executeCommand(`g++ ${sourceFile} -o ${outputFile}`);
            if (compilation.error) {
                return compilation;
            }
            // Execute
            return await this.executeCommand(outputFile);
        } finally {
            await Promise.all([
                fs.unlink(sourceFile).catch(() => {}),
                fs.unlink(outputFile).catch(() => {})
            ]);
        }
    }

    static async executeC(code: string): Promise<ExecutionResult> {
        const cCode = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

${code}

int main() {
    return 0;
}`;
        const sourceFile = await this.createTempFile('.c', cCode);
        const outputFile = sourceFile.replace('.c', '');
        try {
            // Compile
            const compilation = await this.executeCommand(`gcc ${sourceFile} -o ${outputFile}`);
            if (compilation.error) {
                return compilation;
            }
            // Execute
            return await this.executeCommand(outputFile);
        } finally {
            await Promise.all([
                fs.unlink(sourceFile).catch(() => {}),
                fs.unlink(outputFile).catch(() => {})
            ]);
        }
    }

    static async execute(code: string, language: string): Promise<ExecutionResult> {
        switch (language.toLowerCase()) {
            case 'python':
                return await this.executePython(code);
            case 'cpp':
                return await this.executeCpp(code);
            case 'c':
                return await this.executeC(code);
            default:
                return {
                    output: '',
                    error: `Unsupported language: ${language}`
                };
        }
    }
}
