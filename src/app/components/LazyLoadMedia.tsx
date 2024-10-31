"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface LazyLoadMediaProps {
    src: string;
    videoSrc?: string;
    width: number;
    height: number;
    title: string;
    className?: string;
    isVideo?: boolean;
}

const LazyLoadMedia: React.FC<LazyLoadMediaProps> = ({
    src,
    videoSrc,
    width,
    height,
    title,
    className,
    isVideo = false,
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVideo && isInView && videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.log("Auto-play failed:", error);
            });
        }
    }, [isVideo, isInView]);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleMouseEnter = () => {
        if (videoSrc && videoRef.current) {
            setIsHovering(true);
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoSrc && videoRef.current) {
            setIsHovering(false);
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const mediaClasses = `
        h-auto max-w-full max-h-full object-contain rounded-md
        transition-all duration-500 ease-in-out
        ${isLoading ? "blur-sm" : "blur-0"}
        ${className || ""}
    `;

    // If it's a direct video without preview image
    if (isVideo) {
        return (
            <div ref={containerRef}>
                {isInView && (
                    <video
                        ref={videoRef}
                        width={width}
                        height={height}
                        className={mediaClasses}
                        muted
                        playsInline
                        preload="metadata"
                        loop
                        onLoadedData={handleLoad}
                    >
                        <source src={src} type="video/webm" />
                    </video>
                )}
            </div>
        );
    }

    // For image with optional video hover
    return (
        <div
            ref={containerRef}
            className="relative w-full h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Image
                src={src}
                alt={title}
                width={width}
                height={height}
                className={`${mediaClasses} ${
                    isHovering ? "opacity-0" : "opacity-100"
                }`}
                priority={width > 200}
                onLoad={handleLoad}
            />
            {videoSrc && isInView && (
                <video
                    ref={videoRef}
                    width={width}
                    height={height}
                    className={`${mediaClasses} absolute top-0 left-0 ${
                        isHovering ? "opacity-100" : "opacity-0"
                    }`}
                    muted
                    playsInline
                    preload="metadata"
                >
                    <source src={videoSrc} type="video/webm" />
                </video>
            )}
        </div>
    );
};

export default LazyLoadMedia;
