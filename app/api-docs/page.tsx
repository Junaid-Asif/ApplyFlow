"use client"

import { Code, Globe, FileText, Zap } from "lucide-react"

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-tourney text-5xl font-bold text-gray-900 dark:text-white mb-4">API Documentation</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Learn how to integrate resume uploads into your application
            </p>
          </div>

          {/* Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 mb-8 transition-colors duration-200">
            <h2 className="font-tourney text-3xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our resume upload API accepts PDF files via HTTP POST requests. Simply send your file to our webhook
              endpoint and receive instant confirmation.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
                  <span className="font-tourney font-semibold text-gray-800 dark:text-gray-200">Endpoint</span>
                </div>
                <code className="text-sm text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-700 px-3 py-1 rounded">
                  https://your-webhook-url.com/upload
                </code>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
                  <span className="font-tourney font-semibold text-gray-800 dark:text-gray-200">Format</span>
                </div>
                <code className="text-sm text-green-700 dark:text-green-300 bg-white dark:bg-gray-700 px-3 py-1 rounded">
                  PDF files only
                </code>
              </div>
            </div>
          </div>

          {/* Example Request (cURL) */}
          <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4 mt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Code className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
              <span className="font-tourney font-semibold text-gray-800 dark:text-gray-200">Example Request (cURL)</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              See how to upload a PDF file using a cURL command.
            </p>
          </div>

          {/* Example Request (JavaScript) */}
          <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4 mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
              <span className="font-tourney font-semibold text-gray-800 dark:text-gray-200">Example Request (JavaScript)</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              Learn how to upload a PDF file using JavaScript and the Fetch API.
            </p>
          </div>

          {/* Response Example */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
              <span className="font-tourney font-semibold text-gray-800 dark:text-gray-200">Response Example</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              Example of a successful JSON response returned by the API after uploading a resume.
            </p>
          </div>

          {/* Possible Errors */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
              <span className="font-tourney font-semibold text-gray-800 dark:text-gray-200">Possible Errors</span>
            </div>
            <ul className="text-xs text-red-700 dark:text-red-300 list-disc pl-5">
              <li>400: No file provided</li>
              <li>400: Invalid file format (only PDF allowed)</li>
              <li>413: File too large (max 10MB)</li>
              <li>500: Upload failed (server error)</li>
            </ul>
          </div>

          {/* Support/Contact Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
              <span className="font-tourney font-semibold text-gray-800 dark:text-gray-200">Support</span>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              For questions or support, please contact (this works) <a href="mailto:mjunaidasifjob@gmail.com" className="underline">support@example.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
