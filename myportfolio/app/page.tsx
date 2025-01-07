'use client';
import { useState, useEffect } from 'react';
import { Spin, message } from 'antd';
import DesktopPage from './desktop-page/page';
import MobilePage from './mobile-page/page';

export default function HomePage() {
    const [isLargeScreen, setIsLargeScreen] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPortfolioContent = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/portfolio/content/get');
                if (!response.ok) {
                    throw new Error('Failed to fetch portfolio content');
                }
                const data = await response.json();
                // ✅ Save the fetched content in session storage
                sessionStorage.setItem('content', JSON.stringify(data));
            } catch (error) {
                message.error('Failed to fetch content. Please try again later.');
                console.error('Error fetching portfolio content:', error);
            } finally {
                setLoading(false); // ✅ Stop loading after fetching the content
            }
        };

        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1366);
        };

        // ✅ Call both functions on mount
        fetchPortfolioContent();
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ✅ Show loading spinner while fetching data
    if (loading || isLargeScreen === null) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    // ✅ Render the page based on screen size after content is loaded
    return isLargeScreen ? <DesktopPage /> : <MobilePage />;
}
