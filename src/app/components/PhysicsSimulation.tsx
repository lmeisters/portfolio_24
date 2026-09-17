"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { renderToStaticMarkup } from "react-dom/server";
import { skills, type Skill } from "./icons";

const PILL_CATEGORY = 0x0002;
const WALL_CATEGORY = 0x0001;

type Pill = Matter.Body & { skill: Skill; pillWidth: number };

function isDark() {
    return document.documentElement.classList.contains("dark");
}

/** Rasterises each brand icon once per theme; drawing SVG strings per frame was the old hot path. */
function buildIconImages(dark: boolean) {
    const color = dark ? "#ffffff" : "#000000";
    return new Map(
        skills.map(({ name, icon: Icon }) => {
            const svg = renderToStaticMarkup(
                <Icon style={{ color }} color={color} />
            );
            const img = new Image();
            img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
            return [name, img];
        })
    );
}

interface PhysicsSimulationProps {
    /** Rendered height of the scene in px; the width follows the container. */
    height?: number;
}

/**
 * Skill "pills" falling into a box you can drag around. The simulation only
 * runs while the canvas is on screen and the tab is visible, and the icon
 * bitmaps are prepared once instead of on every frame.
 */
export function PhysicsSimulation({ height = 256 }: PhysicsSimulationProps) {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        let cleanup: (() => void) | undefined;

        const build = () => {
            cleanup?.();
            const width = scene.clientWidth;
            if (width === 0) return;

            const isMobile = width <= 500;
            const pillPaddingX = isMobile ? 8 : 12;
            const pillPaddingY = isMobile ? 6 : 8;
            const pillHeight = isMobile ? 24 : 30;
            const cornerRadius = pillHeight / 3;
            const fontSize = pillHeight * 0.5;
            const iconSize = fontSize * (isMobile ? 1 : 1.2);
            const spacing = 4;
            const fontFamily =
                getComputedStyle(document.documentElement)
                    .getPropertyValue("--font-poppins")
                    .trim() || "sans-serif";
            const font = `bold ${fontSize}px ${fontFamily}, system-ui, sans-serif`;

            let dark = isDark();
            let icons = buildIconImages(dark);

            const engine = Matter.Engine.create({ enableSleeping: true });
            const render = Matter.Render.create({
                element: scene,
                engine,
                options: {
                    width,
                    height,
                    wireframes: false,
                    background: "transparent",
                    pixelRatio: window.devicePixelRatio || 1,
                },
            });
            const runner = Matter.Runner.create();

            const wall = 60;
            const wallOptions = {
                isStatic: true,
                render: { visible: false },
                collisionFilter: { category: WALL_CATEGORY },
            };
            const walls = [
                Matter.Bodies.rectangle(width / 2, height + wall / 2, width, wall, wallOptions),
                Matter.Bodies.rectangle(-wall / 2, height / 2, wall, height * 2, wallOptions),
                Matter.Bodies.rectangle(width + wall / 2, height / 2, wall, height * 2, wallOptions),
            ];

            const measure = document.createElement("canvas").getContext("2d")!;
            measure.font = font;

            const safeZone = 50;
            const pills = skills.map((skill, index) => {
                const textWidth = measure.measureText(skill.name).width;
                const pillWidth = iconSize + spacing + textWidth + pillPaddingX * 1.5;
                const columns = Math.max(
                    1,
                    Math.floor((width - safeZone * 2) / (pillWidth + safeZone))
                );
                const x = safeZone + (index % columns) * (pillWidth + safeZone);
                const y = -pillHeight * (Math.floor(index / columns) + 1) * 2;
                const body = Matter.Bodies.rectangle(
                    x,
                    y,
                    pillWidth + pillPaddingX * 2,
                    pillHeight + pillPaddingY * 2,
                    {
                        chamfer: { radius: cornerRadius },
                        render: { visible: false },
                        restitution: 0.3,
                        friction: 0.1,
                        density: 0.001,
                        collisionFilter: {
                            category: PILL_CATEGORY,
                            mask: WALL_CATEGORY | PILL_CATEGORY,
                        },
                    }
                ) as Pill;
                body.skill = skill;
                body.pillWidth = pillWidth;
                return body;
            });

            const mouse = Matter.Mouse.create(render.canvas);
            const mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse,
                constraint: { stiffness: 0.2, render: { visible: false } },
            });
            // matter-js preventDefault()s wheel and touch events, which would
            // trap page scrolling on the canvas. Dragging stays mouse-only.
            const m = mouse as unknown as {
                mousewheel: EventListener;
                mousemove: EventListener;
                mousedown: EventListener;
                mouseup: EventListener;
            };
            render.canvas.removeEventListener("wheel", m.mousewheel);
            render.canvas.removeEventListener("touchmove", m.mousemove);
            render.canvas.removeEventListener("touchstart", m.mousedown);
            render.canvas.removeEventListener("touchend", m.mouseup);

            Matter.Events.on(mouseConstraint, "mousemove", () => {
                const hovered = Matter.Query.point(pills, mouse.position)[0];
                render.canvas.style.cursor = hovered ? "grab" : "default";
            });
            Matter.Events.on(mouseConstraint, "startdrag", () => {
                render.canvas.style.cursor = "grabbing";
            });
            Matter.Events.on(mouseConstraint, "enddrag", () => {
                render.canvas.style.cursor = "grab";
            });

            Matter.Composite.add(engine.world, [...walls, ...pills, mouseConstraint]);
            render.mouse = mouse;

            Matter.Events.on(render, "afterRender", () => {
                const ctx = render.context;
                ctx.font = font;
                ctx.textAlign = "left";
                ctx.textBaseline = "middle";
                for (const pill of pills) {
                    if (pill.position.y > height + 100 || pill.position.x < -100 || pill.position.x > width + 100) {
                        Matter.Body.setPosition(pill, {
                            x: safeZone + Math.random() * (width - safeZone * 2),
                            y: -pillHeight,
                        });
                        Matter.Body.setVelocity(pill, { x: 0, y: 0 });
                        Matter.Body.setAngularVelocity(pill, 0);
                        continue;
                    }
                    ctx.save();
                    ctx.translate(pill.position.x, pill.position.y);
                    ctx.rotate(pill.angle);
                    ctx.fillStyle = dark ? "#121212" : "#ffffff";
                    ctx.strokeStyle = "#808080";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.roundRect(
                        -pill.pillWidth / 2 - pillPaddingX,
                        -pillHeight / 2 - pillPaddingY,
                        pill.pillWidth + pillPaddingX * 2,
                        pillHeight + pillPaddingY * 2,
                        cornerRadius
                    );
                    ctx.fill();
                    ctx.stroke();

                    const textWidth = ctx.measureText(pill.skill.name).width;
                    const startX = -(iconSize + spacing + textWidth) / 2;
                    const img = icons.get(pill.skill.name);
                    if (img?.complete) {
                        ctx.drawImage(img, startX, -iconSize / 2, iconSize, iconSize);
                    }
                    ctx.fillStyle = dark ? "#ffffff" : "#000000";
                    ctx.fillText(pill.skill.name, startX + iconSize + spacing, 0);
                    ctx.restore();
                }
            });

            // Re-skin when the theme toggles.
            const themeObserver = new MutationObserver(() => {
                const next = isDark();
                if (next !== dark) {
                    dark = next;
                    icons = buildIconImages(dark);
                }
            });
            themeObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ["class"],
            });

            // Only simulate while visible.
            let running = false;
            let visible = false;
            const sync = () => {
                const shouldRun = visible && !document.hidden;
                if (shouldRun && !running) {
                    Matter.Runner.run(runner, engine);
                    Matter.Render.run(render);
                    running = true;
                } else if (!shouldRun && running) {
                    Matter.Runner.stop(runner);
                    Matter.Render.stop(render);
                    running = false;
                }
            };
            const io = new IntersectionObserver(([entry]) => {
                visible = entry.isIntersecting;
                sync();
            });
            io.observe(render.canvas);
            document.addEventListener("visibilitychange", sync);

            cleanup = () => {
                io.disconnect();
                themeObserver.disconnect();
                document.removeEventListener("visibilitychange", sync);
                Matter.Render.stop(render);
                Matter.Runner.stop(runner);
                Matter.Composite.clear(engine.world, false);
                Matter.Engine.clear(engine);
                render.canvas.remove();
                render.textures = {};
            };
        };

        build();

        let lastWidth = scene.clientWidth;
        let timer: ReturnType<typeof setTimeout>;
        const onResize = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (scene.clientWidth !== lastWidth) {
                    lastWidth = scene.clientWidth;
                    build();
                }
            }, 200);
        };
        window.addEventListener("resize", onResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", onResize);
            cleanup?.();
        };
    }, [height]);

    return (
        <div
            ref={sceneRef}
            style={{ height }}
            className="relative w-full overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-700 [&>canvas]:block"
            role="img"
            aria-label="Interactive animation: my skills as draggable pills"
        />
    );
}

export default PhysicsSimulation;
