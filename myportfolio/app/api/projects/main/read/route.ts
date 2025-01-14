import { PrismaClient } from '@prisma/client';
import { corsHeaders } from '@/lib/cors';

const prisma = new PrismaClient();

/**
 * 📌 GET: Fetch All Main Projects
 */
export async function GET() {
    const projects = await prisma.mainProject.findMany();
    return new Response(JSON.stringify(projects), {
        status: 200,
        headers: corsHeaders
    });
}
