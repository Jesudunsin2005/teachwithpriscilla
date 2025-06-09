import type React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/serverSupaBase";

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
}

async function getUser() {
  "use server";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  return user;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link
                href="/admin"
                className="text-xl font-semibold text-gray-900 hover:text-gray-700"
              >
                Admin Dashboard
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/posts"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Blog Posts
                </Link>
                <Link
                  href="/admin/resources"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Resources
                </Link>
                <Link
                  href="/admin/settings"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Settings
                </Link>
                <Link
                  href="/admin/subscribers"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Subscribers
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 text-sm">
                Welcome, {user.email}
              </span>
              <form action={signOut}>
                <Button type="submit" variant="ghost" size="sm">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
