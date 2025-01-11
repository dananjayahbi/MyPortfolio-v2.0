'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import ImageGrid from '@/components/ImageGrid';
import InfoCardLeft from '@/components/projectInfoCard';
import HeaderProjectInfo from '@/components/HeaderProjectInfo';

const ProjectPage = () => {
    const searchParams = useSearchParams();
    const projectData = searchParams.get('data');
    const project = projectData ? JSON.parse(decodeURIComponent(projectData)) : null;

    if (!project) {
        return <p>Project not found.</p>;
    }

    return (
        <div className="h-screen w-screen overflow-hidden bg-[#121212] text-white relative flex flex-col">
            {/* Fixed Header Section */}
            <HeaderProjectInfo />

            {/* Content Section with Flex Fix for Full Height */}
            <div className="flex flex-1 pt-[60px] h-full overflow-hidden">
                {/* Left Section - Project Details (No Scroll) */}
                <div className="w-1/2 p-12 flex flex-col justify-center border-r border-gray-700">
                    <InfoCardLeft project={project} />
                </div>

                {/* Right Section - Image Grid (Scrollable) */}
                <div 
                    className="w-1/2 ml-auto p-12 overflow-y-auto" 
                    style={{ height: 'calc(100vh - 60px)', scrollBehavior: 'smooth' }}
                >
                    <h2 className="text-3xl font-bold text-yellow-400 mb-6">Samples</h2>
                    <ImageGrid imageUrls={project.screenshots} />
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;
