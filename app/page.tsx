"use client";

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
  const [startDialogOpen, setStartDialogOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("home-theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("home-theme", newTheme);
  };

  return (
    <PageContainer>
      {/* Theme Background Overlay */}
      {theme === "light" && <div className="fixed inset-0 bg-neutral-50 z-0" />}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-4 hover:scale-105 transition-transform">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={32}
              height={32}
              className="text-teal-500"
            />
            <h1
              className={`text-2xl font-bold ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              RIT CodeLab
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8">
            {["Features", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative ${
                  theme === "light"
                    ? "text-neutral-600 hover:text-teal-600"
                    : "text-gray-300 hover:text-teal-400"
                } transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-500 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all`}
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
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === "light"
                  ? "text-neutral-600 hover:bg-neutral-200"
                  : "text-gray-300 hover:bg-neutral-800"
              } transition-colors`}
            >
              {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section
          className={`text-center py-32 px-6 max-w-5xl mx-auto animate-fadeIn ${
            theme === "light" ? "text-neutral-900" : "text-white"
          }`}
        >
          <h1 className="text-6xl font-bold mb-6">
            Welcome to{" "}
            <span
              className={theme === "light" ? "text-teal-600" : "text-teal-400"}
            >
              RIT CodeLab
            </span>
          </h1>
          <p
            className={`text-xl mb-8 max-w-3xl mx-auto ${
              theme === "light" ? "text-neutral-600" : "text-gray-300"
            }`}
          >
            The ultimate platform for MS Ramaiah Institute of Technology
            students. Take coding lab exams in a secure environment with
            real-time evaluation.
          </p>
          <button
            onClick={() => setStartDialogOpen(true)}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              theme === "light"
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-teal-400 text-black hover:bg-teal-500"
            }`}
          >
            Start Exam
          </button>
        </section>

        {/* Features Grid */}
        <section
          className={`py-16 px-6 max-w-7xl mx-auto ${
            theme === "light" ? "text-neutral-900" : "text-white"
          }`}
          id="features"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Advanced Security & Proctoring",
                desc: "AI-powered monitoring with anti-tab switching, plagiarism detection, and secure execution environment",
              },
              {
                title: "LLM Test Generation",
                desc: "AI-powered automatic test case generation with dynamic difficulty adjustment and coverage analysis",
              },
              {
                title: "Multi-Language IDE",
                desc: "Feature-rich editor supporting C, C++, Python, Java, and SQL with real-time syntax checking and formatting",
              },
              {
                title: "Automated Evaluation",
                desc: "Instant code validation, runtime analysis, and comprehensive test case execution with detailed reports",
              },
              {
                title: "Problem Statement Engine",
                desc: "Dynamic problem modification system with automatic validation and difficulty scaling",
              },
              {
                title: "Practice Environment",
                desc: "Access to vast problem library, mock exams, and personalized learning paths",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group ${
                  theme === "light"
                    ? "border border-teal-200 hover:border-teal-600 hover:shadow-lg hover:shadow-teal-100"
                    : "border border-teal-400/20 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-400/20"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-3 group-hover:scale-105 transition-transform ${
                    theme === "light" ? "text-teal-600" : "text-teal-400"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={
                    theme === "light" ? "text-neutral-600" : "text-gray-300"
                  }
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <AboutSection theme={theme} />

        {/* Footer */}
        <footer className="py-6 md:px-8 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <a
                href="https://msrit.edu"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                MSRIT
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/yourusername/student"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
            </p>
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-right">
              <a
                href="/admin-login"
                className="font-medium underline underline-offset-4"
              >
                Admin Login
              </a>
            </p>
          </div>
        </footer>

        <StartExamDialog
          open={startDialogOpen}
          onOpenChange={setStartDialogOpen}
        />
      </div>
    </PageContainer>
  );
}
