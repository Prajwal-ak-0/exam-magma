"use client"

import { useState } from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface CreateExamDialogProps {
  onExamCreated: () => void
}

export function CreateExamDialog({ onExamCreated }: CreateExamDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showQuestionDialog, setShowQuestionDialog] = useState(false)
  const [currentExamId, setCurrentExamId] = useState<string | null>(null)
  const [examData, setExamData] = useState({
    subject: "",
    semester: "",
    section: "",
    branch: "",
    language: "",
    inchargeName: "",
  })
  const [currentQuestion, setCurrentQuestion] = useState({
    title: "",
    description: "",
  })

  const handleExamDataChange = (field: string, value: string) => {
    setExamData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const examResponse = await fetch('/api/admin/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examData),
      })
      
      if (!examResponse.ok) {
        throw new Error('Failed to create exam')
      }

      const exam = await examResponse.json()
      setCurrentExamId(exam.id)
      setOpen(false)
      setShowQuestionDialog(true)
      
      setExamData({
        subject: "",
        semester: "",
        section: "",
        branch: "",
        language: "",
        inchargeName: "",
      })
    } catch (error) {
      console.error('Error creating exam:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddQuestion = async () => {
    if (!currentExamId || !currentQuestion.title || !currentQuestion.description) return

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/exams/${currentExamId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentQuestion),
      })

      if (!response.ok) {
        throw new Error('Failed to add question')
      }

      setCurrentQuestion({ title: "", description: "" })
      onExamCreated()
    } catch (error) {
      console.error('Error adding question:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFinish = () => {
    setShowQuestionDialog(false)
    setCurrentExamId(null)
    onExamCreated()
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create Exam</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Exam</DialogTitle>
            <DialogDescription>
              Fill in the exam details below. You can add questions in the next step.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                value={examData.subject}
                onChange={(e) => handleExamDataChange("subject", e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="semester" className="text-right">
                Semester
              </Label>
              <Select
                value={examData.semester}
                onValueChange={(value) => handleExamDataChange("semester", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="section" className="text-right">
                Section
              </Label>
              <Input
                id="section"
                value={examData.section}
                onChange={(e) => handleExamDataChange("section", e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="branch" className="text-right">
                Branch
              </Label>
              <Input
                id="branch"
                value={examData.branch}
                onChange={(e) => handleExamDataChange("branch", e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language" className="text-right">
                Language
              </Label>
              <Select
                value={examData.language}
                onValueChange={(value) => handleExamDataChange("language", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="inchargeName" className="text-right">
                Incharge Name
              </Label>
              <Input
                id="inchargeName"
                value={examData.inchargeName}
                onChange={(e) => handleExamDataChange("inchargeName", e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating..." : "Create Exam"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showQuestionDialog} onOpenChange={setShowQuestionDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Questions</DialogTitle>
            <DialogDescription>
              Add questions to your exam. You can add multiple questions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
          </div>
          <DialogFooter className="flex gap-2">
            <Button onClick={handleAddQuestion} disabled={loading}>
              Add Another Question
            </Button>
            <Button onClick={handleFinish} variant="secondary">
              Finish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
