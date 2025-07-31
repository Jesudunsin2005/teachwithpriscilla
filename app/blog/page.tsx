import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { serverDb } from "@/utils/supabase/database";

export const metadata = {
  title: "Blog - Teach with Priscilla",
  description:
    "Teaching insights, tips, and stories from an English tutor for non-native kids and beginners.",
};

export default async function BlogPage() {
  const { data: posts, error } = await serverDb.posts.getPublished();

  if (error) {
    console.error("Error fetching blog posts:", error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-red-500">
            Error loading blog posts. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Teaching Blog
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Insights, tips, and stories from my English teaching journey
        </p>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No blog posts published yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    {formatDate(post.published_at!)}
                  </span>
                </div>
                <CardTitle className="line-clamp-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                {post.excerpt && (
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-1 flex items-end">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
