'use client';
import React from 'react';
import { Card, Typography, List, Avatar } from 'antd';
import { motion } from 'framer-motion';
import frontendImage from '@/public/images/frontend.png';
import backendImage from '@/public/images/backend.png';
import databaseImage from '@/public/images/database.png';
import versionControlImage from '@/public/images/git.png';
import othersImage from '@/public/images/others.png';

const { Title } = Typography;

const Skills = ({ windowWidth }: { windowWidth: number }) => {
  const content =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('content') || '{}')
      : {};

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
        return othersImage;
    }
  };

  // ✅ Determine column count based on window width
  const getColumnCount = () => {
    if (windowWidth < 475) {
      return 2; // 2 columns for very small screens
    } else if (windowWidth < 768) {
      return 3; // 3 columns for medium screens
    }
    return 4; // 4 columns for larger screens
  };

  // ✅ Determine tile size based on window width
  const getTileSize = () => {
    if (windowWidth < 425) {
      return { width: 100, height: 110, avatarSize: 48 }; // Smaller tile size for very small screens
    }
    return { width: 130, height: 140, avatarSize: 64 }; // Default tile size
  };

  const tileSize = getTileSize();

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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
              }}
            >
              <Avatar
                src={getCategoryImage(skillCategory.title).src}
                size={32}
              />
              <Title level={4} style={{ color: '#fff', margin: 0 }}>
                {skillCategory.title}
              </Title>
            </div>

            {/* ✅ Dynamically Adjusting Columns and Tile Size */}
            <List
              grid={{ gutter: 16, column: getColumnCount() }}
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
                        width: tileSize.width,
                        height: tileSize.height,
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
                        size={tileSize.avatarSize}
                        style={{ marginBottom: '10px' }}
                      />
                      <Title
                        level={5}
                        style={{
                          color: '#fff',
                          fontSize: windowWidth < 550 ? '10px' : '16px',
                        }}
                      >
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
