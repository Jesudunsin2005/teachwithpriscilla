import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { validateEnvironment } from "@/lib/env-check"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Teach with Priscilla - English Learning for Kids",
  description:
    "Join Priscilla on her teaching journey. Resources, tips, and insights for English learning for non-native kids and beginners.",
  keywords: "English teaching, kids English, ESL, language learning, teaching resources",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Validate environment variables on app start
  try {
    validateEnvironment()
  } catch (error) {
    // In development, show the error
    if (process.env.NODE_ENV === "development") {
      return (
        <html lang="en">
          <body className={inter.className}>
            <div className="min-h-screen flex items-center justify-center bg-red-50 p-8">
              <div className="max-w-2xl mx-auto">
                <div className="bg-white border border-red-200 rounded-lg p-6 shadow-lg">
                  <h1 className="text-2xl font-bold text-red-600 mb-4">Environment Setup Required</h1>
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded border overflow-auto">
                    {error instanceof Error ? error.message : "Unknown error"}
                  </pre>
                </div>
              </div>
            </div>
          </body>
        </html>
      )
    }
    // In production, let it fail gracefully
    console.error("Environment validation failed:", error)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
