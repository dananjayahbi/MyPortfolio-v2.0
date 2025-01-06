// app/api/admin/protected/route.ts
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function GET(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token || !verifyToken(token)) {
        return NextResponse.json({ message: 'Unauthorized: Token missing or invalid' }, { status: 401 });
    }

    return NextResponse.json({ message: 'You have successfully accessed a protected route!' });
}
