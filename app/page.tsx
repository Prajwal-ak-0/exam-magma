"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { PageContainer } from '../components/PageContainer';
import { StartExamDialog } from '@/components/exam/StartExamDialog';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function Home() {
  const router = useRouter();
  const [startDialogOpen, setStartDialogOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
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

  return (
    <PageContainer>
      {/* Theme Background Overlay */}
      {theme === 'light' && (
        <div className="fixed inset-0 bg-neutral-50 z-0" />
      )}
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-4 hover:scale-105 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-teal-500"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M11 7h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            <h1 className="text-2xl font-bold">Ramiah CodeLab</h1>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8">
            {['Features', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative ${theme === 'light' ? 'text-neutral-600 hover:text-teal-600' : 'text-gray-300 hover:text-teal-400'} transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-500 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Auth Buttons and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'light' ? 'text-neutral-600 hover:bg-neutral-200' : 'text-gray-300 hover:bg-neutral-800'} transition-colors`}
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
            <button className={`px-4 py-2 border rounded transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              theme === 'light' 
                ? 'border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white' 
                : 'border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black'
            }`}>
              Login
            </button>
            <button className={`px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              theme === 'light'
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-teal-400 text-black hover:bg-teal-500'
            }`}>
              Register
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className={`text-center py-32 px-6 max-w-5xl mx-auto animate-fadeIn ${theme === 'light' ? 'text-neutral-900' : 'text-white'}`}>
          <h1 className="text-6xl font-bold mb-6">
            Welcome to <span className={theme === 'light' ? 'text-teal-600' : 'text-teal-400'}>CodeLab</span>
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme === 'light' ? 'text-neutral-600' : 'text-gray-300'}`}>
            The ultimate platform for MS Ramaiah Institute of Technology students.
            Take coding lab exams in a secure environment with real-time evaluation.
          </p>
          <button 
            onClick={() => setStartDialogOpen(true)}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              theme === 'light'
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-teal-400 text-black hover:bg-teal-500'
            }`}
          >
            Start Exam
          </button>
        </section>

        {/* Features Grid */}
        <section className={`py-16 px-6 max-w-7xl mx-auto ${theme === 'light' ? 'text-neutral-900' : 'text-white'}`} id="features">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
               {
                title: "Advanced Security & Proctoring",
                desc: "AI-powered monitoring with anti-tab switching, plagiarism detection, and secure execution environment"
              },
              {
                title: "LLM Test Generation",
                desc: "AI-powered automatic test case generation with dynamic difficulty adjustment and coverage analysis"
              },
              {
                title: "Multi-Language IDE",
                desc: "Feature-rich editor supporting C, C++, Python, Java, and SQL with real-time syntax checking and formatting"
              },
              {
                title: "Automated Evaluation",
                desc: "Instant code validation, runtime analysis, and comprehensive test case execution with detailed reports"
              },
              {
                title: "Problem Statement Engine",
                desc: "Dynamic problem modification system with automatic validation and difficulty scaling"
              },
              {
                title: "Practice Environment",
                desc: "Access to vast problem library, mock exams, and personalized learning paths"
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group ${
                  theme === 'light'
                    ? 'border border-teal-200 hover:border-teal-600 hover:shadow-lg hover:shadow-teal-100'
                    : 'border border-teal-400/20 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-400/20'
                }`}
              >
                <h3 className={`text-xl font-semibold mb-3 group-hover:scale-105 transition-transform ${
                  theme === 'light' ? 'text-teal-600' : 'text-teal-400'
                }`}>
                  {feature.title}
                </h3>
                <p className={theme === 'light' ? 'text-neutral-600' : 'text-gray-300'}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={`border-t mt-16 ${
          theme === 'light' ? 'border-teal-200' : 'border-teal-400/20'
        }`}>
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  title: "Quick Links",
                  links: ["Documentation", "FAQs", "Support"]
                },
                {
                  title: "Resources",
                  links: ["Practice Problems", "Learning Path", "Leaderboard"]
                },
                {
                  title: "Legal",
                  links: ["Privacy Policy", "Terms of Service"]
                }
              ].map((section, index) => (
                <div key={index}>
                  <h4 className={`font-semibold mb-4 ${
                    theme === 'light' ? 'text-teal-600' : 'text-teal-400'
                  }`}>
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a 
                          href="#" 
                          className={`transition-colors duration-300 inline-block hover:translate-x-1 ${
                            theme === 'light'
                              ? 'text-neutral-600 hover:text-teal-600'
                              : 'text-gray-300 hover:text-teal-400'
                          }`}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <h4 className={`font-semibold mb-4 ${
                  theme === 'light' ? 'text-teal-600' : 'text-teal-400'
                }`}>
                  Contact
                </h4>
                <p className={theme === 'light' ? 'text-neutral-600' : 'text-gray-300'}>
                  MS Ramaiah Institute of Technology
                </p>
                <p className={theme === 'light' ? 'text-neutral-600' : 'text-gray-300'}>
                  Bangalore, Karnataka
                </p>
                <p className={`mt-2 ${theme === 'light' ? 'text-neutral-600' : 'text-gray-300'}`}>
                  support@codelab.msrit.edu
                </p>
              </div>
            </div>
            <div className={`text-center mt-12 pt-8 border-t ${
              theme === 'light' 
                ? 'text-neutral-600 border-teal-200' 
                : 'text-gray-300 border-teal-400/20'
            }`}>
              2024 Ramiah CodeLab. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      <StartExamDialog
        open={startDialogOpen}
        onOpenChange={setStartDialogOpen}
      />
    </PageContainer>
  );
}