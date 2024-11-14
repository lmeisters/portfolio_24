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
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const playTimeoutRef = useRef<NodeJS.Timeout>();

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

    useEffect(() => {
        return () => {
            if (playTimeoutRef.current) {
                clearTimeout(playTimeoutRef.current);
            }
        };
    }, []);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
        if (videoRef.current) {
            playTimeoutRef.current = setTimeout(() => {
                const playPromise = videoRef.current?.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Ignore abort errors
                    });
                }
            }, 100);
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (playTimeoutRef.current) {
            clearTimeout(playTimeoutRef.current);
        }
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const mediaClasses = `
        h-auto max-w-full max-h-full object-contain rounded-md
        transition-all duration-500 ease-in-out
        ${isLoading ? "blur-lg scale-[1.02]" : "blur-0 scale-100"}
        ${className || ""}
    `.trim();

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
            className={`relative w-full h-full overflow-hidden ${
                !disableHover
                    ? "group transition-transform duration-300 hover:scale-105"
                    : ""
            }`}
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
