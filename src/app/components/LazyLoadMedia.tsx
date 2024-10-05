import React, { useState } from "react";
import Image from "next/image";

interface LazyLoadImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    title: string;
    applyHoverEffect?: boolean; // New prop
}

const LazyLoadImage: React.FC<LazyLoadImageProps> = ({
    src,
    width,
    height,
    title,
    applyHoverEffect = false, // Default to false
}) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div
            className={`relative overflow-hidden w-11/12 ${
                applyHoverEffect
                    ? "transition-transform duration-300 ease-in-out hover:scale-105"
                    : ""
            }`}
        >
            <Image
                src={src || "/placeholder-image.jpg"}
                alt={`${title} project screenshot`}
                width={width}
                height={height}
                className={`h-auto max-w-full max-h-full object-contain rounded-md border border-gray-300 transition-all duration-500 ease-in-out ${
                    isLoading
                        ? "scale-110 blur-2xl grayscale"
                        : "scale-100 blur-0 grayscale-0"
                }`}
                onLoad={() => setIsLoading(false)}
            />
            {isLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
        </div>
    );
};

export default LazyLoadImage;
