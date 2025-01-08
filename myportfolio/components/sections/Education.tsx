'use client';
import React from 'react';
import { Card, Typography } from 'antd';
import { motion } from 'framer-motion';

const { Title } = Typography;

const Education = () => {
    const content = JSON.parse(sessionStorage.getItem('content') || '{}');
    const education = content.education || {};

    // Framer Motion Animation Variants (Glowing effect removed)
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.05 }  // Only scale effect kept
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.3 }}
            className="text-white leading-relaxed space-y-10 flex flex-col items-center"
            style={{ overflow: 'hidden' }}
        >
            {/* Vertical Card Stack Container */}
            <div
                style={{
                    maxWidth: '600px',
                    width: '100%',
                    margin: '0 auto',
                    padding: '0 20px',
                    boxSizing: 'border-box',
                }}
            >
                {education.texts?.map((item: string, index: number) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover="hover"
                        className="my-4"
                    >
                        <Card
                            style={{
                                borderRadius: '15px',
                                backgroundColor: '#1f1f1f',
                                color: '#fff',
                                textAlign: 'left',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                padding: '10px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                cursor: 'pointer',
                            }}
                        >
                            <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>
                                {item}
                            </p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Education;
