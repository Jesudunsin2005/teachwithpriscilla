import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import type { Resource } from "@/lib/types"
import { NewsletterSignup } from "@/components/newsletter-signup"

async function getResources(): Promise<Resource[]> {
  const { data, error } = await supabase.from("resources").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching resources:", error)
    return []
  }

  return data || []
}

export const metadata = {
  title: "Free Resources - Teach with Priscilla",
  description: "Download free English learning resources including flashcards, worksheets, and pronunciation guides.",
}

export default async function ResourcesPage() {
  const resources = await getResources()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Free Learning Resources</h1>
        <p className="mt-4 text-lg text-gray-600">
          Download helpful materials to support your English learning journey
        </p>
      </div>

      {/* Newsletter Signup Prompt */}
      <div className="bg-blue-50 rounded-lg p-8 mb-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Notified of New Resources</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter to be the first to know when new resources are available.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </div>

      {resources.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No resources available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.id} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <Download className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="line-clamp-2">{resource.title}</span>
                </CardTitle>
                {resource.description && (
                  <CardDescription className="line-clamp-3">{resource.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-1 flex items-end">
                <Button asChild className="w-full">
                  <a href={`/api/download/${resource.id}`} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
