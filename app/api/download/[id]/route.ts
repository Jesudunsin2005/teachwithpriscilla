import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Get resource info from database
    const { data: resource, error } = await supabase.from("resources").select("*").eq("id", id).single()

    if (error || !resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 })
    }

    // In a real implementation, you would:
    // 1. Get the file from Supabase Storage
    // 2. Return the file as a download
    // For now, we'll redirect to a placeholder

    return NextResponse.redirect(new URL("/placeholder.pdf", request.url))
  } catch (error) {
    console.error("Download error:", error)
    return NextResponse.json({ error: "Download failed" }, { status: 500 })
  }
}
