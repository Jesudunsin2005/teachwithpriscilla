"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Star } from "lucide-react"

interface PreplyStats {
  studentCount: number
  reviewCount: number
  rating: number
}

// This is a placeholder component that would ideally fetch data from Preply API
// Since we don't have direct API access, this would need to be manually updated
// or integrated with a backend service that has access to Preply data
export function PreplyStats() {
  const [stats, setStats] = useState<PreplyStats>({
    studentCount: 0,
    reviewCount: 0,
    rating: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, this would fetch data from an API
    // For now, we'll use placeholder data that you can manually update
    const fetchPreplyStats = async () => {
      try {
        // Simulating API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Replace these values with your actual Preply stats
        setStats({
          studentCount: 45, // Replace with your actual student count
          reviewCount: 12, // Replace with your actual review count
          rating: 4.9, // Replace with your actual rating
        })
      } catch (error) {
        console.error("Error fetching Preply stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPreplyStats()
  }, [])

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Students Taught</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.studentCount}+</div>
          <p className="text-xs text-muted-foreground">on Preply</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reviews</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold">{stats.reviewCount}</div>
            <div className="text-sm text-muted-foreground">({stats.rating}/5 rating)</div>
          </div>
          <p className="text-xs text-muted-foreground">from satisfied students</p>
        </CardContent>
      </Card>
    </div>
  )
}
