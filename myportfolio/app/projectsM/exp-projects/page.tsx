'use client';

import React, { useEffect, useState } from 'react';
import HeaderExp from '@/components/HeaderExp';
import { Button, Card, Spin, ConfigProvider } from 'antd';
import { Send } from 'lucide-react';
import { LoadingOutlined } from '@ant-design/icons';
import placeholder from '@/public/images/image-placeholder.png';
import { BASE_URL } from '@/lib/base';
import '@ant-design/v5-patch-for-react-19';

type ProjectData = {
  id: string;
  title: string;
  description: string;
  githubLink: string;
  createdAt: string;
  screenshots: string[];
};

const antIcon = (
  <LoadingOutlined style={{ fontSize: 48, color: '#f6b846' }} spin />
);

const page = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<ProjectData[]>([]);
  const [projectsLoaded, setProjectsLoaded] = useState(5);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setVisibleProjects(projects.slice(0, projectsLoaded));
  }, [projects]);

  // ✅ Fetch Experiment Projects Data
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/projects/experimental/read`
      );
      const data: ProjectData[] = await response.json();
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  // ✅ Find a Thumbnail in the Screenshots (or Return Custom Placeholder)
  const getThumbnail = (screenshots: string[]) => {
    if (!screenshots || screenshots.length === 0) {
      return placeholder.src;
    }
    return (
      screenshots.find((screenshot) =>
        screenshot.toLowerCase().includes('thumbnail')
      ) || placeholder.src
    );
  };

  // ✅ Load More Projects
  const handleLoadMore = () => {
    const nextBatch = projects.slice(0, visibleProjects.length + 5);
    setVisibleProjects(nextBatch);
    setProjectsLoaded(nextBatch.length);
  };

  const navigateToProjectPage = (project: ProjectData) => {
    window.open(`/projectsM/${project.id}`, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      {/* ✅ Header Changed to HeaderExp */}
      <HeaderExp />

      {/* ✅ Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <>
          {/* ✅ Experiment Project Cards */}
          <div className="grid grid-cols-1 gap-6 p-6 mt-16 justify-items-center">
            {windowWidth < 500 && (
              <p className="text-2xl">My Experiment Projects</p>
            )}
            {visibleProjects.map((project, index) => {
              const thumbnail = getThumbnail(project.screenshots);
              return (
                <Card
                  key={index}
                  style={{
                    width:
                      windowWidth < 428
                        ? '300px'
                        : windowWidth < 535
                          ? '400px'
                          : '500px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    backgroundColor: '#1E1E1E',
                    color: '#fff',
                    padding: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {/* ✅ Thumbnail Handling */}
                  <img
                    src={thumbnail}
                    alt={project.title}
                    style={{
                      borderRadius: '10px',
                      marginBottom: '10px',
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.currentTarget.src = placeholder.src;
                    }}
                  />

                  {/* ✅ Project Information */}
                  <h3 className="text-lg mb-2">{project.title}</h3>

                  {/* ✅ Project Button */}
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: '#f6b846',
                      },
                    }}
                  >
                    <Button
                      type="primary"
                      block
                      onClick={() => navigateToProjectPage(project)}
                      style={{ color: '#000' }}
                    >
                      View Project{' '}
                      <Send size={18} style={{ marginLeft: '8px' }} />
                    </Button>
                  </ConfigProvider>
                </Card>
              );
            })}
          </div>

          {/* ✅ Load More Button */}
          {projectsLoaded < projects.length && (
            <div className="flex justify-center py-6">
              <Button type="primary" onClick={handleLoadMore}>
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default page;
