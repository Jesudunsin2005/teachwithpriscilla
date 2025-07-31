// Export all Supabase utilities
export * from "./client";
export * from "./server";
export * from "./auth";
export * from "./database";
export * from "./storage";
export * from "./middleware";
export * from "./client-auth";
export * from "./client-database";

// Re-export commonly used utilities
export { createClient } from "./client";
export { createClient as createServerClient } from "./server";
export { auth, serverAuth, authHelpers } from "./auth";
export { clientAuth, clientAuthHelpers } from "./client-auth";
export { db, serverDb } from "./database";
export { clientDb } from "./client-database";
export {
  storage,
  serverStorage,
  storageHelpers,
  STORAGE_BUCKETS,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZES,
} from "./storage";
export { updateSession } from "./middleware";
