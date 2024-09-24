"use client";
import React from "react";
import { FloatingNavbar } from "../components/FloatingNavbar";
import Header from "../sections/header";

const About = () => {
    return (
        <div className="max-w-2xl mx-auto p-4 font-sans">
            <Header />
            <main>
                <section className="mb-12">
                    <h1 className="text-4xl font-semibold mb-2">
                        Thanks for stopping by
                    </h1>
                    <p className="text-gray-600 mb-4 text-lg">
                        Front-end Developer Crafting Seamless Web Experiences
                        with Code and Creativity
                    </p>
                </section>
                <section className="mb-12">
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="border border-gray-800 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            About
                        </span>
                    </div>

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
            </main>
            <FloatingNavbar />
        </div>
    );
};

export default About;
