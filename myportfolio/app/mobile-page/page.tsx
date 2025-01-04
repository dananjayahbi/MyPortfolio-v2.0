'use client';

import { useRef } from 'react';
import InfoCard from "@/components/infoCard";
import { Button } from "@/components/ui/button";

export default function MobilePage() {
    // Refs for each section
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const skillsRef = useRef<HTMLDivElement | null>(null);
    const projectsRef = useRef<HTMLDivElement | null>(null);
    const contactRef = useRef<HTMLDivElement | null>(null);

    // Smooth scrolling function with type check
    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#121212] text-white">
            {/* Fixed Top Navbar with Scrolling Links */}
            <nav className="w-full fixed top-0 left-0 z-50 flex justify-around items-center bg-[#1E1E1E] py-4 border-b border-gray-800 shadow-lg">
                <Button variant="ghost" onClick={() => scrollToSection(aboutRef)} className="text-yellow-400">About</Button>
                <Button variant="ghost" onClick={() => scrollToSection(skillsRef)} className="text-yellow-400">Skills</Button>
                <Button variant="ghost" onClick={() => scrollToSection(projectsRef)} className="text-yellow-400">Projects</Button>
                <Button variant="ghost" onClick={() => scrollToSection(contactRef)} className="text-yellow-400">Contact</Button>
            </nav>

            {/* Content Section with Scrollable Content */}
            <div className="flex flex-col items-center justify-center p-10 pt-24">
                <InfoCard />
            </div>

            {/* Main Content Section with Overflow */}
            <div className="flex flex-col bg-[#1E1E1E] p-8 border-t border-gray-800 overflow-y-auto">
                
                {/* About Section */}
                <section ref={aboutRef} className="mb-12 pt-20">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-4">About Me</h2>
                    <p className="text-gray-300 leading-relaxed">
                        I'm a full-stack developer specializing in modern web technologies and user-centered design.
                    </p>
                </section>

                {/* Skills Section */}
                <section ref={skillsRef} className="mb-12 pt-20">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-4">My Skills</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Skilled in React, Next.js, Tailwind CSS, Node.js, TypeScript, MongoDB, and cloud platforms.
                    </p>
                </section>

                {/* Projects Section */}
                <section ref={projectsRef} className="mb-12 pt-20">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-4">Projects</h2>
                    <p className="text-gray-300 leading-relaxed">
                        - Portfolio Website  
                        - E-commerce Platform  
                        - Real-time Chat App  
                        - Task Management SaaS  
                    </p>
                </section>

                {/* Contact Section */}
                <section ref={contactRef} className="mb-12 pt-20">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-4">Contact</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Reach me at: <span className="text-yellow-400">your-email@example.com</span>
                    </p>
                </section>
            </div>
        </div>
    );
}
