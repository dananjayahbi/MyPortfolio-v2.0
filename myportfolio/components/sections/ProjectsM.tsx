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

  // Hexagon base style with rotation applied
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
    transform: 'rotate(30deg)', // Rotating the hexagon
  };

  // Preventing inner content rotation
  const innerContentStyle: React.CSSProperties = {
    transform: 'rotate(-30deg)', // Rotating content back to prevent rotation
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Hover effect style
  const hexagonHoverStyle: React.CSSProperties = {
    backgroundColor: '#f6b846',
    opacity: 0.7,
    transform: 'scale(1.05) rotate(30deg)', // Maintaining rotation on hover
    color: 'white',
    fontWeight: 500,
    fontSize: '16px',
    zIndex: 1,
  };

  const [hoveredHexagon, setHoveredHexagon] = useState<number | null>(null);

  const handleNavigate = (project?: ProjectData) => {
    if (project) {
      const encodedData = encodeURIComponent(JSON.stringify(project));
      router.push(`/projects/page?data=${encodedData}`);
    } else {
      router.push('/projects/main-projects');
    }
  };

  // ✅ Updated Hexagon Positioning for Center Alignment
  const hexagonPositions: React.CSSProperties[] = [
    { top: '10px', left: `${(windowWidth - 280) / 2}px` },
    { top: '230px', left: `${(windowWidth - 280) / 2}px` }, 
    { top: '450px', left: `${(windowWidth - 280) / 2}px` },  
    { top: '670px', left: `${(windowWidth - 280) / 2}px` }  
  ];

  return (
    <div style={{ position: 'relative', height: '880px' }}>
      {hexagonTitles.map((title, index) => {
        const hexagonPosition = {
          ...hexagonStyle,
          ...hexagonPositions[index], // ✅ Dynamically applying position for all hexagons
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
            {/* ✅ Rotating content back to keep it aligned properly */}
            <div style={innerContentStyle}>
              {hoveredHexagon === index ? (
                <div>
                  <p>{hexagonDescriptions[index]}</p>
                  <Button
                    type="primary"
                    onClick={() => handleNavigate(projects[index])}
                  >
                    View
                    <Send style={{ marginTop: '2px' }} size={12} />
                  </Button>
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
