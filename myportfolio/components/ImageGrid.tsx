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

const ImageGrid: React.FC<ImageGridProps> = ({ imageUrls }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
    };

    const gridWrapperStyle: React.CSSProperties = {
        display: 'grid',
        gridGap: '10px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gridAutoRows: '200px',
        gridAutoFlow: 'dense',
    };

    const gridItemStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const imageStyle: React.CSSProperties = {
        maxWidth: '100%',
        verticalAlign: 'middle',
        display: 'inline-block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const wideStyle: React.CSSProperties = {
        gridColumn: 'span 2',
    };

    const tallStyle: React.CSSProperties = {
        gridRow: 'span 2',
    };

    const bigStyle: React.CSSProperties = {
        gridColumn: 'span 2',
        gridRow: 'span 2',
    };

    return (
        <>
            <div style={gridWrapperStyle}>
                {imageUrls.map((url, index) => {
                    let style = gridItemStyle;
                    if (index % 5 === 2) style = { ...gridItemStyle, ...tallStyle };
                    if (index % 5 === 3) style = { ...gridItemStyle, ...wideStyle };
                    if (index % 5 === 4) style = { ...gridItemStyle, ...bigStyle };

                    return (
                        <div key={index} style={style}>
                            <img
                                src={url}
                                alt={`Image ${index + 1}`}
                                style={imageStyle}
                                onClick={() => openLightbox(index)}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Corrected Lightbox with Closing on Background Click */}
            {isOpen && (
                <Lightbox
                    open={isOpen}
                    close={closeLightbox}
                    slides={imageUrls.map((src) => ({ src }))}
                    index={currentIndex}
                    plugins={[Thumbnails, Zoom, Counter]}
                    counter={{ container: { style: { top: 0 } } }}
                    controller={{ closeOnBackdropClick: true }} // Closing on click outside image
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

export default ImageGrid;
