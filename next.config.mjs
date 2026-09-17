/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // Cards are at most 640px wide (672px column minus padding); 672 covers
        // a 380px-wide phone at 1.75x without jumping to the 750px rendition.
        deviceSizes: [640, 672, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    async headers() {
        return [
            {
                // Demo videos are content-addressed by folder; cache them hard.
                source: "/assets/videos/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
