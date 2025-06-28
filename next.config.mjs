/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client');
    } else {
      // Add fallbacks for Node.js built-in modules on client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false,
        tty: false,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;