"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface UploadProofModalProps {
  challengeTitle: string
  onSubmit: (description: string) => void
  onClose: () => void
}

export function UploadProofModal({ challengeTitle, onSubmit, onClose }: UploadProofModalProps) {
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!description.trim()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSubmit(description)
    setIsSubmitting(false)
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 glass border-primary/20">
        <h2 className="text-2xl font-bold text-foreground mb-4">Upload Proof</h2>
        <p className="text-muted-foreground mb-4">
          Tell us about how you completed: <strong>{challengeTitle}</strong>
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Describe what you did:</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="I planted a tree in my backyard and watered it..."
              className="rounded-xl border-primary/30 focus:border-primary focus:ring-primary/20 min-h-[100px]"
            />
          </div>

          <div className="text-center">
            <div className="text-4xl mb-2">📸</div>
            <p className="text-sm text-muted-foreground">In a real app, you could upload photos here!</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={onClose} variant="outline" className="flex-1 border-border hover:bg-muted bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!description.trim() || isSubmitting}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Submit Proof"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
