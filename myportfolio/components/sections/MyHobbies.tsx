// components/sections/MyHobbies.tsx
import React from 'react';

const MyHobbies = () => {
    const content = JSON.parse(sessionStorage.getItem('content') || '{}');
    const myHobbies = content.myHobbies || {};

    return (
        <div className="text-white leading-relaxed space-y-4">
            <ul className="list-disc pl-5 space-y-3">
                {myHobbies.texts?.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default MyHobbies;
