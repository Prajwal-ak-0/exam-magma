import React from 'react';

interface ConsoleProps {
    output: string;
}

export function Console({ output }: ConsoleProps) {
    return (
        <div className="bg-black text-white p-4 rounded-lg font-mono text-sm h-[200px] overflow-auto">
            <pre>{output || 'Output will appear here...'}</pre>
        </div>
    );
}
