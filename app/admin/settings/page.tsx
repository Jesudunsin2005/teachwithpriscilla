import { SiteSettingsForm } from "@/components/admin/site-settings-form"
import { getSiteSettings } from "@/lib/site-settings"

export const metadata = {
  title: "Site Settings - Admin Dashboard",
}

export default async function AdminSettingsPage() {
  let settings = {
    teaching_experience_years: "5",
    students_taught_count: "200",
  }

  try {
    settings = await getSiteSettings()
  } catch (error) {
    console.error("Error loading settings in admin, using defaults:", error)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-600">Manage editable content across your site</p>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Teaching Highlights</h2>
        <p className="text-sm text-gray-600 mb-4">
          {!settings.teaching_experience_years && !settings.students_taught_count
            ? "Note: Database table not found. Please run the site settings SQL script first."
            : "Update your teaching experience and student count displayed on the About page."}
        </p>
        <SiteSettingsForm
          teachingYears={settings.teaching_experience_years || "5"}
          studentsCount={settings.students_taught_count || "200"}
        />
      </div>
    </div>
  )
}
