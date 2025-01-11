'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const CurrentlyIam = () => {
  const content = JSON.parse(sessionStorage.getItem('content') || '{}');
  const currentlyIam = content.currentlyIAm || {};

  // Animation Variants for Cards
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="text-white leading-relaxed space-y-10"
    >
      {/* Single Card Per Row with Animation */}
      <motion.div
        className="space-y-3 flex flex-col items-center"
        variants={containerVariants}
      >
        {currentlyIam.texts?.map((item: string, index: number) => (
          <motion.div
            key={index}
            variants={itemVariants}
            style={{ width: '100%' }}
          >
            <Card
              hoverable
              style={{
                maxWidth: '600px',
                margin: 'auto',
                padding: '10px',
                borderRadius: '15px',
                backgroundColor: '#1f1f1f',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                flexWrap: 'wrap',
                pointerEvents: 'none',
              }}
            >
              <p style={{ fontSize: '1.1rem', fontWeight: '400', whiteSpace: 'normal' }}>
                {item}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CurrentlyIam;
