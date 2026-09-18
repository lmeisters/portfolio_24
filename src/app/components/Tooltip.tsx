"use client";

import React, { ReactNode, useId, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

interface TooltipProps {
    content: string;
    children: ReactNode;
    className?: string;
    placement?: "cursor" | "top";
}

type Mode = "hidden" | "mouse" | "focus";

const SWAP_WINDOW_MS = 200;
let lastHiddenAt = 0;

export default function Tooltip({
    content,
    children,
    className = "",
    placement = "cursor",
}: TooltipProps) {
    const id = useId();
    const bubble = useRef<HTMLSpanElement>(null);
    const [mode, setMode] = useState<Mode>("hidden");
    const [instant, setInstant] = useState(false);

    const show = (next: Mode) => {
        setInstant(performance.now() - lastHiddenAt < SWAP_WINDOW_MS);
        setMode(next);
    };

    const hide = () => {
        lastHiddenAt = performance.now();
        setMode("hidden");
    };

    const follow = (e: React.MouseEvent) => {
        const el = bubble.current;
        if (!el || placement === "top") return;
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

    const position =
        placement === "top"
            ? "absolute bottom-full left-1/2 mb-2 -translate-x-1/2"
            : mode === "focus"
              ? "absolute left-1/2 top-full mt-2 -translate-x-1/2"
              : "fixed";
    const visibility =
        mode === "hidden"
            ? "opacity-0"
            : instant
              ? "opacity-100"
              : "opacity-100 transition-opacity duration-150";

    return (
        <span
            className={`relative inline-flex ${className}`}
            onMouseEnter={(e) => {
                follow(e);
                show("mouse");
            }}
            onMouseMove={follow}
            onMouseLeave={hide}
            onFocus={(e) => {
                if (e.target.matches(":focus-visible")) show("focus");
            }}
            onBlur={hide}
        >
            {trigger}
            <span
                ref={bubble}
                role="tooltip"
                id={id}
                className={`pointer-events-none z-50 flex items-center whitespace-nowrap rounded bg-black px-2 py-1 text-sm text-white shadow-lg dark:bg-white dark:text-black [@media(hover:none)]:hidden ${position} ${visibility}`}
            >
                {content}
                {opensNewTab && (
                    <ExternalLink aria-hidden="true" className="ml-1 h-3 w-3" />
                )}
            </span>
        </span>
    );
}
