"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { createSlug } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";
import { clientDb } from "@/utils/supabase/client-database";

interface PostFormProps {
  post?: BlogPost;
  isEditing?: boolean;
}

export function PostForm({ post, isEditing = false }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [isPublished, setIsPublished] = useState(!!post?.published_at);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isEditing || !slug) {
      setSlug(createSlug(newTitle));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const postData = {
        title,
        slug,
        excerpt,
        content,
        published_at: isPublished ? new Date().toISOString() : undefined,
      };

      let result;
      if (isEditing && post?.id) {
        result = await clientDb.posts.update(post.id, postData);
      } else {
        result = await clientDb.posts.create(postData);
      }

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast({
        title: isEditing ? "Post updated" : "Post created",
        description: `Your blog post has been ${isEditing ? "updated" : "created"} successfully.`,
      });

      router.push("/admin/posts");
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Save failed",
        description:
          error instanceof Error ? error.message : "There was a problem saving your post.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter post title"
            required
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="post-url-slug"
            required
          />
          <p className="text-sm text-gray-600 mt-1">
            This will be used in the URL: /blog/{slug}
          </p>
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brief description of the post"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog post content here..."
            rows={15}
            required
          />
          <p className="text-sm text-gray-600 mt-1">
            You can use basic HTML tags for formatting.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={isPublished}
            onCheckedChange={setIsPublished}
          />
          <Label htmlFor="published">Publish immediately</Label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/posts")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
