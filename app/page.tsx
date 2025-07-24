"use client"

import { useState, useRef } from "react"
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

type UploadStatus = "idle" | "uploading" | "success" | "error"

export default function HomePage() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Replace with your actual webhook URL
  const WEBHOOK_URL = "https://junaidasif21.app.n8n.cloud/webhook-test/my-resume"

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type === "application/pdf") {
        setSelectedFile(file)
        setUploadStatus("idle")
        setErrorMessage("")
      } else {
        setErrorMessage("Please select a PDF file only")
        setUploadStatus("error")
        setSelectedFile(null)
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file first")
      setUploadStatus("error")
      return
    }

    setUploadStatus("uploading")
    setErrorMessage("")

    try {
      const formData = new FormData()
      formData.append("resume", selectedFile)
      formData.append("timestamp", new Date().toISOString())

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setUploadStatus("success")
      } else {
        const data = await response.json();
        setErrorMessage(data.message || `Upload failed with status: ${response.status}`);
        setUploadStatus("error")
      }
    } catch (error) {
      setUploadStatus("error")
      setErrorMessage("Upload failed. Please try again.")
      console.error("Upload error:", error)
    }
  }

  const resetUpload = () => {
    setUploadStatus("idle")
    setSelectedFile(null)
    setErrorMessage("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case "uploading":
        return <Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--accent-primary)" }} />
      case "success":
        return <CheckCircle2 className="h-8 w-8 text-green-500 dark:text-green-400" />
      case "error":
        return <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
      default:
        return <FileText className="h-8 w-8 text-gray-400 dark:text-gray-500" />
    }
  }

  const getStatusMessage = () => {
    switch (uploadStatus) {
      case "uploading":
        return "Uploading your resume..."
      case "success":
        return "Resume uploaded successfully!"
      case "error":
        return errorMessage || "Upload failed"
      default:
        return "Select your PDF resume to get started"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-tourney text-5xl font-bold text-gray-900 dark:text-white mb-4">Upload Your Resume</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              Submit your PDF resume to our professional recruitment platform
            </p>
          </div>

          {/* Upload Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
            <div className="p-8">
              {/* Status Display */}
              <div className="text-center mb-8">
                <div className="mb-4">{getStatusIcon()}</div>
                <h3 className="font-tourney text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {getStatusMessage()}
                </h3>
                {selectedFile && uploadStatus !== "success" && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Selected: {selectedFile.name}</p>
                )}
              </div>

              {/* Upload Form */}
              {uploadStatus !== "success" && (
                <div className="space-y-6">
                  {/* File Input */}
                  <div>
                    <label
                      htmlFor="resume-upload"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Choose PDF Resume
                    </label>
                    <input
                      ref={fileInputRef}
                      id="resume-upload"
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileSelect}
                      disabled={uploadStatus === "uploading"}
                      className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-tourney file:font-medium file:text-white file:cursor-pointer cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      style={
                        {
                          "--file-bg": "var(--accent-primary)",
                          "--file-hover-bg": "var(--accent-hover)",
                        } as React.CSSProperties
                      }
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">PDF files only, max 10MB</p>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleUpload}
                    disabled={!selectedFile || uploadStatus === "uploading"}
                    className={`w-full text-white font-tourney font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed ${
                      uploadStatus !== "uploading" && selectedFile ? "bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)]" : ""
                    }`}
                  >
                    {uploadStatus === "uploading" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-5 w-5" />
                        <span>Upload Resume</span>
                      </>
                    )}
                  </button>

                  {/* Error Message */}
                  {uploadStatus === "error" && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                        <p className="text-red-700 dark:text-red-300 font-medium">{errorMessage}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Success State */}
              {uploadStatus === "success" && (
                <div className="text-center space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <p className="text-green-800 dark:text-green-300 font-medium mb-2">
                      Your resume has been successfully submitted!
                    </p>
                    <p className="text-green-600 dark:text-green-400 text-sm">
                      We'll review your application and get back to you soon.
                    </p>
                  </div>
                  <button
                    onClick={resetUpload}
                    className="font-tourney font-medium underline transition-colors duration-200"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    Upload Another Resume
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "var(--accent-secondary)" }}
              >
                <FileText className="h-6 w-6" style={{ color: "var(--accent-primary)" }} />
              </div>
              <h3 className="font-tourney font-semibold text-gray-800 dark:text-gray-200 mb-2">PDF Only</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We accept PDF format to ensure your resume looks perfect
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-tourney font-semibold text-gray-800 dark:text-gray-200 mb-2">Secure Upload</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your resume is handled securely and confidentially
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-tourney font-semibold text-gray-800 dark:text-gray-200 mb-2">Quick Process</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fast upload and immediate processing of your application
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
