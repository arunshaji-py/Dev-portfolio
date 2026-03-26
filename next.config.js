/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // IMPORTANT: Change 'your-repo-name' to your actual GitHub repository name
  // If deploying to https://username.github.io (root), remove basePath and assetPrefix
  // If deploying to https://username.github.io/repo-name, keep them
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name/',
};

module.exports = nextConfig;
