/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        RECAPTCHA_SITEKEY: process.env.RECAPTCHA_SITEKEY,
        RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET,
        DAPODIK_USERNAME: process.env.DAPODIK_USERNAME,
        DAPODIK_PASSWORD: process.env.DAPODIK_PASSWORD,
    },
    transpilePackages: ['vervalpd-node'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nisn.data.kemdikbud.go.id',
            },
        ],
    },
};

export default nextConfig;
