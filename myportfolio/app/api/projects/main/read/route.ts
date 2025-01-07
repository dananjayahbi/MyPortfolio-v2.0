import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

/**
 * 📌 GET: Fetch All Main Projects
 */
export async function GET() {
    const projects = await prisma.mainProject.findMany();
    return NextResponse.json(projects);
}
