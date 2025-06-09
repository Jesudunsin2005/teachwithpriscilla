import { PostForm } from "@/components/admin/post-form"

export const metadata = {
  title: "Create New Post - Admin Dashboard",
}

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
        <p className="text-gray-600">Write and publish a new blog post</p>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <PostForm />
      </div>
    </div>
  )
}
