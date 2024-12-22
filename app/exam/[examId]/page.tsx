"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiClock } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import { CodeEditor } from '@/components/exam/CodeEditor'
import { Resizer } from '@/components/exam/Resizer'
import { FormattedProblem } from '@/components/exam/FormattedProblem'
import { useRouter } from 'next/navigation'
import { TestValidationDialog } from '@/components/exam/TestValidationDialog'
import { SuccessAnimation } from '@/components/exam/SuccessAnimation'

interface Question {
  id: string
  title: string
  description: string
  exam: {
    id: string
    subject: string
    language: string
  }
}

interface FormattedQuestion {
  title: string
  description: string
  example: {
    input: string
    output: string
  }
}

export default function ExamPage({ params, searchParams }: { 
  params: { examId: string },
  searchParams: { questionId?: string }
}) {
  const router = useRouter()
  const [question, setQuestion] = useState<Question | null>(null)
  const [formattedQuestion, setFormattedQuestion] = useState<FormattedQuestion | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [code, setCode] = useState("")
  const [timeLeft, setTimeLeft] = useState(3600)
  const [isProblemMinimized, setIsProblemMinimized] = useState(false)
  const [descriptionWidth, setDescriptionWidth] = useState(40)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [isConsoleOpen, setIsConsoleOpen] = useState(false)
  const [consoleHeight, setConsoleHeight] = useState(200)
  const [consoleOutput, setConsoleOutput] = useState("")
  const consoleRef = useRef<HTMLDivElement>(null)

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [testCase, setTestCase] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`/api/admin/exams/${params.examId}/questions`)
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch question')
        }

        if (Array.isArray(data)) {
          const targetQuestion = searchParams.questionId 
            ? data.find(q => q.id === searchParams.questionId)
            : data[0]
          
          if (targetQuestion) {
            setQuestion(targetQuestion)
            setSelectedLanguage(targetQuestion.exam.language.toLowerCase())
            
            // Format the question
            const formatResponse = await fetch('/api/format-problem', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: targetQuestion.title,
                description: targetQuestion.description,
              }),
            });
            
            if (formatResponse.ok) {
              const formattedData = await formatResponse.json();
              setFormattedQuestion(formattedData);
            }
          } else {
            throw new Error('Question not found')
          }
        } else {
          throw new Error('No questions found for this exam')
        }
      } catch (err) {
        console.error('Error fetching question:', err)
        setError(err instanceof Error ? err.message : 'Failed to load question')
      } finally {
        setLoading(false)
      }
    }

    fetchQuestion()
  }, [params.examId, searchParams.questionId])

  useEffect(() => {
    const session = localStorage.getItem('examSession')
    if (!session) {
      router.push('/')
      return
    }
  }, [router])

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

  const handleSubmitCode = async () => {
    if (!code.trim() || !formattedQuestion || !question) return

    setIsSubmitting(true)
    try {
      const session = localStorage.getItem('examSession')
      if (!session) {
        router.push('/')
        return
      }
      const { usn } = JSON.parse(session)

      // Generate and execute test cases
      console.log("MAKING GENERATE TEST CASES REQUEST")
      const testCasesResponse = await fetch('/api/generate-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemStatement: formattedQuestion ? JSON.stringify(formattedQuestion) : "",
          studentCode: code
        })
      });

      if (!testCasesResponse.ok) {
        throw new Error('Failed to generate test cases');
      }

      const { test_embeded_code } = await testCasesResponse.json();
      handleOpenConsole("Running generated test cases...\n\nTest Code:\n" + test_embeded_code);
      
      console.log("TEST CODE: ", test_embeded_code);

      console.log("MAKING EXECUTE TEST CASES REQUEST")
      // 2. Execute test cases and get output
      const executeResponse = await fetch('/api/execute-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test_embeded_code })
      });

      if (!executeResponse.ok) {
        throw new Error('Failed to execute test cases');
      }

      const result = await executeResponse.json();
      const testOutput = result.output || result.error || 'No output';
      handleOpenConsole("Test Output:\n" + testOutput);

      console.log("TEST OUTPUT: ", testOutput);

      console.log("MAKING VALIDATE TEST REQUEST")
      // 3. Validate with LLM
      const validationResponse = await fetch('/api/validate-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testEmbeddedCode: test_embeded_code,
          actualProblem: formattedQuestion ? JSON.stringify(formattedQuestion) : "",
          testOutput: testOutput
        })
      });

      if (!validationResponse.ok) {
        throw new Error('Failed to validate test results');
      }

      const validationResult = await validationResponse.json();

      console.log("Validation Result: ", validationResult);
      
      // 4. Show success/failure UI and create submission
      if (validationResult.success) {
        // Create successful submission
        await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usn,
            status: 'SUCCESS',
            code,
            examId: params.examId,
            questionId: searchParams.questionId,
            subject: question.exam.subject
          })
        })

        // Show success animation
        setShowSuccessAnimation(true)
        setTimeout(() => {
          setShowSuccessAnimation(false)
          router.push('/dashboard')
        }, 3000)
      } else {
        // Create failed submission
        await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usn,
            status: 'FAILED',
            code,
            examId: params.examId,
            questionId: searchParams.questionId,
            subject: question.exam.subject
          })
        })

        // Show failure dialog
        setTestCase(validationResult.testCase || 'Test case failed')
        setShowTestDialog(true)
        setTimeout(() => setShowTestDialog(false), 3000)
      }
    } catch (error: any) {
      handleOpenConsole('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenConsole = (text: string) => {
    setConsoleOutput(text)
    setIsConsoleOpen(true)
  }

  const handleCloseConsole = () => {
    setIsConsoleOpen(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-teal-400">Loading exam questions...</div>
      </div>
    )
  }

  if (error || !question) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-black">
        <div className="text-red-400 text-lg">{error || 'Question not found'}</div>
        <Button 
          onClick={() => router.push('/dashboard')}
          className="bg-teal-500 text-white hover:bg-teal-600"
        >
          Return to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-black">
      <TestValidationDialog
        isOpen={showTestDialog}
        onClose={() => setShowTestDialog(false)}
        testCase={testCase}
      />
      <SuccessAnimation isVisible={showSuccessAnimation} />
      {/* NAVBAR */}
      <nav className="sticky top-0 z-10 h-14 border-b border-neutral-800 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-white">CodeLab</h1>
            <span className="text-sm text-neutral-400">{question?.title}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm text-neutral-400">
              <FiClock className="mr-2" />
              {formatTime(timeLeft)}
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              End Exam
            </Button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="fixed inset-0 top-14 flex flex-col">
        <div ref={containerRef} className="flex flex-1 min-h-0">
          {/* PROBLEM DESCRIPTION */}
          <AnimatePresence>
            {descriptionWidth > 0 && (
              <div
                className={`bg-black border-r border-neutral-800 overflow-y-auto transition-all duration-300 ease-in-out ${
                  isProblemMinimized ? 'w-0' : `w-[${descriptionWidth}%]`
                }`}
              >
                {loading ? (
                  <div className="p-8 text-neutral-400">Loading...</div>
                ) : error ? (
                  <div className="p-8 text-red-400">{error}</div>
                ) : formattedQuestion ? (
                  <FormattedProblem problem={formattedQuestion} />
                ) : (
                  <div className="p-8 text-neutral-400">No problem description available</div>
                )}
              </div>
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
            onSubmit={handleSubmitCode}
            isSubmitting={isSubmitting}
            onTestValidation={async (code) => {
              const result = await handleRunCode();
              return result;
            }}
          />
        </div>

        {/* CONSOLE */}
        <AnimatePresence>
          {isConsoleOpen && (
            <motion.div
              ref={consoleRef}
              initial={{ height: 0 }}
              animate={{ height: consoleHeight }}
              exit={{ height: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="relative bg-black/50 border-t border-neutral-800 backdrop-blur-sm"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 cursor-row-resize"
                onMouseDown={() => setIsConsoleResizing(true)}
              />
              <div className="p-4 font-mono text-sm text-neutral-300 whitespace-pre-wrap">
                {consoleOutput}
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
                onClick={handleCloseConsole}
              >
                ✕
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
