import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const contentFilePath = path.join(
  process.cwd(),
  'public/portfolioContent.json'
);

/**
 * 📌 Initialize Content File with Default Data
 */
export async function GET() {
  if (!fs.existsSync(contentFilePath)) {
    const defaultContent = {
      author: {
        name: 'John Doe',
        post: 'Web Developer',
        dob: '01-01-1990',
        freelance: 'Available',
        residence: 'LK',
        email: 'test@test.com',
        phone: '123-456-7890',
        myStatus: "I'm a passionate web developer.",
      },
      aboutMe: {
        title: 'About Me',
        description: 'A passionate web developer.',
      },
      skills: {
        title: 'Skills',
        subTitles: [
          { title: 'JavaScript', description: 'Experienced in JS development' },
        ],
      },
      currentlyIAm: {
        title: 'Currently I Am',
        texts: ['Learning TypeScript', 'Building Projects'],
      },
      myHobbies: { title: 'My Hobbies', texts: ['Coding', 'Reading'] },
      funFacts: { title: 'Fun Facts', texts: ['I love coding challenges!'] },
      experience: {
        title: 'Experience',
        texts: ['3 Years in Web Development'],
      },
      education: { title: 'Education', texts: ['B.Sc. in Computer Science'] },
      contact: {
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        facebook: 'https://facebook.com/johndoe',
      },
    };
    fs.writeFileSync(contentFilePath, JSON.stringify(defaultContent, null, 2));
  }
  return NextResponse.json({
    message: 'Portfolio content initialized successfully.',
  });
}
