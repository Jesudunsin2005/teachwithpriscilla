import { NextResponse } from "next/server";
import { serverAuth } from "@/utils/supabase/auth";

export async function POST() {
  await serverAuth.signOut();

  return NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
  );
}
