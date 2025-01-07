'use client';
import React from 'react';
import { Card, Typography, List, Avatar, Divider, Image } from 'antd';
import { motion } from 'framer-motion';
import frontendImage from '@/public/images/frontend.png';
import backendImage from '@/public/images/backend.png';
import databaseImage from '@/public/images/database.png';
import versionControlImage from '@/public/images/git.png';
import othersImage from '@/public/images/others.png';

const { Title } = Typography;

const Skills = () => {
  const content = JSON.parse(sessionStorage.getItem('content') || '{}');
  const skills = content.skills?.subTitles || [];

  // Function to determine the appropriate image based on the skill title
  const getCategoryImage = (title: string) => {
    switch (title.toLowerCase()) {
      case 'frontend':
        return frontendImage;
      case 'backend':
        return backendImage;
      case 'database management':
        return databaseImage;
      case 'version control':
        return versionControlImage;
      case 'others':
        return othersImage;
      default:
        return othersImage; // Fallback image if title doesn't match
    }
  };

  return (
    <div className="text-white leading-relaxed">
      {/* Skill Categories Section */}
      {skills.map(
        (
          skillCategory: {
            title: string;
            technologies: { name: string; image: string }[];
          },
          index: number
        ) => (
          <div key={index} style={{ marginBottom: '32px' }}>
            {/* Display title with corresponding image */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Avatar
                src={getCategoryImage(skillCategory.title).src}
                size={32}
              />
              <Title level={4} style={{ color: '#fff', margin: 0 }}>
                {skillCategory.title}
              </Title>
            </div>

            {/* Animated Cards with Framer Motion */}
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={skillCategory.technologies}
              renderItem={(technology) => (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <List.Item>
                    <Card
                      hoverable
                      style={{
                        width: 130,
                        height: 140,
                        backgroundColor: '#1f1f1f',
                        color: '#fff',
                        borderRadius: '10px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        textAlign: 'center',
                        pointerEvents: 'none',
                      }}
                    >
                      <Avatar
                        src={technology.image}
                        size={64}
                        style={{ marginBottom: '10px' }}
                      />
                      <Title level={5} style={{ color: '#fff' }}>
                        {technology.name}
                      </Title>
                    </Card>
                  </List.Item>
                </motion.div>
              )}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Skills;
