'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ImageGrid from '@/components/ImageGrid';
import ImageGridM from '@/components/imageGridM';
import InfoCardLeft from '@/components/projectInfoCard';
import HeaderProjectInfo from '@/components/HeaderProjectInfo';
import { LoadingOutlined } from '@ant-design/icons';
import { BASE_URL } from '@/lib/base';
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
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/projects/main/${projectId}`
        );
        if (response.ok) {
          const data = await response.json();
          setProject(data);
        } else {
          console.log('Project not found in main, trying experimental');
          const experimentalResponse = await fetch(
            `${BASE_URL}/api/projects/experimental/${projectId}`
          );
          if (!experimentalResponse.ok) {
            throw new Error('Project not found in both main and experimental');
          }
          const experimentalData = await experimentalResponse.json();
          setProject(experimentalData);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 48, color: '#f6b846' }} spin />
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#1e1e1e]">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  if (!project) {
    return <p className="text-center text-white mt-10">Project not found.</p>;
  }

  return (
    <div className="h-screen w-screen overflow-y-auto bg-[#121212] text-white relative flex flex-col">
      {/* Fixed Header Section */}
      <HeaderProjectInfo />

      {/* Unified Scrollable Content Section */}
      <div className="flex-1 overflow-y-auto pt-[60px] px-6 md:px-12 space-y-12 mt-10">
        {/* Project Info Section */}
        <div className="border-b border-gray-700 pb-12">
          <InfoCardLeft project={project} />
        </div>

        {/* Image Section with Mobile Specific Grid */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
            Samples
          </h2>
          {/* Conditional rendering for mobile optimization */}
          {typeof window !== 'undefined' && window.innerWidth < 768 ? (
            <ImageGridM imageUrls={project.screenshots} />
          ) : (
            <ImageGrid imageUrls={project.screenshots} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
