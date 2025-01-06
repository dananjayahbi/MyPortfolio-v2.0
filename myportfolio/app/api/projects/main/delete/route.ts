import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyToken } from '@/lib/jwt';

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), 'public/uploads/mainProjects');

/**
 * 📌 DELETE: Delete a Main Project (Files + Database)
 */
export async function DELETE(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();

    // Delete from the database
    await prisma.mainProject.delete({ where: { id } });

    // Delete project folder and images
    const projectDir = path.join(uploadDir, id);
    if (fs.existsSync(projectDir)) {
        fs.rmdirSync(projectDir, { recursive: true });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
}
