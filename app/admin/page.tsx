import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, Download, Users, Settings, Eye } from "lucide-react"
import { createServerClient } from "@/lib/supabase"

async function getDashboardStats() {
  const supabase = createServerClient()

  try {
    const [postsResult, resourcesResult, subscribersResult] = await Promise.all([
      supabase.from("blog_posts").select("id", { count: "exact" }),
      supabase.from("resources").select("id", { count: "exact" }),
      supabase.from("subscribers").select("id", { count: "exact" }),
    ])

    return {
      posts: postsResult.count || 0,
      resources: resourcesResult.count || 0,
      subscribers: subscribersResult.count || 0,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return {
      posts: 0,
      resources: 0,
      subscribers: 0,
    }
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your blog content and resources</p>
        </div>
        <Button asChild>
          <Link href="/" target="_blank">
            <Eye className="mr-2 h-4 w-4" />
            View Site
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.posts}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resources}</div>
            <p className="text-xs text-muted-foreground">Downloadable files</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.subscribers}</div>
            <p className="text-xs text-muted-foreground">Newsletter subscribers</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Blog Management</CardTitle>
            <CardDescription>Create and manage your blog posts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/admin/posts/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Post
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/admin/posts">View All Posts</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resources Management</CardTitle>
            <CardDescription>Upload and manage downloadable resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/admin/resources/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Resource
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/admin/resources">View All Resources</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Site Settings</CardTitle>
            <CardDescription>Manage site content and configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Edit Settings
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/admin/subscribers">View Subscribers</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
