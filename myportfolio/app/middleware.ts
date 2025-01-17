import { NextResponse } from 'next/server';

const allowedOrigins = ['http://localhost:5173'];

export function middleware(request: Request) {
  const origin = request.headers.get('origin');

  if (request.method === 'OPTIONS') {
    if (origin && allowedOrigins.includes(origin)) {
      const response = new Response(null, { status: 204 });
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      return response;
    }

    return new Response('CORS Error: This origin is not allowed.', {
      status: 403,
    });
  }

  const response = NextResponse.next();
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
