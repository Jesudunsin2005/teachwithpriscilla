import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

async function getFeaturedPost(): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error fetching featured post:", error);
    return null;
  }

  // Return the first post if it exists, otherwise null
  return data && data.length > 0 ? data[0] : null;
}

export default async function HomePage() {
  const featuredPost = await getFeaturedPost();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to My Teaching Journey
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Join me as I share insights, resources, and stories from teaching
              English to non-native kids and beginners (teens/adults). Every
              lesson is an adventure, and every breakthrough is a celebration.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link
                  href="https://preply.com/en/tutor/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Lesson
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/blog">Read My Blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Post */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Latest from the Blog
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Fresh insights and teaching tips
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{featuredPost.title}</CardTitle>
                <span className="text-sm text-gray-500">
                  {formatDate(featuredPost.published_at!)}
                </span>
              </div>
              {featuredPost.excerpt && (
                <CardDescription className="text-base">
                  {featuredPost.excerpt}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href={`/blog/${featuredPost.slug}`}>Read Full Post</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Why I Teach Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Why I Teach
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Teaching English to young learners isn't just my profession—it's
                my passion. I believe that language learning should be joyful,
                engaging, and tailored to each child's unique needs.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Through patience, creativity, and lots of encouragement, I help
                children build confidence in their English skills while having
                fun along the way.
              </p>
              <div className="mt-8">
                <Button asChild variant="outline">
                  <Link href="/about">Learn More About Me</Link>
                </Button>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8">
                <blockquote className="text-lg italic text-gray-700">
                  "Every child has the potential to master English. My job is to
                  unlock that potential with patience, creativity, and genuine
                  care."
                </blockquote>
                <cite className="block mt-4 text-sm font-semibold text-gray-900">
                  — Priscilla
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Stay Connected
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Get the latest teaching tips, resources, and stories delivered to
              your inbox.
            </p>
          </div>
          <div className="mt-8 max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
}
