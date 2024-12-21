"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PageContainer } from '@/components/PageContainer'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { HiInformationCircle } from 'react-icons/hi'

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

export default function DashboardPage() {
  const router = useRouter()
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('/api/problems')
        if (!response.ok) {
          throw new Error('Failed to fetch problems')
        }
        const data = await response.json()
        setProblems(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load problems')
      } finally {
        setLoading(false)
      }
    }

    fetchProblems()
  }, [])

  return (
    <PageContainer>
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-[1920px] mx-auto space-y-12">
          {/* Header and Instructions */}
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-white text-center">Welcome to Lab Assessment</h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-transparent opacity-20" />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(20,184,166,0.05)_25%,rgba(20,184,166,0.05)_50%,transparent_50%,transparent_75%,rgba(20,184,166,0.05)_75%)] bg-[length:16px_16px]" />
              
              <Alert className="relative bg-black/80 border-2 border-teal-500/30 backdrop-blur-sm">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center">
                    <HiInformationCircle className="w-8 h-8 text-teal-400" />
                  </div>
                  
                  <div className="space-y-6 flex-1">
                    <AlertTitle className="text-2xl font-semibold text-white">Instructions</AlertTitle>
                    <AlertDescription className="text-gray-300 leading-relaxed">
                      <ul className="list-disc pl-4 space-y-2">
                        <li>Select a problem from the list below to begin your assessment.</li>
                        <li>Read the problem description carefully before starting.</li>
                        <li>You can use the built-in code editor to write and test your solution.</li>
                        <li>Make sure to test your code with different test cases.</li>
                        <li>Submit your solution only when you are confident it works correctly.</li>
                      </ul>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            </motion.div>
          </div>

          {/* Problems Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="bg-black/50 border-2 border-gray-800/50 animate-pulse">
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-700/50 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
                  </div>
                </Card>
              ))
            ) : error ? (
              <div className="col-span-full text-center text-red-400 p-4">
                {error}
              </div>
            ) : (
              problems.map((problem) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className="bg-black/50 border-2 border-gray-800/50 hover:border-teal-500/50 transition-colors cursor-pointer group"
                    onClick={() => {
                      console.log('Problem:', problem);
                      router.push(`/exam/${problem.exam.id}?questionId=${problem.id}`);
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors">
                          {problem.title}
                        </span>
                      </CardTitle>
                      <Badge variant="outline" className="mt-2 text-teal-400 border-teal-400/20">
                        {problem.exam.subject}
                      </Badge>
                    </CardHeader>
                    <CardFooter>
                      <Button 
                        variant="ghost" 
                        className="w-full text-teal-400 hover:text-teal-300 hover:bg-teal-400/10"
                      >
                        Start Problem
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}