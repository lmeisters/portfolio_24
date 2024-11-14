import dynamic from 'next/dynamic';

export const skillIcons: Record<string, React.ElementType> = {
    HTML5: dynamic(() => import('react-icons/fa').then(mod => mod.FaHtml5)),
    JavaScript: dynamic(() => import('react-icons/bi').then(mod => mod.BiLogoJavascript)),
    React: dynamic(() => import('react-icons/fa').then(mod => mod.FaReact)),
    CSS3: dynamic(() => import('react-icons/fa').then(mod => mod.FaCss3Alt)),
    "SCSS/SASS": dynamic(() => import('react-icons/fa').then(mod => mod.FaSass)),
    Bootstrap: dynamic(() => import('react-icons/fa').then(mod => mod.FaBootstrap)),
    "Node.js": dynamic(() => import('react-icons/fa').then(mod => mod.FaNodeJs)),
    "Express.js": dynamic(() => import('react-icons/si').then(mod => mod.SiExpress)),
    MongoDB: dynamic(() => import('react-icons/si').then(mod => mod.SiMongodb)),
    TypeScript: dynamic(() => import('react-icons/bi').then(mod => mod.BiLogoTypescript)),
    Tailwind: dynamic(() => import('react-icons/si').then(mod => mod.SiTailwindcss)),
    Git: dynamic(() => import('react-icons/fa').then(mod => mod.FaGitAlt)),
}; 