import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

//GET: Fetch an Experimental Project by ID (Fixed for Next.js 15)
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    // Check if project exists
    const project = await prisma.experimentalProject.findUnique({ where: { id } });

    if (!project) {
        return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
}
