import { createClient } from "./client";

// Client-side database utilities (no server imports)
export const clientDb = {
  // Blog posts
  posts: {
    getAll: async () => {
      const supabase = createClient();
      return await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false });
    },

    getPublished: async () => {
      const supabase = createClient();
      return await supabase
        .from("blog_posts")
        .select("*")
        .not("published_at", "is", null)
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });
    },

    getBySlug: async (slug: string) => {
      const supabase = createClient();
      return await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();
    },

    getById: async (id: string) => {
      const supabase = createClient();
      return await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();
    },

    create: async (post: {
      title: string;
      slug: string;
      excerpt?: string;
      content: string;
      published_at?: string;
    }) => {
      const supabase = createClient();
      return await supabase.from("blog_posts").insert([post]);
    },

    update: async (
      id: string,
      updates: Partial<{
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        published_at: string;
      }>
    ) => {
      const supabase = createClient();
      return await supabase.from("blog_posts").update(updates).eq("id", id);
    },

    delete: async (id: string) => {
      const supabase = createClient();
      return await supabase.from("blog_posts").delete().eq("id", id);
    },
  },

  // Resources
  resources: {
    getAll: async () => {
      const supabase = createClient();
      return await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });
    },

    getById: async (id: string) => {
      const supabase = createClient();
      return await supabase.from("resources").select("*").eq("id", id).single();
    },

    create: async (resource: {
      title: string;
      description?: string;
      file_path: string;
    }) => {
      const supabase = createClient();
      return await supabase.from("resources").insert([resource]);
    },

    update: async (
      id: string,
      updates: Partial<{
        title: string;
        description: string;
        file_path: string;
      }>
    ) => {
      const supabase = createClient();
      return await supabase.from("resources").update(updates).eq("id", id);
    },

    delete: async (id: string) => {
      const supabase = createClient();
      return await supabase.from("resources").delete().eq("id", id);
    },
  },

  // Subscribers
  subscribers: {
    create: async (email: string) => {
      const supabase = createClient();
      return await supabase.from("subscribers").insert([{ email }]);
    },

    getAll: async () => {
      const supabase = createClient();
      return await supabase
        .from("subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });
    },

    getByEmail: async (email: string) => {
      const supabase = createClient();
      return await supabase
        .from("subscribers")
        .select("*")
        .eq("email", email)
        .single();
    },

    delete: async (id: string) => {
      const supabase = createClient();
      return await supabase.from("subscribers").delete().eq("id", id);
    },
  },

  // Site settings
  settings: {
    get: async (key: string) => {
      const supabase = createClient();
      return await supabase
        .from("site_settings")
        .select("value")
        .eq("key", key)
        .single();
    },

    set: async (key: string, value: string) => {
      const supabase = createClient();
      return await supabase.from("site_settings").upsert([{ key, value }], {
        onConflict: "key",
        ignoreDuplicates: false,
      });
    },

    getAll: async () => {
      const supabase = createClient();
      return await supabase.from("site_settings").select("*");
    },
  },
};
