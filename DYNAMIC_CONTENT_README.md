# Dynamic Content System for About Page

## Overview

The About page now uses a dynamic content system that allows administrators to edit all content through the admin panel without touching code. All content is stored in the `site_settings` table and can be managed from `/admin/settings`.

## Database Schema

The system uses the existing `site_settings` table:

```sql
CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  key text NOT NULL,
  value text NOT NULL,
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT site_settings_pkey PRIMARY KEY (id),
  CONSTRAINT site_settings_key_key UNIQUE (key)
);
```

## Content Keys

### Teaching Statistics

- `teaching_experience_years` - Number of years teaching experience
- `students_taught_count` - Number of students taught

### Hero Section

- `about_hero_title` - Main title (e.g., "Hi, I'm Priscilla!")
- `about_hero_description` - Hero description paragraph

### Teaching Journey Section

- `about_journey_title` - Section title
- `about_journey_paragraph_1` - First paragraph
- `about_journey_paragraph_2` - Second paragraph
- `about_journey_paragraph_3` - Third paragraph

### Philosophy Cards

- `about_philosophy_title` - "My Teaching Philosophy" title
- `about_philosophy_content` - Philosophy content
- `about_approach_title` - "My Approach" title
- `about_approach_content` - Approach content
- `about_work_with_title` - "Who I Work With" title
- `about_work_with_content` - Work with content

### Mission Section

- `about_mission_title` - Mission section title
- `about_mission_quote` - Mission quote text

### Call to Action Section

- `about_cta_title` - CTA section title
- `about_cta_description` - CTA description
- `about_cta_button_text` - Button text

## How It Works

### 1. About Page (`app/about/page.tsx`)

- Fetches all settings from database using `serverDb.settings.get()`
- Uses fallback default values if database query fails
- Displays dynamic content based on database values

### 2. Admin Settings Page (`app/admin/settings/page.tsx`)

- Fetches all current settings from database
- Provides default values for any missing settings
- Passes settings to the form component

### 3. Settings Form (`components/admin/site-settings-form.tsx`)

- Organized into sections with cards for better UX
- Uses textarea for longer content and input for shorter content
- Saves all changes to database using `clientDb.settings.set()`
- Provides real-time feedback with toast notifications

## Setup Instructions

### 1. Initialize Database

Run the SQL script to populate the database with default values:

```sql
-- Run the init-site-settings.sql file in your Supabase SQL editor
```

### 2. Access Admin Panel

1. Navigate to `/admin/settings`
2. You'll see all the content organized in sections
3. Edit any content and click "Save All Changes"
4. Changes are immediately reflected on the About page

## Features

### ✅ **Fallback System**

- If database is unavailable, page shows default content
- No broken pages if settings are missing

### ✅ **Real-time Updates**

- Changes in admin panel immediately reflect on About page
- No need to restart server or rebuild

### ✅ **Organized Admin Interface**

- Content organized into logical sections
- Clear labels and descriptions
- Textarea for longer content, input for shorter content

### ✅ **Error Handling**

- Graceful fallbacks if database queries fail
- Toast notifications for success/error feedback
- Form validation for required fields

### ✅ **Unique Key System**

- Each content piece has a unique key
- Uses `ON CONFLICT` to update existing values
- No duplicate entries in database

## Adding New Content

To add new dynamic content:

1. **Add to About Page:**

   ```typescript
   // In defaultContent object
   new_content_key: "Default value",

   // In JSX
   {content.new_content_key}
   ```

2. **Add to Admin Settings:**

   ```typescript
   // In defaultSettings object
   new_content_key: "Default value",
   ```

3. **Add to Settings Form:**

   ```typescript
   <div>
     <Label htmlFor="new_content_key">Label</Label>
     <Input
       id="new_content_key"
       value={formData.new_content_key || ""}
       onChange={(e) => handleInputChange("new_content_key", e.target.value)}
       required
     />
   </div>
   ```

4. **Add to Database:**
   ```sql
   INSERT INTO site_settings (key, value) VALUES
   ('new_content_key', 'Default value')
   ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
   ```

## Benefits

- **No Code Changes Required** - Content can be updated without touching code
- **Immediate Updates** - Changes reflect instantly on the live site
- **User-Friendly** - Non-technical users can update content
- **Scalable** - Easy to add new dynamic content sections
- **Reliable** - Fallback system ensures site never breaks
- **Organized** - Clear separation of concerns and logical grouping

## Technical Implementation

- **Server-side fetching** for initial page load
- **Client-side updates** for admin form submissions
- **Optimistic updates** with error handling
- **Type-safe** with TypeScript interfaces
- **Responsive design** with proper form layout
