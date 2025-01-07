// components/sections/AboutMe.tsx
import React from 'react';

const AboutMe = () => {
    const content = JSON.parse(sessionStorage.getItem('content') || '{}');
    const aboutMeData = content.aboutMe || {};

    return (
        <div className="text-white leading-relaxed">
            <p>{aboutMeData.description}</p>
        </div>
    );
};

export default AboutMe;
