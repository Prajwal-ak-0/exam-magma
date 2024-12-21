"use client"

import { useEffect, useState } from "react"
import { CreateExamDialog } from "@/components/admin/CreateExamDialog"
import { EditExamDialog } from "@/components/admin/EditExamDialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface Exam {
  id: string
  subject: string
  semester: number
  section: string
  branch: string
  language: string
  inchargeName: string
  questions: any[]
  submissions: any[]
  createdAt: string
}

export default function ProblemsPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/admin/exams')
      if (!response.ok) {
        throw new Error('Failed to fetch exams')
      }
      const data = await response.json()
      setExams(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching exams:', error)
      setError('Failed to load exams')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (exam: Exam) => {
    setSelectedExam(exam)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (exam: Exam) => {
    setSelectedExam(exam)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedExam) return

    try {
      const response = await fetch(`/api/admin/exams/${selectedExam.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete exam')
      }

      await fetchExams()
    } catch (error) {
      console.error('Error deleting exam:', error)
    } finally {
      setIsDeleteDialogOpen(false)
      setSelectedExam(null)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="bg-black/50 border-gray-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Problems</h2>
          <CreateExamDialog onExamCreated={fetchExams} />
        </div>

        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">Subject</TableHead>
                <TableHead className="text-gray-400">Semester</TableHead>
                <TableHead className="text-gray-400">Section</TableHead>
                <TableHead className="text-gray-400">Branch</TableHead>
                <TableHead className="text-gray-400">Language</TableHead>
                <TableHead className="text-gray-400">Incharge</TableHead>
                <TableHead className="text-gray-400">Questions</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="text-white">{exam.subject}</TableCell>
                  <TableCell className="text-white">{exam.semester}</TableCell>
                  <TableCell className="text-white">{exam.section}</TableCell>
                  <TableCell className="text-white">{exam.branch}</TableCell>
                  <TableCell className="text-white">{exam.language}</TableCell>
                  <TableCell className="text-white">{exam.inchargeName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-teal-500/10 text-teal-400">
                      {exam.questions.length}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(exam)}
                        className="text-teal-400 hover:text-teal-300 hover:bg-teal-400/10"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(exam)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {selectedExam && (
        <EditExamDialog
          exam={selectedExam}
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false)
            setSelectedExam(null)
          }}
          onUpdate={fetchExams}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-black/90 border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Exam</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this exam? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
