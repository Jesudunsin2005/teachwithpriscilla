"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
export function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isLoginPage = pathname.startsWith("/login");

  if (isAdminPage || isLoginPage) {
    return null;
  }

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              About
            </h3>
            <p className="mt-4 text-base text-gray-500">
              Passionate English teacher helping non-native kids and
              beginners(teens/adults) discover the joy of language learning.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/blog"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Free Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  About Me
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Connect with Me via Preply
            </h3>
            <p className="mt-4 text-base text-gray-500">
              Ready to start your English learning journey with personalized
              lessons?
            </p>
            <div className="mt-4">
              <Link
                href="https://preply.com/en/tutor/6530776"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Book a Lesson on Preply
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} Teach with Priscilla. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
