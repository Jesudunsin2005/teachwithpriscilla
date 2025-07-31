import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Resource } from "@/lib/types";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { serverDb } from "@/utils/supabase/database";

// Coming Soon Component
function ComingSoon() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Download className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Resources Coming Soon!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We're working hard to create amazing learning resources for you.
            Stay tuned for exciting materials that will help boost your English
            learning journey!
          </p>
        </div>

        {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Get Notified When Resources Are Ready
            </h2>
            <p className="text-gray-600 mb-6">
              Be the first to access our free English learning resources including
              flashcards, worksheets, pronunciation guides, and more!
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterSignup />
            </div>
          </div> */}

        <div className="grid gap-6 md:grid-cols-3 text-left">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">
              📚 Study Materials
            </h3>
            <p className="text-gray-600 text-sm">
              Comprehensive worksheets and practice exercises
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">🎯 Flashcards</h3>
            <p className="text-gray-600 text-sm">
              Interactive vocabulary and grammar flashcards
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">
              🗣️ Pronunciation Guides
            </h3>
            <p className="text-gray-600 text-sm">
              Audio guides and pronunciation tips
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Free Resources - Teach with Priscilla",
  description:
    "Download free English learning resources including flashcards, worksheets, pronunciation guides.",
};

export default async function ResourcesPage() {
  // Set this to false when you want to show the actual resources
  const showComingSoon = true;

  if (showComingSoon) {
    return <ComingSoon />;
  }

  const { data: resources, error } = await serverDb.resources.getAll();

  if (error) {
    console.error("Error fetching resources:", error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-red-500">
            Error loading resources. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Free Learning Resources
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Download helpful materials to support your English learning journey
        </p>
      </div>

      {/* Newsletter Signup Prompt */}
      <div className="bg-blue-50 rounded-lg p-8 mb-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Get Notified of New Resources
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter to be the first to know when new
            resources are available.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </div>

      {!resources || resources.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No resources available yet. Check back soon!
          </p>
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
                  <CardDescription className="line-clamp-3">
                    {resource.description}
                  </CardDescription>
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
  );
}
