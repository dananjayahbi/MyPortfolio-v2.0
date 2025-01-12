'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ImageGrid from '@/components/ImageGrid';
import InfoCardLeft from '@/components/projectInfoCard';
import HeaderProjectInfo from '@/components/HeaderProjectInfo';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

type ProjectData = {
  id: string;
  title: string;
  description: string;
  githubLink: string;
  screenshots: string[];
  createdAt: string;
};

const ProjectPage = () => {
  const params = useParams();
  const projectId = params?.id as string;
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('Extracted Project ID:', projectId);

  useEffect(() => {
    if (projectId) {
      fetch(`http://localhost:3000/api/projects/main/${projectId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Project not found');
          }
          return response.json();
        })
        .then((data) => {
          setProject(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching project:', error);
          setLoading(false);
        });
    }
  }, [projectId]);

  const antIcon = <LoadingOutlined style={{ fontSize: 48, color: '#f6b846' }} spin />;

  if (loading) {
    return (
      <div
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          backgroundColor: '#1e1e1e' 
        }}
      >
        <Spin indicator={antIcon} />
      </div>
    );
  }

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
