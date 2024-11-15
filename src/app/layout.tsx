import { Poppins } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { SpeedInsightsWrapper } from "./components/SpeedInsightsWrapper";

const poppins = Poppins({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    preload: true,
});

export const metadata: Metadata = {
    metadataBase: new URL("https://portfoliolm.vercel.app"),
    title: "Linards Meisters | Frontend Developer Portfolio",
    description:
        "Welcome to my portfolio - Showcasing web development projects and skills",
    icons: {
        icon: [
            { url: "/favicon.png", sizes: "32x32" },
            { url: "/icon.png", sizes: "192x192" },
        ],
        apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
    openGraph: {
        type: "website",
        locale: "en_LV",
        url: "https://portfoliolm.vercel.app",
        title: "Linards Meisters | Frontend Developer Portfolio",
        description:
            "Welcome to my portfolio - Showcasing web development projects and skills",
        siteName: "Linards Meisters | Frontend Developer Portfolio",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Linards Meisters | Frontend Developer Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Linards Meisters | Frontend Developer Portfolio",
        description:
            "Welcome to my portfolio - Showcasing web development projects and skills",
        images: ["/og-image.png"],
    },
    keywords: [
        "web development",
        "portfolio",
        "React",
        "Next.js",
        "frontend",
        "backend",
    ],
    authors: [{ name: "Linards Meisters" }],
    creator: "Linards Meisters",
    publisher: "Linards Meisters",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    other: {
        "google-font-preconnect": ["https://fonts.gstatic.com"],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${poppins.variable} font-sans`}>
            <head>
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                {children}
                <SpeedInsightsWrapper />
            </body>
        </html>
    );
}
