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
    enableZoom?: boolean;
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
    enableZoom = true,
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isZoomed, setIsZoomed] = useState(false);

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

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsZoomed(false);
        };

        if (isZoomed) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isZoomed]);

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

    const handleZoomClick = () => {
        if (isVideo && enableZoom) {
            setIsZoomed(true);
        }
    };

    const handleCloseZoom = () => {
        setIsZoomed(false);
    };

    const mediaClasses = `
        h-auto max-w-full max-h-full object-contain rounded-md
        transition-all duration-500 ease-in-out
        ${isLoading ? "blur-lg scale-[1.02]" : "blur-0 scale-100"}
        ${isVideo && enableZoom && !isZoomed ? "cursor-zoom-in" : ""}
        ${className || ""}
    `.trim();

    const VideoContent = ({ isZoomed = false }: { isZoomed?: boolean }) => (
        <video
            ref={videoRef}
            width={width}
            height={height}
            className={`${mediaClasses} ${
                isZoomed ? "max-h-[90vh] w-auto" : ""
            }`}
            muted
            playsInline
            preload="metadata"
            loop
            autoPlay
            onLoadedData={handleLoad}
        >
            <source src={src} type="video/webm" />
        </video>
    );

    // Loading placeholder
    const loadingPlaceholder = (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
    );

    if (isVideo) {
        return (
            <>
                <div
                    ref={containerRef}
                    className="relative"
                    onClick={handleZoomClick}
                >
                    {isLoading && loadingPlaceholder}
                    {isInView && <VideoContent />}
                </div>

                {isZoomed && (
                    <div
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center
                        transition-all duration-300 ease-in-out"
                        onClick={handleCloseZoom}
                        style={{
                            animation: "fadeIn 300ms ease-out",
                        }}
                    >
                        <div
                            className="relative max-w-[75vw] max-h-[75vh] transform transition-all duration-300 ease-out"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                animation: "zoomIn 300ms ease-out",
                            }}
                        >
                            <button
                                onClick={handleCloseZoom}
                                className="absolute -top-10 right-0 text-white hover:text-gray-300 p-2
                                transition-colors duration-200"
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <VideoContent isZoomed />
                        </div>
                    </div>
                )}
            </>
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

const styles = `
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
`;

if (typeof document !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

export default LazyLoadMedia;
