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
  }
}

interface ExamSession {
  usn: string
  subject: string
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
    setExamSession(JSON.parse(session))
  }, [router])

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const subject = searchParams.get('subject')
        if (!subject) {
          router.push('/')
          return
        }

        const response = await fetch(`/api/problems?subject=${encodeURIComponent(subject)}`)
        if (!response.ok) throw new Error('Failed to fetch problems')
        
        const data = await response.json()
        setProblems(data)
      } catch (error) {
        console.error('Error fetching problems:', error)
        setError('Failed to load problems. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProblems()
  }, [searchParams, router])

  const handleQuitExam = async () => {
    if (!examSession) return

    try {
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
            subject: problem.exam.subject
          })
        })
      ))

      // Clear exam session and redirect to home
      localStorage.removeItem('examSession')
      router.push('/')
    } catch (error) {
      console.error('Error quitting exam:', error)
    }
  }

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Available Problems</h1>
          <Button 
            variant="destructive"
            onClick={() => setQuitDialogOpen(true)}
          >
            Quit Exam
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
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
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span>{problem.title}</span>
                    <Badge variant="outline">{problem.exam.language}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardFooter className="mt-auto pt-6">
                  <Button
                    className="w-full"
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to quit?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark all problems as failed and end your exam session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleQuitExam}>
              Quit Exam
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageContainer>
  )
}