"use client";
import React from 'react';
import { Card, Typography, List } from 'antd';

const { Title, Paragraph } = Typography;

const AboutMe = () => {
    const content = JSON.parse(sessionStorage.getItem('content') || '{}');
    const aboutMeData = content.aboutMe || {};
    const authorData = content.author || {};

    const personalDetails = [
        { label: 'Name', value: authorData.name },
        { label: 'Date of Birth', value: authorData.dob },
        { label: 'Age', value: authorData.age },
        { label: 'Freelance', value: authorData.freelance },
        { label: 'Residence', value: authorData.residence },
        { label: 'Email', value: authorData.email },
        { label: 'Phone', value: authorData.phone },
        { label: 'Status', value: authorData.myStatus },
    ];

    return (
        <div className="text-white leading-relaxed">
            {/* Title and Description (Outside the Card) */}
            <Typography>
                <Paragraph style={{ color: '#bfbfbf' }}>
                    {aboutMeData.description}
                </Paragraph>
            </Typography>

            {/* Card Wrapping the More Section and Personal Details */}
            <Card
                style={{
                    backgroundColor: '#1f1f1f',
                    color: '#fff',
                    borderRadius: '8px',
                    marginTop: '20px',
                }}
            >
                {/* More Section */}
                <Typography>
                    <Title level={4} style={{ color: '#fff' }}>
                        More
                    </Title>
                </Typography>

                {/* Personal Details Section */}
                <List
                    dataSource={personalDetails}
                    renderItem={(item) => (
                        <List.Item style={{ border: 'none', color: '#bfbfbf' }}>
                            <strong style={{ color: '#fff', marginRight: '8px' }}>
                                {item.label}:
                            </strong>
                            {/* Gradient line with rounded start */}
                            <div style={{
                                flexGrow: 1,
                                height: '4px',
                                background: 'linear-gradient(to right, #bfbfbf, transparent)',
                                margin: '0 8px',
                                borderRadius: '50px 0 0 50px'
                            }}></div>
                            <span>{item.value}</span>
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

export default AboutMe;
