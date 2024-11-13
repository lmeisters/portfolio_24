import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { useTheme } from "next-themes";
import { Poppins } from "next/font/google";
import {
    FaHtml5,
    FaJsSquare,
    FaReact,
    FaCss3Alt,
    FaSass,
    FaBootstrap,
    FaNodeJs,
    FaGitAlt,
} from "react-icons/fa";
import {
    SiTypescript,
    SiTailwindcss,
    SiExpress,
    SiMongodb,
} from "react-icons/si";
import ReactDOMServer from "react-dom/server";

const poppins = Poppins({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap",
});

interface Language {
    name: string;
    category: "frontend" | "backend" | "styling" | "tools";
    icon: React.ElementType;
    color: string;
}

const languages: Language[] = [
    { name: "HTML", category: "frontend", icon: FaHtml5, color: "#E34F26" },
    {
        name: "JavaScript",
        category: "frontend",
        icon: FaJsSquare,
        color: "#F7DF1E",
    },
    {
        name: "TypeScript",
        category: "frontend",
        icon: SiTypescript,
        color: "#3178C6",
    },
    { name: "React", category: "frontend", icon: FaReact, color: "#61DAFB" },
    { name: "CSS", category: "styling", icon: FaCss3Alt, color: "#1572B6" },
    { name: "SCSS/SASS", category: "styling", icon: FaSass, color: "#CC6699" },
    {
        name: "Bootstrap",
        category: "styling",
        icon: FaBootstrap,
        color: "#7952B3",
    },
    {
        name: "Tailwind",
        category: "styling",
        icon: SiTailwindcss,
        color: "#06B6D4",
    },
    { name: "NodeJS", category: "backend", icon: FaNodeJs, color: "#339933" },
    { name: "Express", category: "backend", icon: SiExpress, color: "#000000" },
    { name: "MongoDB", category: "backend", icon: SiMongodb, color: "#47A248" },
    { name: "Git", category: "tools", icon: FaGitAlt, color: "#F05032" },
];

interface PhysicsContainerProps {
    showPhysics: boolean;
}

const PhysicsContainer: React.FC<PhysicsContainerProps> = ({ showPhysics }) => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [physicsKey, setPhysicsKey] = useState(0);

    useEffect(() => {
        const updateDimensions = () => {
            if (sceneRef.current) {
                setDimensions({
                    width: sceneRef.current.clientWidth,
                    height: sceneRef.current.clientHeight,
                });
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);

        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 500);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (!showPhysics || dimensions.width === 0 || dimensions.height === 0)
            return;

        const Engine = Matter.Engine;
        const Render = Matter.Render;
        const Runner = Matter.Runner;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const Mouse = Matter.Mouse;
        const MouseConstraint = Matter.MouseConstraint;

        // Create new engine
        const engine = Engine.create();
        engineRef.current = engine;

        const render = Render.create({
            element: sceneRef.current!,
            engine: engine,
            options: {
                width: dimensions.width,
                height: dimensions.height,
                wireframes: false,
                background: "transparent",
                pixelRatio: window.devicePixelRatio || 1,
                hasBounds: true,
            },
        });

        // After creating the render, scale the view for high DPI
        const scaleFactor = window.devicePixelRatio || 1;
        if (scaleFactor > 1) {
            render.canvas.style.width = `${dimensions.width}px`;
            render.canvas.style.height = `${dimensions.height}px`;
            render.canvas.width = dimensions.width * scaleFactor;
            render.canvas.height = dimensions.height * scaleFactor;
            render.context.scale(scaleFactor, scaleFactor);
        }

        const runner = Runner.create();

        const wallOptions = {
            isStatic: true,
            render: {
                fillStyle: "transparent",
                strokeStyle: "transparent",
            },
        };

        const walls = [
            Bodies.rectangle(
                dimensions.width / 2,
                dimensions.height,
                dimensions.width,
                10,
                wallOptions
            ),
            Bodies.rectangle(
                0,
                dimensions.height / 2,
                10,
                dimensions.height,
                wallOptions
            ),
            Bodies.rectangle(
                dimensions.width,
                dimensions.height / 2,
                10,
                dimensions.height,
                wallOptions
            ),
        ];

        const pillPaddingX = 12;
        const pillPaddingY = 8;
        const baseWidth = 30;
        const pillHeight = 30;
        const cornerRadius = pillHeight / 3;

        // Calculate standard pill size based on the longest name
        const context = document.createElement("canvas").getContext("2d")!;
        const fontSize = isMobile ? pillHeight * 0.6 : pillHeight * 0.5;
        context.font = `bold ${fontSize}px ${poppins.style.fontFamily}, -apple-system, system-ui, BlinkMacSystemFont, sans-serif`;

        const longestTextWidth = Math.max(
            ...languages.map((lang) => context.measureText(lang.name).width)
        );
        const iconSize = fontSize * 1.5;
        const spacing = 6;

        // Calculate total pill width needed for the longest item
        const contentWidth = iconSize + spacing + longestTextWidth;
        const pillWidth = Math.max(contentWidth + pillPaddingX * 2, baseWidth); // Ensure minimum width

        const createPill = (x: number, y: number, language: Language) => {
            const pill = Bodies.rectangle(
                x,
                y,
                pillWidth + pillPaddingX * 2,
                pillHeight + pillPaddingY * 2,
                {
                    chamfer: { radius: cornerRadius },
                    render: {
                        fillStyle: theme === "dark" ? "#000000" : "#ffffff",
                    },
                    restitution: 0.2,
                    friction: 0.1,
                    density: 0.02,
                }
            ) as Matter.Body & { label?: string; isGrabbable?: boolean };

            pill.label = language.name;
            pill.isGrabbable = true;

            return pill;
        };

        const pills = languages.map((lang, index) => {
            const x =
                Math.random() * (dimensions.width - pillWidth) + pillWidth / 2;
            const y = -pillHeight * (index + 1);
            return createPill(x, y, lang);
        });

        World.add(engine.world, [...walls, ...pills]);

        const mouse = Mouse.create(render.canvas as HTMLElement);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false },
            },
        });

        Matter.Events.on(mouseConstraint, "mousemove", () => {
            const mousePosition = mouseConstraint.mouse.position;
            const hoveredBody = Matter.Query.point(pills, mousePosition)[0];

            if (hoveredBody) {
                document.body.style.cursor = "grab";
            } else {
                document.body.style.cursor = "default";
            }
        });

        Matter.Events.on(mouseConstraint, "startdrag", () => {
            if (
                mouseConstraint.body &&
                (
                    mouseConstraint.body as Matter.Body & {
                        isGrabbable?: boolean;
                    }
                ).isGrabbable
            ) {
                document.body.style.cursor = "grabbing";
            }
        });
        Matter.Events.on(mouseConstraint, "enddrag", () => {
            document.body.style.cursor = "default";
        });

        World.add(engine.world, mouseConstraint);

        render.mouse = mouse;

        Runner.run(runner, engine);
        Render.run(render);

        const resetPillIfOutOfBounds = (pill: Matter.Body) => {
            const buffer = 100;
            if (
                pill.position.y > dimensions.height + buffer ||
                pill.position.x < -buffer ||
                pill.position.x > dimensions.width + buffer
            ) {
                Matter.Body.setPosition(pill, {
                    x:
                        Math.random() * (dimensions.width - pillWidth) +
                        pillWidth / 2,
                    y: -pillHeight,
                });
                Matter.Body.setVelocity(pill, { x: 0, y: 0 });
                Matter.Body.setAngularVelocity(pill, 0);
            }
        };

        Matter.Events.on(render, "afterRender", () => {
            const context = render.context;
            pills.forEach((pill) => {
                const name = pill.label as string;
                const language = languages.find((lang) => lang.name === name)!;
                const fontSize = isMobile ? pillHeight * 0.6 : pillHeight * 0.5;
                context.font = `bold ${fontSize}px ${poppins.style.fontFamily}, -apple-system, system-ui, BlinkMacSystemFont, sans-serif`;
                context.textAlign = "left";
                context.textBaseline = "middle";

                const { x, y } = pill.position;
                const angle = pill.angle;

                context.save();
                context.translate(x, y);
                context.rotate(angle);

                // Draw pill background
                context.fillStyle = theme === "dark" ? "#000000" : "#ffffff";
                context.strokeStyle = "#808080";
                context.lineWidth = 1;
                context.beginPath();
                context.roundRect(
                    -pillWidth / 2 - pillPaddingX,
                    -pillHeight / 2 - pillPaddingY,
                    pillWidth + pillPaddingX * 2,
                    pillHeight + pillPaddingY * 2,
                    cornerRadius
                );
                context.fill();
                context.stroke();

                // Draw text and icon
                context.fillStyle = theme === "dark" ? "#ffffff" : "#000000";

                const IconComponent = language.icon;
                const iconColor = theme === "dark" ? "#ffffff" : "#000000";
                const svgString = ReactDOMServer.renderToString(
                    <IconComponent style={{ color: iconColor }} />
                );
                const img = new Image();
                img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;

                // Improved positioning calculations
                const iconSize = fontSize * 1.2;
                const textWidth = context.measureText(name).width;
                const spacing = 6; // Slightly reduced spacing to keep things compact
                const totalWidth = iconSize + spacing + textWidth;

                // Center everything as a unit
                const startX = -totalWidth / 2;

                // Draw icon and text with proper spacing
                context.drawImage(
                    img,
                    startX, // Icon starts at the left of the allocated space
                    -iconSize / 2,
                    iconSize,
                    iconSize
                );

                // Position text after icon with spacing
                context.fillText(
                    name,
                    startX + iconSize + spacing, // Text starts after icon + spacing
                    0
                );

                context.restore();
                resetPillIfOutOfBounds(pill);
            });
        });

        // Prevent reset on scroll
        const handleScroll = () => {
            Matter.Mouse.clearSourceEvents(mouse);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            World.clear(engine.world, false);
            Engine.clear(engine);
            if (render.canvas) {
                render.canvas.remove();
            }
            render.canvas = null!;
            render.context = null!;
            render.textures = {};
            document.body.style.cursor = "default";
            window.removeEventListener("scroll", handleScroll);
        };
    }, [dimensions, theme, isMobile, showPhysics, physicsKey]);

    useEffect(() => {
        if (!showPhysics && engineRef.current) {
            const engine = engineRef.current;
            Matter.World.clear(engine.world, false);
            Matter.Engine.clear(engine);
        }
        if (showPhysics) {
            setPhysicsKey((prev) => prev + 1);
        }
    }, [showPhysics]);

    const StaticSkills = () => {
        const categorizedLanguages = languages.reduce((acc, lang) => {
            if (!acc[lang.category]) {
                acc[lang.category] = [];
            }
            acc[lang.category].push(lang);
            return acc;
        }, {} as Record<string, Language[]>);

        return (
            <div className="grid grid-cols-1 gap-4">
                {Object.entries(categorizedLanguages).map(
                    ([category, items]) => (
                        <div
                            key={category}
                            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                        >
                            <h3 className="text-md font-regular capitalize min-w-[75px]">
                                {category}:
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {items.map((lang) => {
                                    const Icon = lang.icon;
                                    return (
                                        <div
                                            key={lang.name}
                                            className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 
                                                 px-2 py-0.5 rounded text-sm font-medium inline-flex items-center gap-1.5"
                                        >
                                            <Icon className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                                            {lang.name}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )
                )}
            </div>
        );
    };

    return (
        <div className="max-w-2xl mx-auto">
            {showPhysics ? (
                <div
                    key={physicsKey}
                    className="relative h-64 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                    <div ref={sceneRef} className="absolute inset-0" />
                </div>
            ) : (
                <div>
                    <StaticSkills />
                </div>
            )}
        </div>
    );
};

export default PhysicsContainer;
