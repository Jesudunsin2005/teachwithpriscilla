# Supabase Utilities

This directory contains all Supabase-related utilities organized in a clean, modular structure.

## Structure

```
utils/supabase/
├── client.ts          # Browser client
├── server.ts          # Server client
├── auth.ts            # Authentication utilities
├── database.ts        # Database operations
├── storage.ts         # Storage operations
├── middleware.ts      # Middleware utilities
├── index.ts           # Main exports
└── README.md          # This file
```

## Usage

### Authentication

```typescript
import { auth, serverAuth, authHelpers } from "@/utils/supabase/auth";

// Client-side auth
const { data, error } = await auth.signIn(email, password);
const { data: user } = await auth.getUser();
await auth.signOut();

// Server-side auth
const { data: user } = await serverAuth.getUser();

// Auth helpers
const isAuthenticated = await authHelpers.isAuthenticated();
const isAdmin = await authHelpers.isAdmin();
```

### Database Operations

```typescript
import { db, serverDb } from "@/utils/supabase/database";

// Client-side database operations
const { data: posts } = await db.posts.getAll();
const { data: resources } = await db.resources.getAll();
const { data: subscribers } = await db.subscribers.getAll();

// Server-side database operations
const { data: posts } = await serverDb.posts.getPublished();
const { data: post } = await serverDb.posts.getBySlug(slug);
```

### Storage Operations

```typescript
import {
  storage,
  serverStorage,
  storageHelpers,
  STORAGE_BUCKETS,
} from "@/utils/supabase/storage";

// Upload file
const { data, error } = await storage.uploadFile(
  STORAGE_BUCKETS.RESOURCES,
  "path/to/file.pdf",
  file
);

// Get public URL
const { data: url } = storage.getPublicUrl(
  STORAGE_BUCKETS.RESOURCES,
  "path/to/file.pdf"
);

// Generate unique file path
const filePath = storageHelpers.generateFilePath("document.pdf", "resources");
```

### Complete Example

```typescript
import { auth, db, storage, STORAGE_BUCKETS } from "@/utils/supabase";

// Sign in user
const {
  data: { user },
} = await auth.signIn(email, password);

// Upload resource file
const filePath = storageHelpers.generateFilePath(file.name, "resources");
const { data: uploadData } = await storage.uploadFile(
  STORAGE_BUCKETS.RESOURCES,
  filePath,
  file
);

// Create resource record
const { data: resource } = await db.resources.create({
  title: "New Resource",
  description: "Description",
  file_path: filePath,
});
```

## Environment Variables

Make sure you have these environment variables set:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Database Schema

The utilities are designed to work with this schema:

```sql
-- Blog posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscribers
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed BOOLEAN DEFAULT FALSE
);

-- Site settings
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Storage Buckets

The storage utilities are configured for these buckets:

- `resources` - For downloadable learning resources
- `blog-images` - For blog post images
- `profile-pictures` - For user profile pictures

## Migration from lib/supabase

To migrate from the old `lib/supabase` structure:

1. Replace `import { supabase } from "@/lib/supabase"` with `import { auth, db } from "@/utils/supabase"`
2. Replace `import { createServerClient } from "@/lib/serverSupaBase"` with `import { serverDb } from "@/utils/supabase/database"`
3. Update function calls to use the new utility methods

## Error Handling

All utilities return Supabase's standard response format:

```typescript
{
  data: T | null,
  error: PostgrestError | null
}
```

Always check for errors:

```typescript
const { data, error } = await db.posts.getAll();
if (error) {
  console.error("Error:", error);
  // Handle error
}
```
