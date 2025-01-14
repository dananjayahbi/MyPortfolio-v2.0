import { PrismaClient } from '@prisma/client';
import { corsHeaders } from '@/lib/cors';

const prisma = new PrismaClient();

export async function GET() {
    const projects = await prisma.experimentalProject.findMany();
    return new Response(JSON.stringify(projects), {
        status: 200,
        headers: corsHeaders
    });
}
