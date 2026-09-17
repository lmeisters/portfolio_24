"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Tooltip from "./Tooltip";
import StaticSkills from "./StaticSkills";

const SCENE_HEIGHT = 256;

const PhysicsSimulation = dynamic(() => import("./PhysicsSimulation"), {
    ssr: false,
    loading: () => (
        <div
            style={{ height: SCENE_HEIGHT }}
            className="w-full animate-pulse rounded-lg border border-gray-200 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800"
        />
    ),
});

/**
 * "My Skills" block with a toggle between the physics playground and a plain
 * list. Screen readers always get the list because the canvas is only an image.
 */
export default function SkillsSection() {
    const [showPhysics, setShowPhysics] = useState(true);

    return (
        <section className="mb-8" aria-labelledby="skills-heading">
            <div className="mb-4 flex items-center gap-2">
                <h2 id="skills-heading" className="text-xl font-bold">
                    My Skills
                </h2>
                <div className="ml-auto flex items-center gap-2">
                    <Tooltip
                        content={
                            showPhysics
                                ? "Show as a list"
                                : "Show as an interactive animation"
                        }
                    >
                        <button
                            type="button"
                            onClick={() => setShowPhysics((v) => !v)}
                            className="relative inline-flex h-5 w-10 items-center rounded-full bg-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:bg-white"
                            role="switch"
                            aria-checked={showPhysics}
                            aria-label="Interactive skills animation"
                        >
                            <span
                                aria-hidden="true"
                                className={`${
                                    showPhysics ? "translate-x-6" : "translate-x-1"
                                } inline-block h-3 w-3 transform rounded-full bg-white transition-transform dark:bg-black`}
                            />
                        </button>
                    </Tooltip>
                </div>
            </div>
            {showPhysics ? (
                <>
                    <PhysicsSimulation height={SCENE_HEIGHT} />
                    <StaticSkills className="sr-only" />
                </>
            ) : (
                <StaticSkills />
            )}
        </section>
    );
}
