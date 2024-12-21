"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface StartExamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StartExamDialog({ open, onOpenChange }: StartExamDialogProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [usn, setUsn] = useState("")
  const [subjects, setSubjects] = useState<string[]>([])
  const [selectedSubject, setSelectedSubject] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('/api/subjects')
        const data = await response.json()
        setSubjects(data)
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
    if (!usn || !selectedSubject) return

    setLoading(true)
    try {
      // Store the exam session data
      localStorage.setItem('examSession', JSON.stringify({
        usn,
        subject: selectedSubject,
      }))
      
      // Navigate to dashboard with the selected subject
      router.push(`/dashboard?subject=${encodeURIComponent(selectedSubject)}`)
      onOpenChange(false)
    } catch (error) {
      console.error('Failed to start exam:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Enter Your USN" : "Select Subject"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usn">Student USN</Label>
              <Input
                id="usn"
                placeholder="Enter your USN"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
              />
            </div>
            <Button 
              className="w-full" 
              onClick={handleNext}
              disabled={!usn.trim()}
            >
              Next
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <RadioGroup
              value={selectedSubject}
              onValueChange={setSelectedSubject}
              className="space-y-2"
            >
              {subjects.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <RadioGroupItem value={subject} id={subject} />
                  <Label htmlFor={subject}>{subject}</Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button 
                className="flex-1"
                onClick={handleFinish}
                disabled={!selectedSubject || loading}
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
