import { supabase } from "@/lib/supabase"
import { createServerClient } from "@/lib/supabase"

export type SiteSettingKey = "teaching_experience_years" | "students_taught_count"

export async function getSiteSettings() {
  try {
    const { data, error } = await supabase.from("site_settings").select("*")

    if (error) {
      console.error("Error fetching site settings:", error)
      // Return default values if table doesn't exist
      return {
        teaching_experience_years: "5",
        students_taught_count: "200",
      }
    }

    // Convert array of objects to a key-value object
    const settings: Record<string, string> = {}
    data.forEach((item) => {
      settings[item.key] = item.value
    })

    return settings
  } catch (error) {
    console.error("Error in getSiteSettings:", error)
    // Return default values on any error
    return {
      teaching_experience_years: "5",
      students_taught_count: "200",
    }
  }
}

export async function getSiteSetting(key: SiteSettingKey, defaultValue = "") {
  try {
    const { data, error } = await supabase.from("site_settings").select("value").eq("key", key).single()

    if (error || !data) {
      console.error(`Error fetching site setting ${key}:`, error)
      // Return specific default values for known keys
      const defaults = {
        teaching_experience_years: "5",
        students_taught_count: "200",
      }
      return defaults[key] || defaultValue
    }

    return data.value
  } catch (error) {
    console.error(`Error in getSiteSetting for ${key}:`, error)
    // Return specific default values for known keys
    const defaults = {
      teaching_experience_years: "5",
      students_taught_count: "200",
    }
    return defaults[key] || defaultValue
  }
}

export async function updateSiteSetting(key: SiteSettingKey, value: string) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("site_settings")
      .upsert({ key, value, updated_at: new Date().toISOString() })
      .select()

    if (error) {
      console.error(`Error updating site setting ${key}:`, error)
      throw new Error(`Failed to update ${key}`)
    }

    return data
  } catch (error) {
    console.error(`Error in updateSiteSetting for ${key}:`, error)
    throw new Error(`Failed to update ${key}`)
  }
}
