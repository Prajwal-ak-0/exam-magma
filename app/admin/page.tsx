"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface DashboardStats {
  totalExams: number
  totalQuestions: number
  totalSubmissions: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalExams: 0,
    totalQuestions: 0,
    totalSubmissions: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/exams')
        const exams = await response.json()
        
        const totalQuestions = exams.reduce((acc: number, exam: any) => acc + exam.questions.length, 0)
        const totalSubmissions = exams.reduce((acc: number, exam: any) => acc + exam.submissions.length, 0)

        setStats({
          totalExams: exams.length,
          totalQuestions,
          totalSubmissions,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-200 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-neutral-400 mt-1">Monitor your exam platform's performance and metrics</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-neutral-900/50 border-teal-500/20 hover:border-teal-500/40 transition-colors shadow-xl shadow-teal-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-teal-300">Total Exams</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500/20 to-teal-400/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-teal-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-100">{stats.totalExams}</div>
            <p className="text-xs text-teal-300/60">Active exams in the system</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/50 border-teal-500/20 hover:border-teal-500/40 transition-colors shadow-xl shadow-teal-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-teal-300">Total Questions</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500/20 to-teal-400/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-teal-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-100">{stats.totalQuestions}</div>
            <p className="text-xs text-teal-300/60">Questions across all exams</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/50 border-teal-500/20 hover:border-teal-500/40 transition-colors shadow-xl shadow-teal-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-teal-300">Total Submissions</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500/20 to-teal-400/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-teal-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-100">{stats.totalSubmissions}</div>
            <p className="text-xs text-teal-300/60">Student submissions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
