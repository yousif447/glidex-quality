/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.glidexquality.com",
        pathname: "/storage/**",
      }
    ],
  },
};

module.exports = nextConfig;
