"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PageContainer } from '@/components/PageContainer'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { HiInformationCircle } from 'react-icons/hi'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface Problem {
  id: string
  title: string
  description: string
  exam: {
    id: string
    subject: string
    language: string
    semester: number
  }
}

interface ExamSession {
  usn: string
  subject: string
  semester: number
}

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [examSession, setExamSession] = useState<ExamSession | null>(null)
  const [quitDialogOpen, setQuitDialogOpen] = useState(false)

  useEffect(() => {
    const session = localStorage.getItem('examSession')
    if (!session) {
      router.push('/')
      return
    }
    try {
      const parsedSession = JSON.parse(session)
      if (!parsedSession.usn || !parsedSession.subject || !parsedSession.semester) {
        throw new Error('Invalid session data')
      }
      setExamSession(parsedSession)
    } catch (error) {
      console.error('Invalid session data:', error)
      localStorage.removeItem('examSession')
      router.push('/')
    }
  }, [router])

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const subject = searchParams.get('subject')
        const semester = searchParams.get('semester')
        
        if (!subject || !semester) {
          router.push('/')
          return
        }

        const response = await fetch(
          `/api/problems?subject=${encodeURIComponent(subject)}&semester=${encodeURIComponent(semester)}`
        )
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || 'Failed to fetch problems')
        }
        
        const data = await response.json()
        setProblems(data)
      } catch (error) {
        console.error('Error fetching problems:', error)
        setError(error instanceof Error ? error.message : 'Failed to load problems. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (examSession) {
      fetchProblems()
    }
  }, [searchParams, router, examSession])

  const handleQuitExam = async () => {
    if (!examSession) return

    try {
      setLoading(true)
      // Create failed submissions for all problems
      await Promise.all(problems.map(problem => 
        fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usn: examSession.usn,
            status: 'FAILED',
            code: '',
            examId: problem.exam.id,
            questionId: problem.id,
            subject: problem.exam.subject,
            semester: examSession.semester
          })
        })
      ))

      // Clear exam session and redirect to home
      localStorage.removeItem('examSession')
      router.push('/')
    } catch (error) {
      console.error('Error quitting exam:', error)
      setError('Failed to quit exam. Please try again.')
    } finally {
      setLoading(false)
      setQuitDialogOpen(false)
    }
  }

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Available Problems</h1>
            <p className="mt-2 text-neutral-300">
              Semester: {examSession?.semester} | Subject: {examSession?.subject}
            </p>
          </div>
          <Button 
            variant="destructive"
            onClick={() => setQuitDialogOpen(true)}
            className="bg-red-500 hover:bg-red-600"
          >
            Quit Exam
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200 text-red-800">
            <HiInformationCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full flex flex-col bg-black border-neutral-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span className="text-neutral-200">{problem.title}</span>
                    <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                      {problem.exam.language}
                    </Badge>
                  </CardTitle>
                  <p className="mt-2 text-white text-sm">{problem.description}</p>
                </CardHeader>
                <CardFooter className="mt-auto pt-6">
                  <Button
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                    onClick={() => router.push(`/exam/${problem.exam.id}?questionId=${problem.id}`)}
                  >
                    Start Problem
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AlertDialog open={quitDialogOpen} onOpenChange={setQuitDialogOpen}>
        <AlertDialogContent className="bg-white border-neutral-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-neutral-800">Are you sure you want to quit?</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-600">
              This action will mark all problems as failed and end your exam session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleQuitExam}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={loading}
            >
              {loading ? "Quitting..." : "Quit Exam"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageContainer>
  )
}