import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import type { BlogPost } from "@/lib/types";
import { serverDb } from "@/utils/supabase/database";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: post, error } = await serverDb.posts.getById(id);

  return {
    title: post
      ? `Edit: ${post.title} - Admin Dashboard`
      : "Post Not Found - Admin Dashboard",
  };
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: post, error } = await serverDb.posts.getById(id);

  if (error || !post) {
    notFound();
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
  );
}
