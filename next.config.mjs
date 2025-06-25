/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://www.themealdb.com')],
  },
};

export default nextConfig;
