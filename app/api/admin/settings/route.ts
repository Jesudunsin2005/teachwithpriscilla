import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { updateSiteSetting } from "@/lib/site-settings"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = createServerClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get request body
    const body = await request.json()

    try {
      // Update settings
      if (body.teaching_experience_years) {
        await updateSiteSetting("teaching_experience_years", body.teaching_experience_years)
      }

      if (body.students_taught_count) {
        await updateSiteSetting("students_taught_count", body.students_taught_count)
      }

      return NextResponse.json({ success: true })
    } catch (settingsError) {
      console.error("Error updating settings:", settingsError)
      return NextResponse.json(
        {
          error: "Failed to update settings. Make sure the site_settings table exists in your database.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in settings API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
