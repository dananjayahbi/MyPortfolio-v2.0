// components/sections/Experience.tsx
import React from 'react';

const Experience = () => {
    const content = JSON.parse(sessionStorage.getItem('content') || '{}');
    const experience = content.experience || {};

    return (
        <div className="text-white leading-relaxed space-y-4">
            <ul className="list-disc pl-5 space-y-3">
                {experience.texts?.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Experience;
