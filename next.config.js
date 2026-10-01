/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Required if deploying to <username>.github.io/<repository-name>
  basePath: '/itzfizz-scroll-hero',
  images: {
    unoptimized: true, // Required for static export on GitHub Pages
  },
};

export default nextConfig;