import type { MetadataRoute } from "next";
import { projectPath, projects } from "./data/projects";

const BASE = "https://portfoliolm.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    const pages = ["/", "/pages/works", "/pages/about"].map((path) => ({
        url: `${BASE}${path}`,
        changeFrequency: "monthly" as const,
        priority: path === "/" ? 1 : 0.8,
    }));
    const projectPages = projects.map((p) => ({
        url: `${BASE}${projectPath(p.slug)}`,
        changeFrequency: "yearly" as const,
        priority: 0.6,
    }));
    return [...pages, ...projectPages];
}
