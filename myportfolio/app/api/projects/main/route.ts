// app/api/projects/main/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyToken } from '@/lib/jwt';

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), 'public/uploads/mainProjects');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

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

    // Create a new project
    const project = await prisma.mainProject.create({
        data: {
            title,
            description,
            githubLink,
            screenshots: [],
        },
    });

    // Create a folder for this project
    const projectDir = path.join(uploadDir, project.id);
    if (!fs.existsSync(projectDir)) fs.mkdirSync(projectDir);

    // Save screenshots
    const savedPaths: string[] = [];
    for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join(projectDir, file.name);
        fs.writeFileSync(filePath, buffer);
        savedPaths.push(`/uploads/mainProjects/${project.id}/${file.name}`);
    }

    // Update project with screenshot paths
    await prisma.mainProject.update({
        where: { id: project.id },
        data: { screenshots: savedPaths },
    });

    return NextResponse.json({ message: "Project added successfully", project });
}

// Fetch All Projects (GET)
export async function GET() {
    const projects = await prisma.mainProject.findMany();
    return NextResponse.json(projects);
}

// Update a Project (PUT)
export async function PUT(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, title, description, githubLink } = await request.json();
    const updatedProject = await prisma.mainProject.update({
        where: { id },
        data: { title, description, githubLink }
    });
    return NextResponse.json({ message: "Project updated successfully", updatedProject });
}

// Delete a Project (DELETE)
export async function DELETE(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();

    // Delete from database
    await prisma.mainProject.delete({ where: { id } });

    // Delete project folder and images
    const projectDir = path.join(uploadDir, id);
    if (fs.existsSync(projectDir)) {
        fs.rmdirSync(projectDir, { recursive: true });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
}
