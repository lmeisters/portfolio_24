"use client";

import { Copy, Check } from "lucide-react";
import { useCopyEmail } from "@/app/hooks/useCopyEmail";
import confetti from "canvas-confetti";

interface CopyEmailButtonProps {
    email: string;
    variant?: "default" | "outline";
    className?: string;
}

export function CopyEmailButton({
    email,
    variant = "outline",
    className = "",
}: CopyEmailButtonProps) {
    const { copied, handleCopyEmail } = useCopyEmail(email);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (!copied) {
            handleCopyEmail();
            const button = event.currentTarget;
            const rect = button.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 30,
                spread: 40,
                origin: { x, y },
                colors: ["#9CA3AF", "#6B7280", "#4B5563"],
                startVelocity: 15,
                gravity: 0.7,
                scalar: 0.7,
                ticks: 100,
                disableForReducedMotion: true,
            });
        }
    }

    const variants = {
        default: "bg-black text-white hover:bg-gray-800",
        outline:
            "border border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400",
    };

    const baseClasses =
        "px-4 py-2 rounded-full flex items-center transition-colors duration-300 ease-in-out";
    const variantClasses = !copied
        ? variants[variant]
        : variant === "default"
        ? "bg-gray-100 text-gray-500"
        : variant === "outline"
        ? "border border-gray-300 bg-white text-gray-500"
        : "bg-gray-100 text-gray-500";
    const disabledClasses = copied ? "cursor-not-allowed" : "";

    const buttonClasses = `${baseClasses} ${variantClasses} ${disabledClasses} ${className}`;

    return (
        <button
            className={buttonClasses}
            onClick={handleClick}
            disabled={copied}
        >
            {copied ? (
                <Check className="w-4 h-4 mr-2" />
            ) : (
                <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? "Copied!" : "Copy email"}
        </button>
    );
}

export default CopyEmailButton;
