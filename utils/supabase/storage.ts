import { createClient } from "./client";
import { createClient as createServerClient } from "./server";

// Client-side storage utilities
export const storage = {
  // Upload a file to storage
  uploadFile: async (
    bucket: string,
    path: string,
    file: File,
    options?: {
      cacheControl?: string;
      upsert?: boolean;
    }
  ) => {
    const supabase = createClient();
    return await supabase.storage.from(bucket).upload(path, file, options);
  },

  // Download a file from storage
  downloadFile: async (bucket: string, path: string) => {
    const supabase = createClient();
    return await supabase.storage.from(bucket).download(path);
  },

  // Get a public URL for a file
  getPublicUrl: (bucket: string, path: string) => {
    const supabase = createClient();
    return supabase.storage.from(bucket).getPublicUrl(path);
  },

  // List files in a bucket
  listFiles: async (bucket: string, path?: string) => {
    const supabase = createClient();
    return await supabase.storage.from(bucket).list(path);
  },

  // Delete a file from storage
  deleteFile: async (bucket: string, path: string) => {
    const supabase = createClient();
    return await supabase.storage.from(bucket).remove([path]);
  },

  // Update a file in storage
  updateFile: async (
    bucket: string,
    path: string,
    file: File,
    options?: {
      cacheControl?: string;
      upsert?: boolean;
    }
  ) => {
    const supabase = createClient();
    return await supabase.storage.from(bucket).update(path, file, options);
  },
};

// Server-side storage utilities
export const serverStorage = {
  // Upload a file to storage (server-side)
  uploadFile: async (
    bucket: string,
    path: string,
    file: Buffer,
    options?: {
      cacheControl?: string;
      upsert?: boolean;
    }
  ) => {
    const supabase = await createServerClient();
    return await supabase.storage.from(bucket).upload(path, file, options);
  },

  // Download a file from storage (server-side)
  downloadFile: async (bucket: string, path: string) => {
    const supabase = await createServerClient();
    return await supabase.storage.from(bucket).download(path);
  },

  // Get a public URL for a file (server-side)
  getPublicUrl: async (bucket: string, path: string) => {
    const supabase = await createServerClient();
    return supabase.storage.from(bucket).getPublicUrl(path);
  },

  // List files in a bucket (server-side)
  listFiles: async (bucket: string, path?: string) => {
    const supabase = await createServerClient();
    return await supabase.storage.from(bucket).list(path);
  },

  // Delete a file from storage (server-side)
  deleteFile: async (bucket: string, path: string) => {
    const supabase = await createServerClient();
    return await supabase.storage.from(bucket).remove([path]);
  },
};

// Storage helper functions
export const storageHelpers = {
  // Generate a unique file path
  generateFilePath: (fileName: string, folder?: string) => {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const extension = fileName.split(".").pop();
    const name = fileName.split(".")[0].replace(/[^a-zA-Z0-9]/g, "_");

    const path = folder
      ? `${folder}/${name}_${timestamp}_${randomId}.${extension}`
      : `${name}_${timestamp}_${randomId}.${extension}`;
    return path;
  },

  // Validate file type
  validateFileType: (file: File, allowedTypes: string[]) => {
    return allowedTypes.includes(file.type);
  },

  // Validate file size (in bytes)
  validateFileSize: (file: File, maxSize: number) => {
    return file.size <= maxSize;
  },

  // Get file extension
  getFileExtension: (fileName: string) => {
    return fileName.split(".").pop()?.toLowerCase();
  },

  // Format file size
  formatFileSize: (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  },
};

// Default storage buckets
export const STORAGE_BUCKETS = {
  RESOURCES: "resources",
  BLOG_IMAGES: "blog-images",
  PROFILE_PICTURES: "profile-pictures",
} as const;

// Allowed file types for different buckets
export const ALLOWED_FILE_TYPES = {
  [STORAGE_BUCKETS.RESOURCES]: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
    "image/gif",
  ],
  [STORAGE_BUCKETS.BLOG_IMAGES]: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ],
  [STORAGE_BUCKETS.PROFILE_PICTURES]: ["image/jpeg", "image/png", "image/gif"],
} as const;

// Max file sizes (in bytes)
export const MAX_FILE_SIZES = {
  [STORAGE_BUCKETS.RESOURCES]: 10 * 1024 * 1024, // 10MB
  [STORAGE_BUCKETS.BLOG_IMAGES]: 5 * 1024 * 1024, // 5MB
  [STORAGE_BUCKETS.PROFILE_PICTURES]: 2 * 1024 * 1024, // 2MB
} as const;
