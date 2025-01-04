import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/jwt';
import { verifyToken } from '@/lib/jwt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

/**
 * Admin Login with JWT Token
 * @param request - expects { username, password }
 * @returns JWT Token if successful, error message otherwise
 */
export async function POST(request: Request) {
    const { username, password } = await request.json();

    const admin = await prisma.admin.findUnique({
        where: { username }
    });

    if (!admin) {
        return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    // Generate a JWT Token on successful login
    const token = generateToken({ username: admin.username });

    return new Response(JSON.stringify({ token, message: "Login successful" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}


export async function PUT(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token || !verifyToken(token)) {
        return new Response(JSON.stringify({ message: "Unauthorized: Invalid Token" }), { status: 401 });
    }

    const { username, oldPassword, newPassword } = await request.json();

    const admin = await prisma.admin.findUnique({ where: { username } });

    if (!admin) {
        return new Response(JSON.stringify({ message: "Admin not found" }), { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, admin.password);
    if (!isPasswordValid) {
        return new Response(JSON.stringify({ message: "Old password is incorrect" }), { status: 403 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await prisma.admin.update({
        where: { username },
        data: { password: hashedPassword }
    });

    return new Response(JSON.stringify({ message: "Password changed successfully!" }), { status: 200 });
}