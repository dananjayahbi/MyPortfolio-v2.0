import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyToken } from '@/lib/jwt';

const prisma = new PrismaClient();
const uploadDir = path.join(
  process.cwd(),
  'public/uploads/experimentalProjects'
);

// Load the base URL from the environment variable, defaulting to localhost
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export async function POST(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const githubLink = formData.get('githubLink') as string;
  const files = formData.getAll('screenshots') as File[];

  const project = await prisma.experimentalProject.create({
    data: { title, description, githubLink, screenshots: [] },
  });

  const projectDir = path.join(uploadDir, project.id);
  if (!fs.existsSync(projectDir)) fs.mkdirSync(projectDir);

  const savedPaths: string[] = [];
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(projectDir, file.name);
    fs.writeFileSync(filePath, buffer);

    // Use the BASE_URL for absolute URLs
    const absoluteUrl = `${BASE_URL}/uploads/mainProjects/${project.id}/${file.name}`;
    savedPaths.push(absoluteUrl);
  }

  await prisma.experimentalProject.update({
    where: { id: project.id },
    data: { screenshots: savedPaths },
  });

  return NextResponse.json({
    message: 'Experimental Project added successfully',
    project,
  });
}
