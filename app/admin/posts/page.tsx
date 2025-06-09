import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, FileText } from "lucide-react"
import { createServerClient } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"
import type { BlogPost } from "@/lib/types"
import { DeletePostButton } from "@/components/admin/delete-post-button"

async function getAllBlogPosts(): Promise<BlogPost[]> {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching blog posts:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getAllBlogPosts:", error)
    return []
  }
}

export const metadata = {
  title: "Blog Posts - Admin Dashboard",
}

export default async function AdminPostsPage() {
  const posts = await getAllBlogPosts()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600">Manage your blog content</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
            <p className="text-gray-600 text-center mb-4">Get started by creating your first blog post.</p>
            <Button asChild>
              <Link href="/admin/posts/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Post
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">{post.excerpt}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {post.published_at ? (
                      <Badge variant="default">Published</Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <p>Created: {formatDate(post.created_at)}</p>
                    {post.published_at && <p>Published: {formatDate(post.published_at)}</p>}
                  </div>
                  <div className="flex gap-2">
                    {post.published_at && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          View
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/posts/${post.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeletePostButton postId={post.id} postTitle={post.title} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
