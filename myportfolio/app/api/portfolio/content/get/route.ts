import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const contentFilePath = path.join(process.cwd(), 'public/portfolioContent.json');

/**
 * 📌 GET: Fetch the Content of Portfolio
 */
export async function GET() {
    if (!fs.existsSync(contentFilePath)) {
        return NextResponse.json({ message: "Portfolio content file not initialized." }, { status: 404 });
    }

    const content = fs.readFileSync(contentFilePath, 'utf-8');
    return NextResponse.json(JSON.parse(content));
}
