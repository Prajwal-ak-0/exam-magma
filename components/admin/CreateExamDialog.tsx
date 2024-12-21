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

interface Question {
  title: string
  description: string
}

interface CreateExamDialogProps {
  onExamCreated: () => void
}

export function CreateExamDialog({ onExamCreated }: CreateExamDialogProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [examData, setExamData] = useState({
    subject: "",
    semester: "",
    section: "",
    branch: "",
    language: "",
    inchargeName: "",
  })
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState({
    title: "",
    description: "",
  })

  const handleExamDataChange = (field: string, value: string) => {
    setExamData((prev) => ({ ...prev, [field]: value }))
  }

  const handleQuestionSubmit = () => {
    if (currentQuestion.title && currentQuestion.description) {
      setQuestions((prev) => [...prev, { ...currentQuestion }])
      setCurrentQuestion({ title: "", description: "" })
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // Create exam
      const examResponse = await fetch('/api/admin/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examData),
      })
      const exam = await examResponse.json()

      // Add questions
      for (const question of questions) {
        await fetch(`/api/admin/exams/${exam.id}/questions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(question),
        })
      }

      setExamData({
        subject: "",
        semester: "",
        section: "",
        branch: "",
        language: "",
        inchargeName: "",
      })
      setQuestions([])
      setCurrentQuestion({ title: "", description: "" })
      setOpen(false)
      onExamCreated()
    } catch (error) {
      console.error('Error creating exam:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 text-white hover:bg-teal-600">
          Create Exam
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-black/90 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            {step === 1 ? "Create New Exam" : "Add Questions"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {step === 1
              ? "Fill in the exam details below"
              : "Add questions to your exam"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-white">Subject</Label>
              <Input
                id="subject"
                value={examData.subject}
                onChange={(e) => handleExamDataChange("subject", e.target.value)}
                className="bg-black/50 border-gray-800 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester" className="text-white">Semester</Label>
              <Select
                value={examData.semester}
                onValueChange={(value) => handleExamDataChange("semester", value)}
              >
                <SelectTrigger className="bg-black/50 border-gray-800 text-white">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-gray-800">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="section" className="text-white">Section</Label>
              <Input
                id="section"
                value={examData.section}
                onChange={(e) => handleExamDataChange("section", e.target.value)}
                className="bg-black/50 border-gray-800 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch" className="text-white">Branch</Label>
              <Input
                id="branch"
                value={examData.branch}
                onChange={(e) => handleExamDataChange("branch", e.target.value)}
                className="bg-black/50 border-gray-800 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language" className="text-white">Language</Label>
              <Select
                value={examData.language}
                onValueChange={(value) => handleExamDataChange("language", value)}
              >
                <SelectTrigger className="bg-black/50 border-gray-800 text-white">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-gray-800">
                  {["Python", "Java", "C++", "JavaScript"].map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inchargeName" className="text-white">Incharge Name</Label>
              <Input
                id="inchargeName"
                value={examData.inchargeName}
                onChange={(e) => handleExamDataChange("inchargeName", e.target.value)}
                className="bg-black/50 border-gray-800 text-white"
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                onClick={() => setStep(2)}
                disabled={
                  !examData.subject ||
                  !examData.semester ||
                  !examData.section ||
                  !examData.branch ||
                  !examData.language ||
                  !examData.inchargeName
                }
                className="bg-teal-500 text-white hover:bg-teal-600"
              >
                Next
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-gradient-to-r from-teal-500/10 to-transparent"
                >
                  <h4 className="font-medium text-teal-300">{q.title}</h4>
                  <p className="text-sm text-teal-300/60">{q.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="questionTitle" className="text-white">Question Title</Label>
                <Input
                  id="questionTitle"
                  value={currentQuestion.title}
                  onChange={(e) =>
                    setCurrentQuestion((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="bg-black/50 border-gray-800 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="questionDescription" className="text-white">
                  Question Description
                </Label>
                <Textarea
                  id="questionDescription"
                  value={currentQuestion.description}
                  onChange={(e) =>
                    setCurrentQuestion((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="bg-black/50 border-gray-800 text-white"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleQuestionSubmit}
                className="w-full border-teal-500/20 hover:border-teal-500/40 hover:bg-teal-500/10 text-teal-300"
              >
                Add Question
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <DialogFooter>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="border-teal-500/20 hover:border-teal-500/40 hover:bg-teal-500/10 text-teal-300"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={questions.length === 0 || loading}
                className="bg-teal-500 text-white hover:bg-teal-600"
              >
                {loading ? "Creating..." : "Create Exam"}
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
