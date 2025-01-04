'use client';

import InfoCard from "@/components/infoCard";
import { Button } from "@/components/ui/button";
import { Code, Database } from 'lucide-react';

export default function MobilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white overflow-auto">
      {/* Top Navbar */}
      <nav className="w-full flex justify-around items-center bg-[#1E1E1E] py-4 border-b border-gray-800">
        <Button variant="ghost" className="text-yellow-400">☰</Button>
        <Button variant="ghost" className="text-yellow-400">📖</Button>
        <Button variant="ghost" className="text-yellow-400">📷</Button>
        <Button variant="ghost" className="text-yellow-400">📝</Button>
        <Button variant="ghost" className="text-yellow-400">📞</Button>
      </nav>

      {/* Profile Card Section */}
      <div className="flex flex-col items-center justify-center p-10">
        <InfoCard />
      </div>

      {/* About and Services Section */}
      <div className="flex flex-col bg-[#1E1E1E] p-8 border-t border-gray-800 overflow-y-auto">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">About Me</h2>
        <p className="text-gray-300 leading-relaxed">
          Full-stack developer specializing in front-end and back-end development.
        </p>
      </div>
    </div>
  );
}
