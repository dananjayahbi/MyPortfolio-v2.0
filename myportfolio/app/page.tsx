'use client';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import DesktopPage from './desktop-page/page';
import MobilePage from './mobile-page/page';

export default function HomePage() {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1366);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 

    return () => window.removeEventListener('resize', handleResize); 
  }, []);

  if (isLargeScreen === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return isLargeScreen ? <DesktopPage /> : <MobilePage />;
}
