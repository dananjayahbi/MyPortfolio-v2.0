import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

const contentFilePath = path.join(process.cwd(), 'public/portfolioContent.json');

/**
 * 📌 PUT: Update the Portfolio Content with Flexible Logic for All Sections
 */
export async function PUT(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const updates = await request.json();
        if (!fs.existsSync(contentFilePath)) {
            return NextResponse.json({ message: "Content not initialized." }, { status: 404 });
        }

        const existingContent = JSON.parse(fs.readFileSync(contentFilePath, 'utf-8'));

        // ✅ Handling Skills Section with Updated Logic for Technologies
        if (updates.skills?.subTitles) {
            updates.skills.subTitles.forEach((newSubTitle: { title: string; technologies: { name: string; image: string }[] }) => {
                const existingSubTitle = existingContent.skills.subTitles.find(
                    (subTitle: { title: string }) => subTitle.title === newSubTitle.title
                );

                if (existingSubTitle) {
                    newSubTitle.technologies.forEach(newTech => {
                        const existingTech = existingSubTitle.technologies.find(
                            (tech: { name: string }) => tech.name === newTech.name
                        );

                        if (existingTech) {
                            // ✅ Update the technology image if it already exists
                            existingTech.image = newTech.image;
                        } else {
                            // ✅ Add new technology if it doesn't exist
                            existingSubTitle.technologies.push(newTech);
                        }
                    });
                } else {
                    // ✅ Add the entire new subtitle if it doesn't exist
                    existingContent.skills.subTitles.push(newSubTitle);
                }
            });
        }

        // ✅ Handling Full Array Replacement Sections (`currentlyIAm`, `myHobbies`, etc.)
        const arraySections = ['currentlyIAm', 'myHobbies', 'funFacts', 'experience', 'education'];
        arraySections.forEach((section) => {
            if (updates[section]?.texts) {
                existingContent[section].texts = updates[section].texts;
            }
        });

        // ✅ Handling Contact Section (Only Provided Fields Should Update)
        if (updates.contact) {
            Object.entries(updates.contact).forEach(([key, value]) => {
                existingContent.contact[key] = value;
            });
        }

        // ✅ Write Updated Content Back to the JSON File
        fs.writeFileSync(contentFilePath, JSON.stringify(existingContent, null, 2));
        return NextResponse.json({ message: "Portfolio content updated successfully", updatedContent: existingContent });
    } catch (error) {
        console.error('Error updating content:', error);
        return NextResponse.json({ message: "Failed to update content", error }, { status: 500 });
    }
}
