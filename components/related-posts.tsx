import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { serverDb } from "@/utils/supabase/database";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

interface RelatedPostsProps {
  currentPostId: string;
}

export async function RelatedPosts({ currentPostId }: RelatedPostsProps) {
  const { data: posts, error } = await serverDb.posts.getPublished();

  if (error || !posts) {
    return null;
  }

  // Filter out current post and get up to 3 related posts
  const relatedPosts = posts
    .filter((post) => post.id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedPosts.map((post) => (
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
    </div>
  );
}
