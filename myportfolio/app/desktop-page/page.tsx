'use client';

import InfoCard from "@/components/infoCard";
import { Button } from "@/components/ui/button";
import { Code, Database } from 'lucide-react';

export default function DesktopPage() {
  return (
    <div className="flex bg-[#121212] text-white min-h-screen">
      
      {/* Fixed Left Sidebar */}
      <aside className="w-20 fixed left-0 top-0 h-screen bg-[#1E1E1E] flex flex-col justify-center items-center space-y-8 border-r border-gray-800 z-20">
        <Button variant="ghost" className="text-yellow-400">☰</Button>
        <Button variant="ghost" className="text-yellow-400">📖</Button>
        <Button variant="ghost" className="text-yellow-400">📷</Button>
        <Button variant="ghost" className="text-yellow-400">📝</Button>
        <Button variant="ghost" className="text-yellow-400">📞</Button>
      </aside>

      {/* Main Content Section with Fixed Sidebar Adjustment */}
      <main className="flex flex-1 ml-20">
        
        {/* Left Section: Profile Card (Fixed as well) */}
        <div className="w-1/2 flex items-center justify-center fixed left-20 top-0 h-screen p-10">
          <InfoCard />
        </div>

        {/* Right Section: Scrollable Content */}
        <div className="w-1/2 ml-auto bg-[#1E1E1E] p-12 border-l border-gray-800 overflow-y-auto h-screen">
          
          {/* About Me Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">About Me</h2>
            <p className="text-gray-300 leading-relaxed">
              Hello! I'm a full-stack developer specializing in modern web technologies. I enjoy crafting beautiful UI and building scalable back-end systems.
            </p>
          </section>

          {/* Long Dummy Content for Scrolling Test */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6">My Projects</h2>
            <p className="text-gray-300 leading-relaxed">
              Project 1: Built a custom e-commerce website using Next.js and Tailwind CSS.  
              Project 2: Developed a real-time chat application with WebSocket support.  
              Project 3: Portfolio website optimized for performance and SEO.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Project 4: Designed a mobile-responsive blog system with a CMS integration.  
              Project 5: Built a SaaS platform for task management using React and Node.js.  
            </p>
            <p className="text-gray-300 leading-relaxed">
              Project 6: Created a collaborative whiteboard application with React and Firebase.  
              Project 7: Developed a full-stack expense tracker using MongoDB, Express, React, and Node (MERN stack).  
              Project 8: Contributed to an open-source UI component library using Tailwind CSS.  
            </p>
            <p className="text-gray-300 leading-relaxed">
              Project 9: Built a weather forecasting app with serverless APIs and Next.js.  
              Project 10: Developed an AI-powered code assistant using OpenAI's GPT API.  
            </p>
            <p className="text-gray-300 leading-relaxed">
              Scroll further to test the effect of a fixed sidebar and scrollable content.
            </p>
          </section>
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6">My Projects</h2>
            <p className="text-gray-300 leading-relaxed">
              Project 1: Built a custom e-commerce website using Next.js and Tailwind CSS.  
              Project 2: Developed a real-time chat application with WebSocket support.  
              Project 3: Portfolio website optimized for performance and SEO.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Project 4: Designed a mobile-responsive blog system with a CMS integration.  
              Project 5: Built a SaaS platform for task management using React and Node.js.  
            </p>
            <p className="text-gray-300 leading-relaxed">
              Project 6: Created a collaborative whiteboard application with React and Firebase.  
              Project 7: Developed a full-stack expense tracker using MongoDB, Express, React, and Node (MERN stack).  
              Project 8: Contributed to an open-source UI component library using Tailwind CSS.  
            </p>
            <p className="text-gray-300 leading-relaxed">
              Project 9: Built a weather forecasting app with serverless APIs and Next.js.  
              Project 10: Developed an AI-powered code assistant using OpenAI's GPT API.  
            </p>
            <p className="text-gray-300 leading-relaxed">
              Scroll further to test the effect of a fixed sidebar and scrollable content.
            </p>
          </section>
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6">My Projects</h2>
            <p className="text-gray-300 leading-relaxed">
              Project 1: Built a custom e-commerce website using Next.js and Tailwind CSS.  
              Project 2: Developed a real-time chat application with WebSocket support.  
              Project 3: Portfolio website optimized for performance and SEO.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Project 4: Designed a mobile-responsive blog system with a CMS integration.  
              Project 5: Built a SaaS platform for task management using React and Node.js.  
            </p>
            <p className="text-gray-300 leading-relaxed">
              Project 6: Created a collaborative whiteboard application with React and Firebase.  
              Project 7: Developed a full-stack expense tracker using MongoDB, Express, React, and Node (MERN stack).  
              Project 8: Contributed to an open-source UI component library using Tailwind CSS.  
            </p>
            <p className="text-gray-300 leading-relaxed">
              Project 9: Built a weather forecasting app with serverless APIs and Next.js.  
              Project 10: Developed an AI-powered code assistant using OpenAI's GPT API.  
            </p>
            <p className="text-gray-300 leading-relaxed">
              Scroll further to test the effect of a fixed sidebar and scrollable content.
            </p>
          </section>
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6">My Projects</h2>
            <p className="text-gray-300 leading-relaxed">
              Project 1: Built a custom e-commerce website using Next.js and Tailwind CSS.  
              Project 2: Developed a real-time chat application with WebSocket support.  
              Project 3: Portfolio website optimized for performance and SEO.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Project 4: Designed a mobile-responsive blog system with a CMS integration.  
              Project 5: Built a SaaS platform for task management using React and Node.js.  
            </p>
            <p className="text-gray-300 leading-relaxed">
              Project 6: Created a collaborative whiteboard application with React and Firebase.  
              Project 7: Developed a full-stack expense tracker using MongoDB, Express, React, and Node (MERN stack).  
              Project 8: Contributed to an open-source UI component library using Tailwind CSS.  
            </p>
            <p className="text-gray-300 leading-relaxed">
              Project 9: Built a weather forecasting app with serverless APIs and Next.js.  
              Project 10: Developed an AI-powered code assistant using OpenAI's GPT API.  
            </p>
            <p className="text-gray-300 leading-relaxed">
              Scroll further to test the effect of a fixed sidebar and scrollable content.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
