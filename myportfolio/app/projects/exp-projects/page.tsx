'use client';

import React, { useEffect, useState } from 'react';
import LoadingTransition from '@/components/loading/LoadingTransition';
import HeaderExp from '@/components/HeaderExp';
import { useRouter } from 'next/navigation';

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
  }, [projects]); // Ensure it only runs after data is set

  // Fetching data from API
  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/projects/experimental/read'
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

  const navigateToProjectPage = (projectId: string) => {
    window.open(`/projects/${projectId}`, '_blank');
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

  return (
    <div
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
          <HeaderExp />
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
                  <a href="#" onClick={() => navigateToProjectPage(project.id)}>
                    <p>{project.title}</p>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
