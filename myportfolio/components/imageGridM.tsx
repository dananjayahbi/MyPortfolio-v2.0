"use client";
import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import 'yet-another-react-lightbox/styles.css';

type ImageGridProps = {
    imageUrls: string[];
};

const ImageGridM: React.FC<ImageGridProps> = ({ imageUrls }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
    };

    // Mobile optimized grid style (one image per row)
    const gridWrapperStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '10px',
    };

    const imageStyle: React.CSSProperties = {
        maxWidth: '100%',
        verticalAlign: 'middle',
        display: 'block',
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <>
            <div style={gridWrapperStyle}>
                {imageUrls.map((url, index) => (
                    <div key={index}>
                        <img
                            src={url}
                            alt={`Image ${index + 1}`}
                            style={imageStyle}
                            onClick={() => openLightbox(index)}
                        />
                    </div>
                ))}
            </div>

            {isOpen && (
                <Lightbox
                    open={isOpen}
                    close={closeLightbox}
                    slides={imageUrls.map((src) => ({ src }))}
                    index={currentIndex}
                    plugins={[Thumbnails, Zoom, Counter]}
                    counter={{ container: { style: { top: 0 } } }}
                    controller={{ closeOnBackdropClick: true }}
                    styles={{
                        container: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        }
                    }}
                />
            )}
        </>
    );
};

export default ImageGridM;
