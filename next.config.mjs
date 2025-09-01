/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },  // next/image ko static banata hai
  // trailingSlash: true,         // optional, agar URLs ke end me / chahiye
};

export default nextConfig;
