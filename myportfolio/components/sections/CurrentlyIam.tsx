// components/sections/CurrentlyIam.tsx
import React from 'react';

const CurrentlyIam = () => {
    const content = JSON.parse(sessionStorage.getItem('content') || '{}');
    const currentlyIam = content.currentlyIAm || {};

    return (
        <div className="text-white leading-relaxed space-y-6">
            <ul className="list-disc space-y-4 pl-5">
                {currentlyIam.texts?.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default CurrentlyIam;
