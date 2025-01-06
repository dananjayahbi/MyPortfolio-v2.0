// middleware.ts
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export function middleware(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    // If no token provided, deny access
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized: Token missing' }, { status: 401 });
    }

    // Verify the token
    const isValid = verifyToken(token);
    if (!isValid) {
        return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    // If token is valid, continue to the next handler
    return NextResponse.next();
}

// Protecting all routes under /api/admin/*
export const config = {
    matcher: ['/api/admin/:path*'],
};
