"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FiPlus } from "react-icons/fi"

export function AddProblemDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 text-white shadow-lg shadow-teal-500/20 border-none">
          <FiPlus className="mr-2 h-4 w-4" />
          Add Problem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-neutral-900 border border-teal-500/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-teal-400 to-teal-200 bg-clip-text text-transparent">
            Add New Problem
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Problem Title</Label>
            <Input
              id="title"
              placeholder="Enter problem title"
              className="border-teal-500/20 focus:border-teal-500/50 bg-neutral-800"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select>
                <SelectTrigger className="border-teal-500/20 focus:border-teal-500/50 bg-neutral-800">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-teal-500/20">
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Programming Language</Label>
              <Select>
                <SelectTrigger className="border-teal-500/20 focus:border-teal-500/50 bg-neutral-800">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-teal-500/20">
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Problem Description</Label>
            <Textarea
              id="description"
              placeholder="Enter problem description"
              className="min-h-[150px] border-teal-500/20 focus:border-teal-500/50 bg-neutral-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="starterCode">Starter Code</Label>
            <Textarea
              id="starterCode"
              placeholder="Enter starter code"
              className="min-h-[100px] font-mono border-teal-500/20 focus:border-teal-500/50 bg-neutral-800"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-teal-500/20 hover:border-teal-500/50 hover:bg-teal-500/10"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setOpen(false)}
              className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 text-white shadow-lg shadow-teal-500/20 border-none"
            >
              Add Problem
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
