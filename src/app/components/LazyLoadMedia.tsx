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
    disableHover?: boolean;
    priority?: boolean;
}

const LazyLoadMedia: React.FC<LazyLoadMediaProps> = ({
    src,
    videoSrc,
    width,
    height,
    title,
    className,
    isVideo = false,
    disableHover = false,
    priority = false,
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
            { threshold: 0.1, rootMargin: "50px" }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleMouseEnter = () => {
        if (!disableHover && videoSrc) {
            setIsHovering(true);
            videoRef.current?.play();
        }
    };

    const handleMouseLeave = () => {
        if (!disableHover && videoSrc) {
            setIsHovering(false);
            videoRef.current?.pause();
        }
    };

    const mediaClasses = `
        h-auto max-w-full max-h-full object-contain rounded-md
        transition-all duration-500 ease-in-out
        ${isLoading ? "blur-lg scale-[1.02]" : "blur-0 scale-100"}
        ${className || ""}
    `.trim();

    // Loading placeholder
    const loadingPlaceholder = (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
    );

    if (isVideo) {
        return (
            <div ref={containerRef} className="relative">
                {isLoading && loadingPlaceholder}
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
                        autoPlay
                        onLoadedData={handleLoad}
                    >
                        <source src={src} type="video/webm" />
                    </video>
                )}
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full ${!disableHover ? "group" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isLoading && loadingPlaceholder}
            <Image
                src={src}
                alt={title}
                width={width}
                height={height}
                className={`${mediaClasses} ${
                    videoSrc && isHovering ? "opacity-0" : "opacity-100"
                }`}
                priority={priority}
                onLoad={handleLoad}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {videoSrc && isInView && (
                <video
                    ref={videoRef}
                    width={width}
                    height={height}
                    className={`${mediaClasses} absolute inset-0 object-cover ${
                        isHovering ? "opacity-100" : "opacity-0"
                    }`}
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedData={handleLoad}
                >
                    <source src={videoSrc} type="video/webm" />
                </video>
            )}
        </div>
    );
};

export default LazyLoadMedia;
