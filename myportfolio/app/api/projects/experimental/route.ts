// app/api/projects/experimental/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyToken } from '@/lib/jwt';

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), 'public/uploads/experimentalProjects');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

/** 
 * 📌 POST: Add a New Experimental Project with Screenshots 
 */
export async function POST(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const githubLink = formData.get('githubLink') as string;
    const files = formData.getAll('screenshots') as File[];

    const project = await prisma.experimentalProject.create({
        data: { title, description, githubLink, screenshots: [] }
    });

    const projectDir = path.join(uploadDir, project.id);
    if (!fs.existsSync(projectDir)) fs.mkdirSync(projectDir);

    const savedPaths: string[] = [];
    for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join(projectDir, file.name);
        fs.writeFileSync(filePath, buffer);
        savedPaths.push(`/uploads/experimentalProjects/${project.id}/${file.name}`);
    }

    await prisma.experimentalProject.update({
        where: { id: project.id },
        data: { screenshots: savedPaths }
    });

    return NextResponse.json({ message: "Experimental Project added successfully", project });
}

/**
 * 📌 GET: Fetch All Experimental Projects
 */
export async function GET() {
    const projects = await prisma.experimentalProject.findMany();
    return NextResponse.json(projects);
}

/**
 * 📌 PUT: Update an Existing Experimental Project
 */
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

/**
 * 📌 DELETE: Delete an Experimental Project (Files + Database)
 */
export async function DELETE(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();

    // Delete from the database
    await prisma.experimentalProject.delete({ where: { id } });

    // Delete project folder and images
    const projectDir = path.join(uploadDir, id);
    if (fs.existsSync(projectDir)) {
        fs.rmdirSync(projectDir, { recursive: true });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
}
