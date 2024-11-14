/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: ['via.placeholder.com', 'images.unsplash.com'],
    },
};

export default nextConfig;
