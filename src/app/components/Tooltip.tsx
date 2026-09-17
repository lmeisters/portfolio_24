"use client";

import React, { ReactNode, useId, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

interface TooltipProps {
    content: string;
    children: ReactNode;
    className?: string;
}

type Mode = "hidden" | "mouse" | "focus";

export default function Tooltip({
    content,
    children,
    className = "",
}: TooltipProps) {
    const id = useId();
    const bubble = useRef<HTMLSpanElement>(null);
    const [mode, setMode] = useState<Mode>("hidden");

    const follow = (e: React.MouseEvent) => {
        const el = bubble.current;
        if (!el) return;
        el.style.left = `${e.clientX + 12}px`;
        el.style.top = `${e.clientY + 12}px`;
    };

    const child = React.isValidElement<{
        "aria-describedby"?: string;
        target?: string;
    }>(children)
        ? children
        : null;
    const trigger = child
        ? React.cloneElement(child, { "aria-describedby": id })
        : children;
    const opensNewTab = child?.props.target === "_blank";

    return (
        <span
            className={`relative inline-flex ${className}`}
            onMouseEnter={(e) => {
                follow(e);
                setMode("mouse");
            }}
            onMouseMove={follow}
            onMouseLeave={() => setMode("hidden")}
            onFocus={(e) => {
                if (e.target.matches(":focus-visible")) setMode("focus");
            }}
            onBlur={() => setMode("hidden")}
        >
            {trigger}
            <span
                ref={bubble}
                role="tooltip"
                id={id}
                className={`pointer-events-none z-50 flex items-center whitespace-nowrap rounded bg-black px-2 py-1 text-sm text-white shadow-lg transition-opacity duration-150 dark:bg-white dark:text-black [@media(hover:none)]:hidden ${
                    mode === "hidden" ? "opacity-0" : "opacity-100"
                } ${
                    mode === "focus"
                        ? "absolute left-1/2 top-full mt-2 -translate-x-1/2"
                        : "fixed"
                }`}
            >
                {content}
                {opensNewTab && (
                    <ExternalLink aria-hidden="true" className="ml-1 h-3 w-3" />
                )}
            </span>
        </span>
    );
}
