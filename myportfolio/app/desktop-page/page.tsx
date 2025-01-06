'use client';

import { useRef } from 'react';
import InfoCard from '@/components/infoCard';
import { Button } from '@/components/ui/button';

export default function DesktopPage() {
  // Refs for each section
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  // Smooth scrolling function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex bg-[#121212] text-white min-h-screen">
      {/* Fixed Left Sidebar with Navigation */}
      <aside className="w-20 fixed left-0 top-0 h-screen bg-[#1E1E1E] flex flex-col justify-center items-center space-y-8 border-r border-gray-800 z-20">
        <Button
          variant="ghost"
          onClick={() => scrollToSection(aboutRef)}
          className="text-yellow-400"
        >
          About
        </Button>
        <Button
          variant="ghost"
          onClick={() => scrollToSection(skillsRef)}
          className="text-yellow-400"
        >
          Skills
        </Button>
        <Button
          variant="ghost"
          onClick={() => scrollToSection(projectsRef)}
          className="text-yellow-400"
        >
          Projects
        </Button>
        <Button
          variant="ghost"
          onClick={() => scrollToSection(contactRef)}
          className="text-yellow-400"
        >
          Contact
        </Button>
      </aside>

      {/* Main Content Section */}
      <main className="flex flex-1 ml-20">
        {/* Left Section: Profile Card (Fixed as well) */}
        <div className="w-1/2 flex items-center justify-center fixed left-20 top-0 h-screen p-10">
          <InfoCard />
        </div>

        {/* Right Section: Scrollable Content with Linked Sections */}
        <div className="w-1/2 ml-auto bg-[#1E1E1E] p-12 border-l border-gray-800 overflow-y-auto h-screen">
          {/* About Section */}
          <section ref={aboutRef} className="mb-12">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              About Me
            </h2>
            <p className="text-gray-300 leading-relaxed">
              I'm a full-stack developer specializing in modern web technologies
              and user-centered design.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I'm a full-stack developer specializing in modern web technologies
              and user-centered design.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I'm a full-stack developer specializing in modern web technologies
              and user-centered design.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I'm a full-stack developer specializing in modern web technologies
              and user-centered design.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I'm a full-stack developer specializing in modern web technologies
              and user-centered design.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I'm a full-stack developer specializing in modern web technologies
              and user-centered design.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I'm a full-stack developer specializing in modern web technologies
              and user-centered design.
            </p>
          </section>

          {/* Skills Section */}
          <section ref={skillsRef} className="mb-12">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              My Skills
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Skilled in React, Next.js, Tailwind CSS, Node.js, TypeScript,
              MongoDB, and cloud platforms.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Skilled in React, Next.js, Tailwind CSS, Node.js, TypeScript,
              MongoDB, and cloud platforms.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Skilled in React, Next.js, Tailwind CSS, Node.js, TypeScript,
              MongoDB, and cloud platforms.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Skilled in React, Next.js, Tailwind CSS, Node.js, TypeScript,
              MongoDB, and cloud platforms.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Skilled in React, Next.js, Tailwind CSS, Node.js, TypeScript,
              MongoDB, and cloud platforms.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Skilled in React, Next.js, Tailwind CSS, Node.js, TypeScript,
              MongoDB, and cloud platforms.
            </p>
          </section>

          {/* Projects Section */}
          <section ref={projectsRef} className="mb-12">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Projects
            </h2>
            <p className="text-gray-300 leading-relaxed">
              - Portfolio Website - E-commerce Platform - Real-time Chat App -
              Task Management SaaS
            </p>
            <p className="text-gray-300 leading-relaxed">
              - Portfolio Website - E-commerce Platform - Real-time Chat App -
              Task Management SaaS
            </p>
            <p className="text-gray-300 leading-relaxed">
              - Portfolio Website - E-commerce Platform - Real-time Chat App -
              Task Management SaaS
            </p>
            <p className="text-gray-300 leading-relaxed">
              - Portfolio Website - E-commerce Platform - Real-time Chat App -
              Task Management SaaS
            </p>
            <p className="text-gray-300 leading-relaxed">
              - Portfolio Website - E-commerce Platform - Real-time Chat App -
              Task Management SaaS
            </p>
            <p className="text-gray-300 leading-relaxed">
              - Portfolio Website - E-commerce Platform - Real-time Chat App -
              Task Management SaaS
            </p>
            <p className="text-gray-300 leading-relaxed">
              - Portfolio Website - E-commerce Platform - Real-time Chat App -
              Task Management SaaS
            </p>
          </section>

          {/* Contact Section */}
          <section ref={contactRef} className="mb-12">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">Contact</h2>
            <p className="text-gray-300 leading-relaxed">
              Reach me at:{' '}
              <span className="text-yellow-400">your-email@example.com</span>
            </p>
            <p className="text-gray-300 leading-relaxed">
              Reach me at:{' '}
              <span className="text-yellow-400">your-email@example.com</span>
            </p>
            <p className="text-gray-300 leading-relaxed">
              Reach me at:{' '}
              <span className="text-yellow-400">your-email@example.com</span>
            </p>
            <p className="text-gray-300 leading-relaxed">
              Reach me at:{' '}
              <span className="text-yellow-400">your-email@example.com</span>
            </p>
            <p className="text-gray-300 leading-relaxed">
              Reach me at:{' '}
              <span className="text-yellow-400">your-email@example.com</span>
            </p>
            <p className="text-gray-300 leading-relaxed">
              Reach me at:{' '}
              <span className="text-yellow-400">your-email@example.com</span>
            </p>
            <p className="text-gray-300 leading-relaxed">
              Reach me at:{' '}
              <span className="text-yellow-400">your-email@example.com</span>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
