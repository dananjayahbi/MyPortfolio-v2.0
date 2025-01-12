'use client';
import React, { useRef } from 'react';
import { Carousel, Typography, Card, Button } from 'antd';
import { motion } from 'framer-motion';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title } = Typography;

const FunFacts = ({ windowWidth }: { windowWidth: number }) => {
  const content =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('content') || '{}')
      : {};

  const funFacts = content.funFacts || {};

  // Carousel Reference for Custom Navigation Control
  const carouselRef = useRef<any>(null);

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-white leading-relaxed space-y-10 flex flex-col items-center"
      style={{ overflow: 'hidden' }}
    >
      {/* Carousel Container with Buttons */}
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          margin: '0 auto',
          padding: '0 20px',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Carousel with Ref for Custom Control */}
        <Carousel ref={carouselRef} autoplay autoplaySpeed={4000}>
          {funFacts.texts?.map((fact: string, index: number) => (
            <motion.div key={index}>
              <Card
                hoverable
                style={{
                  width: '100%',
                  padding: '20px',
                  borderRadius: '15px',
                  backgroundColor: '#1f1f1f',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>{fact}</p>
              </Card>
            </motion.div>
          ))}
        </Carousel>

        {/* Custom Navigation Buttons */}
        <Button
          shape="round"
          icon={<LeftOutlined />}
          onClick={handlePrev}
          style={{
            position: 'absolute',
            top: '50%',
            left: '0px',
            width: '40px',
            height: '40px',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        />
        <Button
          shape="circle"
          icon={<RightOutlined />}
          onClick={handleNext}
          style={{
            position: 'absolute',
            top: '50%',
            right: '0px',
            width: '40px',
            height: '40px',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        />
      </div>
    </motion.div>
  );
};

export default FunFacts;
