'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, Typography, Avatar } from 'antd';
import {
  CodeOutlined,
  ReadOutlined,
  VideoCameraOutlined,
  CaretRightOutlined ,
  CustomerServiceOutlined,
  CameraOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const hobbyIcons: { [key: string]: React.ReactNode } = {
  Coding: <CodeOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />,
  Reading: <ReadOutlined style={{ fontSize: '2rem', color: '#52c41a' }} />,
  'Watching Movies': (
    <VideoCameraOutlined style={{ fontSize: '2rem', color: '#eb2f96' }} />
  ),
  'Playing Video Games': (
    <CaretRightOutlined  style={{ fontSize: '2rem', color: '#fa8c16' }} />
  ),
  'Listening to Music': (
    <CustomerServiceOutlined style={{ fontSize: '2rem', color: '#13c2c2' }} />
  ),
  Traveling: <EnvironmentOutlined style={{ fontSize: '2rem', color: '#722ed1' }} />,
  Photography: <CameraOutlined style={{ fontSize: '2rem', color: '#fadb14' }} />,
};

const MyHobbies = () => {
  const content = JSON.parse(sessionStorage.getItem('content') || '{}');
  const myHobbies = content.myHobbies || {};

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    hover: { scale: 1.05, transition: { yoyo: Infinity } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="text-white leading-relaxed space-y-8"
    >
      {/* Hobbies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myHobbies.texts?.map((hobby: string, index: number) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className="flex justify-center"
          >
            <Card
              hoverable
              style={{
                width: 300,
                textAlign: 'center',
                borderRadius: '15px',
                backgroundColor: '#1f1f1f',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                pointerEvents: 'none',
              }}
            >
              <Avatar
                size={64}
                icon={hobbyIcons[hobby] || <CodeOutlined style={{ fontSize: '2rem' }} />}
                style={{ backgroundColor: 'transparent', marginBottom: '10px' }}
              />
              <Title level={4} style={{ color: '#fff' }}>
                {hobby}
              </Title>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyHobbies;
