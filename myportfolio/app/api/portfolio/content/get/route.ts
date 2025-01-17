import fs from 'fs';
import path from 'path';
import { corsHeaders } from '@/lib/cors';

const contentFilePath = path.join(process.cwd(), 'public/portfolioContent.json');

/**
 * 📌 GET: Fetch the Content of Portfolio
 */
export async function GET() {
  if (!fs.existsSync(contentFilePath)) {
    return new Response(
      JSON.stringify({ message: 'Portfolio content file not initialized.' }),
      { status: 404, headers: corsHeaders }
    );
  }

  const content = fs.readFileSync(contentFilePath, 'utf-8');
  return new Response(content, { status: 200, headers: corsHeaders });
}
