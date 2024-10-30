/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // Ajouter ici les domaines externes si nécessaire
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|webp)$/i,
      type: 'asset/resource'
    });
    return config;
  }
};

module.exports = nextConfig;
