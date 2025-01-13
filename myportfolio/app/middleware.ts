import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const allowedOrigins = ['http://localhost:5173'];
  const origin = req.headers.get('origin');

  if (origin && allowedOrigins.includes(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin);
    res.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: res.headers,
      status: 204,
    });
  }

  const token = req.headers.get('Authorization')?.split(' ')[1];

  // If no token provided, deny access
  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: Token missing' },
      { status: 401, headers: res.headers }
    );
  }

  // Verify the token
  const isValid = verifyToken(token);
  if (!isValid) {
    return NextResponse.json(
      { message: 'Unauthorized: Invalid token' },
      { status: 401, headers: res.headers }
    );
  }

  // If token is valid, continue to the next handler
  return res;
}

// Applying CORS and token protection to all routes
export const config = {
  matcher: '/api/:path*',
};
