'use client';
import Image from 'next/image';
import { Card as ShadcnCard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Background from '@/public/images/background.jpg';
import me from '@/public/images/me.png';
import { Download, Send, Github, Facebook, Instagram } from 'lucide-react';

const InfoCardM: React.FC = () => {
  // ✅ Fetch content from session storage
  const content = JSON.parse(sessionStorage.getItem('content') || '{}');
  const author = content.author || { name: 'Unknown', post: 'No Title' };

  return (
    <div className="relative flex justify-center items-center">
      {/* Main Card */}
      <ShadcnCard className="relative w-[250px] h-[400px] bg-[#222222] text-white rounded-xl overflow-hidden border-none z-10">
        {/* Background Image Section */}
        <div className="relative h-32 w-full">
          <Image
            src={Background}
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        {/* Profile Section */}
        <div className="relative mt-0 flex flex-col items-center z-10">
          <div className="w-24 h-24 -mt-10 border-4 border-gray-900 rounded-full overflow-hidden">
            <Image
              src={me}
              alt="Profile picture"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          {/* ✅ Display Author Data Dynamically */}
          <h2 className="text-2xl font-bold mt-1">{author.name}</h2>
          <p className="text-yellow-400">{author.post}</p>

          {/* Social Icons Section */}
          <div className="flex gap-4 mt-4 text-gray-300 text-xl">
            <a
              href={content.contact?.github || '#'}
              aria-label="GitHub"
              target="_blank"
              className="hover:text-white opacity-80"
            >
              <Github size={16} />
            </a>
            <a
              href={content.contact?.facebook || '#'}
              aria-label="Facebook"
              target="_blank"
              className="hover:text-white opacity-80"
            >
              <Facebook size={16} />
            </a>
            <a
              href={content.contact?.linkedin || '#'}
              aria-label="LinkedIn"
              target="_blank"
              className="hover:text-white opacity-80"
            >
              <Instagram size={16} />
            </a>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-gray-600 opacity-50 mt-4"></div>

          {/* Button Section */}
          <div className="flex flex-col items-center mt-2 justify-center w-full gap-2 z-10">
            {/* Download CV Button */}
            <Button
                variant="default"
                className="text-gray-400 bg-transparent hover:bg-transparent hover:text-white opacity-80 hover:opacity-100 flex items-center gap-2"
            >
                <Download /> Download CV
            </Button>

            {/* Contact Me Button */}
            <Button
              variant="default"
              className="text-gray-400 bg-transparent hover:bg-transparent hover:text-white opacity-80 hover:opacity-100 flex items-center gap-2"
            >
              <Send /> Contact Me
            </Button>
          </div>
        </div>
      </ShadcnCard>
    </div>
  );
};

export default InfoCardM;
