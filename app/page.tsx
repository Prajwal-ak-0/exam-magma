"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { PageContainer } from '../components/PageContainer';
import { StartExamDialog } from '@/components/exam/StartExamDialog';
import { FiMoon, FiSun } from 'react-icons/fi';
import { AboutSection } from '@/components/AboutSection';
import Link from 'next/link';
import Image from 'next/image';

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
        <header className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 py-4 sm:py-6 max-w-7xl mx-auto space-y-4 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/favicon.ico"
              alt="CodeLab Logo"
              width={32}
              height={32}
              className="rounded-lg w-8 h-8"
              unoptimized
            />
            <h1 className={`text-xl sm:text-2xl font-bold ${
              theme === 'light' ? 'text-neutral-900' : 'text-white'
            }`}>Ramaiah CodeLab</h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-8">
            {['Features', 'About'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative ${theme === 'light' ? 'text-neutral-600 hover:text-teal-600' : 'text-gray-300 hover:text-teal-400'} transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-500 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all`}
              >
                {item}
              </a>
            ))}
            <Link
              href="/live-contests"
              className={`relative ${
                theme === 'light' 
                  ? 'text-teal-600 hover:text-teal-700' 
                  : 'text-teal-400 hover:text-teal-300'
              } font-medium transition-colors`}
            >
              Live Contests
            </Link>
          </nav>

          {/* Auth Buttons and Theme Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'light' ? 'text-neutral-600 hover:bg-neutral-200' : 'text-gray-300 hover:bg-neutral-800'} transition-colors`}
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
            <button className={`px-3 sm:px-4 py-2 border rounded text-sm sm:text-base transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              theme === 'light' 
                ? 'border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white' 
                : 'border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black'
            }`}>
              Login
            </button>
            <button className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              theme === 'light'
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-teal-400 text-black hover:bg-teal-500'
            }`}>
              Register
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center py-16 sm:py-24 md:py-32 px-4 sm:px-6 max-w-5xl mx-auto animate-fadeIn">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 ${
              theme === 'light' ? 'text-neutral-900' : 'text-white'
            }`}>
            Welcome to <span className={theme === 'light' ? 'text-teal-600' : 'text-teal-400'}>CodeLab</span>
          </h1>
          <p className={`text-lg sm:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto ${theme === 'light' ? 'text-neutral-600' : 'text-gray-300'}`}>
            The ultimate platform for MS Ramaiah Institute of Technology students.
            Take coding lab exams in a secure environment with real-time evaluation.
          </p>
          <button 
            onClick={() => setStartDialogOpen(true)}
            className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              theme === 'light'
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-teal-400 text-black hover:bg-teal-500'
            }`}
          >
            Start Exam
          </button>
        </section>

        {/* Features Grid */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto" id="features">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

        {/* About Section */}
        <AboutSection theme={theme} />

        {/* Footer */}
        <footer className={`border-t mt-12 sm:mt-16 ${
          theme === 'light' ? 'border-teal-200' : 'border-teal-400/20'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
            <div className={`text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t text-sm sm:text-base ${
              theme === 'light' 
                ? 'text-neutral-600 border-teal-200' 
                : 'text-gray-300 border-teal-400/20'
            }`}>
              2024 Ramaiah CodeLab. All rights reserved.
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