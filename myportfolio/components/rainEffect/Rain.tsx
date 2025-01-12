import React, { useEffect } from 'react';
import './Rain.css';

const Rain: React.FC = () => {
    useEffect(() => {
        const rainContainer = document.getElementById('rain-container') as HTMLElement;
        const numDrops = 200; // Increased number of drops for visibility

        // Clear existing drops to avoid duplication on re-render
        rainContainer.innerHTML = '';

        for (let i = 0; i < numDrops; i++) {
            const drop = document.createElement('div');
            drop.classList.add('rain');
            drop.style.left = `${Math.random() * 100}vw`;
            drop.style.animationDelay = `${Math.random() * -2}s`; // Changed delay to negative to start at different points
            drop.style.animationDuration = `${Math.random() * 2 + 2}s`;
            rainContainer.appendChild(drop);
        }
    }, []);

    return <div id="rain-container"></div>;
};

export default Rain;
