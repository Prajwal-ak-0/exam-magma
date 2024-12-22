"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FiPlus, FiTrash2 } from "react-icons/fi"

interface Question {
  id: string
  title: string
  description: string
}

interface ManageQuestionsDialogProps {
  examId: string
  onQuestionsUpdated: () => void
}

export function ManageQuestionsDialog({ examId, onQuestionsUpdated }: ManageQuestionsDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState({
    title: "",
    description: "",
  })

  useEffect(() => {
    if (open) {
      fetchQuestions()
    }
  }, [open])

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`/api/admin/exams/${examId}/questions`)
      if (!response.ok) throw new Error('Failed to fetch questions')
      const data = await response.json()
      setQuestions(data)
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  }

  const handleAddQuestion = async () => {
    if (!currentQuestion.title || !currentQuestion.description) return

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/exams/${examId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentQuestion),
      })

      if (!response.ok) {
        throw new Error('Failed to add question')
      }

      await fetchQuestions()
      setCurrentQuestion({ title: "", description: "" })
      onQuestionsUpdated()
    } catch (error) {
      console.error('Error adding question:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteQuestion = async (questionId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/exams/${examId}/questions/${questionId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete question')
      }

      await fetchQuestions()
      onQuestionsUpdated()
    } catch (error) {
      console.error('Error deleting question:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FiPlus className="mr-2 h-4 w-4" />
          Manage Questions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage Questions</DialogTitle>
          <DialogDescription>
            Add or remove questions from this exam.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Existing Questions */}
          {questions.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Existing Questions</h3>
              {questions.map((question) => (
                <div
                  key={question.id}
                  className="flex items-start justify-between p-4 rounded-lg border"
                >
                  <div>
                    <h4 className="font-medium">{question.title}</h4>
                    <p className="text-sm text-gray-500">{question.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteQuestion(question.id)}
                    disabled={loading}
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Question */}
          <div className="space-y-4">
            <h3 className="font-medium">Add New Question</h3>
            <div className="space-y-2">
              <Label htmlFor="questionTitle">Question Title</Label>
              <Input
                id="questionTitle"
                value={currentQuestion.title}
                onChange={(e) =>
                  setCurrentQuestion((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="questionDescription">Question Description</Label>
              <Textarea
                id="questionDescription"
                value={currentQuestion.description}
                onChange={(e) =>
                  setCurrentQuestion((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <Button onClick={handleAddQuestion} disabled={loading}>
              Add Question
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
