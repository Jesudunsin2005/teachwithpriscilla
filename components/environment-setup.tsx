"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EnvironmentSetup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            <CardTitle>Environment Setup Required</CardTitle>
          </div>
          <CardDescription>Your Supabase environment variables are missing. Let's get you set up!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-semibold text-amber-800 mb-2">Quick Setup Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-amber-700">
              <li>
                Create a <code className="bg-amber-100 px-1 rounded">.env.local</code> file in your project root
              </li>
              <li>Go to your Supabase dashboard → Settings → API</li>
              <li>Copy your Project URL and API keys</li>
              <li>Add them to your .env.local file</li>
              <li>Restart your development server</li>
            </ol>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Add these to your .env.local file:</h4>
            <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
              {`NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000`}
            </pre>
          </div>

          <div className="flex gap-4">
            <Button asChild>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Open Supabase Dashboard
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              <strong>Need help?</strong> Check the README.md file for detailed setup instructions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
