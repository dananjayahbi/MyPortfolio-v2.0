// components/sections/Skills.tsx
import React from 'react';

const Skills = () => {
    const content = JSON.parse(sessionStorage.getItem('content') || '{}');
    const skills = content.skills?.subTitles || [];

    return (
        <div className="text-white leading-relaxed space-y-8">
            {skills.map((skill: { title: string; description: string }, index: number) => (
                <div key={index}>
                    <h3 className="text-2xl font-bold text-white mb-3">{skill.title}</h3>
                    <p>{skill.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Skills;
