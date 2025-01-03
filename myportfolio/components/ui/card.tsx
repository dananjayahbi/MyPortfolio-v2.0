'use client';
import Image from 'next/image';
import Background from '@/public/images/background.jpg';
import me from '@/public/images/me.png';

const Card: React.FC = () => {
  return (
    <div className="relative w-[450px] h-[600px] bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg">
      {/* Background Image Section */}
      <div className="relative h-72">
        <Image
          src={Background}
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Profile Section */}
      <div className="relative -mt-16 flex flex-col items-center">
        <div className="w-32 h-32 border-4 border-gray-900 rounded-full overflow-hidden">
          <Image
            src={me}
            alt="Profile picture"
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold mt-4">Isuru Dananjaya</h2>
        <p className="text-yellow-400">Full-Stack Developer</p>

        {/* Social Icons Section */}
        <div className="flex gap-4 mt-4 text-gray-300 text-xl">
          <a href="#" aria-label="Instagram" className="hover:text-white">
            📷
          </a>
          <a href="#" aria-label="GitHub" className="hover:text-white">
            💻
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-white">
            🔗
          </a>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-around w-full mt-6 border-t border-gray-700 py-4">
          <button className="text-gray-300 hover:text-white">
            Download CV
          </button>
          <button className="text-gray-300 hover:text-white">Contact Me</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
