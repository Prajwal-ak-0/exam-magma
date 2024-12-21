import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

interface CodeEditorProps {
  code: string
  onChange: (value: string) => void
  language: string
  onLanguageChange: (lang: string) => void
  width: number
  isProblemMinimized: boolean
  onToggleMinimize: () => void
  onRun: () => void
  onSubmit: () => void
}

const availableLanguages = [
  { label: 'Python', value: 'python' }
]

export function CodeEditor({
  code,
  onChange,
  language,
  onLanguageChange,
  width,
  isProblemMinimized,
  onToggleMinimize,
  onRun,
  onSubmit
}: CodeEditorProps) {
  return (
    <motion.div
      animate={{ 
        flex: isProblemMinimized ? '1' : `0 0 ${width}%`,
        width: isProblemMinimized ? '100%' : `${width}%`
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col overflow-y-hidden min-h-0"
    >
      {/* Editor Header */}
      <div className="flex-none h-12 flex items-center justify-between border-b border-border/40 px-4 bg-neutral-850">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onToggleMinimize}
            title={isProblemMinimized ? "Show Problem" : "Hide Problem"}
          >
            {isProblemMinimized ? <FiMaximize2 /> : <FiMinimize2 />}
          </Button>
          <select
            className="bg-neutral-800 text-white text-sm rounded px-2 py-1"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
          >
            {availableLanguages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" onClick={onRun}>
            Run
          </Button>
          <Button size="sm" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="flex-1 h-full min-h-0 overflow-hidden relative">
        <MonacoEditor
          height="100%"
          language={language.toLowerCase()}
          theme="vs-dark"
          value={code}
          onChange={(value) => onChange(value || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            roundedSelection: false,
            automaticLayout: true,
            wordWrap: 'on',
            padding: { top: 10 }
          }}
        />
      </div>

      {/* Bottom Bar with Controls */}
      <div className="flex-none border-t border-border/40 bg-neutral-850 p-4">
        <div className="flex gap-4">
        </div>
      </div>
    </motion.div>
  )
}