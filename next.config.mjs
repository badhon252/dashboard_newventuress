/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com", 
      "i.ibb.co", 
      "s3-alpha-sig.figma.com", // Add the domain here
    ],
  },
};

export default nextConfig;

