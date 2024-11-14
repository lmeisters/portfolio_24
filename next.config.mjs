/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(webm|mp4)$/i,
            type: "asset/resource",
        });
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "portfoliolm.vercel.app",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
