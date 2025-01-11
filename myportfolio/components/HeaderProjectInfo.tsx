"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const HeaderProjectInfo = () => {
  const router = useRouter();

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
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 1000,
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* Button for Home */}
        <Button
          onClick={() => router.push('http://localhost:3000')}
          style={{
            backgroundColor: '#f6b846',  // Highlighted button color
            color: '#000',               // Black text for contrast
            fontWeight: 'bold',          // Bold font for emphasis
            borderRadius: '8px',
            boxShadow: '0 0 12px rgba(246, 184, 70, 0.8)', // Glowing effect
          }}
        >
          🏠 Home 
        </Button>
      </div>
    </header>
  );
};

export default HeaderProjectInfo;
