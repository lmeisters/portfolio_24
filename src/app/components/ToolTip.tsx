import React, { useState, useCallback, ReactNode } from "react";

interface TooltipProps {
    content: string;
    children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = useCallback((e: React.MouseEvent) => {
        setIsVisible(true);
        setPosition({ x: e.clientX, y: e.clientY });
    }, []);

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
            {isVisible && (
                <div
                    className="fixed z-50 px-2 py-1 text-sm text-white bg-black rounded shadow-lg pointer-events-none"
                    style={{
                        left: `${position.x + 10}px`,
                        top: `${position.y + 10}px`,
                    }}
                    role="tooltip"
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
