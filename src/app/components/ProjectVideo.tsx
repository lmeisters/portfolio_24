"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";

interface ProjectVideoProps {
    src: string;
    /** Describes the clip for assistive technology, e.g. "PurePlaylist – Track sorting". */
    label: string;
}

/**
 * Muted demo clip for project pages. It sits in a fixed 16:9 box (no layout
 * shift), downloads nothing until scrolled into view, pauses when scrolled
 * away, and can be enlarged in a native <dialog>.
 */
export default function ProjectVideo({ src, label }: ProjectVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [open, setOpen] = useState(false);

    // Autoplay only while visible.
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { threshold: 0.25 }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    const openDialog = () => {
        setOpen(true);
        dialogRef.current?.showModal();
    };
    const closeDialog = () => {
        dialogRef.current?.close();
    };

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-200 dark:border-neutral-700 dark:bg-neutral-800">
            <video
                ref={videoRef}
                className="h-full w-full object-contain"
                muted
                playsInline
                loop
                preload="none"
                aria-label={label}
            >
                <source src={src} type="video/webm" />
            </video>
            <button
                type="button"
                onClick={openDialog}
                className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white group-hover:opacity-100 [@media(hover:none)]:opacity-100"
                aria-label={`Enlarge video: ${label}`}
            >
                <Maximize2 aria-hidden="true" className="h-4 w-4" />
            </button>

            {/* Backdrop click is a pointer convenience; keyboard users have Escape (native) and the close button. */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <dialog
                ref={dialogRef}
                onClose={() => setOpen(false)}
                onClick={(e) => {
                    if (e.target === dialogRef.current) closeDialog();
                }}
                aria-label={label}
                className="m-auto max-h-[90vh] max-w-[90vw] rounded-lg bg-transparent p-0 backdrop:bg-black/90 open:animate-zoom-in"
            >
                <div className="relative">
                    <button
                        type="button"
                        onClick={closeDialog}
                        className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                        aria-label="Close enlarged video"
                    >
                        <X aria-hidden="true" className="h-6 w-6" />
                    </button>
                    {open && (
                        <video
                            className="max-h-[80vh] max-w-[90vw] rounded-lg"
                            muted
                            playsInline
                            loop
                            autoPlay
                            controls
                            aria-label={label}
                        >
                            <source src={src} type="video/webm" />
                        </video>
                    )}
                </div>
            </dialog>
        </div>
    );
}
