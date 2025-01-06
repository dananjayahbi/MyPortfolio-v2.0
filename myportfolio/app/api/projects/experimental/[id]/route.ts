import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

/**
 * 📌 GET: Fetch a Single Experimental Project by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const project = await prisma.experimentalProject.findUnique({
            where: { id }
        });

        if (!project) {
            return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }

        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch project" }, { status: 500 });
    }
}
