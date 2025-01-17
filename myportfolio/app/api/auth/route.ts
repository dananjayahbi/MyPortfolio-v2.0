import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from '@/lib/jwt';
import { corsHeaders, handleOptions } from '@/lib/cors';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;


//Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return handleOptions(); // Reuse the shared CORS logic
}

/**
 * Admin Login with JWT Token
 * @param request - expects { username, password }
 * @returns JWT Token if successful, error message otherwise
 */
export async function POST(request: Request) {
  const { username, password } = await request.json();

  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
      status: 401,
      headers: corsHeaders,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
      status: 401,
      headers: corsHeaders,
    });
  }

  const token = generateToken({ id: admin.id, username: admin.username });
  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: corsHeaders,
  });
}

/**
 * Update Admin Password
 */
export async function PUT(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token || !verifyToken(token)) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized: Invalid Token' }),
      {
        status: 401,
        headers: corsHeaders,
      }
    );
  }

  const { username, oldPassword, newPassword } = await request.json();

  const admin = await prisma.admin.findUnique({ where: { username } });

  if (!admin) {
    return new Response(JSON.stringify({ message: 'Admin not found' }), {
      status: 404,
      headers: corsHeaders,
    });
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, admin.password);
  if (!isPasswordValid) {
    return new Response(
      JSON.stringify({ message: 'Old password is incorrect' }),
      {
        status: 403,
        headers: corsHeaders,
      }
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

  await prisma.admin.update({
    where: { username },
    data: { password: hashedPassword },
  });

  return new Response(
    JSON.stringify({ message: 'Password changed successfully!' }),
    {
      status: 200,
      headers: corsHeaders,
    }
  );
}
