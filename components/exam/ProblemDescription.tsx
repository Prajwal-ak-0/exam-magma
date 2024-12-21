import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { cn } from '@/lib/utils'

interface Example {
  input: string
  output: string
  explanation?: string
}

interface ProblemDescriptionProps {
  title: string
  difficulty: string
  description: string
  examples: Example[]
  width: number
}

export function ProblemDescription({ title, difficulty, description, examples, width }: ProblemDescriptionProps) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: `${width}%`, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full border-r border-border/40 flex-shrink-0 bg-neutral-900"
    >
      <div className="h-full overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-medium text-white">{title}</h2>
          <Badge
            variant="outline"
            className={cn(
              difficulty === 'Easy' 
                ? 'border-green-500/50 text-green-500 bg-green-500/10'
                : difficulty === 'Medium'
                ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10'
                : 'border-red-500/50 text-red-500 bg-red-500/10'
            )}
          >
            {difficulty}
          </Badge>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-neutral-300">{description}</p>

          <h3 className="text-lg font-medium text-white mt-8 mb-4">Examples</h3>
          {examples.map((example, idx) => (
            <div key={idx} className="mb-6 bg-neutral-800 rounded-lg p-4">
              <div className="mb-2">
                <p className="text-sm font-medium text-neutral-400">Input:</p>
                <SyntaxHighlighter language="python" style={atomDark} className="!bg-transparent !mt-2">
                  {example.input}
                </SyntaxHighlighter>
              </div>
              <div className="mb-2">
                <p className="text-sm font-medium text-neutral-400">Output:</p>
                <SyntaxHighlighter language="python" style={atomDark} className="!bg-transparent !mt-2">
                  {example.output}
                </SyntaxHighlighter>
              </div>
              {example.explanation && (
                <div>
                  <p className="text-sm font-medium text-neutral-400">Explanation:</p>
                  <p className="text-sm text-neutral-300 mt-1">{example.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}