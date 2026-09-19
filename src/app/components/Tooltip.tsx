"use client";

import React, {
    ReactNode,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { ExternalLink } from "lucide-react";

interface TooltipProps {
    content: string;
    children: ReactNode;
    className?: string;
    placement?: "cursor" | "top";
}

type Mode = "hidden" | "mouse" | "focus";

const SWAP_WINDOW_MS = 200;
const CURSOR_OFFSET = 12;
const VIEWPORT_EDGE = 8;
let lastHiddenAt = 0;

const isHoverPointer = (e: React.PointerEvent) =>
    e.pointerType === "mouse" || e.pointerType === "pen";

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

    const follow = (e: React.PointerEvent) => {
        const el = bubble.current;
        if (!el || placement === "top" || !isHoverPointer(e)) return;
        const { width, height } = el.getBoundingClientRect();
        const maxLeft = document.documentElement.clientWidth - width - VIEWPORT_EDGE;
        const maxTop = document.documentElement.clientHeight - height - VIEWPORT_EDGE;
        el.style.left = `${Math.max(VIEWPORT_EDGE, Math.min(e.clientX + CURSOR_OFFSET, maxLeft))}px`;
        el.style.top = `${Math.max(VIEWPORT_EDGE, Math.min(e.clientY + CURSOR_OFFSET, maxTop))}px`;
    };

    const anchored = placement === "top" || mode === "focus";

    useLayoutEffect(() => {
        const el = bubble.current;
        if (!el || mode === "hidden" || !anchored) return;
        el.style.marginLeft = "0px";
        const rect = el.getBoundingClientRect();
        const overflowRight = Math.min(0, document.documentElement.clientWidth - VIEWPORT_EDGE - rect.right);
        const overflowLeft = Math.max(0, VIEWPORT_EDGE - rect.left);
        el.style.marginLeft = `${overflowRight + overflowLeft}px`;
    }, [mode, anchored, content]);

    useEffect(() => {
        if (mode !== "focus") return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") hide();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    });

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
            ? "absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-black dark:after:border-t-white"
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
            onPointerEnter={(e) => {
                if (!isHoverPointer(e)) return;
                follow(e);
                show("mouse");
            }}
            onPointerMove={follow}
            onPointerLeave={hide}
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
