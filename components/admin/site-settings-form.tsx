"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface SiteSettingsFormProps {
  teachingYears: string
  studentsCount: string
}

export function SiteSettingsForm({ teachingYears, studentsCount }: SiteSettingsFormProps) {
  const [years, setYears] = useState(teachingYears)
  const [students, setStudents] = useState(studentsCount)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teaching_experience_years: years,
          students_taught_count: students,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update settings")
      }

      toast({
        title: "Settings updated",
        description: "Your changes have been saved successfully.",
      })
    } catch (error) {
      console.error("Error updating settings:", error)
      toast({
        title: "Update failed",
        description: "There was a problem updating your settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="teaching-years">Years of Teaching Experience</Label>
          <Input
            id="teaching-years"
            type="number"
            min="1"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="students-count">Students Taught</Label>
          <Input
            id="students-count"
            type="number"
            min="1"
            value={students}
            onChange={(e) => setStudents(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
