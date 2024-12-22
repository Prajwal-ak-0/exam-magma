"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { PageContainer } from "@/components/PageContainer"
import { FiLock, FiMail } from "react-icons/fi"
import { motion } from "framer-motion"

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Invalid credentials")
      }

      router.push("/admin")
    } catch (error) {
      setError("Invalid username or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer>
      <div className="relative min-h-screen flex items-center justify-center min-w-screen">
        {/* Light mode overlay */}
        <div className="absolute inset-0 bg-white/90 dark:bg-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md px-4"
        >
          <Card className="p-8 bg-white dark:bg-black/50 border-teal-100 dark:border-gray-800 shadow-xl shadow-teal-100/20 dark:shadow-none backdrop-blur-sm">
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 mx-auto bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center"
                >
                  <FiLock className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-teal-700 dark:from-teal-400 dark:to-teal-600 bg-clip-text text-transparent">
                  Admin Login
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your credentials to access the admin panel
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Username
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FiMail className="w-5 h-5" />
                    </div>
                    <Input
                      id="username"
                      type="email"
                      placeholder="admin@msrit.edu"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-teal-500 dark:focus:border-teal-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FiLock className="w-5 h-5" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-teal-500 dark:focus:border-teal-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 dark:text-red-400"
                  >
                    {error}
                  </motion.p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 dark:from-teal-400 dark:to-teal-500 dark:hover:from-teal-500 dark:hover:to-teal-600 text-white shadow-lg shadow-teal-500/25 dark:shadow-teal-400/25 transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/30 dark:hover:shadow-teal-400/30"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Logging in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </div>
          </Card>
        </motion.div>
      </div>
    </PageContainer>
  )
}
