import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

const prisma = new PrismaClient();

/**
 * 📌 DELETE: Delete a Main Project by ID
 */
export async function DELETE(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ message: "Invalid project ID" }, { status: 400 });
        }

        await prisma.mainProject.delete({ where: { id } });

        return NextResponse.json({ message: "Project deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete project", error }, { status: 500 });
    }
}
