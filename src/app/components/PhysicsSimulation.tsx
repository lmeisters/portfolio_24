import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { useTheme } from "next-themes";

interface Language {
    name: string;
}

const languages: Language[] = [
    { name: "JavaScript" },
    { name: "Tailwind" },
    { name: "CSS" },
    { name: "SCSS/SASS" },
    { name: "Bootstrap" },
    { name: "HTML" },
    { name: "Git" },
    { name: "TypeScript" },
    { name: "NodeJS" },
    { name: "React" },
    { name: "Express" },
    { name: "MongoDB" },
];

const PhysicsContainer: React.FC = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const { theme } = useTheme();

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
        if (dimensions.width === 0 || dimensions.height === 0) return;

        const Engine = Matter.Engine;
        const Render = Matter.Render;
        const Runner = Matter.Runner;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const Mouse = Matter.Mouse;
        const MouseConstraint = Matter.MouseConstraint;

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
            },
        });

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

        const pillWidth = Math.min(80, dimensions.width / 8);
        const pillHeight = pillWidth / 3;
        const cornerRadius = pillHeight / 3;
        const pillPaddingX = 16;
        const pillPaddingY = 8;

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
                const fontSize = pillHeight / 2;
                context.font = `bold ${fontSize}px Poppins`;
                context.textAlign = "center";
                context.textBaseline = "middle";

                const { x, y } = pill.position;
                const angle = pill.angle;

                context.save();
                context.translate(x, y);
                context.rotate(angle);

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

                context.fillStyle = theme === "dark" ? "#ffffff" : "#000000";
                context.fillText(name, 0, 0);
                context.restore();

                resetPillIfOutOfBounds(pill);
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
        };
    }, [dimensions, theme]);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="relative h-64 border border-gray-200 rounded-lg overflow-hidden">
                <div ref={sceneRef} className="absolute inset-0" />
            </div>
        </div>
    );
};

export default PhysicsContainer;
