import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("resume") as File

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided", message: "Please select a resume file to upload" },
        { status: 400 },
      )
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "Invalid file format", message: "Only PDF files are allowed" },
        { status: 400 },
      )
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: "File too large", message: "File size must be less than 10MB" },
        { status: 413 },
      )
    }

    // Read the file as an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Re-create a File or Blob for the webhook
    const webhookFile = new Blob([buffer], { type: file.type });

    // Now append to FormData
    const webhookFormData = new FormData();
    webhookFormData.append("resume", webhookFile, file.name);
    webhookFormData.append("timestamp", new Date().toISOString());
    webhookFormData.append("source", "resume-uploader");

    // Send to webhook (replace with your actual webhook URL)
    const webhookUrl = "https://junaidasif21.app.n8n.cloud/webhook-test/my-resume"

    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        body: webhookFormData,
        // Do NOT set Content-Type header manually!
      })

      if (!webhookResponse.ok) {
        console.error("Webhook failed:", webhookResponse.status, webhookResponse.statusText)
        // Continue processing even if webhook fails
      }
    } catch (webhookError) {
      console.error("Webhook error:", webhookError)
      // Continue processing even if webhook fails
    }

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const filename = `resume_${timestamp}.pdf`
    const uploadId = crypto.randomUUID()

    return NextResponse.json({
      success: true,
      message: "Resume uploaded successfully",
      filename,
      uploadId,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { success: false, error: "Upload failed", message: "An error occurred while processing your upload" },
      { status: 500 },
    )
  }
}
