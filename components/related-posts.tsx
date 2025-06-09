import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import type { BlogPost } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface RelatedPostsProps {
  currentPostId: string
}

async function getRelatedPosts(currentPostId: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .neq("id", currentPostId)
    .order("published_at", { ascending: false })
    .limit(3)

  if (error) {
    console.error("Error fetching related posts:", error)
    return []
  }

  return data || []
}

export async function RelatedPosts({ currentPostId }: RelatedPostsProps) {
  const relatedPosts = await getRelatedPosts(currentPostId)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="border-t border-gray-200 pt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="text-sm text-gray-500 mb-2">{formatDate(post.published_at!)}</div>
              <CardTitle className="text-lg">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
              {post.excerpt && <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>}
            </CardHeader>
            <CardContent>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Read more →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
