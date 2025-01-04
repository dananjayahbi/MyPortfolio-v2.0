'use client';
import Image from 'next/image';
import { Card as ShadcnCard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Background from '@/public/images/background.jpg';
import me from '@/public/images/me.png';
import { Download, Send, Github, Facebook, Instagram } from 'lucide-react';

const InfoCard: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center">
      {/* Shadow Card (Offset and No Glow) */}
      <div
        className="absolute w-[450px] h-[600px] bg-yellow-500 rounded-xl opacity-50"
        style={{
          top: '-10px',
          right: '10px',
        }}
      ></div>

      {/* Main Card */}
      <ShadcnCard className="relative w-[450px] h-[600px] bg-[#222222] text-white rounded-xl overflow-hidden shadow-lg z-10">
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
          <h2 className="text-2xl font-bold mt-3">Isuru Dananjaya</h2>
          <p className="text-yellow-400">Full-Stack Developer</p>

          {/* Social Icons Section */}
          <div className="flex gap-4 mt-10 text-gray-300 text-xl">
            <a
              href="#"
              aria-label="GitHub"
              className="hover:text-white opacity-80"
            >
              <Github />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-white opacity-80"
            >
              <Facebook />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-white opacity-80"
            >
              <Instagram />
            </a>
          </div>

          {/* Fading Divider Lines */}
          <div className="relative flex items-center justify-center w-full mt-20 py-4">
            {/* Horizontal Line */}
            <div className="absolute inset-0 flex bottom-10 mb-2 items-center justify-center pointer-events-none">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-50"></div>
            </div>

            {/* Vertical Line (Merged to Horizontal Line) */}
            <div className="absolute -mb-[0.5px] flex items-center justify-center pointer-events-none">
              <div className="h-12 w-px bg-gradient-to-b from-gray-500 to-transparent opacity-50"></div>
            </div>

            {/* Button Section */}
            <div className="flex items-center mt-5 justify-around w-full gap-4 z-10">
              {/* Download CV Button */}
              <Button
                variant="default"
                className="text-gray-400 bg-transparent border-none hover:bg-transparent hover:text-white opacity-80 hover:opacity-100 flex items-center gap-2"
              >
                <Download /> Download CV
              </Button>

              {/* Contact Me Button */}
              <Button
                variant="default"
                className="text-gray-400 bg-transparent border-none hover:bg-transparent hover:text-white opacity-80 hover:opacity-100 flex items-center gap-2"
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
