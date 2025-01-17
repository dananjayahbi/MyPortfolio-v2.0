import fs from 'fs';
import path from 'path';
import { verifyToken } from '@/lib/jwt';
import { corsHeaders, handleOptions } from '@/lib/cors'; // Import CORS utilities

const contentFilePath = path.join(
  process.cwd(),
  'public/portfolioContent.json'
);

/**
 * 📌 OPTIONS: Handle CORS Preflight
 */
export async function OPTIONS() {
  return handleOptions(); // Reuse the shared CORS logic
}

/**
 * 📌 PUT: Update the Portfolio Content with Flexible Logic for All Sections
 */
export async function PUT(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token || !verifyToken(token)) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized' }),
      { status: 401, headers: corsHeaders } // Apply CORS headers
    );
  }

  try {
    const updates = await request.json();
    if (!fs.existsSync(contentFilePath)) {
      return new Response(
        JSON.stringify({ message: 'Content not initialized.' }),
        { status: 404, headers: corsHeaders } // Apply CORS headers
      );
    }

    const existingContent = JSON.parse(
      fs.readFileSync(contentFilePath, 'utf-8')
    );

    /**
     * ✅ Handling Skills Section with Updated Logic for Technologies
     */
    if (updates.skills?.subTitles) {
      updates.skills.subTitles.forEach(
        (newSubTitle: {
          title: string;
          technologies: { name: string; image: string }[];
        }) => {
          const existingSubTitle = existingContent.skills.subTitles.find(
            (subTitle: { title: string }) =>
              subTitle.title === newSubTitle.title
          );

          if (existingSubTitle) {
            newSubTitle.technologies.forEach((newTech) => {
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
        }
      );
    }

    /**
     * ✅ Handling Full Array Replacement Sections (`currentlyIAm`, `myHobbies`, `funFacts`, `experience`, `education`)
     */
    const arraySections = [
      'currentlyIAm',
      'myHobbies',
      'funFacts',
      'experience',
      'education',
    ];
    arraySections.forEach((section) => {
      if (updates[section]?.texts) {
        existingContent[section].texts = updates[section].texts;
      }
    });

    /**
     * ✅ Handling Contact Section (Only Provided Fields Should Update)
     */
    if (updates.contact) {
      Object.entries(updates.contact).forEach(([key, value]) => {
        existingContent.contact[key] = value;
      });
    }

    /**
     * ✅ Handling Author Section (Only Provided Fields Should Update)
     */
    if (updates.author) {
      Object.entries(updates.author).forEach(([key, value]) => {
        existingContent.author[key] = value;
      });
    }

    /**
     * ✅ Handling About Me Section (Only Provided Fields Should Update)
     */
    if (updates.aboutMe) {
      Object.entries(updates.aboutMe).forEach(([key, value]) => {
        existingContent.aboutMe[key] = value;
      });
    }

    /**
     * ✅ Write Updated Content Back to the JSON File
     */
    fs.writeFileSync(contentFilePath, JSON.stringify(existingContent, null, 2));
    return new Response(
      JSON.stringify({
        message: 'Portfolio content updated successfully',
        updatedContent: existingContent,
      }),
      { status: 200, headers: corsHeaders } // Apply CORS headers
    );
  } catch (error) {
    console.error('Error updating content:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to update content',
        error: (error as any).message,
      }),
      { status: 500, headers: corsHeaders } // Apply CORS headers
    );
  }
}
