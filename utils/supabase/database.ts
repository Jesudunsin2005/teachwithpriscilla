import { createClient } from "./client";
import { createClient as createServerClient } from "./server";

// Client-side database utilities
export const db = {
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
      return await supabase.from("site_settings").upsert([{ key, value }]);
    },

    getAll: async () => {
      const supabase = createClient();
      return await supabase.from("site_settings").select("*");
    },
  },
};

// Server-side database utilities
export const serverDb = {
  // Blog posts (server-side)
  posts: {
    getAll: async () => {
      const supabase = await createServerClient();
      return await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false });
    },

    getPublished: async () => {
      const supabase = await createServerClient();
      return await supabase
        .from("blog_posts")
        .select("*")
        .not("published_at", "is", null)
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });
    },

    getBySlug: async (slug: string) => {
      const supabase = await createServerClient();
      return await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();
    },

    getById: async (id: string) => {
      const supabase = await createServerClient();
      return await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();
    },
  },

  // Resources (server-side)
  resources: {
    getAll: async () => {
      const supabase = await createServerClient();
      return await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });
    },

    getById: async (id: string) => {
      const supabase = await createServerClient();
      return await supabase.from("resources").select("*").eq("id", id).single();
    },
  },

  // Subscribers (server-side)
  subscribers: {
    create: async (email: string) => {
      const supabase = await createServerClient();
      return await supabase.from("subscribers").insert([{ email }]);
    },

    getAll: async () => {
      const supabase = await createServerClient();
      return await supabase
        .from("subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });
    },
  },

  // Site settings (server-side)
  settings: {
    get: async (key: string) => {
      const supabase = await createServerClient();
      return await supabase
        .from("site_settings")
        .select("value")
        .eq("key", key)
        .single();
    },

    getAll: async () => {
      const supabase = await createServerClient();
      return await supabase.from("site_settings").select("*");
    },
  },
};
