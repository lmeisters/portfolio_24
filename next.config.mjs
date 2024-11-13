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
        domains: ["portfoliolm.vercel.app"],
    },
};

export default nextConfig;
