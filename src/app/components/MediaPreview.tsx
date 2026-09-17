"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

interface MediaPreviewProps {
    image: StaticImageData | string;
    alt: string;
    /** Required only for string paths; static imports carry their own size. */
    width?: number;
    height?: number;
    /** Muted demo clip played while the card is hovered or focused. */
    videoSrc?: string;
    /** When set the whole preview is a link. */
    href?: string;
    priority?: boolean;
    className?: string;
}

/**
 * Project still with an optional hover/focus video preview. The still is a
 * normal next/image (lazy, blurred placeholder for static imports); the video
 * has preload="none" so nothing is downloaded until the user shows interest.
 */
export default function MediaPreview({
    image,
    alt,
    width,
    height,
    videoSrc,
    href,
    priority = false,
    className = "",
}: MediaPreviewProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);

    const start = () => {
        if (!videoSrc) return;
        setPlaying(true);
        videoRef.current?.play().catch(() => setPlaying(false));
    };
    const stop = () => {
        if (!videoSrc) return;
        setPlaying(false);
        videoRef.current?.pause();
    };

    const content = (
        <>
            <Image
                src={image}
                alt={alt}
                width={width}
                height={height}
                placeholder={typeof image === "string" ? "empty" : "blur"}
                priority={priority}
                sizes="(max-width: 704px) calc(100vw - 32px), 640px"
                className={`h-full w-full object-cover transition-opacity duration-300 ${
                    playing ? "opacity-0" : "opacity-100"
                }`}
            />
            {videoSrc && (
                <video
                    ref={videoRef}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                        playing ? "opacity-100" : "opacity-0"
                    }`}
                    muted
                    playsInline
                    loop
                    preload="none"
                    aria-hidden="true"
                    tabIndex={-1}
                >
                    <source src={videoSrc} type="video/webm" />
                </video>
            )}
        </>
    );

    const classes = `group relative block h-full w-full overflow-hidden rounded-lg ${className}`;
    const handlers = {
        onMouseEnter: start,
        onMouseLeave: stop,
        onFocus: start,
        onBlur: stop,
    };

    return href ? (
        <Link href={href} className={classes} {...handlers}>
            {content}
        </Link>
    ) : (
        <div className={classes} {...handlers}>
            {content}
        </div>
    );
}
