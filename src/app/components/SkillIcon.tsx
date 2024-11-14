"use client";

import { Suspense } from "react";
import { IconSkeleton } from "./IconSkeleton";
import { skillIcons } from "../utils/skillIcons";

interface SkillIconProps {
    name: string;
    className?: string;
}

export function SkillIcon({ name, className }: SkillIconProps) {
    const Icon = skillIcons[name];

    if (!Icon) return null;

    return (
        <Suspense fallback={<IconSkeleton />}>
            <Icon className={className} />
        </Suspense>
    );
}
