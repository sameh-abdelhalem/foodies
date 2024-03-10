/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/foodies",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "samehmohamed-nextjs-demo-users-image.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
