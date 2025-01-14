import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/jwt';
import { corsHeaders, handleOptions } from '@/lib/cors';

const prisma = new PrismaClient();

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
    return handleOptions(); // Reuse the shared CORS logic
}

/**
 * 📌 PUT: Update an Experimental Project using Screenshot URLs
 */
export async function PUT(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
        return new Response(
            JSON.stringify({ message: 'Unauthorized' }),
            { status: 401, headers: corsHeaders } // Apply CORS headers
        );
    }

    try {
        const { id, title, description, githubLink, screenshots } =
            await request.json();

        if (
            !id ||
            !title ||
            !description ||
            !githubLink ||
            !Array.isArray(screenshots)
        ) {
            return new Response(
                JSON.stringify({ message: 'Invalid input data' }),
                { status: 400, headers: corsHeaders } // Apply CORS headers
            );
        }

        const updatedProject = await prisma.experimentalProject.update({
            where: { id },
            data: {
                title,
                description,
                githubLink,
                screenshots,
            },
        });

        return new Response(
            JSON.stringify({
                message: 'Project updated successfully',
                updatedProject,
            }),
            { status: 200, headers: corsHeaders } // Apply CORS headers
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Failed to update project', error }),
            { status: 500, headers: corsHeaders } // Apply CORS headers
        );
    }
}
