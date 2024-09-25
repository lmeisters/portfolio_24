"use client";
import React from "react";
import { FloatingNavbar } from "../components/FloatingNavbar";
import Header from "../sections/header";
import { useState, useEffect, useRef } from "react";
import Matter from "matter-js";

interface PhysicsSkillProps {
    name: string;
    index: number;
    containerWidth: number;
    containerHeight: number;
}

const PhysicsSkill: React.FC<PhysicsSkillProps> = ({
    name,
    index,
    containerWidth,
    containerHeight,
}) => {
    const boxRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        if (containerWidth === 0 || containerHeight === 0) return;

        const engine = Matter.Engine.create();
        const world = engine.world;

        // Adjust these values to change the size of the skill boxes
        const boxWidth = 100;
        const boxHeight = 40;

        const box = Matter.Bodies.rectangle(
            Math.random() * (containerWidth - boxWidth) + boxWidth / 2,
            -50 - index * 30,
            boxWidth,
            boxHeight,
            {
                restitution: 0.6,
                friction: 0.1,
                density: 0.001,
            }
        );

        Matter.World.add(world, [
            box,
            // Bottom wall
            Matter.Bodies.rectangle(
                containerWidth / 2,
                containerHeight,
                containerWidth,
                50,
                { isStatic: true }
            ),
            // Left wall
            Matter.Bodies.rectangle(
                0,
                containerHeight / 2,
                50,
                containerHeight,
                { isStatic: true }
            ),
            // Right wall
            Matter.Bodies.rectangle(
                containerWidth,
                containerHeight / 2,
                50,
                containerHeight,
                { isStatic: true }
            ),
        ]);

        // Add mouse control
        const mouse = Matter.Mouse.create(boxRef.current);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        });

        Matter.World.add(world, mouseConstraint);

        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        const render = () => {
            setPosition({ x: box.position.x, y: box.position.y });
            setRotation(box.angle);
            requestAnimationFrame(render);
        };
        render();

        return () => {
            Matter.World.clear(world, false);
            Matter.Engine.clear(engine);
            Matter.Runner.stop(runner);
        };
    }, [containerWidth, containerHeight, index]);

    return (
        <div
            ref={boxRef}
            style={{
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: `translate(-50%, -50%) rotate(${rotation}rad)`,
                width: "100px", // Match this with boxWidth
                height: "40px", // Match this with boxHeight
                cursor: "grab",
            }}
            className="bg-white shadow-md rounded-lg px-4 py-2 text-sm font-medium flex items-center justify-center"
        >
            {name}
        </div>
    );
};

interface TimelineItemProps {
    title: string;
    subtitle: string;
    year: number;
}

const TimelineItem = ({ title, subtitle, year }: TimelineItemProps) => (
    <div className="flex items-start space-x-4 mb-4">
        <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
        <div className="flex-grow">
            <h3 className="font-medium">{title}</h3>
            <p className="text-gray-600">{subtitle}</p>
        </div>
        <span className="text-gray-500">{year}</span>
    </div>
);

const About = () => {
    const skills = ["JavaScript", "TypeScript", "React", "Node.js"];
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4 font-sans">
            <Header />
            <main>
                <section className="mb-12 flex flex-col md:flex-row">
                    <div>
                        <h1 className="text-4xl font-semibold mb-2">
                            Thanks for stopping by
                        </h1>
                        <p className="text-gray-600 mb-4 text-lg">
                            Front-end Developer Crafting Seamless Web
                            Experiences with Code and Creativity
                        </p>
                    </div>
                    <img src="/profile.jpg" alt="profile" className="w-1/3" />
                </section>
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-2">About Me</h2>
                    <p className="text-gray-600 mb-4">
                        I'm a passionate web developer with a knack for creating
                        clean, efficient, and user-friendly websites. With
                        expertise in front-end and back-end development, I focus
                        on building responsive, dynamic, and intuitive digital
                        experiences. I enjoy turning complex problems into
                        simple, elegant solutions, and I'm always exploring the
                        latest technologies to stay ahead in the ever-evolving
                        world of web development. When I'm not coding, you can
                        find me diving into new design trends or collaborating
                        on exciting tech projects.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">My Skills</h2>
                    <div
                        ref={containerRef}
                        className="relative h-64 border-2 border-gray-200 rounded-lg overflow-hidden"
                    >
                        {containerSize.width > 0 &&
                            containerSize.height > 0 &&
                            skills.map((skill, index) => (
                                <PhysicsSkill
                                    key={index}
                                    name={skill}
                                    index={index}
                                    containerWidth={containerSize.width}
                                    containerHeight={containerSize.height}
                                />
                            ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Education</h2>
                    <TimelineItem
                        title="Riga Technical University"
                        subtitle="Master's Degree of Computer Science"
                        year="2023 - present"
                    />
                    <TimelineItem
                        title="Riga Technical University"
                        subtitle="Bachelor's Degree of Computer Science"
                        year="2016 - 2020"
                    />
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Experience</h2>
                    <TimelineItem
                        title="Mykoob"
                        subtitle="Front-end Developer Intership"
                        year="2024"
                    />
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Courses</h2>
                    <TimelineItem
                        title="The Web Developer Bootcamp 2024"
                        subtitle="HTML5 CSS3 JavaScript React.js Node.js Express.js MongoDB"
                        year="2024"
                    />
                    <TimelineItem
                        title="Advanced CSS and Sass"
                        subtitle="SCSS/SASS Flexbox Grid"
                        year="2024"
                    />
                    <TimelineItem
                        title="The Complete JavaScript Course 2024"
                        subtitle="Udemy"
                        year="2024"
                    />
                    <TimelineItem
                        title="Web risinājumu izstrāde"
                        subtitle="Remote"
                        year="2022"
                    />
                </section>
            </main>
            <FloatingNavbar />
        </div>
    );
};

export default About;
