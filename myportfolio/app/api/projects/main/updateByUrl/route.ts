import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

const prisma = new PrismaClient();

/**
 * 📌 PUT: Update a Main Project using Screenshot URLs
 */
export async function PUT(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id, title, description, githubLink, screenshots } = await request.json();

        if (!id || !title || !description || !githubLink || !Array.isArray(screenshots)) {
            return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
        }

        const updatedProject = await prisma.mainProject.update({
            where: { id },
            data: {
                title,
                description,
                githubLink,
                screenshots
            }
        });

        return NextResponse.json({ message: "Project updated successfully", updatedProject });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update project", error }, { status: 500 });
    }
}
