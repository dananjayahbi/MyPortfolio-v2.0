import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { corsHeaders, handleOptions } from "@/lib/cors";

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return handleOptions();
}

// GET method to fetch the CV file
export async function GET(req: NextRequest) {
  try {
    // Correct path for file storage (NOT inside public)
    const filePath = path.join(process.cwd(), "private", "cv.pdf");

    // Check if the file exists
    try {
      await fs.access(filePath);
    } catch (err) {
      return NextResponse.json(
        { message: "CV file not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Read the file
    const fileBuffer = await fs.readFile(filePath);

    // Serve the file as a downloadable response
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="CV.pdf"',
      },
    });
  } catch (error) {
    console.error("Error fetching CV:", error);
    return NextResponse.json(
      { message: "Failed to fetch CV" },
      { status: 500, headers: corsHeaders }
    );
  }
}
