import { createClient } from "./client";

// Client-side auth utilities (no server imports)
export const clientAuth = {
  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const supabase = createClient();
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  // Sign up with email and password
  signUp: async (email: string, password: string) => {
    const supabase = createClient();
    return await supabase.auth.signUp({
      email,
      password,
    });
  },

  // Sign out
  signOut: async () => {
    const supabase = createClient();
    return await supabase.auth.signOut();
  },

  // Get current user (client-side)
  getUser: async () => {
    const supabase = createClient();
    return await supabase.auth.getUser();
  },

  // Get current session (client-side)
  getSession: async () => {
    const supabase = createClient();
    return await supabase.auth.getSession();
  },

  // Listen to auth state changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    const supabase = createClient();
    return supabase.auth.onAuthStateChange(callback);
  },
};

// Client-side auth helper functions
export const clientAuthHelpers = {
  // Check if user is authenticated
  isAuthenticated: async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return !!user;
  },

  // Check if user is admin (you can customize this logic)
  isAdmin: async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.email === "admin@teachwithpriscilla.com";
  },

  // Get user profile
  getUserProfile: async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },
};
