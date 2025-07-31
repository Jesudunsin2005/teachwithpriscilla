import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ShareButtons } from "@/components/share-buttons";
import { RelatedPosts } from "@/components/related-posts";
import { serverDb } from "@/utils/supabase/database";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post, error } = await serverDb.posts.getBySlug(slug);

  if (error || !post) {
    return {
      title: "Post Not Found - Teach with Priscilla",
    };
  }

  return {
    title: `${post.title} - Teach with Priscilla`,
    description: post.excerpt || post.content.substring(0, 160),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post, error } = await serverDb.posts.getBySlug(slug);

  if (error || !post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back to Blog */}
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.published_at!}>
              {formatDate(post.published_at!)}
            </time>
          </div>
          <span>•</span>
          <span>By Priscilla</span>
        </div>

        {post.excerpt && (
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <div
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/\n/g, "<br />"),
          }}
        />
      </div>

      {/* Share Buttons */}
      <div className="border-t border-gray-200 pt-8 mb-12">
        <div className="flex items-center gap-4">
          <Share2 className="h-5 w-5 text-gray-600" />
          <span className="text-gray-600 font-medium">Share this post:</span>
          <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
        </div>
      </div>

      {/* Related Posts */}
      <RelatedPosts currentPostId={post.id} />
    </article>
  );
}
