"use client"

import { useRouter } from 'next/navigation';
import { PageContainer } from '../components/PageContainer';

export default function Home() {

  const router = useRouter();

  return (
    <PageContainer>
      <div className="bg-transparent text-white min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-4 hover:scale-105 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-teal-400"
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
                className="relative text-gray-300 hover:text-teal-400 transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex space-x-4">
            <button className="px-4 py-2 border border-teal-400 rounded text-teal-400 hover:bg-teal-400 hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-95">
              Login
            </button>
            <button className="px-4 py-2 bg-teal-400 rounded text-black hover:bg-teal-500 transition-all duration-300 transform hover:scale-105 active:scale-95">
              Register
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center py-32 px-6 max-w-5xl mx-auto animate-fadeIn">
          <h1 className="text-6xl font-bold mb-6">
            Welcome to <span className="text-teal-400">CodeLab</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The ultimate platform for MS Ramaiah Institute of Technology students.
            Take coding lab exams in a secure environment with real-time evaluation.
          </p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="px-8 py-4 bg-teal-400 text-black rounded-lg font-semibold text-lg hover:bg-teal-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Start Exam
          </button>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-6 max-w-7xl mx-auto" id="features">
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
                className="p-6 border border-teal-400/20 rounded-lg transition-all duration-300 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-400/20 hover:-translate-y-1 cursor-pointer group"
              >
                <h3 className="text-xl font-semibold text-teal-400 mb-3 group-hover:scale-105 transition-transform">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-teal-400/20 mt-16">
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
                  <h4 className="text-teal-400 font-semibold mb-4">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 inline-block hover:translate-x-1">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <h4 className="text-teal-400 font-semibold mb-4">Contact</h4>
                <p className="text-gray-300">MS Ramaiah Institute of Technology</p>
                <p className="text-gray-300">Bangalore, Karnataka</p>
                <p className="text-gray-300 mt-2">support@codelab.msrit.edu</p>
              </div>
            </div>
            <div className="text-center text-gray-300 mt-12 pt-8 border-t border-teal-400/20">
              © 2024 Ramiah CodeLab. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </PageContainer>
  );
}