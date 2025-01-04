import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    const project = await prisma.mainProject.findUnique({ where: { id } });

    if (!project) {
        return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
}
