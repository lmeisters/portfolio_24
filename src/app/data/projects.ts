import type { StaticImageData } from "next/image";
import purePlaylistImage from "@/assets/images/pure_playlist.webp";
import purePlaylistLogo from "@/assets/images/pure_playlist_logo.webp";
import siteSelectImage from "@/assets/images/siteselect.webp";
import siteSelectWorksImage from "@/assets/images/siteselect_works.webp";
import terrainlyImage from "@/assets/images/terrainly.webp";
import terrainlyLogo from "@/assets/images/terrainly_logo.webp";
import aiImageGeneratorImage from "@/assets/images/ai_image_generator.webp";

export interface ProjectVideo {
    label: string;
    src: string;
}

export interface Project {
    slug: string;
    title: string;
    /** Logo image; when absent `abbreviation` is shown instead. */
    logo?: StaticImageData;
    abbreviation?: string;
    /** One-line summary used on cards. */
    description: string;
    /** Second paragraph on the home page card. */
    longDescription: string;
    /** Full description on the project page. */
    detail: string;
    /** Tags shown on cards. */
    tags: string[];
    year: string;
    githubUrl: string;
    liveUrl: string;
    /** Set when the live demo is down; shown instead of the plain link. */
    liveNotice?: string;
    deployment: string;
    /** Hosts that sleep between requests (Render free tier). */
    slowStart?: boolean;
    image: StaticImageData;
    /** Alternative still used on the works page, if different. */
    worksImage?: StaticImageData;
    /** Demo video shown on hover and at the top of the project page. */
    videoSrc: string;
    /** Additional feature videos on the project page. */
    videos: ProjectVideo[];
    features: string[];
    techStack: string[];
    challenges: { challenge: string; solution: string }[];
    futureEnhancements: string[];
    isNew?: boolean;
}

export const projects: Project[] = [
    {
        slug: "pureplaylist",
        title: "PurePlaylist",
        logo: purePlaylistLogo,
        description:
            "A Spotify playlist management app for easy sorting, filtering, and organization",
        longDescription:
            "I created PurePlaylist to simplify managing large playlists, allowing users to organize their music to suit their preferences with just a few clicks",
        detail: "A Spotify playlist filtering web app that allows users to filter playlists based on various criteria such as genre, mood, and tempo",
        tags: ["TypeScript", "Tailwind", "React"],
        year: "2024",
        githubUrl: "https://github.com/lmeisters/PurePlaylist",
        liveUrl: "https://pureplaylist.vercel.app",
        deployment: "Vercel",
        image: purePlaylistImage,
        videoSrc: "/assets/videos/pure_playlist/pure_playlist_demo.webm",
        videos: [
            {
                label: "Playlist filtering",
                src: "/assets/videos/pure_playlist/pure_playlist_playlist_filtering.webm",
            },
            {
                label: "Track filters",
                src: "/assets/videos/pure_playlist/pure_playlist_track_filter.webm",
            },
            {
                label: "Track sorting",
                src: "/assets/videos/pure_playlist/pure_playlist_track_sorting.webm",
            },
        ],
        features: [
            "Keyword Filtering: Filter songs by specific keywords in titles, genres, or artist names",
            "Artist and Genre Filtering: Narrow down your playlist by selecting or excluding artists and genres",
            "User-Friendly Interface: Intuitive modal-based filtering options for seamless interaction",
            "Responsive Design: Works across all devices—desktop, tablet, and mobile",
        ],
        techStack: [
            "Frontend: React, Next.js, Tailwind CSS, Shadcn UI",
            "State Management: React Query",
            "Authentication: Next-Auth",
            "API Integration: Spotify API",
            "Deployment: Vercel",
        ],
        challenges: [
            {
                challenge:
                    "Large amount of tracks loading in a timely manner while keeping the user experience smooth",
                solution:
                    "Implemented pagination and virtualized lists to handle large playlists efficiently, with loading states and progressive data fetching",
            },
            {
                challenge:
                    "Making sure all of the tracks in large playlists get filtered, sorted and deleted by the users requests",
                solution:
                    "Utilized client-side caching and optimized filtering algorithms to handle bulk operations efficiently while maintaining responsive UI",
            },
        ],
        futureEnhancements: [
            "Identify and remove duplicate tracks to keep playlists clutter-free",
            "Keep playlists fresh with new releases from artists users follow or like",
            "Set filters and create playlists automatically, right on schedule",
        ],
        isNew: true,
    },
    {
        slug: "siteselect",
        title: "SiteSelect",
        abbreviation: "SS",
        description:
            "A curated platform offering a collection of the web's most innovative design galleries",
        longDescription:
            "I built a custom platform to organize and filter website inspiration galleries I collected over the years, making it easier to find specific design references",
        detail: "A curated platform offering a collection of the web's most innovative design galleries. Designed to inspire and elevate web projects, SiteSelect allows users to explore a diverse array of visual references. It features advanced search and filtering, responsive design, and dynamic content loading from a JSON file",
        tags: ["JavaScript", "SCSS/SASS", "GSAP"],
        year: "2024",
        githubUrl: "https://github.com/lmeisters/SiteSelect",
        liveUrl: "https://siteselect.vercel.app",
        deployment: "Vercel",
        image: siteSelectImage,
        worksImage: siteSelectWorksImage,
        videoSrc: "/assets/videos/siteselect/siteselect_demo.webm",
        videos: [
            {
                label: "Search",
                src: "/assets/videos/siteselect/siteselect_search.webm",
            },
            {
                label: "Filters",
                src: "/assets/videos/siteselect/siteselect_filter.webm",
            },
        ],
        features: [
            "Curated Collection: Hand-picked design galleries from across the web",
            "Search Functionality: Advanced search and filtering tools for precise discovery",
            "Responsive Interface: Seamless browsing experience across all device sizes",
            "Dynamic Loading: Efficient content loading system using JSON data structure",
        ],
        techStack: [
            "Frontend: JavaScript, HTML, SCSS/SASS",
            "Animation: GSAP",
            "Data Handling: Fetch API",
            "Deployment: Vercel",
        ],
        challenges: [
            {
                challenge:
                    "Ensuring smooth performance for dynamic content loading",
                solution:
                    "Implemented efficient data fetching with Fetch API and optimized animations using GSAP",
            },
            {
                challenge: "Responsive design across multiple device sizes",
                solution:
                    "Used SCSS/SASS for scalable styling and media queries for responsiveness",
            },
        ],
        futureEnhancements: [
            "Add more filtering options based on design categories",
            "Incorporate web scraping to automatically update the galleries",
        ],
    },
    {
        slug: "terrainly",
        title: "Terrainly",
        logo: terrainlyLogo,
        description:
            "A full stack web app for discovering, reviewing, and managing parks around Latvia",
        longDescription:
            "I initially built this web app as a course project, but this year I chose to continue developing it to enhance its frontend and expand its functionality",
        detail: "A full-stack web application that allows users to discover, create, and review parks around Latvia. This application leverages Node.js, Express, and MongoDB to deliver a robust and interactive user experience with features like user authentication, park management, and a review system. This platform is designed to connect nature enthusiasts and provide a comprehensive resource for outdoor adventures in Latvia's beautiful landscapes",
        tags: ["JavaScript", "Bootstrap", "Node.js"],
        year: "2024",
        githubUrl: "https://github.com/lmeisters/Terrainly",
        liveUrl: "https://terrainly.onrender.com",
        deployment: "Render",
        slowStart: true,
        image: terrainlyImage,
        videoSrc: "/assets/videos/terrainly/terrainly_demo.webm",
        videos: [
            {
                label: "Registration",
                src: "/assets/videos/terrainly/terrainly_register.webm",
            },
            {
                label: "Adding a park",
                src: "/assets/videos/terrainly/terrainly_add_park.webm",
            },
            {
                label: "Editing a park",
                src: "/assets/videos/terrainly/terrainly_edit_park.webm",
            },
            {
                label: "Reviewing a park",
                src: "/assets/videos/terrainly/terrainly_review.webm",
            },
        ],
        features: [
            "User Authentication: Complete registration and login system for personalized experience",
            "Park Management: Full CRUD functionality for creating and managing park entries",
            "Review System: Interactive platform for leaving reviews and ratings on parks",
            "Media Integration: Advanced image upload functionality using Cloudinary",
            "Interactive Mapping: Dynamic map integration powered by Mapbox",
            "Responsive Design: Bootstrap-based adaptive layout for all devices",
        ],
        techStack: [
            "Frontend: EJS, Bootstrap 5, CSS",
            "Backend: Node.js, Express, MongoDB",
            "Authentication: Passport.js",
            "Media Storage: Cloudinary",
            "Mapping: Mapbox API",
            "Security: Helmet",
            "Deployment: Render",
        ],
        challenges: [
            {
                challenge: "Ensuring secure and efficient user authentication",
                solution: "Utilized Passport.js for robust authentication",
            },
            {
                challenge: "Handling file uploads and integrating Cloudinary",
                solution:
                    "Used Multer for handling file uploads and Cloudinary for image storage and delivery",
            },
            {
                challenge: "Integrating Mapbox for interactive maps",
                solution:
                    "Utilized Mapbox GL JS for map rendering and integration",
            },
        ],
        futureEnhancements: [
            "Enhanced search and filtering options",
            "User-generated content moderation",
            "Advanced analytics and reporting tools",
        ],
    },
    {
        slug: "ai-image-generator",
        title: "AI Image Generator",
        abbreviation: "IG",
        description:
            "Web app that creates and showcases unique images from user prompts",
        longDescription:
            "An AI image generator built around the DALL-E 2 API with a shared community gallery of generated art",
        detail: "This project is an AI image generator application built using React, Node.js, Express, and MongoDB. It leverages the DALL-E 2 AI model to create images from user-provided prompts. Users can generate unique images, share them on the website, and browse a community showcase of AI-generated art",
        tags: ["React", "Tailwind", "Node.js"],
        year: "2024",
        githubUrl: "https://github.com/lmeisters/AI_Image_Generator_Dall-E",
        liveUrl: "https://image-generator-beed6.web.app",
        liveNotice: "Currently unavailable due to API usage limits",
        deployment: "Render & Firebase",
        slowStart: true,
        image: aiImageGeneratorImage,
        videoSrc: "/assets/videos/image_gen/ai_image_generator_demo.webm",
        videos: [
            {
                label: "Creating an image",
                src: "/assets/videos/image_gen/ai_image_generator_create.webm",
            },
        ],
        features: [
            "AI Generation: Custom image creation using DALL-E 2 AI model",
            "Random Inspiration: 'Surprise Me' feature for automated prompt suggestions",
            "Community Gallery: Shared showcase of AI-generated artwork",
            "Search System: Advanced functionality to find specific generated images",
            "Download Options: Direct image download capability for users",
            "Responsive Interface: Adaptive design supporting various screen sizes",
        ],
        techStack: [
            "Frontend: React, Tailwind CSS, React Router",
            "Backend: Node.js, Express, MongoDB",
            "AI Integration: OpenAI API (DALL-E 2)",
            "Media Storage: Cloudinary",
            "Build Tools: Vite",
            "Deployment: Render, Firebase",
        ],
        challenges: [
            {
                challenge: "Integrating DALL-E 2 AI model effectively",
                solution:
                    "Utilized OpenAI API to seamlessly incorporate DALL-E 2 functionality",
            },
            {
                challenge: "Managing image storage and retrieval",
                solution:
                    "Implemented Cloudinary for efficient image storage and delivery",
            },
            {
                challenge: "Creating a responsive and intuitive user interface",
                solution:
                    "Leveraged React and Tailwind CSS for a flexible and user-friendly design",
            },
        ],
        futureEnhancements: [
            "Implement user accounts and authentication",
            "Add more AI models for image generation",
            "Introduce image editing features",
        ],
    },
];

export const projectPath = (slug: string) => `/pages/projects/${slug}`;

export const getProject = (slug: string) =>
    projects.find((p) => p.slug === slug);

/** Strips the scheme so a URL can be shown as short link text. */
export const displayUrl = (url: string) => url.replace(/^https?:\/\//, "");
