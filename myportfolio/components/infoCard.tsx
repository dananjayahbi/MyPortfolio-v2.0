'use client';
import React from 'react';
import Image from 'next/image';
import { Card as ShadcnCard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Background from '@/public/images/background.jpg';
import me from '@/public/images/me.png';
import { Download, Send, Github, Facebook, Linkedin } from 'lucide-react';
import { BASE_URL } from '@/lib/base';

type InfoCardMProps = {
  scrollToContact: () => void;
};

const InfoCard: React.FC<InfoCardMProps> = ({ scrollToContact }) => {
  // ✅ Fetch content from session storage
  const content =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('content') || '{}')
      : {};

  const author = content.author || { name: 'Unknown', post: 'No Title' };

  // ✅ Corrected: Using static file path for public folder
  const handleDownloadCV = async () => {
    try {
        window.open(`${BASE_URL}/files/cv.pdf`);
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Failed to download CV. Please try again.');
    }
  };

  return (
    <div className="relative flex justify-center items-center">
      {/* Main Card */}
      <ShadcnCard className="relative w-[450px] h-[600px] bg-[#222222] text-white rounded-xl overflow-hidden border-none z-10">
        {/* Background Image Section */}
        <div className="relative h-72 w-full">
          <Image
            src={Background}
            alt="Background"
            fill
            className="object-cover"
          />
          {/* Arc Shadow Below the Image */}
          <div className="absolute overflow top-[230px] left-1/2 transform -translate-x-1/2 w-[550px] h-[180px] bg-[#222222] rounded-tl-full rounded-tr-full"></div>
        </div>

        {/* Profile Section */}
        <div className="relative -mt-20 flex flex-col items-center z-10">
          <div className="w-32 h-32 -mt-10 border-4 border-gray-900 rounded-full overflow-hidden">
            <Image
              src={me}
              alt="Profile picture"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          {/* ✅ Display Author Data Dynamically */}
          <h2 className="text-2xl font-bold mt-3">{author.name}</h2>
          <p className="text-yellow-400">{author.post}</p>

          {/* Social Icons Section */}
          <div className="flex gap-4 mt-10 text-gray-300 text-xl">
            <a
              href={content.contact?.github || '#'}
              aria-label="GitHub"
              target="_blank"
              className="hover:text-white opacity-80"
            >
              <Github />
            </a>
            <a
              href={content.contact?.facebook || '#'}
              aria-label="Facebook"
              target="_blank"
              className="hover:text-white opacity-80"
            >
              <Facebook />
            </a>
            <a
              href={content.contact?.linkedin || '#'}
              aria-label="LinkedIn"
              target="_blank"
              className="hover:text-white opacity-80"
            >
              <Linkedin />
            </a>
          </div>

          {/* Fading Divider Lines */}
          <div className="relative flex items-center justify-center w-full mt-20 py-4">
            {/* Horizontal Line */}
            <div className="absolute inset-0 flex bottom-10 mb-2 items-center justify-center pointer-events-none">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-50"></div>
            </div>

            {/* Vertical Line */}
            <div className="absolute -mb-[0.5px] flex items-center justify-center pointer-events-none">
              <div className="h-12 w-px bg-gradient-to-b from-gray-500 to-transparent opacity-50"></div>
            </div>

            {/* Button Section */}
            <div className="flex items-center mt-5 justify-around w-full gap-4 z-10">
              {/* Download CV Button */}
              <Button
                variant="default"
                className="text-gray-400 bg-transparent border-none hover:bg-transparent hover:text-white opacity-80 hover:opacity-100 flex items-center gap-2"
                onClick={handleDownloadCV} // ✅ Triggering Download
              >
                <Download /> Download CV
              </Button>

              {/* Contact Me Button */}
              <Button
                variant="default"
                className="text-gray-400 bg-transparent border-none hover:bg-transparent hover:text-white opacity-80 hover:opacity-100 flex items-center gap-2"
                onClick={scrollToContact} // ✅ Triggering Scroll
              >
                <Send /> Contact Me
              </Button>
            </div>
          </div>
        </div>
      </ShadcnCard>
    </div>
  );
};

export default InfoCard;
