const nextConfig = {
    reactStrictMode: true,
    experimental: {
        viewTransition: true,
    },
    images: {
        deviceSizes: [640, 672, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    async headers() {
        return [
            {
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
