'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InfoCard from '@/components/infoCard';
import InfoCardM from '@/components/infoCardM';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import AboutMe from '@/components/sections/AboutMe';
import Skills from '@/components/sections/Skills';
import CurrentlyIam from '@/components/sections/CurrentlyIam';
import MyHobbies from '@/components/sections/MyHobbies';
import FunFacts from '@/components/sections/FunFacts';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Projects from '@/components/sections/Projects';
import ProjectsM from '@/components/sections/ProjectsM';
import ContactMe from '@/components/sections/ContactMe';

export default function MobilePage() {
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const currentlyRef = useRef<HTMLDivElement | null>(null);
  const othersRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const educatuinRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { ref: aboutRef, name: 'About Me' },
    { ref: skillsRef, name: 'Skills' },
    { ref: othersRef, name: 'Others' },
    { ref: experienceRef, name: 'Experience' },
    { ref: projectsRef, name: 'Projects' },
    { ref: contactRef, name: 'Contact' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
      setIsMobileMenuOpen(false); // Close menu on selection
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

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const navbarItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white overflow-y-auto">
      {/* ✅ Mobile Collapsible Menu and Desktop Navbar */}
      {windowWidth < 768 ? (
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={navbarVariants}
          className="w-full fixed top-0 left-0 z-50 flex justify-between items-center bg-[#1E1E1E] py-4 px-4 border-b border-gray-800 shadow-lg"
        >
          <h1 className="text-xl font-bold text-yellow-400">Portfolio</h1>
          <button
            className="text-yellow-400 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {isMobileMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-[#1E1E1E] flex flex-col items-center space-y-4 py-4 border-t border-gray-800">
              {sections.map(({ name, ref }) => (
                <Button
                  key={name}
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
              ))}
            </div>
          )}
        </motion.nav>
      ) : (
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={navbarVariants}
          className="w-full fixed top-0 left-0 z-50 flex justify-around items-center bg-[#1E1E1E] py-4 border-b border-gray-800 shadow-lg"
        >
          {sections.map(({ name, ref }) => (
            <motion.div
              key={name}
              variants={navbarItemVariants}
              whileHover={{ scale: 1.1 }}
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
        </motion.nav>
      )}

      {/* ✅ Centered Profile Card */}
      <div className="flex flex-col items-center justify-center p-10 pt-24">
        {windowWidth < 530 ? <InfoCardM /> : <InfoCard />}
      </div>

      {/* ✅ Animated Content Sections */}
      <div className="flex flex-col bg-[#1E1E1E] p-8 border-t border-gray-800 overflow-y-hidden">
        <motion.section
          ref={aboutRef}
          initial="hidden"
          whileInView="visible"
          variants={animationVariants}
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">About Me</h2>
          <AboutMe windowWidth={windowWidth} /> <br /> <br />
        </motion.section>

        <motion.section
          ref={skillsRef}
          initial="hidden"
          whileInView="visible"
          variants={animationVariants}
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Skills</h2>
          <Skills windowWidth={windowWidth} /> <br />
        </motion.section>

        <motion.section
          ref={currentlyRef}
          initial="hidden"
          whileInView="visible"
          variants={animationVariants}
        >
          <h2 className="text-3xl font-bold text-yellow-400 mt-0">
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
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            My Hobbies
          </h2>
          <MyHobbies windowWidth={windowWidth} /> <br /> <br /> <br />
          <h2 className="text-3xl font-bold text-yellow-400 mt-4">
            Fun Facts About Me
          </h2> <br />
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
          <Experience windowWidth={windowWidth} />
        </motion.section>

        <motion.section
          ref={experienceRef}
          initial="hidden"
          whileInView="visible"
          variants={animationVariants}
        >
          <h2 className="text-3xl font-bold text-yellow-400 mt-4">Education</h2>
          <Education windowWidth={windowWidth} /> <br /> <br /> <br />
        </motion.section>

        <motion.section
          ref={projectsRef}
          initial="hidden"
          whileInView="visible"
          variants={animationVariants}
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Projects</h2>
          {windowWidth < 600 ? (
            <ProjectsM windowWidth={windowWidth} />
          ) : (
            <Projects windowWidth={windowWidth} />
          )}
          <br /> <br /> <br />
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
    </div>
  );
}
