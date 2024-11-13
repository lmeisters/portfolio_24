"use client";

import dynamic from "next/dynamic";

const PhysicsContainer = dynamic(
    () => import("./PhysicsSimulation").then((mod) => mod.PhysicsSimulation),
    {
        loading: () => <LoadingPlaceholder />,
        ssr: false,
    }
);

function LoadingPlaceholder() {
    return (
        <div className="relative h-64 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-gray-200 dark:border-gray-700 rounded-full border-t-gray-800 dark:border-t-gray-200" />
            </div>
        </div>
    );
}

interface LazyPhysicsContainerProps {
    showPhysics: boolean;
}

export function LazyPhysicsContainer({
    showPhysics,
}: LazyPhysicsContainerProps) {
    return (
        <div>
            <PhysicsContainer showPhysics={showPhysics} />
        </div>
    );
}
