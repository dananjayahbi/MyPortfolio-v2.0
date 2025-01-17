import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { verifyToken } from '@/lib/jwt';
import { corsHeaders, handleOptions } from '@/lib/cors';

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), 'public/uploads/mainProjects');

//Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return handleOptions(); // Reuse the shared CORS logic
}

// Load the base URL from the environment variable, defaulting to localhost
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

/**
 * 📌 POST: Add a New Main Project with Screenshots
 */
export async function POST(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token || !verifyToken(token)) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: corsHeaders,
    });
  }

  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const githubLink = formData.get('githubLink') as string;
    const files = formData.getAll('screenshots') as File[];

    if (!title || !description || !githubLink || !Array.isArray(files)) {
      return new Response(JSON.stringify({ message: 'Invalid input data' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const project = await prisma.mainProject.create({
      data: { title, description, githubLink, screenshots: [] },
    });

    const projectDir = path.join(uploadDir, project.id);
    if (!fs.existsSync(projectDir)) fs.mkdirSync(projectDir);

    const savedPaths: string[] = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(projectDir, file.name);
      fs.writeFileSync(filePath, buffer);

      // Use the BASE_URL for absolute URLs
      const absoluteUrl = `${BASE_URL}/uploads/mainProjects/${project.id}/${file.name}`;
      savedPaths.push(absoluteUrl);
    }

    await prisma.mainProject.update({
      where: { id: project.id },
      data: { screenshots: savedPaths },
    });

    return new Response(
      JSON.stringify({ message: 'Project added successfully', project }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to create project', error }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
