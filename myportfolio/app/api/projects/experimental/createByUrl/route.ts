import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

const prisma = new PrismaClient();

/**
 * 📌 POST: Create an Experimental Project using Screenshot URLs
 */
export async function POST(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { title, description, githubLink, screenshots } = await request.json();

        if (!title || !description || !githubLink || !Array.isArray(screenshots)) {
            return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
        }

        const project = await prisma.experimentalProject.create({
            data: {
                title,
                description,
                githubLink,
                screenshots
            }
        });

        return NextResponse.json({ message: "Project created successfully", project });
    } catch (error) {
        return NextResponse.json({ message: "Failed to create project", error }, { status: 500 });
    }
}
