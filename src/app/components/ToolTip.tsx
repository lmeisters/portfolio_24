import React, { useState, useCallback, ReactNode, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link"; // Add this import if using Next.js

interface TooltipProps {
    content: string;
    children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust this breakpoint as needed
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleMouseEnter = useCallback(
        (e: React.MouseEvent) => {
            if (!isMobile) {
                setIsVisible(true);
                setPosition({ x: e.clientX, y: e.clientY });
            }
        },
        [isMobile]
    );

    const handleMouseLeave = useCallback(() => {
        setIsVisible(false);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
    }, []);

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            className="inline-block"
        >
            {children}
            {isVisible && !isMobile && (
                <div
                    className="fixed z-50 px-2 py-1 text-sm text-white bg-black rounded shadow-lg pointer-events-none flex items-center"
                    style={{
                        left: `${position.x + 10}px`,
                        top: `${position.y + 10}px`,
                    }}
                    role="tooltip"
                >
                    {content}
                    {React.isValidElement(children) &&
                        (children.type === Link || children.type === "a") && (
                            <ExternalLink className="w-3 h-3 ml-1" />
                        )}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
