import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/jwt';
import { corsHeaders, handleOptions } from '@/lib/cors';

const prisma = new PrismaClient();

//Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return handleOptions(); // Reuse the shared CORS logic
}

/**
 * 📌 POST: Create a Main Project using Screenshot URLs
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
    const { title, description, githubLink, screenshots } =
      await request.json();

    if (!title || !description || !githubLink || !Array.isArray(screenshots)) {
      return new Response(JSON.stringify({ message: 'Invalid input data' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const project = await prisma.mainProject.create({
      data: {
        title,
        description,
        githubLink,
        screenshots,
      },
    });

    return new Response(
      JSON.stringify({ message: 'Project created successfully', project }),
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
