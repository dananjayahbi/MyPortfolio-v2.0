'use client';
import React from 'react';
import { Timeline, Typography } from 'antd';
import { motion } from 'framer-motion';

const { Title } = Typography;

const Experience = () => {
    const content = JSON.parse(sessionStorage.getItem('content') || '{}');
    const experience = content.experience || {};

    // Prepare Timeline items with corrected structure and margin-bottom
    const timelineItems = experience.texts?.map((item: string, index: number) => ({
        color: index % 2 === 0 ? 'blue' : 'green',
        children: (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    color: '#fff',
                    marginBottom: '20px',  // Added margin-bottom here
                }}
            >
                {item}
            </motion.div>
        ),
    }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white leading-relaxed space-y-10 flex flex-col items-center"
            style={{ overflow: 'hidden' }}
        >
            <br />
            {/* Custom Styling Added */}
            <style jsx>{`
                :global(.ant-timeline-item-tail) {
                    background-color: #fff !important;
                }
                :global(.ant-timeline-item-content) {
                    margin-bottom: 30px !important;
                }
            `}</style>

            {/* Timeline with Custom Line Color and Margin */}
            <div
                style={{
                    maxWidth: '600px',
                    width: '100%',
                    margin: '0 auto',
                    padding: '0 20px',
                    boxSizing: 'border-box',
                }}
            >
                <Timeline items={timelineItems} mode="alternate" />
            </div>
        </motion.div>
    );
};

export default Experience;
