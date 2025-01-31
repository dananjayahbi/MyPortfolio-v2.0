'use client';
import { Card as ShadcnCard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

type ProjectDetails = {
  title: string;
  description: string;
  githubLink: string;
  createdAt: string;
};

type InfoCardLeftProps = {
  project: ProjectDetails;
};

const InfoCardLeft: React.FC<InfoCardLeftProps> = ({ project }) => {
  return (
    <div className="relative flex justify-center items-center w-full">
      {/* Main Project Details Card */}
      <ShadcnCard
        className="bg-[#222222] text-white rounded-xl overflow-hidden border-none z-10 p-6 flex flex-col w-full max-w-2xl"
        style={{
          minHeight: 'auto', // Auto height based on content
          width: '100%', // Responsive width
        }}
      >
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">
          {project.title}
        </h2>
        <p className="text-lg mb-6 leading-relaxed">{project.description}</p>

        {/* GitHub Link Button */}
        <Button
          asChild
          variant="default"
          className="bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition-all duration-300 flex items-center gap-2 py-3 px-4 rounded-lg mt-4 self-start"
        >
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github /> View on GitHub
          </a>
        </Button>
      </ShadcnCard>
    </div>
  );
};

export default InfoCardLeft;
