import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface LazyLoadMediaProps {
    src: string;
    width: number;
    height: number;
    title: string;
    isVideo?: boolean;
    className?: string;
}

const LazyLoadMedia: React.FC<LazyLoadMediaProps> = ({
    src,
    width,
    height,
    title,
    isVideo = false,
    className,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [src]);

    useEffect(() => {
        if (isVideo && videoRef.current) {
            const video = videoRef.current as HTMLVideoElement;
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

    const mediaClasses = `
        h-auto max-w-full max-h-full object-contain rounded-md
        transition-all duration-500 ease-in-out
        ${isLoading ? "blur-sm scale-105" : "blur-0 scale-100"}
        ${className || ""}
    `;

    return isVideo ? (
        <video
            ref={videoRef}
            width={width}
            height={height}
            title={title}
            className={mediaClasses}
            onLoadedData={handleLoadComplete}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
        >
            <source src={src} type="video/webm" />
        </video>
    ) : (
        <Image
            ref={imageRef}
            src={src || "/placeholder-image.jpg"}
            alt={title}
            width={width}
            height={height}
            className={mediaClasses}
            onLoad={handleLoadComplete}
            loading="eager"
            priority={width > 200}
        />
    );
};

export default LazyLoadMedia;
