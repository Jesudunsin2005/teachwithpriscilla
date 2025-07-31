import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { serverDb } from "@/utils/supabase/database";

async function testDatabaseConnection() {
  try {
    const [postsResult, resourcesResult, subscribersResult] = await Promise.all(
      [
        serverDb.posts.getAll(),
        serverDb.resources.getAll(),
        serverDb.subscribers.getAll(),
      ]
    );

    return {
      success: true,
      posts: postsResult.data?.length || 0,
      resources: resourcesResult.data?.length || 0,
      subscribers: subscribersResult.data?.length || 0,
      errors: [],
    };
  } catch (error) {
    console.error("Database connection test failed:", error);
    return {
      success: false,
      posts: 0,
      resources: 0,
      subscribers: 0,
      errors: [error instanceof Error ? error.message : "Unknown error"],
    };
  }
}

export default async function TestConnectionPage() {
  const result = await testDatabaseConnection();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Database Connection Test
        </h1>
        <p className="text-gray-600">
          Testing connection to Supabase database and checking table access
        </p>
      </div>

      <div className="space-y-6">
        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              Connection Status
            </CardTitle>
            <CardDescription>
              {result.success
                ? "Successfully connected to Supabase database"
                : "Failed to connect to Supabase database"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Blog Posts</span>
                <Badge variant={result.success ? "default" : "destructive"}>
                  {result.posts} posts
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Resources</span>
                <Badge variant={result.success ? "default" : "destructive"}>
                  {result.resources} resources
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Subscribers</span>
                <Badge variant={result.success ? "default" : "destructive"}>
                  {result.subscribers} subscribers
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Details */}
        {!result.success && result.errors.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Error Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {result.errors.map((error, index) => (
                  <div
                    key={index}
                    className="text-sm text-red-600 bg-red-50 p-3 rounded"
                  >
                    {error}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Environment Variables Check */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>
              Check if required environment variables are set
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  NEXT_PUBLIC_SUPABASE_URL
                </span>
                <Badge
                  variant={
                    process.env.NEXT_PUBLIC_SUPABASE_URL
                      ? "default"
                      : "destructive"
                  }
                >
                  {process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  NEXT_PUBLIC_SUPABASE_ANON_KEY
                </span>
                <Badge
                  variant={
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                      ? "default"
                      : "destructive"
                  }
                >
                  {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                    ? "Set"
                    : "Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  SUPABASE_SERVICE_ROLE_KEY
                </span>
                <Badge
                  variant={
                    process.env.SUPABASE_SERVICE_ROLE_KEY
                      ? "default"
                      : "destructive"
                  }
                >
                  {process.env.SUPABASE_SERVICE_ROLE_KEY ? "Set" : "Missing"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
