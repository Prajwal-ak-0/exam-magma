"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FiRefreshCw } from "react-icons/fi"

interface User {
  id: string
  usn: string
  problemsSolved: number
  status: string
  joinedDate: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-teal-700 dark:text-white">Students Management</h1>
        <Button 
          onClick={fetchUsers} 
          variant="outline" 
          disabled={loading}
          className="border-teal-200 dark:border-neutral-800 bg-white hover:bg-teal-50 dark:bg-transparent dark:hover:bg-neutral-800"
        >
          <FiRefreshCw className={`mr-2 h-4 w-4 text-teal-600 dark:text-teal-400 ${loading ? 'animate-spin' : ''}`} />
          <span className="text-teal-700 dark:text-teal-300">Refresh</span>
        </Button>
      </div>

      <div className="rounded-md border border-teal-100 dark:border-neutral-800 bg-white dark:bg-transparent shadow-lg shadow-teal-100/20 dark:shadow-none">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-teal-100 dark:border-neutral-800">
              <TableHead className="text-neutral-600 dark:text-neutral-400">USN</TableHead>
              <TableHead className="text-neutral-600 dark:text-neutral-400">Status</TableHead>
              <TableHead className="text-neutral-600 dark:text-neutral-400">Problems Solved</TableHead>
              <TableHead className="text-neutral-600 dark:text-neutral-400">First Submission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-b border-teal-50 dark:border-neutral-800">
                <TableCell className="font-medium text-neutral-800 dark:text-neutral-200">{user.usn}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary"
                    className="bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-500 border-green-100 dark:border-green-500/20"
                  >
                    Active
                  </Badge>
                </TableCell>
                <TableCell className="text-neutral-700 dark:text-neutral-300">{user.problemsSolved}</TableCell>
                <TableCell className="text-neutral-700 dark:text-neutral-300">{user.joinedDate}</TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-neutral-500 dark:text-neutral-400">
                  {loading ? 'Loading...' : 'No submissions found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
