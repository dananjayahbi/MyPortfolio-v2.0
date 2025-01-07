// components/sections/Education.tsx
import React from 'react';

const Education = () => {
    const content = JSON.parse(sessionStorage.getItem('content') || '{}');
    const education = content.education || {};

    return (
        <div className="text-white leading-relaxed space-y-4">
            <ul className="list-disc pl-5 space-y-3">
                {education.texts?.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Education;
