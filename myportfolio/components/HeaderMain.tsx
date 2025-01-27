'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { BASE_URL } from '@/lib/base';

type HeaderMainProps = {
  homeButtonRef: React.RefObject<HTMLButtonElement>;
  experimentalButtonRef: React.RefObject<HTMLButtonElement>;
  onTourStart: () => void;
};

const HeaderMain: React.FC<HeaderMainProps> = ({
  homeButtonRef,
  experimentalButtonRef,
  onTourStart,
}) => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setCurrentPath(window.location.href); // ✅ Capture the current route
  }, []);

  // Resize event listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '60px',
        backgroundColor: '#222',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: windowWidth < 500 ? 'center' : 'space-between',
        padding: '0 20px',
        zIndex: 1000,
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
      }}
    >
      {windowWidth > 500 && <h1>My Main Projects</h1>}
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* ✅ Conditional rendering for the "?" button */}
        {windowWidth > 600 && currentPath !== `${BASE_URL}/projectsM/main-projects` && (
          <Button onClick={onTourStart}>
            <QuestionCircleOutlined /> Help
          </Button>
        )}

        {/* Button for Home Page */}
        <Button ref={homeButtonRef} onClick={() => router.push(`${BASE_URL}`)}>
          Home
        </Button>

        {/* Button for Experiment Projects with Highlight */}
        <Button
          ref={experimentalButtonRef}
          onClick={() =>
            router.push(
              windowWidth < 600
                ? `${BASE_URL}/projectsM/exp-projects`
                : `${BASE_URL}/projects/exp-projects`
            )
          }
          style={{
            backgroundColor: '#f6b846',
            color: '#000',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: '0 0 12px rgba(246, 184, 70, 0.8)',
          }}
        >
          Experimental Projects 🚀
        </Button>
      </div>
    </header>
  );
};

export default HeaderMain;
