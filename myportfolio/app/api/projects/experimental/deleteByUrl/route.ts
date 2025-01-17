import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/jwt';
import { corsHeaders, handleOptions } from '@/lib/cors';

const prisma = new PrismaClient();

//Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return handleOptions(); // Reuse the shared CORS logic
}

/**
 * 📌 DELETE: Delete an Experimental Project by ID
 */
export async function DELETE(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token || !verifyToken(token)) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: corsHeaders,
    });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ message: 'Invalid project ID' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    await prisma.experimentalProject.delete({ where: { id } });

    return new Response(
      JSON.stringify({ message: 'Project deleted successfully' }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to delete project', error }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
