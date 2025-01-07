// components/sections/FunFacts.tsx
import React from 'react';

const FunFacts = () => {
    const content = JSON.parse(sessionStorage.getItem('content') || '{}');
    const funFacts = content.funFacts || {};

    return (
        <div className="text-white leading-relaxed space-y-4">
            <ul className="list-disc pl-5 space-y-3">
                {funFacts.texts?.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default FunFacts;
