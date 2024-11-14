import {
    FaHtml5,
    FaReact,
    FaCss3Alt,
    FaSass,
    FaBootstrap,
    FaNodeJs,
    FaGitAlt,
} from "react-icons/fa";
import {
    SiTailwindcss,
    SiExpress,
    SiMongodb,
} from "react-icons/si";
import { BiLogoTypescript, BiLogoJavascript } from "react-icons/bi";

export const skillIcons: Record<string, React.ElementType> = {
    HTML5: FaHtml5,
    JavaScript: BiLogoJavascript,
    React: FaReact,
    CSS3: FaCss3Alt,
    "SCSS/SASS": FaSass,
    Bootstrap: FaBootstrap,
    "Node.js": FaNodeJs,
    "Express.js": SiExpress,
    MongoDB: SiMongodb,
    TypeScript: BiLogoTypescript,
    Tailwind: SiTailwindcss,
    Git: FaGitAlt,
}; 