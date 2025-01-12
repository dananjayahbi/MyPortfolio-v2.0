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
import Projects from '@/components/sections/Projects';
import ContactMe from '@/components/sections/ContactMe';
import Rain from '@/components/rainEffect/Rain';

export default function DesktopPage() {
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const currentlyRef = useRef<HTMLDivElement | null>(null);
  const othersRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const educatuinRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  const sections = [
    { ref: aboutRef, name: 'About Me' },
    { ref: skillsRef, name: 'Skills' },
    { ref: othersRef, name: 'Others' },
    { ref: experienceRef, name: 'Experience' },
    { ref: projectsRef, name: 'Projects' },
    { ref: contactRef, name: 'Contact' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setWindowWidth(window.innerWidth);
      setWindowWidth(window.innerWidth); // Initialize once when component mounts
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find(
              (s) => s.ref.current === entry.target
            );
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const sidebarItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex bg-[#121212] text-white min-h-screen">
      {/* ✅ Rain Effect Rendered Underneath */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Rain />
      </div>

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
              className={
                activeSection === name
                  ? 'bg-white text-black'
                  : 'text-yellow-400'
              }
            >
              {name}
            </Button>
          </motion.div>
        ))}
      </motion.aside>

      {/* Main Content Section with Animations */}
      <main className="flex flex-1 ml-20 z-50">
        <div className="w-1/2 flex items-center justify-center fixed left-20 top-0 h-screen p-10">
          <InfoCard scrollToContact={() => scrollToSection(contactRef)} />
        </div>

        <div className="w-1/2 ml-auto bg-transparent p-12 overflow-y-auto h-screen">
          {/* ✅ Animated Content Sections */}
          <motion.section
            ref={aboutRef}
            initial="hidden"
            whileInView="visible"
            variants={animationVariants}
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              About Me
            </h2>
            <AboutMe windowWidth={windowWidth} /> <br /> <br /> <br />
          </motion.section>

          <motion.section
            ref={skillsRef}
            initial="hidden"
            whileInView="visible"
            variants={animationVariants}
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">Skills</h2>
            <Skills windowWidth={windowWidth} /> <br /> <br /> <br />
          </motion.section>

          <motion.section
            ref={currentlyRef}
            initial="hidden"
            whileInView="visible"
            variants={animationVariants}
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Currently I am
            </h2>
            <CurrentlyIam windowWidth={windowWidth} /> <br /> <br /> <br />
          </motion.section>

          <motion.section
            ref={othersRef}
            initial="hidden"
            whileInView="visible"
            variants={animationVariants}
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">Others</h2>
            <h2 className="text-2xl font-bold text-white mb-4">My Hobbies</h2>
            <MyHobbies windowWidth={windowWidth} /> <br /> <br /> <br />
            <h2 className="text-2xl font-bold text-white mb-4">
              Fun Facts About Me
            </h2>
            <FunFacts windowWidth={windowWidth} /> <br /> <br /> <br />
          </motion.section>

          <motion.section
            ref={experienceRef}
            initial="hidden"
            whileInView="visible"
            variants={animationVariants}
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Experience
            </h2>
            <Experience windowWidth={windowWidth} /> <br /> <br /> <br />
          </motion.section>

          <motion.section
            ref={educatuinRef}
            initial="hidden"
            whileInView="visible"
            variants={animationVariants}
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Education
            </h2>
            <Education windowWidth={windowWidth} /> <br /> <br /> <br />
          </motion.section>

          <motion.section
            ref={projectsRef}
            initial="hidden"
            whileInView="visible"
            variants={animationVariants}
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Projects
            </h2>
            <Projects windowWidth={windowWidth} /> <br /> <br /> <br />
          </motion.section>

          <motion.section
            ref={contactRef}
            initial="hidden"
            whileInView="visible"
            variants={animationVariants}
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">Contact</h2>
            <ContactMe windowWidth={windowWidth} />
          </motion.section>
        </div>
      </main>
    </div>
  );
}
