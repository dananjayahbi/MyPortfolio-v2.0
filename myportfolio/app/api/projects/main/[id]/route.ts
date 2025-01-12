import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

/**
 * 📌 GET: Fetch a Single Main Project by ID
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } // 👈 Explicitly typing params as a Promise
) {
  try {
    // Awaiting the params Promise
    const { id } = await context.params;

    // Fetching the project from the database
    const project = await prisma.mainProject.findUnique({
      where: { id },
    });

    // Handling the case where the project is not found
    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    // Returning the found project
    return NextResponse.json(project);
  } catch (error) {
    // Logging the error for debugging purposes
    console.error('Error fetching project:', error);

    // Returning a 500 Internal Server Error response
    return NextResponse.json(
      { message: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}
