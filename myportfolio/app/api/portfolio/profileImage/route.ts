import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyToken } from '@/lib/jwt';
import sharp from 'sharp';

const profileImagePath = path.join(process.cwd(), 'public/profileImage');
const profileImageFullPath = path.join(profileImagePath, 'profile.png');

// Ensure the profile image directory exists
if (!fs.existsSync(profileImagePath)) {
    fs.mkdirSync(profileImagePath, { recursive: true });
}

/**
 * 📌 PUT: Update Portfolio Profile Image
 * - Upload a new image and replace the existing one.
 * - Image will be renamed to "profile.png".
 * - If the uploaded file is not a `.png`, it will be converted to `.png`.
 */
export async function PUT(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('profileImage') as File;

        if (!file) {
            return NextResponse.json({ message: "No image file provided" }, { status: 400 });
        }

        // Convert the uploaded image to buffer and then save it as PNG
        const buffer = Buffer.from(await file.arrayBuffer());

        // Use Sharp to convert image to PNG and overwrite the existing one
        await sharp(buffer)
            .png({ quality: 100 }) // Convert to PNG format with compression
            .toFile(profileImageFullPath);

        return NextResponse.json({ message: "Profile image updated successfully" });
    } catch (error) {
        console.error('Error updating profile image:', error);
        return NextResponse.json({ message: "Failed to update profile image" }, { status: 500 });
    }
}
