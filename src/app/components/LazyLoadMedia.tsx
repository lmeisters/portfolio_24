import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface LazyLoadMediaProps {
    src: string;
    alt?: string;
    width: number;
    height: number;
    title: string;
    applyHoverEffect?: boolean;
    isVideo?: boolean;
}

const LazyLoadMedia: React.FC<LazyLoadMediaProps> = ({
    src,
    alt,
    width,
    height,
    title,
    applyHoverEffect = false,
    isVideo = false,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isVideo && videoRef.current) {
            const video = videoRef.current;
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        video.src = src;
                        observer.disconnect();
                    }
                },
                { threshold: 0.1 }
            );
            observer.observe(video);

            return () => {
                observer.unobserve(video);
            };
        }
    }, [isVideo, src]);

    const handleLoadComplete = () => {
        setIsLoading(false);
    };

    return (
        <div
            className={`relative overflow-hidden w-11/12 ${
                applyHoverEffect
                    ? "transition-transform duration-300 ease-in-out hover:scale-105"
                    : ""
            }`}
        >
            {isVideo ? (
                <video
                    ref={videoRef}
                    width={width}
                    height={height}
                    title={title}
                    className={`h-auto max-w-full max-h-full object-contain rounded-md border border-gray-300 transition-all duration-500 ease-in-out ${
                        isLoading
                            ? "scale-110 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                    }`}
                    onLoadedData={handleLoadComplete}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                >
                    Your browser does not support the video tag.
                </video>
            ) : (
                <Image
                    src={src || "/placeholder-image.jpg"}
                    alt={alt || `${title} project screenshot`}
                    width={width}
                    height={height}
                    className={`h-auto max-w-full max-h-full object-contain rounded-md border border-gray-300 transition-all duration-500 ease-in-out ${
                        isLoading
                            ? "scale-110 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                    }`}
                    onLoad={handleLoadComplete}
                />
            )}
            {isLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
        </div>
    );
};

export default LazyLoadMedia;
