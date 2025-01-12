'use client';

import React, { useEffect, useRef, useState } from 'react';
import LoadingTransition from '@/components/loading/LoadingTransition';
import HeaderMain from '@/components/HeaderMain';
import { useRouter } from 'next/navigation';
import { Tour } from 'antd';
import type { TourProps } from 'antd';
import '@ant-design/v5-patch-for-react-19';

type ProjectData = {
  id: string;
  title: string;
  description: string;
  githubLink: string;
  screenshots: string[];
  createdAt: string;
};

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [hexagonPositions, setHexagonPositions] = useState<
    { x: number; y: number }[]
  >([]);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });
  const [fadedHexagons, setFadedHexagons] = useState<number[]>([]);
  const [tourOpen, setTourOpen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const projectTitleRef = useRef<HTMLAnchorElement>(null);
  const experimentalButtonRef = useRef<HTMLButtonElement>(null!);
  const homeButtonRef = useRef<HTMLButtonElement>(null!);

  const hexRadius = 60;
  const hexHeight = Math.sqrt(3) * hexRadius + 30;
  const hexGap = 3;
  const fadePercentage = 60; // Adjustable fading percentage

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      initializeHexagons(projects.length);
      setIsLoading(false);
      triggerRandomFading(); // Initial fading effect
      const interval = setInterval(triggerRandomFading, 2000);
      return () => clearInterval(interval);
    }
  }, [projects]);

  // ✅ Corrected localStorage handling
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (hasSeenTour !== 'true') {
      setTourOpen(true);
      localStorage.setItem('hasSeenTour', 'true');
    }
    console.log('hasSeenTour:', hasSeenTour);
  }, []);

  // Fetching data from API
  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/projects/main/read'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: ProjectData[] = await response.json();
      setProjects(data); // Storing the entire project data
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const initializeHexagons = (hexCount: number) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const positions: { x: number; y: number }[] = [{ x: centerX, y: centerY }];
    const visited = new Set<string>();
    visited.add(`${centerX},${centerY}`);

    let currentQueue = [positions[0]];

    while (positions.length < hexCount) {
      const nextQueue: { x: number; y: number }[] = [];

      for (const hex of currentQueue) {
        const adjacentPositions = getAdjacentHexagonPositions(hex.x, hex.y);

        for (const pos of adjacentPositions) {
          const key = `${pos.x},${pos.y}`;
          if (!visited.has(key)) {
            visited.add(key);
            positions.push(pos);
            nextQueue.push(pos);
            if (positions.length >= hexCount) break;
          }
        }
      }
      currentQueue = nextQueue;
    }

    setHexagonPositions(recenterHexagons(positions));
  };

  const triggerRandomFading = () => {
    if (projects.length === 0) return;
    const numberOfHexagonsToFade = Math.floor(
      (fadePercentage / 100) * projects.length
    );
    const randomIndexes: number[] = [];

    while (randomIndexes.length < numberOfHexagonsToFade) {
      const randomIndex = Math.floor(Math.random() * projects.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    setFadedHexagons(randomIndexes); // Update the state correctly
  };

  const recenterHexagons = (positions: { x: number; y: number }[]) => {
    if (positions.length === 0) return positions;

    const minX = Math.min(...positions.map((pos) => pos.x));
    const maxX = Math.max(...positions.map((pos) => pos.x));
    const minY = Math.min(...positions.map((pos) => pos.y));
    const maxY = Math.max(...positions.map((pos) => pos.y));

    const offsetX =
      (window.innerWidth - (maxX - minX + hexRadius * 2)) / 2 - minX;
    const offsetY = (window.innerHeight - (maxY - minY + hexHeight)) / 2 - minY;

    return positions.map((pos) => ({
      x: pos.x + offsetX,
      y: pos.y + offsetY,
    }));
  };

  const getAdjacentHexagonPositions = (centerX: number, centerY: number) => [
    { x: centerX + (hexRadius * 2 + hexGap), y: centerY },
    {
      x: centerX + (hexRadius + hexGap / 2),
      y: centerY + (hexHeight * 0.75 + hexGap),
    },
    {
      x: centerX - (hexRadius + hexGap / 2),
      y: centerY + (hexHeight * 0.75 + hexGap),
    },
    { x: centerX - (hexRadius * 2 + hexGap), y: centerY },
    {
      x: centerX - (hexRadius + hexGap / 2),
      y: centerY - (hexHeight * 0.75 + hexGap),
    },
    {
      x: centerX + (hexRadius + hexGap / 2),
      y: centerY - (hexHeight * 0.75 + hexGap),
    },
  ];

  const navigateToProjectPage = (project: ProjectData) => {
    // router.push(`/projects/${project.id}`);
    window.open(`/projects/${project.id}`, '_blank');
  };

  const getElementOrBody = (ref: React.RefObject<HTMLElement>) => {
    return ref.current ?? document.body;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - startDrag.x;
    const dy = e.clientY - startDrag.y;
    setStartDrag({ x: e.clientX, y: e.clientY });
    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const zoomAmount = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prevZoom) => Math.min(Math.max(prevZoom * zoomAmount, 0.5), 2));
  };

  const steps: TourProps['steps'] = [
    {
      title: 'Move the Canvas',
      description: 'You can move the canvas by dragging with your mouse.',
      target: () => getElementOrBody(canvasRef as React.RefObject<HTMLElement>),
    },
    {
      title: 'Project Details',
      description: 'Click a project title to view its details.',
      target: () =>
        getElementOrBody(projectTitleRef as React.RefObject<HTMLElement>),
    },
    {
      title: 'Experimental Projects',
      description: 'Open Experimental projects',
      target: () =>
        getElementOrBody(experimentalButtonRef as React.RefObject<HTMLElement>),
    },
    {
      title: 'Home Button',
      description: 'Click here to return to the homepage.',
      target: () =>
        getElementOrBody(homeButtonRef as React.RefObject<HTMLElement>),
    },
  ];

  return (
    <div
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: '#373940',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      <LoadingTransition isLoading={isLoading} />

      {!isLoading && (
        <div>
          <HeaderMain
            homeButtonRef={homeButtonRef}
            experimentalButtonRef={experimentalButtonRef}
            onTourStart={() => setTourOpen(true)}
          />
          <div
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              transformOrigin: 'center',
            }}
          >
            {hexagonPositions.map((pos, index) => {
              const project = projects[index];

              // Ensure project exists and screenshots array is defined
              if (!project || !project.screenshots) {
                return null; // Skip rendering if data is invalid
              }

              const bgImage = project.screenshots.find((img) =>
                img.includes('background.jpg')
              );

              return (
                <div
                  key={project.id}
                  style={{
                    position: 'absolute',
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    width: `${hexRadius * 2}px`,
                    height: `${hexHeight}px`,
                    background: bgImage
                      ? `url(${bgImage}) center/cover no-repeat`
                      : '#f6b846',
                    clipPath:
                      'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '10px',
                    fontSize: '12px',
                    opacity: fadedHexagons.includes(index) ? 0.5 : 1,
                    transition: 'opacity 1s ease-in-out',
                  }}
                >
                  <a
                    href="#"
                    ref={index === 0 ? projectTitleRef : undefined}
                    onClick={() => navigateToProjectPage(project)}
                  >
                    <p>{project.title}</p>
                  </a>
                </div>
              );
            })}
          </div>
          <Tour
            open={tourOpen}
            onClose={() => setTourOpen(false)}
            steps={steps}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
