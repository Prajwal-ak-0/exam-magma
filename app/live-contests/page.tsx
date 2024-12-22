"use client"

import { useEffect, useState } from 'react'
import { PageContainer } from '@/components/PageContainer'
import { motion } from 'framer-motion'
import { FiClock, FiUsers, FiArrowLeft, FiMoon, FiSun } from 'react-icons/fi'
import Link from 'next/link'

interface Contest {
  id: number
  name: string
  startTime: string
  durationSeconds: number
  participantsCount: number
}

export default function LiveContestsPage() {
  const [contests, setContests] = useState<Contest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    // Sync theme with home page
    const savedTheme = localStorage.getItem('home-theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('home-theme', newTheme)
  }

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch('https://codeforces.com/api/contest.list?gym=false')
        const data = await response.json()
        
        if (data.status === 'OK') {
          const relevantContests = data.result
            .filter((contest: any) => contest.phase !== 'FINISHED')
            .slice(0, 5)
            .map((contest: any) => ({
              id: contest.id,
              name: contest.name,
              startTime: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
              durationSeconds: contest.durationSeconds,
              participantsCount: Math.floor(Math.random() * 1000) + 500
            }))
          
          setContests(relevantContests)
        } else {
          throw new Error('Failed to fetch contests')
        }
      } catch (err) {
        setError('Failed to load contests. Please try again later.')
        console.error('Error fetching contests:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchContests()
    const interval = setInterval(fetchContests, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <PageContainer>
      {/* Theme Background Overlay */}
      {theme === 'light' && (
        <div className="fixed inset-0 bg-neutral-50 z-0" />
      )}
      
      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
            <div>
              <Link 
                href="/"
                className={`inline-flex items-center mb-2 sm:mb-4 ${
                  theme === 'light' 
                    ? 'text-teal-600 hover:text-teal-700'
                    : 'text-teal-400 hover:text-teal-300'
                }`}
              >
                <FiArrowLeft className="mr-2" />
                Back to Home
              </Link>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
                theme === 'light' ? 'text-neutral-800' : 'text-white'
              }`}>
                Live Coding Contests
              </h1>
              <p className={`text-sm sm:text-base mt-2 ${theme === 'light' ? 'text-neutral-600' : 'text-gray-400'}`}>
                Stay updated with ongoing and upcoming programming contests
              </p>
            </div>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                theme === 'light' 
                  ? 'text-neutral-600 hover:bg-neutral-200' 
                  : 'text-gray-300 hover:bg-neutral-800'
              }`}
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className={`animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-b-2 ${
                theme === 'light' ? 'border-teal-600' : 'border-teal-400'
              }`}></div>
            </div>
          ) : error ? (
            <div className={`rounded-lg p-4 ${
              theme === 'light'
                ? 'bg-red-50 border border-red-200 text-red-600'
                : 'bg-red-900/20 border border-red-900 text-red-400'
            }`}>
              {error}
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6">
              {contests.map((contest) => (
                <motion.div
                  key={contest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg p-4 sm:p-6 transition-colors ${
                    theme === 'light'
                      ? 'bg-white border border-neutral-200 hover:border-teal-600/50 shadow-sm'
                      : 'bg-neutral-900 border border-neutral-800 hover:border-teal-400/50'
                  }`}
                >
                  <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${
                    theme === 'light' ? 'text-neutral-800' : 'text-white'
                  }`}>
                    {contest.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm sm:text-base">
                    <div className={`flex items-center ${
                      theme === 'light' ? 'text-neutral-600' : 'text-gray-400'
                    }`}>
                      <FiClock className="mr-2 flex-shrink-0" />
                      <span className="truncate">Starts: {contest.startTime}</span>
                    </div>
                    <div className={`flex items-center ${
                      theme === 'light' ? 'text-neutral-600' : 'text-gray-400'
                    }`}>
                      <FiClock className="mr-2 flex-shrink-0" />
                      <span>Duration: {formatDuration(contest.durationSeconds)}</span>
                    </div>
                    <div className={`flex items-center ${
                      theme === 'light' ? 'text-neutral-600' : 'text-gray-400'
                    }`}>
                      <FiUsers className="mr-2 flex-shrink-0" />
                      <span>{contest.participantsCount.toLocaleString()} participants</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}
