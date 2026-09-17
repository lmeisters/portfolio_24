"use client";

import { Copy, Check } from "lucide-react";
import { useCopyEmail } from "@/app/hooks/useCopyEmail";

interface CopyEmailButtonProps {
    email: string;
    variant?: "default" | "outline";
    className?: string;
}

const variants = {
    default:
        "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200",
    outline:
        "border border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-100 dark:border-neutral-600 dark:bg-transparent dark:hover:border-neutral-400 dark:hover:bg-neutral-800",
};

export function CopyEmailButton({
    email,
    variant = "outline",
    className = "",
}: CopyEmailButtonProps) {
    const { copied, copyEmail } = useCopyEmail(email);

    async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (copied) return;
        const button = event.currentTarget;
        if (!(await copyEmail())) return;
        const rect = button.getBoundingClientRect();
        const { default: confetti } = await import("canvas-confetti");
        confetti({
            particleCount: 30,
            spread: 40,
            origin: {
                x: (rect.left + rect.width / 2) / window.innerWidth,
                y: (rect.top + rect.height / 2) / window.innerHeight,
            },
            colors: ["#9CA3AF", "#6B7280", "#4B5563"],
            startVelocity: 15,
            gravity: 0.7,
            scalar: 0.7,
            ticks: 100,
            disableForReducedMotion: true,
        });
    }

    return (
        <button
            type="button"
            className={`inline-flex items-center rounded-full px-4 py-2 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
                variants[variant]
            } ${copied ? "cursor-default" : ""} ${className}`}
            onClick={handleClick}
            aria-disabled={copied}
        >
            {copied ? (
                <Check aria-hidden="true" className="mr-2 h-4 w-4" />
            ) : (
                <Copy aria-hidden="true" className="mr-2 h-4 w-4" />
            )}
            {copied ? "Copied!" : "Copy email"}
            <span role="status" className="sr-only">
                {copied ? "Email address copied to clipboard" : ""}
            </span>
        </button>
    );
}

export default CopyEmailButton;
