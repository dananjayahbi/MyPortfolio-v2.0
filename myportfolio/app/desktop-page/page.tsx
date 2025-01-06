'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InfoCard from '@/components/infoCard';
import { Button } from '@/components/ui/button';
import AboutMe from '@/components/sections/AboutMe';
import Skills from '@/components/sections/Skills';
import CurrentlyIam from '@/components/sections/CurrentlyIam';
import MyHobbies from '@/components/sections/MyHobbies';
import FunFacts from '@/components/sections/FunFacts';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import ContactMe from '@/components/sections/ContactMe';

export default function DesktopPage() {
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const skillsRef = useRef<HTMLDivElement | null>(null);
    const othersRef = useRef<HTMLDivElement | null>(null);
    const experienceRef = useRef<HTMLDivElement | null>(null);
    const projectsRef = useRef<HTMLDivElement | null>(null);
    const contactRef = useRef<HTMLDivElement | null>(null);

    const [activeSection, setActiveSection] = useState<string | null>(null);

    const sections = [
        { ref: aboutRef, name: 'About Me' },
        { ref: skillsRef, name: 'Skills' },
        { ref: othersRef, name: 'Others' },
        { ref: experienceRef, name: 'Experience' },
        { ref: projectsRef, name: 'Projects' },
        { ref: contactRef, name: 'Contact' }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const section = sections.find((s) => s.ref.current === entry.target);
                        if (section) {
                            setActiveSection(section.name);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach(({ ref }) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const animationVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
    };

    const sidebarVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
    };

    const sidebarItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="flex bg-[#121212] text-white min-h-screen">
            {/* ✅ Animated Sidebar with Stagger Effect */}
            <motion.aside
                initial="hidden"
                animate="visible"
                variants={sidebarVariants}
                className="w-20 fixed left-0 top-0 h-screen bg-[#1E1E1E] flex flex-col justify-center items-center space-y-8 border-r border-gray-800 z-20"
            >
                {sections.map(({ name, ref }) => (
                    <motion.div
                        key={name}
                        variants={sidebarItemVariants}
                        whileHover={{ scale: 1.1, originX: 0.5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="ghost"
                            onClick={() => scrollToSection(ref)}
                            className={activeSection === name ? 'bg-white text-black' : 'text-yellow-400'}
                        >
                            {name}
                        </Button>
                    </motion.div>
                ))}
            </motion.aside>

            {/* Main Content Section with Animations */}
            <main className="flex flex-1 ml-20">
                <div className="w-1/2 flex items-center justify-center fixed left-20 top-0 h-screen p-10">
                    <InfoCard />
                </div>

                <div className="w-1/2 ml-auto bg-[#1E1E1E] p-12 border-l border-gray-800 overflow-y-auto h-screen">
                    {/* ✅ Animated Content Sections */}
                    <motion.section ref={aboutRef} initial="hidden" whileInView="visible" variants={animationVariants}>
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">About Me</h2>
                        <AboutMe /> <br /> <br /> <br />
                    </motion.section>

                    <motion.section ref={skillsRef} initial="hidden" whileInView="visible" variants={animationVariants}>
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Skills</h2>
                        <Skills /> <br /> <br /> <br />
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Currently I am</h2>
                        <CurrentlyIam /> <br /> <br /> <br />
                    </motion.section>

                    <motion.section ref={othersRef} initial="hidden" whileInView="visible" variants={animationVariants}>
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Others</h2>
                        <h2 className="text-2xl font-bold text-white mb-4">My Hobbies</h2>
                        <MyHobbies /> <br /> <br /> <br />
                        <h2 className="text-2xl font-bold text-white mb-4">Fun Facts About Me</h2>
                        <FunFacts /> <br /> <br /> <br />
                    </motion.section>

                    <motion.section ref={experienceRef} initial="hidden" whileInView="visible" variants={animationVariants}>
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Experience</h2>
                        <Experience /> <br /> <br /> <br />
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Education</h2>
                        <Education /> <br /> <br /> <br />
                    </motion.section>

                    <motion.section ref={projectsRef} initial="hidden" whileInView="visible" variants={animationVariants}>
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Projects</h2>
                        <p>Project details here...</p> <br /> <br /> <br />
                    </motion.section>

                    <motion.section ref={contactRef} initial="hidden" whileInView="visible" variants={animationVariants}>
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Contact</h2>
                        <ContactMe />
                    </motion.section>
                </div>
            </main>
        </div>
    );
}
