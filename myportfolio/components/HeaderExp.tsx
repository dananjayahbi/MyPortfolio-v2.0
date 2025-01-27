'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/lib/base';

const HeaderExp = () => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
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
      {windowWidth > 500 && <h1>My Experimental Projects</h1>}
      <div style={{ display: 'flex', gap: '10px' }}>
      {/* Button for Home Page */}
      <Button onClick={() => router.push(`${BASE_URL}`)}>
        Home
      </Button>

      {/* Button for Experiment Projects with Highlight */}
      <Button
        onClick={() =>
          router.push(
            windowWidth < 600
              ? `${BASE_URL}/projectsM/main-projects`
              : `${BASE_URL}/projects/main-projects`
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
        Main Projects 🚀
      </Button>
      </div>
    </header>
  );
};

export default HeaderExp;
