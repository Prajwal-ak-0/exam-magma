"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ExamData {
  semester: number
  subjects: string[]
}

interface StartExamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StartExamDialog({ open, onOpenChange }: StartExamDialogProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [usn, setUsn] = useState("")
  const [examData, setExamData] = useState<ExamData[]>([])
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('/api/subjects')
        if (!response.ok) throw new Error('Failed to fetch subjects')
        const data = await response.json()
        setExamData(data)
      } catch (error) {
        console.error('Failed to fetch subjects:', error)
        setError('Failed to load subjects. Please try again.')
      }
    }

    if (step === 2) {
      fetchSubjects()
    }
  }, [step])

  const handleNext = () => {
    if (!usn.trim()) {
      setError('Please enter your USN')
      return
    }
    setError(null)
    setStep(2)
  }

  const handleFinish = async () => {
    if (!usn || !selectedSubject || !selectedSemester) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      localStorage.setItem('examSession', JSON.stringify({
        usn,
        subject: selectedSubject,
        semester: parseInt(selectedSemester)
      }))
      router.push(`/dashboard?subject=${encodeURIComponent(selectedSubject)}&semester=${encodeURIComponent(selectedSemester)}`)
      onOpenChange(false)
    } catch (error) {
      console.error('Failed to start exam:', error)
      setError('Failed to start exam. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const availableSubjects = selectedSemester 
    ? examData.find(d => d.semester === parseInt(selectedSemester))?.subjects || []
    : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-teal-600 dark:text-teal-400">
            {step === 1 ? "Welcome to Exam Portal" : "Select Your Exam"}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {step === 1 ? (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <Label htmlFor="usn" className="text-lg font-medium">
                Enter Your USN
              </Label>
              <Input
                id="usn"
                placeholder="e.g., 1MS22IS001"
                value={usn}
                onChange={(e) => setUsn(e.target.value.toUpperCase())}
                className="h-12 text-lg border-2 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <Button 
              onClick={handleNext}
              className="w-full h-12 text-lg bg-teal-600 hover:bg-teal-700 text-white"
              disabled={loading}
            >
              Next
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="semester" className="text-lg font-medium">
                  Select Semester
                </Label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger id="semester" className="h-12 text-lg border-2 border-teal-200">
                    <SelectValue placeholder="Choose semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {examData.map((data) => (
                      <SelectItem 
                        key={data.semester} 
                        value={data.semester.toString()}
                      >
                        Semester {data.semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-lg font-medium">
                  Select Subject
                </Label>
                <Select 
                  value={selectedSubject} 
                  onValueChange={setSelectedSubject}
                  disabled={!selectedSemester}
                >
                  <SelectTrigger id="subject" className="h-12 text-lg border-2 border-teal-200">
                    <SelectValue placeholder="Choose subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 h-12 text-lg"
                disabled={loading}
              >
                Back
              </Button>
              <Button 
                onClick={handleFinish}
                className="flex-1 h-12 text-lg bg-teal-600 hover:bg-teal-700 text-white"
                disabled={loading || !selectedSemester || !selectedSubject}
              >
                {loading ? "Starting..." : "Start Exam"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
