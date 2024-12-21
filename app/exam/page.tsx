"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiClock } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import { ProblemDescription } from '@/components/exam/ProblemDescription'
import { CodeEditor } from '@/components/exam/CodeEditor'
import { Resizer } from '@/components/exam/Resizer'

interface Problem {
  id: number
  title: string
  difficulty: string
  description: string
  examples: {
    input: string
    output: string
    explanation?: string
  }[]
  starterCode?: string
  language?: string
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Sample Problem",
    difficulty: "Easy",
    description: "Description here...",
    examples: [
      {
        input: "Example input",
        output: "Example output",
      }
    ],
    starterCode: "// some starter code\n",
    language: "python"
  }
]

export default function ExamPage() {
  const [currentProblem] = useState(problems[0])
  const [code, setCode] = useState(currentProblem.starterCode || "")
  const [timeLeft, setTimeLeft] = useState(3600)
  const [isProblemMinimized, setIsProblemMinimized] = useState(false)
  const [descriptionWidth, setDescriptionWidth] = useState(40)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const [selectedLanguage, setSelectedLanguage] = useState(currentProblem.language || "python")
  const [isConsoleOpen, setIsConsoleOpen] = useState(false)
  const [consoleHeight, setConsoleHeight] = useState(200)
  const [consoleOutput, setConsoleOutput] = useState("")
  const consoleRef = useRef<HTMLDivElement>(null)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Resize (horizontal) for problem vs editor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100
      if (newWidth >= 20 && newWidth <= 80) {
        setDescriptionWidth(newWidth)
      }
    }
    const handleMouseUp = () => setIsDragging(false)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  // Resize (vertical) for console
  const [isConsoleResizing, setIsConsoleResizing] = useState(false)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isConsoleResizing || !consoleRef.current) return
      const rect = consoleRef.current.getBoundingClientRect()
      const newHeight = rect.bottom - e.clientY
      if (newHeight >= 80 && newHeight <= 600) {
        setConsoleHeight(newHeight)
      }
    }
    const handleMouseUp = () => setIsConsoleResizing(false)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isConsoleResizing])

  const handleRunCode = async () => {
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: selectedLanguage })
      })
      if (!response.ok) {
        throw new Error('Failed to execute code')
      }
      const result = await response.json()
      let outputText = ''
      if (result.error) {
        // Format error message for better readability
        const errorLines = result.error.split('\n')
        const formattedError = errorLines
          .map((line: string) => line.trim())
          .filter((line: string) => line.length > 0)
          .join('\n')
        outputText = `Error:\n${formattedError}`
      } else {
        outputText = result.output || 'No output'
      }
      handleOpenConsole(outputText)
    } catch (e: any) {
      handleOpenConsole('Execution error: ' + e.message)
    }
  }

  const handleOpenConsole = (text: string) => {
    setConsoleOutput(text)
    setIsConsoleOpen(true)
  }

  const handleCloseConsole = () => {
    setIsConsoleOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-10 h-14 border-b border-neutral-800 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-white">CodeLab</h1>
            <span className="text-sm text-neutral-400">{currentProblem.title}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm text-neutral-400">
              <FiClock className="mr-2" />
              {formatTime(timeLeft)}
            </div>
            <Button variant="destructive" size="sm">End Exam</Button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="fixed inset-0 top-14 flex flex-col">
        <div ref={containerRef} className="flex flex-1 min-h-0">
          {/* PROBLEM DESCRIPTION */}
          <AnimatePresence>
            {descriptionWidth > 0 && (
              <ProblemDescription
                title={currentProblem.title}
                difficulty={currentProblem.difficulty}
                description={currentProblem.description}
                examples={currentProblem.examples}
                width={descriptionWidth}
              />
            )}
          </AnimatePresence>
          {descriptionWidth > 0 && <Resizer onResizeStart={() => setIsDragging(true)} />}

          {/* CODE EDITOR */}
          <CodeEditor
            code={code}
            onChange={setCode}
            language={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            width={100 - descriptionWidth}
            isProblemMinimized={isProblemMinimized}
            onToggleMinimize={() => {
              if (!isProblemMinimized) {
                setDescriptionWidth(0)
                setIsProblemMinimized(true)
              } else {
                setDescriptionWidth(40)
                setIsProblemMinimized(false)
              }
            }}
            onRun={handleRunCode}
            onSubmit={() => handleOpenConsole("Submission successful! All test cases passed.")}
          />
        </div>

        {/* CONSOLE */}
        <motion.div
          ref={consoleRef}
          initial={false}
          animate={{ height: isConsoleOpen ? consoleHeight : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-none bg-neutral-900 border-t border-border overflow-hidden"
          style={{ marginTop: 'auto' }}
        >
          {isConsoleOpen && (
            <div className="flex flex-col h-full">
              <div
                onMouseDown={() => setIsConsoleResizing(true)}
                className="h-1 cursor-ns-resize hover:bg-blue-500/20"
              />
              <div className="flex items-center justify-between p-2 border-b border-border">
                <span className="text-sm text-white">Console</span>
                <Button variant="ghost" size="sm" onClick={handleCloseConsole}>
                  Close
                </Button>
              </div>
              <div className="flex-1 p-2 text-white text-sm overflow-auto">
                <pre>{consoleOutput}</pre>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}