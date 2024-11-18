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
    const [isClosing, setIsClosing] = useState(false);

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
            if (e.key === "Escape") handleCloseZoom();
        };

        if (isZoomed || isClosing) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isZoomed, isClosing]);

    useEffect(() => {
        if (isZoomed || isClosing) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [isZoomed, isClosing]);

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
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setIsZoomed(false);
        }, 400);
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
                isZoomed ? "!max-h-[65vh] !w-auto max-w-[90vw]" : ""
            }`}
            muted
            playsInline
            preload="metadata"
            loop
            autoPlay={isVideo}
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

                {(isZoomed || isClosing) && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center
                        transition-all duration-500 ease-out"
                        onClick={handleCloseZoom}
                        onTouchEnd={handleCloseZoom}
                        style={{
                            animation: `${
                                isClosing ? "fadeOut" : "fadeIn"
                            } 400ms ease-out`,
                        }}
                    >
                        <div className="absolute inset-0 bg-black/90" />
                        <div className="relative w-full h-full flex items-center justify-center p-8">
                            <button
                                onClick={handleCloseZoom}
                                className="absolute top-8 right-8 text-white hover:text-gray-300 p-2
                                transition-colors duration-200 z-10"
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
                            <div
                                className="max-w-[90vw] max-h-[90vh] transform transition-all duration-500 ease-out
                                will-change-transform !w-auto"
                                style={{
                                    animation: `${
                                        isClosing ? "zoomOut" : "zoomIn"
                                    } 400ms cubic-bezier(0.16, 1, 0.3, 1)`,
                                }}
                            >
                                <VideoContent isZoomed />
                            </div>
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

export default LazyLoadMedia;
