import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { corsHeaders, handleOptions } from '@/lib/cors';

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return handleOptions(); // Reuse the shared CORS logic
}

export async function POST(req: NextRequest) {
  try {
    // Define the destination path for the CV
    const filePath = path.join(process.cwd(), 'public', 'files', 'cv.pdf');

    // Parse the uploaded file
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'No file uploaded' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate that the file is a PDF
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { message: 'Only PDF files are allowed' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Read the uploaded file as a buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Write the new file to the destination, replacing the old one
    await fs.writeFile(filePath, fileBuffer);

    return NextResponse.json(
      { message: 'CV successfully replaced' },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error replacing CV:', error);
    return NextResponse.json(
      { message: 'Failed to replace CV' },
      { status: 500, headers: corsHeaders }
    );
  }
}
