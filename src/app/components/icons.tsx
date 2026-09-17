import type { IconType } from "react-icons";
import {
    FaBootstrap,
    FaCss3Alt,
    FaGitAlt,
    FaHtml5,
    FaNodeJs,
    FaReact,
    FaSass,
} from "react-icons/fa";
import { SiExpress, SiMongodb, SiTailwindcss } from "react-icons/si";
import { BiLogoJavascript, BiLogoTypescript } from "react-icons/bi";

/**
 * Brand icons keyed by the label used in project/skill tags. Named imports
 * tree-shake to a few KB; wrapping them in next/dynamic pulled the whole
 * react-icons index into every page.
 */
export const skillIcons: Record<string, IconType> = {
    HTML5: FaHtml5,
    JavaScript: BiLogoJavascript,
    TypeScript: BiLogoTypescript,
    React: FaReact,
    CSS3: FaCss3Alt,
    "SCSS/SASS": FaSass,
    Bootstrap: FaBootstrap,
    Tailwind: SiTailwindcss,
    "Node.js": FaNodeJs,
    NodeJS: FaNodeJs,
    Express: SiExpress,
    "Express.js": SiExpress,
    MongoDB: SiMongodb,
    Git: FaGitAlt,
};

export type SkillCategory = "frontend" | "backend" | "styling" | "tools";

export interface Skill {
    name: string;
    category: SkillCategory;
    icon: IconType;
}

/** Skills shown on the about page (static list and physics simulation). */
export const skills: Skill[] = [
    { name: "HTML5", category: "frontend", icon: FaHtml5 },
    { name: "JavaScript", category: "frontend", icon: BiLogoJavascript },
    { name: "TypeScript", category: "frontend", icon: BiLogoTypescript },
    { name: "React", category: "frontend", icon: FaReact },
    { name: "CSS3", category: "styling", icon: FaCss3Alt },
    { name: "SCSS/SASS", category: "styling", icon: FaSass },
    { name: "Bootstrap", category: "styling", icon: FaBootstrap },
    { name: "Tailwind", category: "styling", icon: SiTailwindcss },
    { name: "NodeJS", category: "backend", icon: FaNodeJs },
    { name: "Express", category: "backend", icon: SiExpress },
    { name: "MongoDB", category: "backend", icon: SiMongodb },
    { name: "Git", category: "tools", icon: FaGitAlt },
];

interface SkillTagProps {
    name: string;
    className?: string;
}

/** Small pill with an optional brand icon; the icon is decorative. */
export function SkillTag({ name, className = "" }: SkillTagProps) {
    const Icon = skillIcons[name];
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-neutral-800 dark:text-neutral-300 ${className}`}
        >
            {Icon && <Icon aria-hidden="true" className="h-3.5 w-3.5" />}
            {name}
        </span>
    );
}
