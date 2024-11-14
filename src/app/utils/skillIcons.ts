import {
    FaHtml5,
    FaJsSquare,
    FaReact,
    FaCss3Alt,
    FaSass,
    FaBootstrap,
    FaNodeJs,
    FaGitAlt,
} from "react-icons/fa";
import {
    SiTypescript,
    SiTailwindcss,
    SiExpress,
    SiMongodb,
} from "react-icons/si";

export const skillIcons: Record<string, React.ElementType> = {
    HTML5: FaHtml5,
    JavaScript: FaJsSquare,
    Javascript: FaJsSquare,
    "React.js": FaReact,
    React: FaReact,
    CSS3: FaCss3Alt,
    "SCSS/SASS": FaSass,
    Bootstrap: FaBootstrap,
    "Node.js": FaNodeJs,
    NodeJs: FaNodeJs,
    "Express.js": SiExpress,
    MongoDB: SiMongodb,
    TypeScript: SiTypescript,
    Typescript: SiTypescript,
    Tailwind: SiTailwindcss,
    Git: FaGitAlt,
}; 