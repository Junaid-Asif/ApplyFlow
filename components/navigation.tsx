"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileUp, BookOpen } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import ColorCustomizer from "./color-customizer"

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <FileUp className="h-8 w-8 text-accent-primary" style={{ color: "var(--accent-primary)" }} />
            <span className="font-tourney text-2xl font-bold text-gray-900 dark:text-white">ApplyFlow</span>
          </div>

          <div className="flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full font-tourney font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:bg-[var(--accent-primary)] hover:text-white ${
                pathname === "/"
                  ? "text-white shadow-sm bg-[var(--accent-primary)]"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              Upload
            </Link>
            <Link
              href="/api-docs"
              className={`px-4 py-2 rounded-full font-tourney font-medium transition-all duration-200 flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:bg-[var(--accent-primary)] hover:text-white ${
                pathname === "/api-docs"
                  ? "text-white shadow-sm bg-[var(--accent-primary)] ring-2 ring-blue-500"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>API Docs</span>
            </Link>
            <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 flex items-center space-x-2">
              <ColorCustomizer />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
