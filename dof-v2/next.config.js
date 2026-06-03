/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'dof-2.vercel.app' }],
  },
};
module.exports = nextConfig;
