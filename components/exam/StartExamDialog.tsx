"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('/api/subjects')
        const data = await response.json()
        setExamData(data)
      } catch (error) {
        console.error('Failed to fetch subjects:', error)
      }
    }

    if (step === 2) {
      fetchSubjects()
    }
  }, [step])

  const handleNext = () => {
    if (usn.trim()) {
      setStep(2)
    }
  }

  const handleFinish = async () => {
    if (!usn || !selectedSubject || !selectedSemester) return

    setLoading(true)
    try {
      localStorage.setItem('examSession', JSON.stringify({
        usn,
        subject: selectedSubject,
        semester: parseInt(selectedSemester)
      }))
      router.push(`/dashboard?subject=${encodeURIComponent(selectedSubject)}&semester=${selectedSemester}`)
      onOpenChange(false)
    } catch (error) {
      console.error('Failed to start exam:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get available subjects for selected semester
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
                onChange={(e) => setUsn(e.target.value)}
                className="h-12 text-lg border-2 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please enter your university seat number (USN) to proceed
              </p>
            </div>
            <Button 
              className="w-full h-12 text-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors"
              onClick={handleNext}
              disabled={!usn.trim()}
            >
              Next Step
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-lg font-medium">
                  Select Semester
                </Label>
                <Select
                  value={selectedSemester}
                  onValueChange={(value) => {
                    setSelectedSemester(value)
                    setSelectedSubject("") // Reset subject when semester changes
                  }}
                >
                  <SelectTrigger className="h-12 text-lg border-2 border-teal-200 focus:border-teal-500 focus:ring-teal-500">
                    <SelectValue placeholder="Choose semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {examData.map((data) => (
                      <SelectItem 
                        key={data.semester} 
                        value={data.semester.toString()}
                        className="text-lg"
                      >
                        {data.semester}th Semester
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedSemester && (
                <div className="space-y-2">
                  <Label className="text-lg font-medium">
                    Select Subject
                  </Label>
                  <RadioGroup
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                    className="space-y-3"
                  >
                    {availableSubjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-3 p-3 rounded-lg border-2 border-teal-100 hover:border-teal-300 transition-colors">
                        <RadioGroupItem 
                          value={subject} 
                          id={subject}
                          className="text-teal-600 border-2 border-teal-300"
                        />
                        <Label htmlFor={subject} className="text-lg cursor-pointer">
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400">
                First select your semester, then choose the subject for your exam
              </p>
            </div>
            <div className="flex space-x-4">
              <Button 
                variant="outline"
                className="flex-1 h-12 text-lg border-2 border-teal-200 hover:bg-teal-50"
                onClick={() => {
                  setStep(1)
                  setSelectedSemester("")
                  setSelectedSubject("")
                }}
              >
                Back
              </Button>
              <Button 
                className="flex-1 h-12 text-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors"
                onClick={handleFinish}
                disabled={!selectedSubject || !selectedSemester || loading}
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
