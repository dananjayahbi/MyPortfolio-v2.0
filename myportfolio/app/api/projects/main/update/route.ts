import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { corsHeaders, handleOptions } from '@/lib/cors';

const prisma = new PrismaClient();

//Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return handleOptions(); // Reuse the shared CORS logic
}

/**
 * 📌 PUT: Update an Existing Main Project
 */
export async function PUT(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token || !verifyToken(token)) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized' }),
      { status: 401, headers: corsHeaders } // Apply CORS headers
    );
  }

  const { id, title, description, githubLink } = await request.json();

  const updatedProject = await prisma.mainProject.update({
    where: { id },
    data: { title, description, githubLink },
  });

  return NextResponse.json({
    message: 'Project updated successfully',
    updatedProject,
  });
}
