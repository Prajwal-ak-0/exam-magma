import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface EditExamDialogProps {
  exam: {
    id: string
    subject: string
    semester: number
    section: string
    branch: string
    language: string
    inchargeName: string
  }
  isOpen: boolean
  onClose: () => void
  onUpdate: () => void
}

export function EditExamDialog({ exam, isOpen, onClose, onUpdate }: EditExamDialogProps) {
  const [formData, setFormData] = useState({
    subject: exam.subject,
    semester: exam.semester.toString(),
    section: exam.section,
    branch: exam.branch,
    language: exam.language,
    inchargeName: exam.inchargeName,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/exams/${exam.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to update exam')
      }

      onUpdate()
      onClose()
    } catch (error) {
      console.error('Error updating exam:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black/90 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Edit Exam</DialogTitle>
          <DialogDescription className="text-gray-400">
            Update the exam details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className="bg-black/50 border-gray-800 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester" className="text-white">Semester</Label>
            <Input
              id="semester"
              type="number"
              value={formData.semester}
              onChange={(e) => setFormData(prev => ({ ...prev, semester: e.target.value }))}
              className="bg-black/50 border-gray-800 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="section" className="text-white">Section</Label>
            <Input
              id="section"
              value={formData.section}
              onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
              className="bg-black/50 border-gray-800 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch" className="text-white">Branch</Label>
            <Input
              id="branch"
              value={formData.branch}
              onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
              className="bg-black/50 border-gray-800 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language" className="text-white">Language</Label>
            <Input
              id="language"
              value={formData.language}
              onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
              className="bg-black/50 border-gray-800 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inchargeName" className="text-white">Incharge Name</Label>
            <Input
              id="inchargeName"
              value={formData.inchargeName}
              onChange={(e) => setFormData(prev => ({ ...prev, inchargeName: e.target.value }))}
              className="bg-black/50 border-gray-800 text-white"
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="bg-teal-500 text-white hover:bg-teal-600"
            >
              {loading ? 'Updating...' : 'Update Exam'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
