// "use client";

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { Send } from 'lucide-react';

type ProjectData = {
  id: string;
  title: string;
  description: string;
  githubLink: string;
  screenshots: string[];
  createdAt: string;
};

const Projects = ({ windowWidth }: { windowWidth: number }) => {
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
  const router = useRouter();

  // Fetch project data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/projects/main/read'
        );
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

  // Hexagon base style
  const hexagonStyle: React.CSSProperties = {
    width: '220px',
    height: '250px',
    backgroundColor: '#c3c3e6',
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
  };

  // Hover effect style
  const hexagonHoverStyle: React.CSSProperties = {
    backgroundColor: '#f6b846',
    opacity: 0.7,
    transform: 'scale(1.05)',
    color: 'white',
    fontWeight: 500,
    fontSize: '16px',
    zIndex: 1,
  };

  // State to manage hover effects
  const [hoveredHexagon, setHoveredHexagon] = useState<number | null>(null);

  const handleNavigate = (project?: ProjectData) => {
    if (windowWidth < 750) {
      router.push('/projectsM/main-projects');
    } else if (project) {
      const projectId = project.id;
      window.open(`/projects/${projectId}`, '_blank');
    } else {
      window.open('/projects/main-projects', '_blank');
    }
  };

  return (
    <div style={{ position: 'relative', height: '600px' }}>
      {hexagonTitles.map((title, index) => {
        const hexagonPosition: React.CSSProperties = {
          ...hexagonStyle,
          ...(index === 1 ? { top: '193px', left: '113px' } : {}),
          ...(index === 2 ? { top: '193px', left: '339px' } : {}),
          ...(index === 3 ? { top: '386px', left: '226px' } : {}),
        };

        return (
          <div
            key={index}
            style={{
              ...hexagonPosition,
              ...(hoveredHexagon === index ? hexagonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredHexagon(index)}
            onMouseLeave={() => setHoveredHexagon(null)}
          >
            {hoveredHexagon === index ? (
              <div>
                <p>{hexagonDescriptions[index]}</p>
                <Button
                  type="primary"
                  onClick={() => handleNavigate(projects[index])}
                  style={{ marginTop: "10px" }}
                >
                  View
                  <Send style={{ marginTop: '2px' }} size={12} />
                </Button>
              </div>
            ) : (
              title
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
