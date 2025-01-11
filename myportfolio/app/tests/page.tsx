'use client';
import React from 'react';
import ImageGrid from '@/components/ImageGrid';

const Page = () => {
  const imageUrls = [
    'https://images.unsplash.com/photo-1541845157-a6d2d100c931?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1588282322673-c31965a75c3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    'https://images.unsplash.com/photo-1588117472013-59bb13edafec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1587588354456-ae376af71a25?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1558980663-3685c1d673c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60',
    'https://images.unsplash.com/photo-1588117472013-59bb13edafec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1541845157-a6d2d100c931?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1588282322673-c31965a75c3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    'https://images.unsplash.com/photo-1588117472013-59bb13edafec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1587588354456-ae376af71a25?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1558980663-3685c1d673c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60',
    'https://images.unsplash.com/photo-1588117472013-59bb13edafec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1541845157-a6d2d100c931?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1588282322673-c31965a75c3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    'https://images.unsplash.com/photo-1588117472013-59bb13edafec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1587588354456-ae376af71a25?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1558980663-3685c1d673c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60',
    'https://images.unsplash.com/photo-1588117472013-59bb13edafec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  ];

  return (
    <div>
      <div style={{ width : '800px', textAlign: 'center' }}>
        <h1>Image Gallery</h1>
        <ImageGrid imageUrls={imageUrls} />
      </div>
    </div>
  );
};

export default Page;
