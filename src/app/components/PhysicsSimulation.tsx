import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

interface PhysicsProps {
    width: number;
    height: number;
}

const PhysicsSimulation: React.FC<PhysicsProps> = ({ width, height }) => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const [elements, setElements] = useState<HTMLElement[]>([]);

    useEffect(() => {
        if (!sceneRef.current) return;

        // Initialize Matter.js
        const engine = Matter.Engine.create();
        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframes: false,
                background: "transparent",
            },
        });

        engineRef.current = engine;
        renderRef.current = render;

        // Create bodies
        const bodies = createBodies();
        Matter.Composite.add(engine.world, bodies);

        // Add mouse control
        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        });
        Matter.Composite.add(engine.world, mouseConstraint);

        // Run the engine and renderer
        Matter.Runner.run(engine);
        Matter.Render.run(render);

        // Cleanup function
        return () => {
            Matter.Render.stop(render);
            Matter.Engine.clear(engine);
            if (render.canvas) {
                render.canvas.remove();
            }
            if (render.textures) {
                render.textures = {};
            }
        };
    }, [width, height]);

    useEffect(() => {
        const updatePositions = () => {
            if (!engineRef.current) return;

            elements.forEach((elem, index) => {
                const body = engineRef.current?.world.bodies[index];
                if (body) {
                    elem.style.transform = `translate(${
                        body.position.x - elem.offsetWidth / 2
                    }px, ${body.position.y - elem.offsetHeight / 2}px) rotate(${
                        body.angle
                    }rad)`;
                }
            });

            requestAnimationFrame(updatePositions);
        };

        updatePositions();
    }, [elements]);

    useEffect(() => {
        const elems = document.querySelectorAll<HTMLElement>(
            ".dm-matter-elem, .dm-matter-elem-circle, .dm-matter-elem-pill"
        );
        setElements(Array.from(elems));
    }, []);

    const createBodies = () => {
        const bodies: Matter.Body[] = [];

        elements.forEach((elem) => {
            const {
                offsetWidth: width,
                offsetHeight: height,
                offsetLeft,
                offsetTop,
            } = elem;
            const x = offsetLeft + width / 2;
            const y = offsetTop + height / 2;

            let body: Matter.Body;

            if (elem.classList.contains("dm-matter-elem-circle")) {
                body = Matter.Bodies.circle(x, y, Math.max(width, height) / 2, {
                    density: 0.01,
                    friction: 0.1,
                    restitution: 0.5,
                    render: { opacity: 0 },
                });
            } else if (elem.classList.contains("dm-matter-elem-pill")) {
                const radius = height / 2;
                const leftCircle = Matter.Bodies.circle(
                    x - width / 2 + radius,
                    y,
                    radius
                );
                const rightCircle = Matter.Bodies.circle(
                    x + width / 2 - radius,
                    y,
                    radius
                );
                const rect = Matter.Bodies.rectangle(
                    x,
                    y,
                    width - height,
                    height
                );
                body = Matter.Body.create({
                    parts: [leftCircle, rightCircle, rect],
                    friction: 0.1,
                    restitution: 0.5,
                });
            } else {
                body = Matter.Bodies.rectangle(x, y, width, height, {
                    density: 0.01,
                    friction: 0.1,
                    restitution: 0.5,
                    render: { opacity: 0 },
                });
            }

            bodies.push(body);
        });

        // Add boundaries
        bodies.push(
            Matter.Bodies.rectangle(width / 2, height, width, 1, {
                isStatic: true,
                render: { opacity: 0 },
            }),
            Matter.Bodies.rectangle(0, height / 2, 1, height, {
                isStatic: true,
                render: { opacity: 0 },
            }),
            Matter.Bodies.rectangle(width, height / 2, 1, height, {
                isStatic: true,
                render: { opacity: 0 },
            }),
            Matter.Bodies.rectangle(width / 2, 0, width, 1, {
                isStatic: true,
                render: { opacity: 0 },
            })
        );

        return bodies;
    };

    return <div ref={sceneRef} className="w-full h-full" />;
};

export default PhysicsSimulation;
