import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Database, Users, FileText, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function testDatabaseConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabase.from("blog_posts").select("count", { count: "exact", head: true })

    if (error) {
      return {
        connected: false,
        error: error.message,
        tables: {},
        sampleData: {},
      }
    }

    // Test all tables and get sample data
    const [postsResult, resourcesResult, subscribersResult, settingsResult] = await Promise.allSettled([
      supabase.from("blog_posts").select("*").limit(3),
      supabase.from("resources").select("*").limit(3),
      supabase.from("subscribers").select("*").limit(3),
      supabase.from("site_settings").select("*"),
    ])

    return {
      connected: true,
      tables: {
        blog_posts: postsResult.status === "fulfilled" ? postsResult.value.data?.length || 0 : "❌ Missing",
        resources: resourcesResult.status === "fulfilled" ? resourcesResult.value.data?.length || 0 : "❌ Missing",
        subscribers:
          subscribersResult.status === "fulfilled" ? subscribersResult.value.data?.length || 0 : "❌ Missing",
        site_settings: settingsResult.status === "fulfilled" ? settingsResult.value.data?.length || 0 : "❌ Missing",
      },
      sampleData: {
        posts: postsResult.status === "fulfilled" ? postsResult.value.data || [] : [],
        resources: resourcesResult.status === "fulfilled" ? resourcesResult.value.data || [] : [],
        settings: settingsResult.status === "fulfilled" ? settingsResult.value.data || [] : [],
      },
    }
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : "Unknown error",
      tables: {},
      sampleData: {},
    }
  }
}

export default async function TestConnectionPage() {
  const connectionTest = await testDatabaseConnection()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Database Connection Test</h1>
          <p className="text-gray-600">Verify your Supabase setup and database tables</p>
        </div>

        {/* Connection Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              {connectionTest.connected ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500" />
              )}
              <CardTitle>Supabase Connection</CardTitle>
            </div>
            <CardDescription>
              {connectionTest.connected ? "Successfully connected to Supabase" : "Failed to connect to Supabase"}
            </CardDescription>
          </CardHeader>
          {!connectionTest.connected && connectionTest.error && (
            <CardContent>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{connectionTest.error}</p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Database Tables */}
        {connectionTest.connected && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-6 w-6 text-blue-500" />
                <CardTitle>Database Tables</CardTitle>
              </div>
              <CardDescription>Status of your database tables and record counts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">blog_posts</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {typeof connectionTest.tables.blog_posts === "number"
                      ? `${connectionTest.tables.blog_posts} records`
                      : connectionTest.tables.blog_posts}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">resources</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {typeof connectionTest.tables.resources === "number"
                      ? `${connectionTest.tables.resources} records`
                      : connectionTest.tables.resources}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">subscribers</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {typeof connectionTest.tables.subscribers === "number"
                      ? `${connectionTest.tables.subscribers} records`
                      : connectionTest.tables.subscribers}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">site_settings</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {typeof connectionTest.tables.site_settings === "number"
                      ? `${connectionTest.tables.site_settings} records`
                      : connectionTest.tables.site_settings}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sample Data Preview */}
        {connectionTest.connected && connectionTest.sampleData && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Blog Posts Preview */}
            {connectionTest.sampleData.posts && connectionTest.sampleData.posts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sample Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {connectionTest.sampleData.posts.slice(0, 3).map((post: any) => (
                      <div key={post.id} className="p-2 border rounded text-sm">
                        <div className="font-medium">{post.title}</div>
                        <div className="text-gray-600">Slug: {post.slug}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Site Settings Preview */}
            {connectionTest.sampleData.settings && connectionTest.sampleData.settings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Site Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {connectionTest.sampleData.settings.map((setting: any) => (
                      <div key={setting.key} className="flex justify-between p-2 border rounded text-sm">
                        <span className="font-medium">{setting.key}</span>
                        <span className="text-gray-600">{setting.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Duplicate Data Warning */}
        {connectionTest.connected && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                <CardTitle>Duplicate Data Issue</CardTitle>
              </div>
              <CardDescription>
                If you're getting duplicate key errors, you may have run the seed script multiple times
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-medium text-amber-900 mb-2">To Fix Duplicate Data:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-amber-700">
                  <li>
                    Run <code className="bg-amber-100 px-1 rounded">scripts/05-fix-duplicate-data.sql</code> to clean
                    and re-seed
                  </li>
                  <li>
                    Or run <code className="bg-amber-100 px-1 rounded">scripts/06-check-data-status.sql</code> to see
                    current data
                  </li>
                  <li>This will clear existing sample data and add fresh data</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Test your application functionality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Button asChild>
                <Link href="/">View Homepage</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/blog">View Blog</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/about">View About Page</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login/admin">Admin Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
