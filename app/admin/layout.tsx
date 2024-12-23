"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiSettings, FiUsers, FiBook, FiMenu, FiGrid } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTheme } from 'next-themes'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: FiGrid
  },
  {
    title: 'Problems',
    href: '/admin/problems',
    icon: FiBook
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: FiUsers
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: FiSettings
  }
]

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 h-14 border-b border-teal-100 dark:border-teal-500/20 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hover:bg-teal-50 dark:hover:bg-teal-500/10 text-teal-600 dark:text-teal-300"
            >
              <FiMenu className="h-5 w-5" />
            </Button>
            <span className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 border-r border-teal-100 dark:border-teal-500/20 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-sm transition-all duration-300",
            !isSidebarOpen && "-translate-x-full"
          )}
        >
          <div className="flex flex-col gap-1 p-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                  pathname === item.href
                    ? "bg-gradient-to-r from-teal-50 to-teal-100/50 dark:from-teal-500/20 dark:to-teal-400/10 text-teal-600 dark:text-teal-300 shadow-lg shadow-teal-100/50 dark:shadow-teal-500/10"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-300"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300 min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-white to-teal-50/20 dark:from-neutral-950 dark:to-neutral-900",
            isSidebarOpen ? "ml-64" : "ml-0"
          )}
        >
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
