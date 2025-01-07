import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, title, description, githubLink } = await request.json();

    const updatedProject = await prisma.experimentalProject.update({
        where: { id },
        data: { title, description, githubLink }
    });

    return NextResponse.json({ message: "Project updated successfully", updatedProject });
}
