import { notFound } from "next/navigation"
import { PostForm } from "@/components/admin/post-form"
import { createServerClient } from "@/lib/supabase"
import type { BlogPost } from "@/lib/types"

async function getPost(id: string): Promise<BlogPost | null> {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching post:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getPost:", error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)

  return {
    title: post ? `Edit: ${post.title} - Admin Dashboard` : "Post Not Found - Admin Dashboard",
  }
}

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
        <p className="text-gray-600">Update your blog post</p>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <PostForm post={post} isEditing={true} />
      </div>
    </div>
  )
}
