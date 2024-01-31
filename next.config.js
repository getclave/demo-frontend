/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
        config.experiments = {
          asyncWebAssembly: true,
        };
        return config;
      },
};

module.exports = nextConfig;
