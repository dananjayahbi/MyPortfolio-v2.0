// "use client";

import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider } from 'antd';
import { useRouter } from 'next/navigation';
import { Send } from 'lucide-react';
import { BASE_URL } from '@/lib/base';

type ProjectData = {
  id: string;
  title: string;
  description: string;
  githubLink: string;
  screenshots: string[];
  createdAt: string;
};

const ProjectsM = ({ windowWidth }: { windowWidth: number }) => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [hexagonTitles, setHexagonTitles] = useState<string[]>([
    'Hexagon 1',
    'Hexagon 2',
    'Hexagon 3',
    'See More',
  ]);
  const [hexagonDescriptions, setHexagonDescriptions] = useState<string[]>([
    '',
    '',
    '',
    'Wanna see more?',
  ]);
  const [tappedHexagon, setTappedHexagon] = useState<number | null>(null); // ✅ Tap state instead of hover
  const router = useRouter();

  // Fetch project data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/projects/main/read`);
        const data: ProjectData[] = await response.json();
        sessionStorage.setItem('projects', JSON.stringify(data));

        // Randomly select three projects
        const shuffled = [...data].sort(() => 0.5 - Math.random()).slice(0, 3);

        setProjects(shuffled);
        setHexagonTitles([
          shuffled[0].title,
          shuffled[1].title,
          shuffled[2].title,
          'See More',
        ]);
        setHexagonDescriptions([
          shuffled[0].description,
          shuffled[1].description,
          shuffled[2].description,
          'Wanna see more?',
        ]);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchData();
  }, []);

  // Hexagon base style with rotation applied
  // ✅ Hexagon Styling
  const hexagonStyle: React.CSSProperties = {
    width: '220px',
    height: '250px',
    backgroundColor: '#FC9C36',
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    position: 'absolute',
    transition: 'transform 0.3s, background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    overflow: 'hidden',
    padding: '10px',
    color: 'black',
    transform: 'rotate(30deg)', // Rotating the hexagon
  };

  // ✅ Inner content rotation fix
  const innerContentStyle: React.CSSProperties = {
    transform: 'rotate(-30deg)',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // ✅ Active Hexagon Style (Tap Effect)
  const hexagonTappedStyle: React.CSSProperties = {
    backgroundColor: '#FC9C36',
    opacity: 0.7,
    transform: 'scale(1.05) rotate(30deg)',
    color: 'white',
    fontWeight: 500,
    fontSize: '16px',
    zIndex: 1,
  };

  const handleNavigate = (project?: ProjectData) => {
    if (windowWidth < 750) {
      router.push('/projectsM/main-projects');
    } else if (project) {
      const projectId = project.id;
      window.open(`/projects/${projectId}`, '_blank');
    } else {
      router.push('/projects/main-projects');
    }
  };

  // ✅ Updated Hexagon Positioning for Center Alignment
  const hexagonPositions: React.CSSProperties[] = [
    { top: '10px', left: `${(windowWidth - 280) / 2}px` },
    { top: '230px', left: `${(windowWidth - 280) / 2}px` },
    { top: '450px', left: `${(windowWidth - 280) / 2}px` },
    { top: '670px', left: `${(windowWidth - 280) / 2}px` },
  ];

  // ✅ Toggle Tap Effect
  const handleHexagonTap = (index: number) => {
    setTappedHexagon(tappedHexagon === index ? null : index);
  };

  return (
    <div style={{ position: 'relative', height: '880px' }}>
      {hexagonTitles.map((title, index) => {
        const hexagonPosition = {
          ...hexagonStyle,
          ...hexagonPositions[index],
          ...(tappedHexagon === index ? hexagonTappedStyle : {}),
        };

        return (
          <div
            key={index}
            style={hexagonPosition}
            onClick={() => handleHexagonTap(index)} // ✅ Changed to tap interaction
          >
            <div style={innerContentStyle}>
              {tappedHexagon === index ? (
                <div>
                  <p>
                    {hexagonDescriptions[index].split(' ').slice(0, 10).join(' ')}
                    {hexagonDescriptions[index].split(' ').length > 10 && '...'}
                  </p>
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          defaultBg: '#FDB05E',
                          defaultColor: '#fff',
                          defaultBorderColor: '#DD7403',
                          defaultHoverBg: '#DD7403',
                          defaultHoverBorderColor: '#DD7403',
                          defaultHoverColor: '#fff',
                        },
                      },
                    }}
                  >
                    <Button
                      type="default"
                      onClick={() => handleNavigate(projects[index])}
                      style={{ marginTop: '10px' }}
                    >
                      View
                      <Send style={{ marginTop: '2px' }} size={12} />
                    </Button>
                  </ConfigProvider>
                </div>
              ) : (
                title
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsM;
