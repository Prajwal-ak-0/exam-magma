import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FormattedProblemProps {
  problem: {
    title: string;
    description: string;
    example: {
      input: string;
      output: string;
    };
  };
}

export function FormattedProblem({ problem }: FormattedProblemProps) {
  const markdownContent = `${problem.description}

### Examples

${problem.example.input ? `**Input**
\`\`\`
${problem.example.input}
\`\`\`

**Output**
\`\`\`
${problem.example.output}
\`\`\`
` : ''}`;

  return (
    <div className="h-full overflow-y-auto bg-neutral-900/50">
      <div className="p-8 space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-white tracking-tight">{problem.title}</h1>
            <p className="text-sm text-neutral-400">Problem Statement</p>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "px-3 py-1 text-sm font-medium",
              "border-yellow-500/50 text-yellow-500 bg-yellow-500/10"
            )}
          >
            Medium
          </Badge>
        </div>

        {/* Content */}
        <div className={cn(
          "prose prose-invert max-w-none",
          "prose-p:text-neutral-300 prose-p:leading-7 prose-p:my-6",
          "prose-headings:text-white prose-headings:font-semibold",
          "prose-strong:text-white prose-strong:font-medium",
          "prose-code:text-neutral-300",
          "prose-li:text-neutral-300",
          "prose-a:text-teal-400 hover:prose-a:text-teal-300"
        )}>
          <ReactMarkdown
            components={{
              code: ({ node, inline, className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline ? (
                  <div className="my-6">
                    <div className="bg-neutral-800/50 rounded-lg p-4 backdrop-blur">
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match ? match[1] : 'text'}
                        PreTag="div"
                        className="!bg-transparent !p-0 !m-0"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                ) : (
                  <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono text-neutral-200" {...props}>
                    {children}
                  </code>
                );
              },
              p: ({ children }) => (
                <p className="text-neutral-300 leading-7 my-6">{children}</p>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-white mt-12 mb-6">{children}</h3>
              ),
              strong: ({ children }) => (
                <strong className="text-sm font-medium text-neutral-400 block mb-2">{children}</strong>
              ),
              ul: ({ children }) => (
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
              ),
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
