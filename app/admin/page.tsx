"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { FiPlus, FiUsers, FiBook, FiCheckCircle, FiClock } from "react-icons/fi"
import Link from "next/link"

interface DashboardStats {
  totalExams: number
  totalQuestions: number
  totalSubmissions: number
  recentSubmissions: {
    usn: string
    status: string
    subject: string
    timestamp: string
  }[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalExams: 0,
    totalQuestions: 0,
    totalSubmissions: 0,
    recentSubmissions: [],
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch exams data
        const examsResponse = await fetch('/api/admin/exams')
        const exams = await examsResponse.json()
        
        const totalQuestions = exams.reduce((acc: number, exam: any) => acc + exam.questions.length, 0)
        const totalSubmissions = exams.reduce((acc: number, exam: any) => acc + exam.submissions.length, 0)

        // Get recent submissions
        const recentSubmissions = exams
          .flatMap((exam: any) => 
            exam.submissions.map((sub: any) => ({
              usn: sub.usn,
              status: sub.status,
              subject: exam.subject,
              timestamp: new Date(sub.createdAt).toLocaleString(),
            }))
          )
          .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 5)

        setStats({
          totalExams: exams.length,
          totalQuestions,
          totalSubmissions,
          recentSubmissions,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Monitor your exam platform's performance and metrics
          </p>
        </div>
        <Link href="/admin/problems">
          <Button className="bg-teal-500 hover:bg-teal-600 text-white">
            <FiPlus className="mr-2" />
            Create New Exam
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white dark:bg-neutral-900/50 border-teal-100 dark:border-teal-500/20 hover:border-teal-200 dark:hover:border-teal-500/40 transition-colors shadow-lg shadow-teal-100/20 dark:shadow-teal-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-teal-600 dark:text-teal-300">
              Total Exams
            </CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-500/20 dark:to-teal-400/20 rounded-lg flex items-center justify-center">
              <FiBook className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-700 dark:text-teal-100">
              {stats.totalExams}
            </div>
            <p className="text-xs text-teal-600/80 dark:text-teal-300/60">
              Active exams in the system
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-neutral-900/50 border-teal-100 dark:border-teal-500/20 hover:border-teal-200 dark:hover:border-teal-500/40 transition-colors shadow-lg shadow-teal-100/20 dark:shadow-teal-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-teal-600 dark:text-teal-300">
              Total Questions
            </CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-500/20 dark:to-teal-400/20 rounded-lg flex items-center justify-center">
              <FiCheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-700 dark:text-teal-100">
              {stats.totalQuestions}
            </div>
            <p className="text-xs text-teal-600/80 dark:text-teal-300/60">
              Questions across all exams
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-neutral-900/50 border-teal-100 dark:border-teal-500/20 hover:border-teal-200 dark:hover:border-teal-500/40 transition-colors shadow-lg shadow-teal-100/20 dark:shadow-teal-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-teal-600 dark:text-teal-300">
              Total Submissions
            </CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-500/20 dark:to-teal-400/20 rounded-lg flex items-center justify-center">
              <FiUsers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-700 dark:text-teal-100">
              {stats.totalSubmissions}
            </div>
            <p className="text-xs text-teal-600/80 dark:text-teal-300/60">
              Total student submissions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Submissions */}
      <Card className="bg-white dark:bg-neutral-900/50 border-teal-100 dark:border-teal-500/20">
        <CardHeader>
          <CardTitle className="text-teal-600 dark:text-teal-300 flex items-center gap-2">
            <FiClock className="w-5 h-5" />
            Recent Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentSubmissions.map((submission, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-neutral-800/50"
              >
                <div className="space-y-1">
                  <p className="font-medium text-teal-600 dark:text-teal-300">
                    {submission.usn}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {submission.subject}
                  </p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300">
                    {submission.status}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {submission.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
