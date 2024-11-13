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
}

const languages: Language[] = [
    { name: "HTML", category: "frontend", icon: FaHtml5 },
    { name: "JavaScript", category: "frontend", icon: FaJsSquare },
    { name: "TypeScript", category: "frontend", icon: SiTypescript },
    { name: "React", category: "frontend", icon: FaReact },
    { name: "CSS", category: "styling", icon: FaCss3Alt },
    { name: "SCSS/SASS", category: "styling", icon: FaSass },
    { name: "Bootstrap", category: "styling", icon: FaBootstrap },
    { name: "Tailwind", category: "styling", icon: SiTailwindcss },
    { name: "NodeJS", category: "backend", icon: FaNodeJs },
    { name: "Express", category: "backend", icon: SiExpress },
    { name: "MongoDB", category: "backend", icon: SiMongodb },
    { name: "Git", category: "tools", icon: FaGitAlt },
];

interface PhysicsContainerProps {
    showPhysics: boolean;
}

export function PhysicsSimulation({ showPhysics }: PhysicsContainerProps) {
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

        const wallThickness = 60; // Increased wall thickness
        const wallOptions = {
            isStatic: true,
            render: {
                fillStyle: "transparent",
                strokeStyle: "transparent",
            },
        };

        const walls = [
            // Bottom wall
            Bodies.rectangle(
                dimensions.width / 2,
                dimensions.height + wallThickness / 2,
                dimensions.width,
                wallThickness,
                wallOptions
            ),
            // Left wall
            Bodies.rectangle(
                -wallThickness / 2,
                dimensions.height / 2,
                wallThickness,
                dimensions.height * 2, // Extended height
                wallOptions
            ),
            // Right wall
            Bodies.rectangle(
                dimensions.width + wallThickness / 2,
                dimensions.height / 2,
                wallThickness,
                dimensions.height * 2, // Extended height
                wallOptions
            ),
        ];

        const pillPaddingX = isMobile ? 8 : 12;
        const pillPaddingY = isMobile ? 6 : 8;
        const pillHeight = isMobile ? 24 : 30;
        const cornerRadius = pillHeight / 3;

        // Add collision filter categories
        const defaultCategory = 0x0001;
        const pillCategory = 0x0002;

        // Calculate standard pill size based on the longest name
        const context = document.createElement("canvas").getContext("2d")!;
        const fontSize = isMobile ? pillHeight * 0.5 : pillHeight * 0.5;
        context.font = `bold ${fontSize}px ${poppins.style.fontFamily}, -apple-system, system-ui, BlinkMacSystemFont, sans-serif`;

        // Single optimized createPill function
        const createPill = (x: number, y: number, language: Language) => {
            const textWidth = context.measureText(language.name).width;
            const iconSize = fontSize * 1.2;
            const spacing = 4;
            const contentWidth = iconSize + spacing + textWidth;
            const individualPillWidth = contentWidth + pillPaddingX * 1.5;

            const pill = Bodies.rectangle(
                x,
                y,
                individualPillWidth + pillPaddingX * 2,
                pillHeight + pillPaddingY * 2,
                {
                    chamfer: { radius: cornerRadius },
                    render: {
                        fillStyle: theme === "dark" ? "#000000" : "#ffffff",
                    },
                    restitution: 0.3,
                    friction: 0.1,
                    density: 0.001,
                    frictionAir: 0.001,
                    sleepThreshold: Infinity,
                    collisionFilter: {
                        category: pillCategory,
                        mask: defaultCategory | pillCategory,
                        group: 0,
                    },
                    slop: 0.01,
                    timeScale: 1,
                }
            ) as Matter.Body & {
                label?: string;
                isGrabbable?: boolean;
                width?: number;
            };

            pill.label = language.name;
            pill.isGrabbable = true;
            pill.width = individualPillWidth;

            return pill;
        };

        // Adjust pill positioning to prevent initial overlap
        const pills = languages.map((lang, index) => {
            const safeZone = 50;
            const minX = safeZone;
            const maxX = dimensions.width - safeZone;

            // Calculate text width for proper spacing
            const textWidth = context.measureText(lang.name).width;
            const iconSize = fontSize * 1.2;
            const spacing = 4;
            const contentWidth = iconSize + spacing + textWidth;
            const pillWidth = contentWidth + pillPaddingX * 1.5;

            // Distribute pills in a grid-like pattern to prevent initial overlap
            const columnsPerRow = Math.floor(
                (maxX - minX) / (pillWidth + safeZone)
            );
            const column = index % columnsPerRow;
            const row = Math.floor(index / columnsPerRow);

            const x = minX + column * (pillWidth + safeZone);
            const y = -pillHeight * (row + 1) * 2;

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

        // Update reset position logic
        const resetPillIfOutOfBounds = (
            pill: Matter.Body & { width?: number }
        ) => {
            const buffer = 100;
            const safeZone = 50;

            if (
                pill.position.y > dimensions.height + buffer ||
                pill.position.x < -buffer ||
                pill.position.x > dimensions.width + buffer
            ) {
                Matter.Body.setPosition(pill, {
                    x:
                        safeZone +
                        Math.random() * (dimensions.width - safeZone * 2),
                    y: -pillHeight,
                });
                Matter.Body.setVelocity(pill, { x: 0, y: 0 });
                Matter.Body.setAngularVelocity(pill, 0);
            }
        };

        Matter.Events.on(render, "afterRender", () => {
            const context = render.context;
            context.imageSmoothingEnabled = false; // Disable anti-aliasing

            pills.forEach((pill) => {
                // Only render pills that are in view
                if (
                    pill.position.y < -100 ||
                    pill.position.y > dimensions.height + 100
                )
                    return;

                const name = pill.label as string;
                const language = languages.find((lang) => lang.name === name)!;
                const fontSize = isMobile ? pillHeight * 0.5 : pillHeight * 0.5;
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
                    -(pill.width || 0) / 2 - pillPaddingX,
                    -pillHeight / 2 - pillPaddingY,
                    (pill.width || 0) + pillPaddingX * 2,
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

                // Center everything as a unit
                const iconSize = isMobile ? fontSize * 1 : fontSize * 1.2;
                const spacing = 4; // Match the reduced spacing from createPill
                const textWidth = context.measureText(name).width;
                const totalWidth = iconSize + spacing + textWidth;
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

        // Optimize engine settings
        engine.enableSleeping = false;
        engine.world.gravity.y = 1;
        engine.constraintIterations = 8;
        engine.positionIterations = 12;
        engine.velocityIterations = 10;

        // Batch physics updates
        const updateInterval = 1000 / 60; // 60 FPS
        let lastUpdate = 0;

        Matter.Events.on(
            engine,
            "beforeUpdate",
            (event: Matter.IEventTimestamped<Matter.Engine>) => {
                const now = performance.now();
                if (now - lastUpdate < updateInterval) {
                    event.source.timing.timestamp = event.timestamp;
                    return;
                }
                lastUpdate = now;
            }
        );

        // In the useEffect where the physics is set up, after creating the pills and before World.add
        // Add a periodic force to keep pills moving
        Matter.Events.on(engine, "beforeUpdate", () => {
            pills.forEach((pill) => {
                // Apply a small random force to each pill
                if (Math.random() < 0.02) {
                    // 2% chance each frame
                    Matter.Body.applyForce(pill, pill.position, {
                        x: (Math.random() - 0.5) * 0.0001,
                        y: (Math.random() - 0.5) * 0.0001,
                    });
                }
            });
        });

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
                                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs
                                                 inline-flex items-center gap-1.5"
                                        >
                                            <Icon className="w-4 h-4 text-gray-700" />
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
}
